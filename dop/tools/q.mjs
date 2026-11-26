#!/usr/bin/env node
// 問題のツール: validate / blind / reveal / verdict / gate / publish / find / coverage / dedupe / stats / linkcheck
// 束は work/<ID>/questions.json に { "item": "<ID>", "questions": [ … ] } の形で置く。
import fs from 'node:fs';
import { paths, readJSON, writeJSON, appendLine, emit, main, ToolError, today, rel, seeded, setResult, writeReport } from './lib/io.mjs';
import { normalize, ngrams, jaccard, questionText } from './lib/text.mjs';
import { itemIdOf as idOf, requireState, failToFeedback as toFeedback, judge } from './lib/step.mjs';
import { loadBank, coverage as bankCoverage } from './lib/bank.mjs';
import { loadBatch, checkBatch, lengthBias, gateBatch, linkFailures, DUP_FAIL, DUP_WARN } from './lib/qcheck.mjs';

// hooks.mjs と試験が q.mjs から読むので、検査の関数は同じ名前で出し直す（F-0002）
export { checkBatch, lengthBias, gateBatch };

const KEYS = ['A', 'B', 'C', 'D', 'E', 'F'];
// これが issues にあれば直す（attempts を数える）。style・giveaway は直すが数えない。
const SEVERE = new Set(['fact', 'ambiguous', 'two_correct', 'no_correct', 'unsupported', 'deprecated', 'translation']);
const MILD = new Set(['style', 'giveaway']);

const itemIdOf = (arg) => idOf(arg, { message: '項目 ID（例 C-0012）か work/<ID>/questions.json を渡す' });

const failToFeedback = (id, step, fails) => toFeedback(id, step, fails, { idField: 'qid', key: 'questions' });

// ---- 選択肢の並べ替え（正解の位置の偏りを直す） --------------------------------

export function placeAnswer(q, targetIndex) {
  const right = q.choices.find((c) => c.key === q.answer[0]);
  const others = q.choices.filter((c) => c !== right);
  const ordered = [...others];
  ordered.splice(targetIndex, 0, right);
  const map = Object.fromEntries(ordered.map((c, i) => [c.key, KEYS[i]]));
  return {
    ...q,
    choices: ordered.map((c, i) => ({ ...c, key: KEYS[i] })),
    answer: q.answer.map((k) => map[k]),
    explanation: { ...q.explanation, per_choice: Object.fromEntries(Object.entries(q.explanation.per_choice).map(([k, v]) => [map[k], v]).sort()) },
  };
}

function positionCounts(questions) {
  const counts = [0, 0, 0, 0];
  for (const q of questions) if (q.type === 'single') counts[KEYS.indexOf(q.answer[0])]++;
  return counts;
}

// ---- コマンド ---------------------------------------------------------------

const commands = {
  validate(args) {
    const id = itemIdOf(args._[0]);
    const errors = checkBatch(id);
    const details = errors.length ? writeReport(`${id}/validate.txt`, errors.map((e) => `${e.qid}\t${e.pointer}\t${e.message}`).join('\n') + '\n') : undefined;
    if (!errors.length) setResult(id, 'C2_author', 'ok');
    emit({
      ok: !errors.length,
      summary: errors.length ? `形の誤りが ${errors.length} 件` : `${loadBatch(id).questions.length} 問とも形は正しい`,
      items: errors.map((e) => `${e.qid} ${e.pointer}: ${e.message}`),
      details_path: details,
      repeatKey: `validate:${id}`,
    });
  },

  blind(args) {
    const id = itemIdOf(args._[0]);
    // P-012: 本番と同じ日本語で解く（英語は reveal で見せ、訳のずれを照らす）
    const qs = loadBatch(id).questions.map(({ id: qid, task, services, type, select_count, stem_ja, choices }) => ({
      id: qid, task, services, type, select_count, stem: stem_ja, choices: choices.map((c) => ({ key: c.key, text: c.text_ja })),
    }));
    const file = paths.work(id, 'blind.json');
    writeJSON(file, { item: id, questions: qs });
    emit({ ok: true, summary: `答えを抜いた ${qs.length} 問を書いた。これを解いて verify.json の blind を埋めてから reveal`, extra: { file: rel(file) } });
  },

  reveal(args) {
    const id = itemIdOf(args._[0]);
    const batch = loadBatch(id);
    const v = readJSON(paths.work(id, 'verify.json'), null);
    const missing = batch.questions.filter((q) => !v?.questions?.find((x) => x.qid === q.id)?.blind?.answer?.length);
    if (missing.length) throw new ToolError(`先に答えを見ずに解く。verify.json に blind.answer が無い: ${missing.map((q) => q.id).join(', ')}`);
    const file = paths.work(id, 'reveal.json');
    writeJSON(file, { item: id, questions: batch.questions.map((q) => ({ id: q.id, answer: q.answer, stem_en: q.stem, choices_en: q.choices.map((c) => ({ key: c.key, text: c.text })), explanation: q.explanation, references: q.references })) });
    emit({ ok: true, summary: `答えと解説を書いた。照らして verify.json の issues と verdict を埋め、q verdict を呼ぶ`, extra: { file: rel(file) } });
  },

  verdict(args) {
    const id = itemIdOf(args._[0]);
    requireState(id, 'C3_verify');
    const batch = loadBatch(id);
    const v = readJSON(paths.work(id, 'verify.json'));
    const qhist = readJSON(paths.work(id, 'qhistory.json'), {});
    const results = {};
    const feedback = {};
    const kinds = new Set();
    const dropped = [];
    let anyCounted = false;
    for (const q of batch.questions) {
      const e = v.questions?.find((x) => x.qid === q.id);
      if (!e?.blind?.answer) throw new ToolError(`verify.json に ${q.id} の blind が無い`);
      const match = [...e.blind.answer].sort().join() === [...q.answer].sort().join();
      const issues = Array.isArray(e.issues) ? e.issues : [];
      issues.forEach((i) => kinds.add(i.kind));
      // P-011: 答えを見ずに解いて外れても、reveal の後に検証役が根拠と照らして ok とし、重い指摘も無いなら、
      // 問題の欠陥ではなく難しい問題として通す（low_confidence の印を付ける）
      const hardButSound = !match && e.verdict === 'ok' && !issues.some((i) => SEVERE.has(i.kind));
      const j = judge({ id: q.id, issues, said: e.verdict, severe: SEVERE, mild: MILD, hist: qhist, extraSevere: !match && !hardButSound });
      const verdict = j.verdict;
      if (j.counted) anyCounted = true;
      if (!match) kinds.add('blind_mismatch');
      results[q.id] = verdict;
      if (verdict === 'fix') feedback[q.id] = { blind: e.blind, match, issues };
      if (verdict === 'drop') dropped.push(q);
      if (verdict === 'ok' && match && e.blind.confidence === 'low') q.low_confidence = true;
      if (verdict === 'ok' && hardButSound) q.low_confidence = true;
    }
    const kept = batch.questions.filter((q) => results[q.id] !== 'drop');
    // 見直し（recheck）で捨てた問題は、bank の物を retired にする（アプリに出さない）
    if (batch.recheck && !batch.translate) { // 訳で捨てた時は、英語の問題は残す（日本語が無いだけ）
      for (const q of dropped) {
        const file = paths.bank(q.task, `${q.id}.json`);
        const cur = readJSON(file, null);
        if (cur) writeJSON(file, { ...cur, status: 'retired', last_checked: today(), note: [cur.note, '見直しで捨てた（誤りが直せなかった）'].filter(Boolean).join(' / ') });
      }
    }
    if (dropped.length) {
      const prev = readJSON(paths.work(id, 'dropped.json'), []);
      writeJSON(paths.work(id, 'dropped.json'), [...prev, ...dropped.map((q) => ({ question: q, why: feedback[q.id] ?? v.questions.find((x) => x.qid === q.id) }))]);
    }
    writeJSON(paths.work(id, 'qhistory.json'), qhist);
    writeJSON(paths.work(id, 'questions.json'), { ...batch, questions: kept });

    // P-004: 全問を迷わず解けた束は易しすぎの疑い（結果は変えず、記録だけ）
    const entries = batch.questions.map((q) => v.questions.find((x) => x.qid === q.id));
    const tooEasy = batch.questions.length >= 3 && entries.every((e, i) => e.blind.confidence === 'high'
      && [...e.blind.answer].sort().join() === [...batch.questions[i].answer].sort().join());
    if (tooEasy) kinds.add('too_easy');
    const fixes = Object.keys(feedback);
    let result;
    if (fixes.length) result = 'fix';
    else if (kept.length) result = 'pass';
    else result = 'drop';
    if (result === 'fix') writeJSON(paths.work(id, 'feedback.json'), { from: 'C3_verify', questions: feedback });
    else fs.rmSync(paths.work(id, 'feedback.json'), { force: true });
    appendLine(paths.work(id, 'history.jsonl'), { step: 'C3_verify', kinds: [...kinds] });
    // verdict.json は questions.json の後に書く（gate が「検証の後に書き換えたか」を時刻で見る）
    writeJSON(paths.work(id, 'verdict.json'), { at: new Date().toISOString(), questions: Object.fromEntries(Object.entries(results).filter(([, r]) => r !== 'drop')) });
    setResult(id, 'C3_verify', result, { count: result !== 'fix' || anyCounted });
    emit({
      ok: true,
      summary: `ok ${Object.values(results).filter((r) => r === 'ok').length} / fix ${fixes.length} / drop ${dropped.length} → loop advance --result ${result}`,
      items: Object.entries(results).map(([qid, r]) => ({ qid, verdict: r })),
      extra: { result, too_easy: tooEasy, feedback: result === 'fix' ? `work/${id}/feedback.json` : null },
    });
  },

  gate(args) {
    const id = itemIdOf(args._[0]);
    const fails = gateBatch(id, { net: !!args.net });
    if (fails.length) {
      failToFeedback(id, 'C4_gate', fails);
      setResult(id, 'C4_gate', 'fail');
    }
    emit({
      ok: !fails.length,
      summary: fails.length ? `${fails.length} 件の検査に落ちた → loop advance --result fail` : '全ての検査を通った → q publish',
      items: fails.map((f) => `${f.check} ${f.qid ?? ''}: ${f.message}`),
      repeatKey: `gate:${id}`,
    });
  },

  publish(args) {
    const id = itemIdOf(args._[0]);
    requireState(id, 'C4_gate');
    const fails = gateBatch(id, { net: !!args.net });
    if (fails.length) {
      failToFeedback(id, 'C4_gate', fails);
      setResult(id, 'C4_gate', 'fail');
      return emit({ ok: false, summary: `検査に落ちたので入れない（${fails.length} 件）→ loop advance --result fail`, items: fails.map((f) => `${f.check} ${f.qid ?? ''}: ${f.message}`), repeatKey: `gate:${id}` });
    }
    const batch = loadBatch(id);
    const bank = loadBank();
    const rand = seeded(id);
    const counts = positionCounts(bank);
    const published = [];
    for (const q0 of batch.questions) {
      let q = q0;
      if (q.type === 'single' && !batch.translate) { // 訳では答えの位置を変えない
        const min = Math.min(...counts);
        const choices = counts.map((n, i) => (n === min ? i : -1)).filter((i) => i >= 0);
        const target = choices[Math.floor(rand() * choices.length)];
        q = placeAnswer(q, target);
        counts[target]++;
      }
      const existing = bank.find((b) => b.id === q.id);
      const keepId = batch.recheck && existing;
      const qid = keepId ? q.id : nextQid(q.task, bank, published);
      const out = { ...q, id: qid, status: 'verified', last_checked: today(), created: keepId ? existing.created : q.created ?? today() };
      writeJSON(paths.bank(q.task, `${qid}.json`), out);
      published.push(out);
    }
    setResult(id, 'C4_gate', 'pass');
    emit({ ok: true, summary: `${published.length} 問を bank に入れた → loop advance --result pass`, items: published.map((q) => q.id) });
  },

  find(args) {
    let qs = loadBank();
    if (args.id) qs = qs.filter((q) => q.id === args.id);
    if (args.task) qs = qs.filter((q) => q.task === args.task || q.task.startsWith(`${args.task}.`));
    if (args.service) qs = qs.filter((q) => q.services.some((s) => normalize(s).includes(normalize(args.service))));
    if (args.text) qs = qs.filter((q) => normalize(q.stem).includes(normalize(args.text)));
    emit({ ok: true, summary: `${qs.length} 問`, items: qs.map((q) => ({ id: q.id, task: q.task, services: q.services, stem: q.stem.slice(0, 90) })) });
  },

  coverage() {
    const c = bankCoverage();
    const rows = [...c.rows].sort((a, b) => b.deficit - a.deficit);
    emit({ ok: true, summary: `${c.total} / ${c.target} 問。不足の大きい順`, items: rows.map((r) => `${r.key}: ${r.have}/${r.target}（不足 ${r.deficit}）`) });
  },

  dedupe(args) {
    const id = itemIdOf(args._[0]);
    const bank = loadBank();
    const items = [];
    const batch = loadBatch(id);
    for (const q of batch.questions) {
      const g = ngrams(questionText(q));
      for (const b of bank) {
        if (batch.recheck && b.id === q.id) continue;
        const s = jaccard(g, ngrams(questionText(b)));
        if (s >= DUP_WARN) items.push({ qid: q.id, similar: b.id, score: Number(s.toFixed(2)) });
      }
    }
    items.sort((a, b) => b.score - a.score);
    emit({ ok: !items.some((i) => i.score >= DUP_FAIL), summary: `似ている組 ${items.length}（${DUP_FAIL} 以上で落ちる）`, items });
  },

  stats() {
    const bank = loadBank();
    const counts = positionCounts(bank);
    const singles = counts.reduce((a, b) => a + b, 0) || 1;
    const byDomain = {};
    for (const q of bank) byDomain[q.task.split('.')[0]] = (byDomain[q.task.split('.')[0]] ?? 0) + 1;
    const off = counts.map((n, i) => ({ pos: KEYS[i], share: n / singles })).filter((x) => bank.length >= 20 && (x.share < 0.15 || x.share > 0.35));
    emit({
      ok: !off.length,
      summary: `${bank.length} 問。正解の位置 ${counts.map((n, i) => `${KEYS[i]}:${Math.round((n / singles) * 100)}%`).join(' ')}`,
      items: off.map((x) => `${x.pos} が ${Math.round(x.share * 100)}%（15〜35% の外）`),
      extra: { by_domain: byDomain, multi: bank.filter((q) => q.type === 'multi').length, low_confidence: bank.filter((q) => q.low_confidence).length },
    });
  },

  // 人が読むための書き出し（Markdown）。AI は読まない
  export(args) {
    let qs = loadBank();
    if (typeof args.task === 'string') qs = qs.filter((q) => q.task === args.task || q.task.startsWith(`${args.task}.`));
    if (typeof args.ids === 'string') { const ids = args.ids.split(','); qs = qs.filter((q) => ids.includes(q.id)); }
    if (typeof args.out !== 'string') throw new ToolError('--out <file.md> が要る');
    const md = qs.map((q) => [
      `## ${q.id}（${q.type === 'multi' ? `${q.select_count} つ選ぶ` : '1 つ選ぶ'}${q.low_confidence ? '・AI の確信が低い' : ''}）`,
      '', q.stem, '', ...q.choices.map((c) => `- **${c.key}.** ${c.text}`), '',
      '<details><summary>答えと解説</summary>', '',
      `**答え: ${q.answer.join(', ')}**`, '', q.explanation.summary, '',
      ...q.choices.map((c) => `- ${c.key}: ${q.explanation.per_choice[c.key]}`), '',
      ...q.references.map((r) => `> ${r.quote}\n>\n> — ${r.url}`), '', '</details>', '',
    ].join('\n')).join('\n');
    fs.writeFileSync(args.out, `# 問題（${qs.length} 問）\n\n${md}`);
    emit({ ok: true, summary: `${qs.length} 問を ${args.out} に書いた` });
  },

  linkcheck() {
    const bank = loadBank();
    const fails = linkFailures(bank);
    const details = fails.length ? writeReport('linkcheck.txt', fails.map((f) => `${f.code}\t${f.url}\t${f.qids.join(',')}`).join('\n') + '\n') : undefined;
    emit({ ok: !fails.length, summary: fails.length ? `${fails.length} 個の URL が開けない` : '全部開けた', items: fails.map((f) => `${f.code} ${f.url}（${f.qids.length} 問）`), details_path: details });
  },
};

function nextQid(task, bank, published) {
  const prefix = `q-${task}-`;
  const nums = [...bank, ...published].filter((q) => q.id.startsWith(prefix)).map((q) => Number(q.id.slice(prefix.length)));
  return `${prefix}${String(Math.max(0, ...nums) + 1).padStart(4, '0')}`;
}

if (import.meta.url === `file://${process.argv[1]}`) main(commands);
export { commands };
