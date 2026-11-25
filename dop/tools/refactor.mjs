#!/usr/bin/env node
// リファクタリング（P-016）: scan / check
//   scan [--dry]   コードを測り、直す所をリファクタリングの項目（F-）として backlog に足す（loop start と、app・refactor の項目の loop close でも動く）
//   check <ID>     A3: 振る舞いを変えずに直せたか（全試験が通る・試験のファイルを変えていない・直す所が消え、新しい直す所が無い）
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync, execFileSync } from 'node:child_process';
import { CODE, paths, readJSON, writeJSON, emit, main, ToolError, ITEM_ID, setResult, writeReport, rel } from './lib/io.mjs';
import { scan } from './lib/metrics.mjs';

const TEST_DIRS = ['test', 'app/test', 'app/e2e'];

/** 直す所 → 項目。同じファイルの長い関数は、そのファイルの長いファイルの項目にまとめる。進めている項目にある key は足さない */
export function toItems(findings, backlog) {
  const open = new Set(backlog.filter((b) => b.kind === 'refactor' && ['todo', 'doing', 'blocked'].includes(b.status)).flatMap((b) => (b.findings ?? []).map((f) => f.key)));
  const fresh = findings.filter((f) => !open.has(f.key));
  const groups = new Map();
  for (const f of fresh) {
    const g = f.kind === 'duplicate' ? f.key : `file:${f.files[0]}`;
    if (!groups.has(g)) groups.set(g, []);
    groups.get(g).push(f);
  }
  return [...groups.values()].map((fs) => ({
    kind: 'refactor', priority: 2, source: 'metrics', findings: fs,
    title: `リファクタリング: ${fs[0].kind === 'duplicate' ? `重複（${fs[0].files.join(' と ')}）` : `${fs[0].files[0]} を分ける・短くする`}`,
  }));
}

export function addToBacklog(dry = false) {
  const findings = scan();
  const backlog = readJSON(paths.backlog(), []);
  const items = toItems(findings, backlog);
  const added = [];
  if (!dry && items.length) {
    for (const it of items) {
      const n = Math.max(0, ...backlog.filter((b) => b.id.startsWith('F-')).map((b) => Number(b.id.slice(2))));
      const item = { id: `F-${String(n + 1).padStart(4, '0')}`, status: 'todo', attempts: 0, ...it };
      backlog.push(item);
      added.push(item.id);
    }
    writeJSON(paths.backlog(), backlog);
  }
  return { findings, items, added };
}

function git(...args) {
  return execFileSync('git', args, { cwd: CODE, encoding: 'utf8' }).trim();
}

/** 項目を始めた時の控え（loop next が呼ぶ）: git の位置と、直す前の測り */
export function recordBase(id) {
  let head = null;
  try { head = git('rev-parse', 'HEAD'); } catch { /* git の無い所（試験）では null */ }
  writeJSON(paths.work(id, 'base.json'), { head, findings: scan().map((f) => f.key) });
}

function runTests(id) {
  const env = { ...process.env };
  delete env.NODE_TEST_CONTEXT;
  const unit = spawnSync('npm', ['test', '--silent'], { cwd: CODE, encoding: 'utf8', env });
  const e2e = spawnSync('node', ['--test', '--test-concurrency=1', 'app/e2e/'], { cwd: CODE, encoding: 'utf8', env });
  const summary = (r) => (r.stdout.match(/^# (pass|fail) \d+$/gm) ?? []).join(' ');
  const file = writeReport(`${id}/tests.txt`, `## unit\n${unit.stdout}\n${unit.stderr}\n## e2e\n${e2e.stdout}\n${e2e.stderr}\n`);
  return { ok: unit.status === 0 && e2e.status === 0, unit: summary(unit), e2e: summary(e2e), file };
}

const commands = {
  scan(args) {
    const { findings, items, added } = addToBacklog(!!args.dry);
    emit({
      ok: true,
      summary: `直す所 ${findings.length} 個 → ${args.dry ? '（試しに）' : ''}新しいリファクタリングの項目 ${items.length} 個${added.length ? `（${added.join(', ')}）` : ''}`,
      items: findings.map((f) => `${f.kind} ${f.detail}`),
    });
  },

  check(args) {
    const id = typeof args._[0] === 'string' ? args._[0] : '';
    if (!ITEM_ID.test(id) || !id.startsWith('F-')) throw new ToolError('リファクタリングの項目 ID（例 F-0001）を渡す');
    const s = readJSON(paths.state(), {});
    if (s.state !== 'A3_check' || s.item !== id) throw new ToolError(`この操作は ${id} が A3_check の時だけ（今は ${s.state} / ${s.item ?? ''}）`);
    const item = readJSON(paths.work(id, 'item.json'), {});
    const spec = readJSON(paths.work(id, 'spec.json'), {});
    const base = readJSON(paths.work(id, 'base.json'), null);
    if (!base) throw new ToolError(`work/${id}/base.json が無い（loop next が書く）`);
    const fails = [];

    // 1. 試験のファイルを変えていない（spec.allow_test_changes に書いた物だけ許す）
    if (base.head) {
      const allow = new Set(spec.allow_test_changes ?? []);
      const changed = [
        ...git('diff', '--name-only', base.head, '--', ...TEST_DIRS).split('\n'),
        ...git('ls-files', '--others', '--exclude-standard', '--', ...TEST_DIRS).split('\n'),
      ].filter(Boolean).map((f) => f.replace(/^dop\//, ''));
      const bad = changed.filter((f) => !allow.has(f));
      if (bad.length) fails.push({ check: 'tests_unchanged', message: `試験のファイルを変えた: ${bad.join(', ')}（振る舞いを変えない証拠にならない。要るなら spec.allow_test_changes に理由と一緒に書く）` });
    }

    // 2. 直す所が消え、新しい直す所が無い
    const now = scan().map((f) => f.key);
    const target = (item.findings ?? []).map((f) => f.key);
    const left = target.filter((k) => now.includes(k));
    if (left.length) fails.push({ check: 'findings_left', message: `まだ残っている: ${left.join(', ')}` });
    const added = now.filter((k) => !base.findings.includes(k));
    if (added.length) fails.push({ check: 'findings_new', message: `新しく増えた: ${added.join(', ')}` });

    // 3. 全ての試験が通る（unit・e2e）
    const t = runTests(id);
    if (!t.ok) fails.push({ check: 'tests', message: `試験が落ちた（unit ${t.unit} / e2e ${t.e2e}）。${rel(t.file)}` });

    setResult(id, 'A3_check', fails.length ? 'fail' : 'pass');
    if (fails.length) writeJSON(paths.work(id, 'feedback.json'), { from: 'A3_check', fails });
    emit({
      ok: !fails.length,
      summary: fails.length ? `${fails.length} 件の確認に落ちた → loop advance --result fail` : `振る舞いを変えずに直せた（unit ${t.unit} / e2e ${t.e2e}）→ loop advance --result pass`,
      items: fails.map((f) => `${f.check}: ${f.message}`),
      details_path: rel(t.file),
      repeatKey: `refactor:${id}`,
    });
  },
};

if (import.meta.url === `file://${process.argv[1]}`) main(commands);
export { commands };
