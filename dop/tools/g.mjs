#!/usr/bin/env node
// サービス事典のツール（P-014）: validate / verdict / gate / publish / list
// 事典の項目（G-）の束は work/<ID>/glossary.json に { "item": "<ID>", "entries": [ … ] } の形で置く。
// 1 ページは schemas/glossary.schema.json。出来上がりは glossary/services/<id>.json（問題の services から名前で引く）。
import fs from 'node:fs';
import { paths, readJSON, writeJSON, appendLine, emit, main, ToolError, today, ITEM_ID, setResult, writeReport } from './lib/io.mjs';
import { validate as validateSchema } from './lib/schema.mjs';
import { normalize, parseSources } from './lib/text.mjs';

const SEVERE = new Set(['fact', 'unsupported', 'deprecated']);
const MILD = new Set(['unclear', 'style']);

function itemIdOf(arg) {
  const id = typeof arg === 'string' ? (arg.match(/G-[0-9]{4}/)?.[0] ?? arg) : null;
  if (!id || !ITEM_ID.test(id) || !id.startsWith('G-')) throw new ToolError('事典の項目 ID（例 G-0001）を渡す');
  return id;
}

function requireState(id, state) {
  const s = readJSON(paths.state(), { state: 'S0_pick', item: null });
  if (s.state !== state || s.item !== id) throw new ToolError(`この操作は ${id} が ${state} の時だけ（今は ${s.state}${s.item ? ` / ${s.item}` : ''}）`);
}

function loadBatch(id) {
  const b = readJSON(paths.work(id, 'glossary.json'), null);
  if (!b || !Array.isArray(b.entries)) throw new ToolError(`work/${id}/glossary.json は { "item", "entries": [ … ] } の形にする`);
  return b;
}

/** 今ある事典のページ（verified の物） */
export function loadGlossary() {
  const dir = paths.glossary('services');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.json')).sort().map((f) => readJSON(`${dir}/${f}`)).filter((e) => e?.status === 'verified');
}

/** 束の形と根拠の誤り。[{ id, pointer, message }] */
export function checkGlossary(id, batch = loadBatch(id)) {
  const schema = readJSON(paths.schema('glossary.schema.json'));
  const item = readJSON(paths.work(id, 'item.json'), {});
  const srcFile = paths.work(id, 'sources.md');
  const sources = fs.existsSync(srcFile) ? parseSources(fs.readFileSync(srcFile, 'utf8')) : null;
  const errors = [];
  if (!batch.entries.length) errors.push({ id: null, pointer: '/entries', message: '0 ページ' });
  const seen = new Set();
  const covered = new Set();
  batch.entries.forEach((e, i) => {
    const eid = e?.id ?? `#${i}`;
    const add = (pointer, message) => errors.push({ id: eid, pointer: `/entries/${i}${pointer}`, message });
    for (const x of validateSchema(schema, e)) add(x.pointer === '/' ? '' : x.pointer, x.message);
    if (!e || typeof e !== 'object') return;
    if (seen.has(e.id)) add('/id', '同じ id が束の中にある'); else seen.add(e.id);
    for (const a of e.aliases ?? []) covered.add(a);
    if (Array.isArray(e.aliases) && !e.aliases.includes(e.name)) add('/aliases', 'aliases に name も入れる');
    if (typeof e.summary === 'string' && !/[぀-ヿ一-鿿]/.test(e.summary)) add('/summary', 'summary は日本語');
    const refIds = new Set((e.references ?? []).map((r) => r.source_id));
    const used = [...(e.features ?? []), ...(e.exam_points ?? []), ...(e.compare ?? [])].map((x) => x?.source_id).filter(Boolean);
    for (const s of used) if (!refIds.has(s)) add('/references', `${s} を根拠に使っているが references に無い`);
    (e.references ?? []).forEach((r, j) => {
      if (!sources) { add(`/references/${j}`, `work/${id}/sources.md が無い`); return; }
      const s = sources.find((x) => x.id === r.source_id);
      if (!s) { add(`/references/${j}/source_id`, `${r.source_id} が sources.md に無い`); return; }
      if (s.url && r.url && r.url.split('#')[0] !== s.url.split('#')[0]) add(`/references/${j}/url`, `${r.source_id} の url と違う`);
      if (typeof r.quote === 'string' && !normalize(s.quote).includes(normalize(r.quote).replace(/^\.\.\.|\.\.\.$/g, '').trim())) {
        add(`/references/${j}/quote`, `quote が ${r.source_id} の原文に無い（写すときは原文のまま）`);
      }
    });
  });
  const missing = (item.services ?? []).filter((s) => !covered.has(s));
  if (missing.length) errors.push({ id: null, pointer: '/entries', message: `項目のサービスにページが無い: ${missing.join(', ')}（aliases に入れる）` });
  return errors;
}

/** C4 の検査 */
export function gateGlossary(id) {
  const batch = loadBatch(id);
  const fails = checkGlossary(id, batch).map((e) => ({ check: 'schema', id: e.id, message: `${e.pointer} ${e.message}` }));
  const vfile = paths.work(id, 'verdict.json');
  const verdicts = readJSON(vfile, null);
  for (const e of batch.entries) {
    if (verdicts?.entries?.[e.id] !== 'ok') fails.push({ check: 'verified', id: e.id, message: `検証の結果が ok でない（${verdicts?.entries?.[e.id] ?? 'なし'}）` });
  }
  if (verdicts && fs.statSync(paths.work(id, 'glossary.json')).mtimeMs > fs.statSync(vfile).mtimeMs + 1) {
    fails.push({ check: 'verified', id: null, message: '検証（g verdict）の後に glossary.json を書き換えた。C3 からやり直す' });
  }
  const existing = loadGlossary();
  for (const e of batch.entries) {
    for (const a of e.aliases ?? []) {
      const other = existing.find((x) => x.id !== e.id && x.aliases.includes(a));
      if (other) fails.push({ check: 'alias', id: e.id, message: `「${a}」は事典の ${other.id} にもある（1 つの名前は 1 ページ）` });
    }
  }
  return fails;
}

function failToFeedback(id, step, fails) {
  const byE = {};
  for (const f of fails) (byE[f.id ?? '(束)'] ??= []).push({ kind: f.check, detail: f.message });
  writeJSON(paths.work(id, 'feedback.json'), { from: step, entries: byE });
  appendLine(paths.work(id, 'history.jsonl'), { step, kinds: [...new Set(fails.map((f) => f.check))] });
}

const commands = {
  validate(args) {
    const id = itemIdOf(args._[0]);
    const errors = checkGlossary(id);
    const details = errors.length ? writeReport(`${id}/validate.txt`, errors.map((e) => `${e.id}\t${e.pointer}\t${e.message}`).join('\n') + '\n') : undefined;
    if (!errors.length) setResult(id, 'C2_author', 'ok');
    emit({
      ok: !errors.length,
      summary: errors.length ? `形・根拠の誤りが ${errors.length} 件` : `${loadBatch(id).entries.length} ページとも形は正しい`,
      items: errors.map((e) => `${e.id} ${e.pointer}: ${e.message}`),
      details_path: details,
      repeatKey: `gvalidate:${id}`,
    });
  },

  // C3: 検証役の verify.json { entries: [{ id, issues: [{ kind, where, detail }], verdict }] } から結論を出す
  verdict(args) {
    const id = itemIdOf(args._[0]);
    requireState(id, 'C3_verify');
    const batch = loadBatch(id);
    const v = readJSON(paths.work(id, 'verify.json'), null);
    if (!v || !Array.isArray(v.entries)) throw new ToolError(`work/${id}/verify.json が無い（検証役が書く）`);
    const hist = readJSON(paths.work(id, 'ghistory.json'), {});
    const results = {};
    const feedback = {};
    const kinds = new Set();
    let anyCounted = false;
    for (const e of batch.entries) {
      const x = v.entries.find((y) => y.id === e.id);
      if (!x) throw new ToolError(`verify.json に ${e.id} が無い`);
      const issues = Array.isArray(x.issues) ? x.issues : [];
      issues.forEach((i) => kinds.add(i.kind));
      const severe = issues.some((i) => SEVERE.has(i.kind)) || (x.verdict === 'fix' && !issues.every((i) => MILD.has(i.kind)));
      const mild = issues.some((i) => MILD.has(i.kind));
      let verdict = severe || (mild && x.verdict === 'fix') ? 'fix' : 'ok';
      if (x.verdict === 'drop') verdict = 'drop';
      if (verdict === 'fix' && severe) {
        hist[e.id] = (hist[e.id] ?? 0) + 1;
        if (hist[e.id] >= 2) verdict = 'drop'; else anyCounted = true;
      }
      results[e.id] = verdict;
      if (verdict === 'fix') feedback[e.id] = issues;
    }
    const kept = batch.entries.filter((e) => results[e.id] !== 'drop');
    const dropped = batch.entries.filter((e) => results[e.id] === 'drop');
    if (dropped.length) writeJSON(paths.work(id, 'dropped.json'), [...readJSON(paths.work(id, 'dropped.json'), []), ...dropped]);
    writeJSON(paths.work(id, 'ghistory.json'), hist);
    writeJSON(paths.work(id, 'glossary.json'), { ...batch, entries: kept });
    const result = !kept.length ? 'drop' : Object.values(feedback).length ? 'fix' : 'pass';
    if (result === 'fix') writeJSON(paths.work(id, 'feedback.json'), { from: 'C3_verify', entries: feedback });
    writeJSON(paths.work(id, 'verdict.json'), { entries: results });
    appendLine(paths.work(id, 'history.jsonl'), { step: 'C3_verify', result, kinds: [...kinds] });
    setResult(id, 'C3_verify', result, { count: anyCounted });
    const n = (k) => Object.values(results).filter((r) => r === k).length;
    emit({ ok: true, summary: `ok ${n('ok')} / fix ${n('fix')} / drop ${n('drop')} → loop advance --result ${result}`, extra: { result } });
  },

  gate(args) {
    const id = itemIdOf(args._[0]);
    const fails = gateGlossary(id);
    if (fails.length) { failToFeedback(id, 'C4_gate', fails); setResult(id, 'C4_gate', 'fail'); }
    emit({
      ok: !fails.length,
      summary: fails.length ? `${fails.length} 件の検査に落ちた → loop advance --result fail` : '全ての検査を通った → g publish',
      items: fails.map((f) => `${f.check} ${f.id ?? ''}: ${f.message}`),
      repeatKey: `ggate:${id}`,
    });
  },

  publish(args) {
    const id = itemIdOf(args._[0]);
    requireState(id, 'C4_gate');
    const fails = gateGlossary(id);
    if (fails.length) {
      failToFeedback(id, 'C4_gate', fails);
      setResult(id, 'C4_gate', 'fail');
      return emit({ ok: false, summary: `検査に落ちたので入れない（${fails.length} 件）→ loop advance --result fail`, items: fails.map((f) => `${f.check} ${f.id ?? ''}: ${f.message}`), repeatKey: `ggate:${id}` });
    }
    const out = [];
    for (const e of loadBatch(id).entries) {
      const file = paths.glossary('services', `${e.id}.json`);
      const prev = readJSON(file, null);
      writeJSON(file, { ...e, status: 'verified', created: prev?.created ?? e.created ?? today(), last_checked: today() });
      out.push(e.id);
    }
    setResult(id, 'C4_gate', 'pass');
    emit({ ok: true, summary: `${out.length} ページを事典に入れた → loop advance --result pass`, items: out });
  },

  list() {
    const g = loadGlossary();
    emit({ ok: true, summary: `事典 ${g.length} ページ`, items: g.map((e) => `${e.id}: ${e.aliases.join(' / ')}`) });
  },
};

if (import.meta.url === `file://${process.argv[1]}`) main(commands);
export { commands };
