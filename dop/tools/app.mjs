#!/usr/bin/env node
// アプリのツール: data（bank → app/public/questions.json）/ stamp（版の番号を付け直す）/ check（A3。受け入れ条件ごとの合否）
// 試験の名前の先頭に「<項目 ID> <AC の id>」を付ける決まり（例 "A-0001 AC2 複数選択は…"）。
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { CODE, DATA, paths, readJSON, writeJSON, emit, main, ToolError, ITEM_ID, setResult, writeReport, rel } from './lib/io.mjs';
import { loadBank, exam } from './lib/bank.mjs';
import { stamp } from './lib/stamp.mjs';
import { loadGlossary } from './g.mjs';

// 試験では DOP_APP で別のアプリの置き場を渡す
const APP = process.env.DOP_APP ? path.resolve(process.env.DOP_APP) : path.join(CODE, 'app');

/** bank の 1 問 → 配信用の 1 問（作り方の情報は出さない） */
export function toAppQuestion(q) {
  return {
    id: q.id, task: q.task, domain: Number(q.task.split('.')[0]), services: q.services, type: q.type, select_count: q.select_count,
    stem: q.stem, ...(q.stem_ja ? { stem_ja: q.stem_ja } : {}), choices: q.choices, answer: q.answer, explanation: q.explanation,
    references: q.references.map(({ url, quote }) => ({ url, quote })), low_confidence: !!q.low_confidence,
    ...(q.note ? { note: q.note } : {}),
  };
}

/** 事典（P-014）→ 配信用。名前 → id の表と、ページ（作り方の情報は出さない） */
export function toAppGlossary(pages) {
  const names = {};
  const out = {};
  for (const p of pages) {
    for (const a of p.aliases) names[a] = p.id;
    out[p.id] = {
      id: p.id, name: p.name, reading: p.reading, summary: p.summary,
      features: p.features.map(({ title, text }) => ({ title, text })),
      exam_points: p.exam_points.map(({ text }) => text),
      compare: (p.compare ?? []).map(({ with: w, text }) => ({ with: w, text })),
      references: p.references.map(({ url, quote }) => ({ url, quote })),
    };
  }
  return { names, pages: out };
}

export function buildData() {
  const domains = Object.fromEntries(exam().domains.map((d) => [d.id, { name: d.name, weight: d.weight }]));
  const questions = loadBank().filter((q) => q.status === 'verified').map(toAppQuestion);
  const out = { exam: exam().code, domains, count: questions.length, questions };
  const file = path.join(APP, 'public', 'questions.json');
  writeJSON(file, out);
  const glossary = toAppGlossary(loadGlossary());
  writeJSON(path.join(APP, 'public', 'glossary.json'), glossary);
  return { file, count: questions.length, pages: Object.keys(glossary.pages).length };
}

// 試験の中から呼ばれても、子の node --test が TAP を出すように NODE_TEST_CONTEXT を消す
function childEnv(extra) {
  const env = { ...process.env, ...extra };
  delete env.NODE_TEST_CONTEXT;
  return env;
}

function runTests(pattern, dir, env) {
  if (!fs.existsSync(dir) || !fs.readdirSync(dir, { recursive: true }).some((f) => new RegExp(pattern).test(f))) return { tap: '', code: 0, none: true };
  const glob = dir + (pattern.includes('e2e') ? '/**/*.e2e.js' : '/**/*.test.js');
  const r = spawnSync('node', ['--test', '--test-reporter=tap', '--test-concurrency=1', glob], { cwd: APP, env: childEnv(env), encoding: 'utf8', timeout: 300_000 });
  return { tap: (r.stdout ?? '') + (r.stderr ?? ''), code: r.status };
}

/** TAP から試験の名前と合否を取る（入れ子の試験も）。[{ name, ok, line }] */
export function parseTap(tap) {
  const out = [];
  tap.split('\n').forEach((l, i) => {
    const m = l.match(/^\s*(not ok|ok) \d+ - (.+?)(\s+#\s*(SKIP|TODO).*)?$/);
    if (m) out.push({ name: m[2].trim(), ok: m[1] === 'ok', skipped: !!m[4], line: i + 1 });
  });
  return out;
}

const commands = {
  // A-0011: 読み込む先に版の番号を付ける（スマホが古いプログラムを使い回さないように）
  stamp() {
    const r = stamp(APP);
    emit({ ok: true, summary: `版 ${r.version}${r.changed ? ' に付け直した' : '（変わらず）'}`, extra: r });
  },

  data() {
    const { file, count, pages } = buildData();
    emit({ ok: true, summary: `${count} 問を ${path.relative(CODE, file)} に、事典 ${pages} ページを glossary.json に書いた` });
  },

  check(args) {
    const id = args._[0];
    if (typeof id !== 'string' || !ITEM_ID.test(id)) throw new ToolError('項目 ID を渡す');
    const spec = readJSON(paths.work(id, 'spec.json'));
    if (!Array.isArray(spec.acceptance) || !spec.acceptance.length) throw new ToolError('spec.json に acceptance が無い');
    buildData();
    const shots = paths.reports(id);
    fs.rmSync(shots, { recursive: true, force: true });
    const unit = runTests('\\.test\\.js$', path.join(APP, 'test'), {});
    const e2e = runTests('\\.e2e\\.js$', path.join(APP, 'e2e'), { DOP_SHOTS: shots });
    const log = `# unit\n${unit.tap}\n# e2e\n${e2e.tap}`;
    const logPath = writeReport(`${id}/tests.txt`, log);
    const tests = parseTap(log).filter((t) => !/^(tests|suites|pass|fail)/.test(t.name));

    const items = [];
    for (const ac of spec.acceptance) {
      const mine = tests.filter((t) => t.name.startsWith(`${id} ${ac.id} `) || t.name === `${id} ${ac.id}`);
      if (!mine.length) items.push({ ac: ac.id, error: `試験が無い（名前の先頭を "${id} ${ac.id} " にする）` });
      else if (mine.some((t) => t.skipped)) items.push({ ac: ac.id, error: '飛ばした試験がある（skip・todo は合格にしない）' });
      else for (const t of mine.filter((x) => !x.ok)) items.push({ ac: ac.id, error: t.name, log: `${logPath}#L${t.line}` });
    }
    // ほかの項目の試験が落ちたら（前の機能を壊した）それも失敗
    for (const t of tests.filter((x) => !x.ok && !x.name.startsWith(`${id} `))) items.push({ ac: '(前の試験)', error: t.name, log: `${logPath}#L${t.line}` });
    if ((unit.code || e2e.code) && !items.length) items.push({ ac: '(実行)', error: '試験の実行が失敗した（読み込みの誤りなど）', log: logPath });

    const ok = !items.length;
    const pictures = fs.existsSync(shots) ? fs.readdirSync(shots).filter((f) => f.endsWith('.png')).map((f) => rel(path.join(shots, f))) : [];
    if (ok) setResult(id, 'A3_check', 'pass');
    else {
      setResult(id, 'A3_check', 'fail');
      writeJSON(paths.work(id, 'feedback.json'), { from: 'A3_check', items });
    }
    emit({
      ok,
      summary: ok ? `受け入れ条件 ${spec.acceptance.length} 個とも合格（試験 ${tests.length} 件）。画面写真を 1 枚見て崩れが無ければ loop advance --result pass` : `${items.length} 件の失敗 → loop advance --result fail`,
      items,
      details_path: logPath,
      extra: { screenshots: pictures.slice(0, 5) },
      repeatKey: `app:${id}`,
    });
  },
};

if (import.meta.url === `file://${process.argv[1]}`) main(commands);
export { commands };
