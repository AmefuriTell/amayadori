import test from 'node:test';
import assert from 'node:assert/strict';
import { sandbox, question } from './helpers.js';
import { analyze, reportsFromIssues, toItems } from '../tools/learn.mjs';

const bank = [1, 2, 3, 4, 5, 6].map((n) => ({ id: `q-1.1-000${n}`, task: '1.1' })).concat([{ id: 'q-2.1-0001', task: '2.1' }]);
const ex = { domains: [{ id: 1, tasks: [{ id: '1.1', title: 'Implement CI/CD pipelines' }] }, { id: 2, tasks: [{ id: '2.1', title: 'IaC' }] }] };
const a = (id, correct, at) => ({ id, task: id.slice(2, 5), correct, at });

test('苦手のタスク: 正答率 70% 未満・5 問以上で content 項目', () => {
  const answers = [a('q-1.1-0001', false, 1), a('q-1.1-0002', false, 2), a('q-1.1-0003', true, 3), a('q-1.1-0004', false, 4), a('q-1.1-0005', true, 5)];
  const r = analyze({ answers, reports: [] }, bank, ex);
  assert.equal(r.weak.length, 1);
  const items = toItems(r, []);
  assert.equal(items[0].kind, 'content');
  assert.equal(items[0].task, '1.1');
  assert.match(items[0].why, /40%/);
  // 既に learn の項目があれば足さない
  assert.equal(toItems(r, [{ id: 'C-0099', kind: 'content', task: '1.1', source: 'learn', status: 'todo' }]).filter((i) => i.kind === 'content').length, 0);
});

test('疑わしい問題: 正答率 20% 未満・3 回以上、または報告で recheck 項目（タスクごとにまとめる）', () => {
  const answers = [a('q-1.1-0006', false, 1), a('q-1.1-0006', false, 2), a('q-1.1-0006', false, 3)];
  const issues = [{ number: 12, state: 'open', title: '[DOP] 誤りの報告 q-2.1-0001', body: '- 問題: q-2.1-0001\n- 種類: 答えが違う\n- 選んだ答え: A\n\nC も正しいのでは\n\n<!-- x -->' }];
  const reports = [...reportsFromIssues(issues), { id: 'q-9.9-0001', kind: 'x', comment: '', from: 'app' }];
  const r = analyze({ answers, reports }, bank, ex);
  assert.deepEqual(r.suspect.map((s) => s.id).sort(), ['q-1.1-0006', 'q-2.1-0001']);
  const items = toItems(r, []).filter((i) => i.kind === 'recheck');
  assert.equal(items.length, 2);
  assert.match(items.find((i) => i.task === '2.1').note, /issue #12: 答えが違う \/ C も正しいのでは/);
  // 進めている recheck に入っている問題は足さない
  assert.equal(toItems(r, [{ id: 'R-0001', kind: 'recheck', question_ids: ['q-2.1-0001'], status: 'doing' }]).filter((i) => i.kind === 'recheck').length, 1);
});

test('閉じた issue と [DOP] でない issue は数えない', () => {
  const issues = [{ number: 1, state: 'closed', title: '[DOP] 誤りの報告 q-1.1-0001', body: '' }, { number: 2, state: 'open', title: 'other q-1.1-0001', body: '' }];
  assert.equal(reportsFromIssues(issues).length, 0);
});

test('weak: answers/ のファイルを読み、backlog に足し、L1 の札を書く', () => {
  const sb = sandbox();
  for (const n of [1, 2, 3, 4, 5]) sb.write(`bank/1.1/q-1.1-000${n}.json`, question({ id: `q-1.1-000${n}`, status: 'verified' }));
  sb.write('.loop/answers/record.json', { v: 1, answers: [1, 2, 3, 4, 5].map((n) => a(`q-1.1-000${n}`, n === 1, n)), reports: [] });
  sb.run('loop', 'add', '--json', '{"kind":"learn","title":"記録の分析"}');
  sb.run('loop', 'start');
  const n = sb.run('loop', 'next');
  assert.equal(n.state, 'L1_learn');
  const r = sb.run('learn', 'weak');
  assert.equal(r.ok, true, JSON.stringify(r));
  assert.equal(r.added.length, 1);
  assert.equal(sb.read('.loop/backlog.json').find((b) => b.id === r.added[0]).priority, 2);
  assert.equal(sb.run('loop', 'advance', '--result', 'ok').state, 'S9_close');
});
