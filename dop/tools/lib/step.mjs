// 工程の共通の処理（F-0004 で q・g・dg からまとめた）: 項目 ID・工程の確認・直しの指示・検証の判定・出典の照合・束の結論。
import fs from 'node:fs';
import crypto from 'node:crypto';
import { paths, readJSON, writeJSON, appendLine, emit, ToolError, ITEM_ID, setResult } from './io.mjs';
import { normalize } from './text.mjs';

/** 引数から項目 ID を取る。prefix（例 'G'）を渡すとその種類だけ */
export function itemIdOf(arg, { prefix, message } = {}) {
  const pattern = prefix ? new RegExp(`${prefix}-[0-9]{4}`) : /[A-Z]-[0-9]{4}/;
  const id = typeof arg === 'string' ? (arg.match(pattern)?.[0] ?? arg) : null;
  if (!id || !ITEM_ID.test(id) || (prefix && !id.startsWith(`${prefix}-`))) throw new ToolError(message ?? '項目 ID を渡す');
  return id;
}

// bank や束を書き換えるコマンドは、ループがその工程にいる時だけ動かす
export function requireState(id, state) {
  const s = readJSON(paths.state(), { state: 'S0_pick', item: null });
  if (s.state !== state || s.item !== id) throw new ToolError(`この操作は ${id} が ${state} の時だけ（今は ${s.state}${s.item ? ` / ${s.item}` : ''}）`);
}

/** 関門で落ちた所を、C2 に戻す直しの指示（feedback.json）と記録にする。idField: fails の中の ID の名前、key: feedback の鍵 */
export function failToFeedback(id, step, fails, { idField = 'id', key }) {
  const by = {};
  for (const f of fails) (by[f[idField] ?? '(束)'] ??= []).push({ kind: f.check, detail: f.message });
  writeJSON(paths.work(id, 'feedback.json'), { from: step, [key]: by });
  appendLine(paths.work(id, 'history.jsonl'), { step, kinds: [...new Set(fails.map((f) => f.check))] });
}

/**
 * 検証役の判定（said）と指摘（issues）から、1 つの結論を出す。
 * severe: 重い指摘の種類、mild: 言い回しの指摘の種類、extraSevere: 呼ぶ側の重い理由（q の答えの外れ）。
 * emptyFixSevere: 検証役が fix と言い指摘が 0 件の時に重いとみなすか（P-017 で q・g・dg とも true）。
 * hist（id → 重い fix の回数）を進め、2 回目の重い fix は drop。{ verdict, severe, counted }
 */
export function judge({ id, issues, said, severe: SEVERE, mild: MILD, hist, extraSevere = false, emptyFixSevere = true }) {
  // P-021: ok と言いながら重い指摘を書いた verify.json は、どちらが本当か分からない。判定せずに検証役へ戻す
  const contradict = said === 'ok' ? issues.filter((i) => SEVERE.has(i.kind)) : [];
  if (contradict.length) throw new ToolError(`verify.json が食い違っている: ${id} は verdict が ok なのに重い指摘（${[...new Set(contradict.map((i) => i.kind))].join('・')}）がある。検証役に、ok なら指摘を軽い物だけに、重いなら fix に直してもらう`);
  const mildOnly = issues.length > 0 && issues.every((i) => MILD.has(i.kind));
  const lightFix = mildOnly || (issues.length === 0 && !emptyFixSevere);
  const severe = extraSevere || issues.some((i) => SEVERE.has(i.kind)) || (said === 'fix' && !lightFix);
  const mild = issues.some((i) => MILD.has(i.kind));
  // P-005: 検証役が ok にした言い回しの指摘は記録だけ（戻さない）
  let verdict = severe || (mild && said === 'fix') ? 'fix' : 'ok';
  if (said === 'drop') verdict = 'drop';
  let counted = false;
  if (verdict === 'fix' && severe) {
    hist[id] = (hist[id] ?? 0) + 1;
    if (hist[id] >= 2) verdict = 'drop';
    else counted = true;
  }
  return { verdict, severe, counted };
}

/** references の url と原文（quote）を sources.md と照らす。add(pointer, message) で誤りを足す */
export function referenceErrors(refs, sources, add, id) {
  (refs ?? []).forEach((r, j) => {
    if (!sources) { add(`/references/${j}`, `work/${id}/sources.md が無い`); return; }
    const s = sources.find((x) => x.id === r.source_id);
    if (!s) { add(`/references/${j}/source_id`, `${r.source_id} が sources.md に無い`); return; }
    if (s.url && r.url && r.url.split('#')[0] !== s.url.split('#')[0]) add(`/references/${j}/url`, `${r.source_id} の url と違う`);
    if (typeof r.quote === 'string' && !normalize(s.quote).includes(normalize(r.quote).replace(/^\.\.\.|\.\.\.$/g, '').trim())) {
      add(`/references/${j}/quote`, `quote が ${r.source_id} の原文に無い（写すときは原文のまま）`);
    }
  });
}

/**
 * P-019: 同じ verify.json に 2 回目の verdict を呼んでも、重い fix を数え直さない。
 * 前の verdict.json に控えた verify.json の中身と同じなら、前の結論をそのまま返す（null なら初めて）。
 */
export function sameVerdict(id) {
  const vfile = paths.work(id, 'verify.json');
  const dfile = paths.work(id, 'verdict.json');
  const raw = readRaw(vfile);
  const prev = readJSON(dfile, null);
  if (raw === null || !prev?.result || prev.verify_hash !== hashOf(raw)) return null;
  // 次の回で検証役が同じ中身を書き直した時（同じ指摘がもう一度出た）は数える。verdict の後に書かれていないかを時刻で見る
  return fs.statSync(vfile).mtimeMs <= fs.statSync(dfile).mtimeMs ? prev : null;
}
/** P-019: 同じ verify.json での 2 回目なら前の結論をそのまま出して true（呼ぶ側はそこで終える） */
export function emitSameVerdict(id) {
  const again = sameVerdict(id);
  if (again) emit({ ok: true, summary: `前と同じ verify.json なので前の結論のまま（${again.result}）→ loop advance --result ${again.result}`, extra: { result: again.result } });
  return Boolean(again);
}
export const verifyHash = (id) => hashOf(readRaw(paths.work(id, 'verify.json')) ?? '');
function readRaw(file) { try { return fs.readFileSync(file, 'utf8'); } catch { return null; } }
function hashOf(text) { return crypto.createHash('sha256').update(text).digest('hex').slice(0, 16); }

/**
 * 事典（g）・図（dg）の C3: verify.json の判定から束の結論を出して書き出す。
 * batchFile: 束のファイル名、key: 束の中の一覧の鍵（entries / diagrams）、histFile: 重い fix の回数のファイル、keepDropped: 捨てた物を dropped.json に残すか
 */
export function concludeBatch({ id, batch, batchFile, key, histFile, severe, mild, keepDropped = false }) {
  if (emitSameVerdict(id)) return;
  const v = readJSON(paths.work(id, 'verify.json'), null);
  if (!v || !Array.isArray(v[key])) throw new ToolError(`work/${id}/verify.json が無い（検証役が書く）`);
  const hist = readJSON(paths.work(id, histFile), {});
  const results = {};
  const feedback = {};
  const kinds = new Set();
  let anyCounted = false;
  for (const x of batch[key]) {
    const said = v[key].find((y) => y.id === x.id);
    if (!said) throw new ToolError(`verify.json に ${x.id} が無い`);
    const issues = Array.isArray(said.issues) ? said.issues : [];
    issues.forEach((i) => kinds.add(i.kind));
    const j = judge({ id: x.id, issues, said: said.verdict, severe, mild, hist });
    if (j.counted) anyCounted = true;
    results[x.id] = j.verdict;
    if (j.verdict === 'fix') feedback[x.id] = issues;
  }
  const kept = batch[key].filter((x) => results[x.id] !== 'drop');
  const dropped = batch[key].filter((x) => results[x.id] === 'drop');
  if (keepDropped && dropped.length) writeJSON(paths.work(id, 'dropped.json'), [...readJSON(paths.work(id, 'dropped.json'), []), ...dropped]);
  writeJSON(paths.work(id, histFile), hist);
  writeJSON(paths.work(id, batchFile), { ...batch, [key]: kept });
  const result = !kept.length ? 'drop' : Object.keys(feedback).length ? 'fix' : 'pass';
  if (result === 'fix') writeJSON(paths.work(id, 'feedback.json'), { from: 'C3_verify', [key]: feedback });
  writeJSON(paths.work(id, 'verdict.json'), { [key]: results, result, verify_hash: verifyHash(id) });
  appendLine(paths.work(id, 'history.jsonl'), { step: 'C3_verify', result, kinds: [...kinds] });
  setResult(id, 'C3_verify', result, { count: anyCounted });
  const n = (k) => Object.values(results).filter((r) => r === k).length;
  emit({ ok: true, summary: `ok ${n('ok')} / fix ${n('fix')} / drop ${n('drop')} → loop advance --result ${result}`, extra: { result } });
}
