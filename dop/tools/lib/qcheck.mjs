// 問題の束の検査（validate と gate の中身）。F-0002 で q.mjs から切り出した。
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { paths, readJSON, ToolError } from './io.mjs';
import { validate as validateSchema } from './schema.mjs';
import { ngrams, jaccard, questionText, parseSources, words } from './text.mjs';
import { jaErrors, changedBesidesJa } from './ja.mjs';
import { referenceErrors } from './step.mjs';
import { loadBank, taskIds, serviceStatus } from './bank.mjs';

const KEYS = ['A', 'B', 'C', 'D', 'E', 'F'];
const QUALIFIER = /\b(MOST|LEAST)\b|\(Choose (TWO|THREE)\.?\)|\bBEST\b/;
const BANNED = /\b(all|none) of the above\b/i;
export const DUP_FAIL = 0.6;
export const DUP_WARN = 0.4;

export function loadBatch(id) {
  const b = readJSON(paths.work(id, 'questions.json'));
  if (!b || !Array.isArray(b.questions)) throw new ToolError(`work/${id}/questions.json は { "item", "questions": [ … ] } の形にする`);
  return b;
}

export function loadSources(id) {
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
    // P-010: 関門（C4）でしか見ていなかった検査を書く時にも行う（検証を 1 往復むだにしないため）
    for (const m of lengthBias(q)) add('/choices', m);
    for (const c of q.choices) if (typeof c.text === 'string' && BANNED.test(c.text)) add('/choices', `選択肢 ${c.key} に All/None of the above`);
    if (q.type === 'multi' && typeof q.stem === 'string' && !/\(Choose (TWO|THREE)\.?\)/.test(q.stem)) add('/stem', 'multi は問題文に (Choose TWO.) か (Choose THREE.) を入れる');

    // P-012: 日本語版（本番を日本語で受けるため）
    for (const m of jaErrors(q)) add('/stem_ja', m);
    // 訳の束は日本語だけを足す。英語・答え・解説・出典は検証済みの bank のまま
    if (batch.translate) {
      const orig = readJSON(paths.bank(q.task, `${q.id}.json`), null);
      if (!orig) add('/id', `訳の元の ${q.id} が bank に無い`);
      else if (changedBesidesJa(q, orig)) add('', '訳の束では stem_ja と choices[].text_ja 以外を変えない');
      return;
    }

    // 出典: sources.md の S 番号と原文
    referenceErrors(q.references, sources, add, id);
  });
  return errors;
}

/** 正解の選択肢が、誤りの選択肢の平均の 1.5 倍より長い時の文 */
export function lengthBias(q) {
  const len = (c) => words(String(c.text ?? '')).length;
  const right = q.choices.filter((c) => q.answer.includes(c.key));
  const wrong = q.choices.filter((c) => !q.answer.includes(c.key));
  const avgWrong = wrong.reduce((n, c) => n + len(c), 0) / Math.max(1, wrong.length);
  return right.filter((c) => len(c) > avgWrong * 1.5).map((c) => `正解 ${c.key} が長すぎる（${len(c)} 語、他の平均 ${avgWrong.toFixed(0)} 語）。誤りの選択肢と同じくらいにする`);
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
    for (const m of lengthBias(q)) fails.push({ check: 'len_bias', qid: q.id, message: m });
    const right = q.choices.filter((c) => q.answer.includes(c.key));

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

export function linkFailures(questions) {
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
