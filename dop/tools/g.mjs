#!/usr/bin/env node
// サービス事典のツール（P-014）: validate / verdict / gate / publish / list
// 事典の項目（G-）の束は work/<ID>/glossary.json に { "item": "<ID>", "entries": [ … ] } の形で置く。
// 1 ページは schemas/glossary.schema.json。出来上がりは glossary/services/<id>.json（問題の services から名前で引く）。
import fs from 'node:fs';
import { paths, readJSON, writeJSON, emit, main, ToolError, today, setResult, writeReport } from './lib/io.mjs';
import { itemIdOf as idOf, requireState, failToFeedback as toFeedback, referenceErrors, concludeBatch } from './lib/step.mjs';
import { validate as validateSchema } from './lib/schema.mjs';
import { parseSources } from './lib/text.mjs';

const SEVERE = new Set(['fact', 'unsupported', 'deprecated']);
const MILD = new Set(['unclear', 'style']);

const itemIdOf = (arg) => idOf(arg, { prefix: 'G', message: '事典の項目 ID（例 G-0001）を渡す' });

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
    referenceErrors(e.references, sources, add, id);
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

const failToFeedback = (id, step, fails) => toFeedback(id, step, fails, { idField: 'id', key: 'entries' });

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
    concludeBatch({ id, batch: loadBatch(id), batchFile: 'glossary.json', key: 'entries', histFile: 'ghistory.json', severe: SEVERE, mild: MILD, keepDropped: true });
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
