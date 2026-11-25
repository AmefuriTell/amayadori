import test from 'node:test';
import assert from 'node:assert/strict';
import { buildExport, exportFileName } from '../src/logic/export.js';

test('A-0005 AC1 書き出しの中身とファイル名', () => {
  const now = new Date('2026-11-26T03:04:05Z');
  const answers = [{ id: 'q-1.1-0001', correct: true, at: 1 }];
  const reports = [{ id: 'q-1.1-0001', kind: 'answer', comment: 'x', at: 2 }];
  const out = buildExport(answers, reports, now);
  assert.deepEqual(out, { v: 1, exported_at: '2026-11-26T03:04:05.000Z', exam: 'DOP-C02', answers, reports });
  assert.notEqual(out.answers, answers); // 写しを返す
  assert.equal(exportFileName(now), 'dop-record-20261126-0304.json');
});
