import test from 'node:test';
import assert from 'node:assert/strict';
import { parseRecord, addAnswer, domainStats, MAX_ANSWERS } from '../src/logic/record.js';

const domains = { 1: { name: 'SDLC Automation' }, 2: { name: 'Configuration Management and IaC' } };
const questions = [
  { id: 'q-1.1-0001', domain: 1 }, { id: 'q-1.1-0002', domain: 1 }, { id: 'q-1.1-0003', domain: 1 }, { id: 'q-2.1-0001', domain: 2 },
];
const a = (id, correct, at) => ({ id, task: id.slice(2, 5), domain: Number(id[2]), selected: ['A'], correct, at });

test('A-0002 AC1 問題ごとに最新の答えだけを数える', () => {
  const answers = [a('q-1.1-0001', false, 1), a('q-1.1-0001', true, 2), a('q-1.1-0002', false, 3)];
  const s = domainStats(answers, questions, domains);
  assert.deepEqual(s[0], { domain: 1, name: 'SDLC Automation', total: 3, answered: 2, correct: 1, rate: 0.5 });
});

test('A-0002 AC1 解いていないドメインは正答率なし', () => {
  const s = domainStats([], questions, domains);
  assert.deepEqual(s[1], { domain: 2, name: 'Configuration Management and IaC', total: 1, answered: 0, correct: 0, rate: null });
});

test('A-0002 AC2 壊れた記録は空として扱う', () => {
  assert.deepEqual(parseRecord(null), []);
  assert.deepEqual(parseRecord('{oops'), []);
  assert.deepEqual(parseRecord('{"v":2,"answers":[]}'), []);
  assert.deepEqual(parseRecord('{"v":1,"answers":"x"}'), []);
  assert.deepEqual(parseRecord('{"v":1,"answers":[{"id":"q-1.1-0001","correct":true,"at":1},{"bad":1}]}').length, 1);
});

test('A-0002 AC2 新しい方から 5000 件まで残す', () => {
  let list = [];
  for (let i = 0; i < MAX_ANSWERS + 3; i++) list = addAnswer(list, a('q-1.1-0001', true, i));
  assert.equal(list.length, MAX_ANSWERS);
  assert.equal(list[0].at, 3);
  assert.equal(list.at(-1).at, MAX_ANSWERS + 2);
});
