#!/usr/bin/env node
// 問題のツール: validate / blind / reveal / verdict / gate / publish / find / coverage / dedupe / stats / linkcheck
// 束は work/<ID>/questions.json に { "item": "<ID>", "questions": [ … ] } の形で置く。
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { paths, readJSON, writeJSON, appendLine, emit, main, ToolError, today, ITEM_ID, rel, seeded, setResult, writeReport } from './lib/io.mjs';
import { validate as validateSchema } from './lib/schema.mjs';
import { normalize, ngrams, jaccard, questionText, parseSources, words } from './lib/text.mjs';
import { loadBank, coverage as bankCoverage, exam, taskIds, serviceStatus } from './lib/bank.mjs';

const KEYS = ['A', 'B', 'C', 'D', 'E', 'F'];
const QUALIFIER = /\b(MOST|LEAST)\b|\(Choose (TWO|THREE)\.?\)|\bBEST\b/;
const BANNED = /\b(all|none) of the above\b/i;
// これが issues にあれば直す（attempts を数える）。style・giveaway は直すが数えない。
const SEVERE = new Set(['fact', 'ambiguous', 'two_correct', 'no_correct', 'unsupported', 'deprecated']);
const MILD = new Set(['style', 'giveaway']);
const DUP_FAIL = 0.6;
const DUP_WARN = 0.4;

function itemIdOf(arg) {
  const id = typeof arg === 'string' ? (arg.match(/[CALR]-[0-9]{4}/)?.[0] ?? arg) : null;
  if (!id || !ITEM_ID.test(id)) throw new ToolError('項目 ID（例 C-0012）か work/<ID>/questions.json を渡す');
  return id;
}

// bank や束を書き換えるコマンドは、ループがその工程にいる時だけ動かす
function requireState(id, state) {
  const s = readJSON(paths.state(), { state: 'S0_pick', item: null });
  if (s.state !== state || s.item !== id) throw new ToolError(`この操作は ${id} が ${state} の時だけ（今は ${s.state}${s.item ? ` / ${s.item}` : ''}）`);
}

function loadBatch(id) {
  const b = readJSON(paths.work(id, 'questions.json'));
  if (!b || !Array.isArray(b.questions)) throw new ToolError(`work/${id}/questions.json は { "item", "questions": [ … ] } の形にする`);
  return b;
}

function loadSources(id) {
  const file = paths.work(id, 'sources.md');
  return fs.existsSync(file) ? parseSources(fs.readFileSync(file, 'utf8')) : null;
}

// ---- validate -------------------------------------------------------------

/** 1 束の形の誤り。[{ qid, pointer, message }] */
export function checkBatch(id, batch = loadBatch(id)) {
  const schema = readJSON(paths.schema('question.schema.json'));
  const tasks = taskIds();
  const sources = loadSources(id);
  const item = readJSON(paths.work(id, 'item.json'), null);
  const errors = [];
  const seen = new Set();
  if (!batch.questions.length) errors.push({ qid: null, pointer: '/questions', message: '問題が 0 問' });
  if (item?.count && !batch.recheck && batch.questions.length > item.count) {
    errors.push({ qid: null, pointer: '/questions', message: `問題が ${item.count} 問を超える（${batch.questions.length}）` });
  }
  batch.questions.forEach((q, i) => {
    const qid = q?.id ?? `#${i}`;
    const add = (pointer, message) => errors.push({ qid, pointer: `/questions/${i}${pointer}`, message });
    for (const e of validateSchema(schema, q)) add(e.pointer === '/' ? '' : e.pointer, e.message);
    if (!q || typeof q !== 'object' || !Array.isArray(q.choices) || !Array.isArray(q.answer)) return;

    if (seen.has(q.id)) add('/id', '同じ id が束の中にある'); else seen.add(q.id);
    const keys = q.choices.map((c) => c.key);
    if (keys.join('') !== KEYS.slice(0, keys.length).join('')) add('/choices', `選択肢の key は A から順に（今は ${keys.join(',')}）`);
    for (const a of q.answer) if (!keys.includes(a)) add('/answer', `答え ${a} が選択肢に無い`);
    if (q.answer.length !== q.select_count) add('/answer', `答えの数 ${q.answer.length} が select_count ${q.select_count} と違う`);
    if (q.type === 'single' && q.select_count !== 1) add('/select_count', 'single は select_count 1');
    if (q.type === 'multi' && q.select_count < 2) add('/select_count', 'multi は select_count 2 以上');
    if (q.type === 'multi' && q.choices.length < 5) add('/choices', 'multi は選択肢 5〜6');
    if (q.type === 'single' && q.choices.length !== 4) add('/choices', 'single は選択肢 4');
    const pc = Object.keys(q.explanation?.per_choice ?? {}).sort().join(',');
    if (pc !== [...keys].sort().join(',')) add('/explanation/per_choice', `全ての選択肢の解説が要る（あるのは ${pc || 'なし'}）`);
    if (tasks.length && !tasks.includes(q.task)) add('/task', `タスク番号 ${q.task} が config/exam.json に無い`);
    if (typeof q.stem === 'string' && !QUALIFIER.test(q.stem)) add('/stem', '条件の語（MOST / LEAST / BEST / Choose TWO）が無い');
    if (q.type === 'multi' && typeof q.stem === 'string' && !/\(Choose (TWO|THREE)\.?\)/.test(q.stem)) add('/stem', 'multi は問題文に (Choose TWO.) か (Choose THREE.) を入れる');

    // 出典: sources.md の S 番号と原文
    (q.references ?? []).forEach((r, j) => {
      if (!sources) { add(`/references/${j}`, `work/${id}/sources.md が無い`); return; }
      const s = sources.find((x) => x.id === r.source_id);
      if (!s) { add(`/references/${j}/source_id`, `${r.source_id} が sources.md に無い`); return; }
      if (s.url && r.url && r.url.split('#')[0] !== s.url.split('#')[0]) add(`/references/${j}/url`, `${r.source_id} の url と違う`);
      if (typeof r.quote === 'string' && !normalize(s.quote).includes(normalize(r.quote).replace(/^\.\.\.|\.\.\.$/g, '').trim())) {
        add(`/references/${j}/quote`, `quote が ${r.source_id} の原文に無い（写すときは原文のまま）`);
      }
    });
  });
  return errors;
}

// ---- gate -----------------------------------------------------------------

/** C4 の検査（loop/steps/C4-gate.md）。[{ check, qid, message }] */
export function gateBatch(id, opts = {}) {
  const batch = loadBatch(id);
  const fails = checkBatch(id, batch).map((e) => ({ check: 'schema', qid: e.qid, message: `${e.pointer} ${e.message}` }));

  // verified: 検証の後に問題を書き換えていないこと
  const vfile = paths.work(id, 'verdict.json');
  const verdicts = readJSON(vfile, null);
  const qfile = paths.work(id, 'questions.json');
  for (const q of batch.questions) {
    const v = verdicts?.questions?.[q.id];
    if (v !== 'ok') fails.push({ check: 'verified', qid: q.id, message: `検証の結果が ok でない（${v ?? 'なし'}）` });
  }
  if (verdicts && fs.statSync(qfile).mtimeMs > fs.statSync(vfile).mtimeMs + 1) {
    fails.push({ check: 'verified', qid: null, message: '検証（q verdict）の後に questions.json を書き換えた。C3 からやり直す' });
  }

  // dedupe: bank と、束の中どうし
  const bank = loadBank();
  for (const [i, q] of batch.questions.entries()) {
    if (!Array.isArray(q.choices)) continue;
    const g = ngrams(questionText(q));
    for (const b of bank) {
      if (batch.recheck && b.id === q.id) continue; // 解き直し（recheck）の時の自分
      const s = jaccard(g, ngrams(questionText(b)));
      if (s >= DUP_FAIL) fails.push({ check: 'dedupe', qid: q.id, message: `bank の ${b.id} と似すぎ（${s.toFixed(2)}）` });
    }
    for (const o of batch.questions.slice(i + 1)) {
      if (!Array.isArray(o.choices)) continue;
      const s = jaccard(g, ngrams(questionText(o)));
      if (s >= DUP_FAIL) fails.push({ check: 'dedupe', qid: q.id, message: `束の ${o.id} と似すぎ（${s.toFixed(2)}）` });
    }

    // len_bias: 正解が他の平均の 1.5 倍より長くない
    const len = (c) => words(c.text).length;
    const right = q.choices.filter((c) => q.answer.includes(c.key));
    const wrong = q.choices.filter((c) => !q.answer.includes(c.key));
    const avgWrong = wrong.reduce((n, c) => n + len(c), 0) / Math.max(1, wrong.length);
    for (const c of right) {
      if (len(c) > avgWrong * 1.5) fails.push({ check: 'len_bias', qid: q.id, message: `正解 ${c.key} が長すぎる（${len(c)} 語、他の平均 ${avgWrong.toFixed(0)} 語）` });
    }

    // banned
    for (const c of q.choices) if (BANNED.test(c.text)) fails.push({ check: 'banned', qid: q.id, message: `選択肢 ${c.key} に All/None of the above` });

    // status: 廃止・新規受付停止のサービスを正解にしない（人が確かめた verified の物だけで判定する）
    for (const svc of serviceStatus().services.filter((s) => s.verified && ['retired', 'closed_to_new'].includes(s.status))) {
      const name = svc.name.replace(/^(AWS|Amazon)\s+/, '');
      const re = new RegExp(`\\b${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      for (const c of right) if (re.test(c.text)) fails.push({ check: 'status', qid: q.id, message: `正解 ${c.key} に ${svc.name}（${svc.status}）` });
    }
  }

  if (opts.net) for (const f of linkFailures(batch.questions)) fails.push({ check: 'refs', qid: f.qids.join(','), message: `${f.url} → ${f.code}` });
  return fails;
}

function linkFailures(questions) {
  const urls = new Map();
  for (const q of questions) for (const r of q.references ?? []) {
    const u = r.url.split('#')[0];
    if (!urls.has(u)) urls.set(u, []);
    urls.get(u).push(q.id);
  }
  const out = [];
  for (const [url, qids] of urls) {
    let code;
    try {
      code = execFileSync('curl', ['-sS', '-o', '/dev/null', '-L', '--max-time', '20', '-w', '%{http_code}', url], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
    } catch (e) {
      code = `通信の失敗: ${String(e.stderr ?? e.message).split('\n')[0]}`;
    }
    if (code !== '200') out.push({ url, code, qids });
  }
  return out;
}

function failToFeedback(id, step, fails) {
  const byQ = {};
  for (const f of fails) (byQ[f.qid ?? '(束)'] ??= []).push({ kind: f.check, detail: f.message });
  writeJSON(paths.work(id, 'feedback.json'), { from: step, questions: byQ });
  appendLine(paths.work(id, 'history.jsonl'), { step, kinds: [...new Set(fails.map((f) => f.check))] });
}

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
    const qs = loadBatch(id).questions.map(({ id: qid, task, services, type, select_count, stem, choices }) => ({ id: qid, task, services, type, select_count, stem, choices }));
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
    writeJSON(file, { item: id, questions: batch.questions.map((q) => ({ id: q.id, answer: q.answer, explanation: q.explanation, references: q.references })) });
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
      let verdict = 'ok';
      const mildOnly = issues.length > 0 && issues.every((i) => MILD.has(i.kind));
      const severe = !match || issues.some((i) => SEVERE.has(i.kind)) || (e.verdict === 'fix' && !mildOnly);
      const mild = issues.some((i) => MILD.has(i.kind));
      // P-005: 検証役が ok にした問題の言い回しの指摘は記録だけ（戻さない）
      if (severe || (mild && e.verdict === 'fix')) verdict = 'fix';
      if (e.verdict === 'drop') verdict = 'drop';
      if (verdict === 'fix' && severe) {
        qhist[q.id] = (qhist[q.id] ?? 0) + 1;
        if (qhist[q.id] >= 2) verdict = 'drop';
        else anyCounted = true;
      }
      if (!match) kinds.add('blind_mismatch');
      results[q.id] = verdict;
      if (verdict === 'fix') feedback[q.id] = { blind: e.blind, match, issues };
      if (verdict === 'drop') dropped.push(q);
      if (verdict === 'ok' && match && e.blind.confidence === 'low') q.low_confidence = true;
    }
    const kept = batch.questions.filter((q) => results[q.id] !== 'drop');
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
      if (q.type === 'single') {
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
