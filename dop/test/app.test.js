import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { sandbox, toAuthor } from './helpers.js';
import { parseTap } from '../tools/app.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('parseTap: 入れ子・skip も取る', () => {
  const t = parseTap('ok 1 - A-0001 AC1 a\n    not ok 2 - A-0001 AC2 b\nok 3 - c # SKIP x');
  assert.deepEqual(t.map((x) => [x.name, x.ok, x.skipped]), [['A-0001 AC1 a', true, false], ['A-0001 AC2 b', false, false], ['c', true, true]]);
});

function appSandbox(testBody) {
  const sb = sandbox();
  const app = fs.mkdtempSync(path.join(os.tmpdir(), 'dop-app-'));
  fs.mkdirSync(path.join(app, 'test'), { recursive: true });
  fs.writeFileSync(path.join(app, 'test', 'x.test.js'), `import test from 'node:test';\nimport assert from 'node:assert';\n${testBody}\n`);
  const run = (...args) => {
    try {
      return { code: 0, ...JSON.parse(execFileSync('node', [path.join(ROOT, 'tools', 'app.mjs'), ...args], { env: { ...process.env, DOP_DATA: sb.dir, DOP_APP: app }, encoding: 'utf8' })) };
    } catch (e) { return { code: e.status, ...JSON.parse(e.stdout) }; }
  };
  return { sb, app, run };
}

function toCheck(sb) {
  sb.run('loop', 'add', '--json', '{"kind":"app","title":"t","priority":1}');
  sb.run('loop', 'start');
  const id = sb.run('loop', 'next').item.id;
  sb.write(`work/${id}/spec.json`, { item: id, goal: 'g', acceptance: [{ id: 'AC1', check: 'unit', text: 'a' }, { id: 'AC2', check: 'unit', text: 'b' }], options: [], aws_change: false });
  sb.run('loop', 'advance', '--result', 'ok');
  sb.run('loop', 'advance', '--result', 'ok');
  return id;
}

test('check: AC ごとに合否を出し、全部合格なら札を書く', () => {
  const { sb, app, run } = appSandbox("test('A-0001 AC1 a', () => {});\ntest('A-0001 AC2 b', () => {});");
  const id = toCheck(sb);
  const r = run('check', id);
  assert.equal(r.ok, true, JSON.stringify(r));
  assert.equal(sb.read(`work/${id}/result.json`).result, 'pass');
  assert.ok(fs.existsSync(path.join(app, 'public', 'questions.json')));
});

test('check: 落ちた AC・試験の無い AC・前の項目の試験の失敗を返す', () => {
  const { sb, run } = appSandbox("test('A-0001 AC1 a', () => { assert.equal(1, 2); });\ntest('A-0000 AC9 old', () => { assert.fail('x'); });");
  const id = toCheck(sb);
  const r = run('check', id);
  assert.equal(r.ok, false);
  const all = JSON.stringify(r.items);
  assert.match(all, /AC1/);
  assert.match(all, /AC2.*試験が無い/);
  assert.match(all, /前の試験/);
  assert.equal(sb.read(`work/${id}/result.json`).result, 'fail');
});
