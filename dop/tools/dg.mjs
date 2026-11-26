#!/usr/bin/env node
// 構成図のツール（P-015）: icons / validate / verdict / gate / publish
// 図の項目（D-）の束は work/<ID>/diagrams.json に { "item": "<ID>", "diagrams": [{ id: <問題 ID>, source, alt }] }。
// 問題の中身は work/<ID>/context.json（loop next が bank から写す。読むだけ）。
// 出来上がりは diagrams/<問題 ID>.json（図の元）と app/public/diagrams/<問題 ID>.svg（絵）。
import fs from 'node:fs';
import path from 'node:path';
import { CODE, paths, readJSON, writeJSON, emit, main, ToolError, today, setResult, writeReport } from './lib/io.mjs';
import { itemIdOf as idOf, requireState, failToFeedback as toFeedback, concludeBatch } from './lib/step.mjs';
import { iconMap, cleanIcon, renderAll } from './lib/diagram.mjs';

const SEVERE = new Set(['fact', 'unsupported', 'unreadable']);
const MILD = new Set(['unclear', 'style']);
const APP = process.env.DOP_APP ? path.resolve(process.env.DOP_APP) : path.join(CODE, 'app');

const itemIdOf = (arg) => idOf(arg, { prefix: 'D', message: '図の項目 ID（例 D-0001）を渡す' });

function loadBatch(id) {
  const b = readJSON(paths.work(id, 'diagrams.json'), null);
  if (!b || !Array.isArray(b.diagrams)) throw new ToolError(`work/${id}/diagrams.json は { "item", "diagrams": [ … ] } の形にする`);
  return b;
}

// P-022: 読めなくなりやすい書き方。幅は全角 1・半角 0.5 で数える
const LABEL_MAX = 20;
const TITLE_MAX = 14;
const width = (t) => [...t].reduce((n, c) => n + (c.charCodeAt(0) < 128 ? 0.5 : 1), 0);
const EDGE = /^\s*(\w+)\s*(?:(?:--|==|-\.)\s*"([^"]*)"\s*(?:-->|==>|\.->|---|\.-)|(?:<?-->|<?==>|-\.->|---|-\.-))\s*(\w+)/;

/** 線のラベルが長い・subgraph の題が長い・同じ 2 つの箱の間にラベル付きの線が 2 本以上、を返す（P-022） */
export function readability(source) {
  const out = [];
  const pairs = {};
  for (const line of source.split('\n')) {
    const e = line.match(EDGE);
    if (e) {
      const [, a, label, b] = e;
      if (label && width(label) > LABEL_MAX) out.push(`線のラベルが長い（${label}）。${LABEL_MAX} 字までにして、説明は箱のラベルへ`);
      if (label) { const k = [a, b].sort().join(' と '); pairs[k] = (pairs[k] ?? 0) + 1; }
    }
    const t = line.match(/^\s*subgraph\s+\w+\s*\["([^"]*)"\]/);
    if (t && width(t[1]) > TITLE_MAX) out.push(`subgraph の題が長い（${t[1]}）。${TITLE_MAX} 字までにするか、枠をやめて箱のラベルへ`);
  }
  for (const [k, n] of Object.entries(pairs)) if (n > 1) out.push(`${k} の間にラベル付きの線が ${n} 本（ラベルが重なる）。1 本にして、残りは箱のラベルへ`);
  return out;
}

/** 描かずに見られる誤り */
export function checkDiagrams(id, batch = loadBatch(id)) {
  const item = readJSON(paths.work(id, 'item.json'), {});
  const want = item.question_ids ?? [];
  const errors = [];
  const seen = new Set();
  batch.diagrams.forEach((d, i) => {
    const add = (message) => errors.push({ id: d?.id ?? `#${i}`, message });
    if (!d || typeof d !== 'object') return add('形が違う');
    if (!want.includes(d.id)) add(`項目の問題（${want.join(', ')}）に無い id`);
    if (seen.has(d.id)) add('同じ id が束の中にある'); else seen.add(d.id);
    if (typeof d.source !== 'string' || !/^\s*flowchart\s+(TB|TD|LR)\b/.test(d.source)) add('source は "flowchart TB" で始める（スマホの縦の画面に合わせて TB を勧める）');
    if (typeof d.source === 'string' && !/@\{\s*svc:/.test(d.source)) add('サービスの箱（X@{ svc: "…" }）が 1 つも無い');
    if (typeof d.alt !== 'string' || d.alt.length < 20 || !/[぀-ヿ一-鿿]/.test(d.alt)) add('alt（図の説明、日本語 20 字以上）が要る');
  });
  batch.diagrams.forEach((d) => { if (typeof d?.source === 'string') for (const m of readability(d.source)) errors.push({ id: d.id, message: m }); });
  const missing = want.filter((q) => !seen.has(q));
  if (missing.length) errors.push({ id: null, message: `図の無い問題: ${missing.join(', ')}` });
  return errors;
}

/** 描いて確かめる（preview に PNG を置く）。{ errors, results } */
async function renderBatch(id, batch) {
  const results = await renderAll(batch.diagrams.filter((d) => typeof d?.source === 'string').map((d) => ({ id: d.id, source: d.source })), { previewDir: paths.work(id, 'preview') });
  const errors = results.filter((r) => r.error).map((r) => ({ id: r.id, message: `描けない: ${r.error}` }));
  return { errors, results };
}

async function gateDiagrams(id) {
  const batch = loadBatch(id);
  const fails = checkDiagrams(id, batch).map((e) => ({ check: 'form', ...e }));
  const vfile = paths.work(id, 'verdict.json');
  const verdicts = readJSON(vfile, null);
  for (const d of batch.diagrams) {
    if (verdicts?.diagrams?.[d.id] !== 'ok') fails.push({ check: 'verified', id: d.id, message: `検証の結果が ok でない（${verdicts?.diagrams?.[d.id] ?? 'なし'}）` });
  }
  if (verdicts && fs.statSync(paths.work(id, 'diagrams.json')).mtimeMs > fs.statSync(vfile).mtimeMs + 1) {
    fails.push({ check: 'verified', id: null, message: '検証（dg verdict）の後に diagrams.json を書き換えた。C3 からやり直す' });
  }
  const { errors, results } = await renderBatch(id, batch);
  for (const e of errors) fails.push({ check: 'render', ...e });
  return { fails, batch, results };
}

const failToFeedback = (id, step, fails) => toFeedback(id, step, fails, { idField: 'id', key: 'diagrams' });

const commands = {
  // 公式のアイコン集（展開したフォルダ）から、config/icon-map.json の分だけ assets/aws-icons/ に写す
  icons(args) {
    const from = args.from;
    if (typeof from !== 'string' || !fs.existsSync(from)) throw new ToolError('--from <展開した AWS 公式のアイコン集のフォルダ> が要る');
    const files = {};
    const walk = (dir) => { for (const f of fs.readdirSync(dir)) { const p = path.join(dir, f); if (fs.statSync(p).isDirectory()) walk(p); else if (/^Arch_.+_48\.svg$/.test(f)) files[f.slice(5, -7)] = p; } };
    walk(from);
    const out = path.join(CODE, 'assets', 'aws-icons');
    fs.mkdirSync(out, { recursive: true });
    const names = [...new Set(Object.values(iconMap()))];
    const missing = [];
    for (const n of names) {
      if (!files[n]) { missing.push(n); continue; }
      fs.writeFileSync(path.join(out, `${n}.svg`), cleanIcon(fs.readFileSync(files[n], 'utf8')));
    }
    emit({ ok: !missing.length, summary: `${names.length - missing.length} 個のアイコンを写した${missing.length ? `、無い ${missing.length} 個` : ''}`, items: missing });
  },

  // 公開済みの図を、図の元を変えずに描き直す（道具・アイコン・色の設定を直した時）
  async rerender() {
    const dir = paths.diagrams();
    const list = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith('.json')).map((f) => readJSON(path.join(dir, f))).filter((d) => d?.status === 'verified') : [];
    const results = await renderAll(list.map((d) => ({ id: d.id, source: d.source })));
    const svgDir = path.join(APP, 'public', 'diagrams');
    fs.mkdirSync(svgDir, { recursive: true });
    const failed = results.filter((r) => r.error);
    for (const r of results) if (!r.error) fs.writeFileSync(path.join(svgDir, `${r.id}.svg`), r.svg + '\n');
    emit({ ok: !failed.length, summary: `${results.length - failed.length} 枚を描き直した${failed.length ? `、描けない ${failed.length} 枚` : ''}`, items: failed.map((r) => `${r.id}: ${r.error}`) });
  },

  async validate(args) {
    const id = itemIdOf(args._[0]);
    const batch = loadBatch(id);
    const errors = checkDiagrams(id, batch);
    let results = [];
    if (!errors.length) {
      const r = await renderBatch(id, batch);
      errors.push(...r.errors);
      results = r.results;
    }
    const unknown = [...new Set(results.flatMap((r) => r.unknown))];
    const details = errors.length ? writeReport(`${id}/validate.txt`, errors.map((e) => `${e.id}\t${e.message}`).join('\n') + '\n') : undefined;
    if (!errors.length) setResult(id, 'C2_author', 'ok');
    emit({
      ok: !errors.length,
      summary: errors.length ? `誤りが ${errors.length} 件` : `${batch.diagrams.length} 枚とも描けた（絵は work/${id}/preview/）${unknown.length ? `。アイコンの無いサービス: ${unknown.join(', ')}` : ''}`,
      items: errors.map((e) => `${e.id ?? ''}: ${e.message}`),
      details_path: details,
      repeatKey: `dvalidate:${id}`,
    });
  },

  // C3: verify.json { diagrams: [{ id, issues: [{ kind, where, detail }], verdict }] }
  verdict(args) {
    const id = itemIdOf(args._[0]);
    requireState(id, 'C3_verify');
    concludeBatch({ id, batch: loadBatch(id), batchFile: 'diagrams.json', key: 'diagrams', histFile: 'dhistory.json', severe: SEVERE, mild: MILD });
  },

  async gate(args) {
    const id = itemIdOf(args._[0]);
    const { fails } = await gateDiagrams(id);
    if (fails.length) { failToFeedback(id, 'C4_gate', fails); setResult(id, 'C4_gate', 'fail'); }
    emit({ ok: !fails.length, summary: fails.length ? `${fails.length} 件の検査に落ちた → loop advance --result fail` : '全ての検査を通った → dg publish', items: fails.map((f) => `${f.check} ${f.id ?? ''}: ${f.message}`), repeatKey: `dgate:${id}` });
  },

  async publish(args) {
    const id = itemIdOf(args._[0]);
    requireState(id, 'C4_gate');
    const { fails, batch, results } = await gateDiagrams(id);
    if (fails.length) {
      failToFeedback(id, 'C4_gate', fails);
      setResult(id, 'C4_gate', 'fail');
      return emit({ ok: false, summary: `検査に落ちたので入れない（${fails.length} 件）→ loop advance --result fail`, items: fails.map((f) => `${f.check} ${f.id ?? ''}: ${f.message}`), repeatKey: `dgate:${id}` });
    }
    const out = [];
    for (const d of batch.diagrams) {
      const r = results.find((x) => x.id === d.id);
      const file = path.join(paths.diagrams(), `${d.id}.json`);
      const prev = readJSON(file, null);
      writeJSON(file, { id: d.id, source: d.source, alt: d.alt, status: 'verified', created: prev?.created ?? today(), last_checked: today() });
      const svgDir = path.join(APP, 'public', 'diagrams');
      fs.mkdirSync(svgDir, { recursive: true });
      fs.writeFileSync(path.join(svgDir, `${d.id}.svg`), r.svg + '\n');
      out.push(d.id);
    }
    setResult(id, 'C4_gate', 'pass');
    emit({ ok: true, summary: `${out.length} 枚の図を入れた（app.mjs data で問題に付く）→ loop advance --result pass`, items: out });
  },
};

if (import.meta.url === `file://${process.argv[1]}`) main(commands);
export { commands };
