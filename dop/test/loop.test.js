import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { sandbox, toAuthor, question } from './helpers.js';
import { loadMachine, pickNext } from '../tools/loop.mjs';

test('LOOP.md の状態の表: 全ての doc があり、行き先が全部ある', () => {
  const m = loadMachine();
  for (const [name, s] of Object.entries(m.states)) {
    assert.ok(fs.existsSync(new URL(`../loop/${s.doc}`, import.meta.url)), `${name} の doc`);
    for (const to of Object.values(s.next)) assert.ok(to in m.states || to === 'STOP' || to === 'HUMAN', `${name} → ${to}`);
  }
});

test('pickNext: priority → 依存 → ID の順', () => {
  const b = [
    { id: 'A-0002', kind: 'app', priority: 1, status: 'todo', depends_on: ['A-0001'] },
    { id: 'A-0001', kind: 'app', priority: 2, status: 'todo' },
    { id: 'A-0003', kind: 'app', priority: 1, status: 'blocked' },
  ];
  assert.equal(pickNext(b).id, 'A-0001');
  b[1].status = 'done';
  assert.equal(pickNext(b).id, 'A-0002');
});

test('add: ID を振り、同じ中身は足さない', () => {
  const sb = sandbox();
  const a = sb.run('loop', 'add', '--json', JSON.stringify([{ kind: 'content', task: '1.1', topic: 'x' }, { kind: 'content', task: '1.1', topic: 'x' }, { kind: 'app', title: 'y' }]));
  assert.deepEqual(a.added, ['C-0001', 'A-0001']);
  assert.equal(sb.read('.loop/backlog.json')[0].count, 5);
  const bad = sb.run('loop', 'add', '--json', '{"kind":"nope"}');
  assert.equal(bad.code, 2);
});

test('advance: ツールの札が無いと進めない', () => {
  const sb = sandbox();
  sb.run('loop', 'add', '--json', '{"kind":"content","task":"1.1","topic":"t"}');
  sb.run('loop', 'start');
  sb.run('loop', 'next');
  const r = sb.run('loop', 'advance', '--result', 'ok');
  assert.equal(r.code, 2);
  assert.match(r.summary, /ツールの結果が要る/);
  const wrong = sb.run('loop', 'advance', '--result', 'pass');
  assert.match(wrong.summary, /ok \/ no_source/);
});

test('やり直しが上限に達したら blocked で閉じる', () => {
  const sb = sandbox();
  const id = toAuthor(sb);
  for (let i = 0; i < 3; i++) {
    sb.write(`work/${id}/result.json`, { state: 'C2_author', result: 'ok' });
    sb.run('loop', 'advance', '--result', 'ok');
    sb.write(`work/${id}/result.json`, { state: 'C3_verify', result: 'fix', count: true });
    var r = sb.run('loop', 'advance', '--result', 'fix');
  }
  assert.equal(r.state, 'S9_close');
  const c = sb.run('loop', 'close');
  assert.equal(c.outcome, 'blocked');
  assert.ok(c.human_needed);
  assert.equal(sb.read('.loop/backlog.json')[0].status, 'blocked');
});

test('count: false の fix は attempts を数えない', () => {
  const sb = sandbox();
  const id = toAuthor(sb);
  sb.write(`work/${id}/result.json`, { state: 'C2_author', result: 'ok' });
  sb.run('loop', 'advance', '--result', 'ok');
  sb.write(`work/${id}/result.json`, { state: 'C3_verify', result: 'fix', count: false });
  const r = sb.run('loop', 'advance', '--result', 'fix');
  assert.equal(r.item.attempts, 0);
});

test('1 回の上限で止まり、start で数え直す', () => {
  const sb = sandbox();
  const items = Array.from({ length: 6 }, (_, i) => ({ kind: 'learn', title: `l${i}` }));
  sb.run('loop', 'add', '--json', JSON.stringify(items), '--force');
  sb.run('loop', 'start');
  for (let i = 0; i < 5; i++) {
    const n = sb.run('loop', 'next');
    sb.write(`work/${n.item.id}/result.json`, { state: 'L1_learn', result: 'ok' });
    sb.run('loop', 'advance', '--result', 'ok');
    sb.run('loop', 'close');
  }
  assert.equal(sb.run('loop', 'next').state, 'STOP');
  sb.run('loop', 'start');
  assert.equal(sb.run('loop', 'next').state, 'L1_learn');
});

test('block → HUMAN、resume で元の工程へ', () => {
  const sb = sandbox();
  toAuthor(sb);
  assert.equal(sb.run('loop', 'block', '--reason', '根拠が古い').state, 'HUMAN');
  assert.equal(sb.run('loop', 'status').human_reason, '根拠が古い');
  assert.equal(sb.run('loop', 'resume').state, 'C2_author');
});

test('hooks: 途中で止まらせない・工程の文書を守る・questions.json を確かめる', () => {
  const sb = sandbox();
  const id = toAuthor(sb);
  assert.equal(sb.hook('stop', {}).code, 2);
  assert.equal(sb.hook('stop', { stop_hook_active: true }).code, 0);
  assert.equal(sb.hook('pre-write', { tool_input: { file_path: '/r/dop/loop/steps/C2-author.md' } }).code, 2);
  assert.equal(sb.hook('pre-write', { tool_input: { file_path: '/r/dop/app/x.js' } }).code, 0);
  sb.write(`work/${id}/questions.json`, { item: id, questions: [question({ answer: ['E'] })] });
  const h = sb.hook('post-write', { tool_input: { file_path: `/r/dop/work/${id}/questions.json` } });
  assert.equal(h.code, 2);
  assert.match(h.stderr, /答え E が選択肢に無い/);
  sb.run('loop', 'pause');
  assert.equal(sb.hook('stop', {}).code, 0);
});

test('seed: 試験ガイドの skills から項目を作り、2 回目は足さない', () => {
  const sb = sandbox();
  const a = sb.run('loop', 'seed', '--task', '1.1');
  assert.match(a.summary, /^5 項目/);
  assert.equal(sb.run('loop', 'seed', '--task', '1.1').summary.startsWith('0 項目'), true);
  sb.run('loop', 'start');
  sb.run('loop', 'next');
  const item = sb.read('work/C-0001/item.json');
  assert.equal(item.task_info.title, 'Implement CI/CD pipelines');
});
