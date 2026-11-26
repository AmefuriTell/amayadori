import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { functions, scan } from '../tools/lib/metrics.mjs';
import { toItems } from '../tools/refactor.mjs';

const R = { include: ['src'], exclude: ['src/vendor'], ext: ['.js'], max_file_lines: 30, max_function_lines: 8, dup_window: 3, dup_min_chars: 15 };

test('P-016 関数の長さを数える（function・メソッド・アロー）', () => {
  const text = 'export function a(x) {\n  if (x) {\n    return 1;\n  }\n  return "}";\n}\nconst o = {\n  m(y) {\n    return y;\n  },\n};\nconst f = async (z) => {\n  return z;\n};\n';
  assert.deepEqual(functions(text).map((f) => [f.name, f.start, f.lines]), [['a', 1, 6], ['m', 8, 3], ['f', 12, 3]]);
});

test('P-016 測る: 長いファイル・長い関数・ファイルをまたいだ重複。外す所は測らない', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'dop-metrics-'));
  fs.mkdirSync(path.join(root, 'src', 'vendor'), { recursive: true });
  const block = 'const alpha = computeSomethingLong(1);\nconst beta = computeSomethingLong(2);\nconst gamma = computeSomethingLong(3);\n';
  fs.writeFileSync(path.join(root, 'src', 'a.js'), `${block}function big() {\n${'  doWork();\n'.repeat(10)}}\n${'// x\n'.repeat(20)}`);
  fs.writeFileSync(path.join(root, 'src', 'b.js'), block);
  fs.writeFileSync(path.join(root, 'src', 'vendor', 'c.js'), `${block}${'// x\n'.repeat(50)}`);
  const keys = scan(root, R).map((f) => f.key).sort();
  assert.deepEqual(keys, ['dup:src/a.js|src/b.js', 'file:src/a.js', 'fn:src/a.js#big']);
});

test('P-016 項目にする: 同じファイルの長い関数はまとめ、進めている項目にある物は足さない', () => {
  const findings = [
    { key: 'file:x.js', kind: 'long_file', files: ['x.js'], detail: 'd' },
    { key: 'fn:x.js#f', kind: 'long_function', files: ['x.js'], detail: 'd' },
    { key: 'dup:a.js|b.js', kind: 'duplicate', files: ['a.js', 'b.js'], detail: 'd' },
  ];
  const items = toItems(findings, []);
  assert.equal(items.length, 2);
  assert.deepEqual(items[0].findings.map((f) => f.key), ['file:x.js', 'fn:x.js#f']);
  assert.equal(items[0].kind, 'refactor');
  const again = toItems(findings, [{ id: 'F-0001', kind: 'refactor', status: 'todo', findings: [findings[2]] }]);
  assert.deepEqual(again.map((i) => i.findings[0].key), ['file:x.js']);
});
