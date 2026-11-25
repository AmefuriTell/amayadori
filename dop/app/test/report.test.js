import test from 'node:test';
import assert from 'node:assert/strict';
import { parseReports, addReport, issueUrl, MAX_COMMENT, KINDS } from '../src/logic/report.js';

test('A-0006 AC2 壊れた報告の記録は空として扱う', () => {
  assert.deepEqual(parseReports(null), []);
  assert.deepEqual(parseReports('nope'), []);
  assert.deepEqual(parseReports('{"v":1,"reports":[{"id":"q-1.1-0001","kind":"answer","comment":"x","at":1},{"x":1}]}').length, 1);
});

test('A-0006 AC2 コメントは 1000 文字まで', () => {
  const list = addReport([], { id: 'q-1.1-0001', kind: 'answer', comment: 'あ'.repeat(MAX_COMMENT + 50), at: 1 });
  assert.equal([...list[0].comment].length, MAX_COMMENT);
});

test('A-0006 AC3 issue の下書きの URL', () => {
  const u = new URL(issueUrl({ id: 'q-1.4-0002', kind: 'answer', comment: 'C も正しいのでは', selected: ['A', 'C'] }));
  assert.equal(u.origin + u.pathname, 'https://github.com/AmefuriTell/amayadori/issues/new');
  assert.equal(u.searchParams.get('title'), '[DOP] 誤りの報告 q-1.4-0002');
  assert.equal(u.searchParams.get('labels'), 'dop-report');
  const body = u.searchParams.get('body');
  assert.match(body, /q-1\.4-0002/);
  assert.match(body, new RegExp(KINDS.answer));
  assert.match(body, /C も正しいのでは/);
  assert.match(body, /A, C/);
});
