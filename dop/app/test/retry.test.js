import test from 'node:test';
import assert from 'node:assert/strict';
import { wrongIds, parseRetry } from '../src/logic/retry.js';

test('A-0004 AC1 間違えた問題（最新の答えで、問題集の順）と、解き直しの状態', () => {
  const qs = ['a', 'b', 'c', 'd'].map((id) => ({ id }));
  const answers = [
    { id: 'c', correct: false, at: 1 },
    { id: 'a', correct: false, at: 2 },
    { id: 'b', correct: false, skipped: true, at: 3 },
    { id: 'a', correct: true, at: 4 }, // 後で正解
    { id: 'd', correct: true, at: 5 },
  ];
  assert.deepEqual(wrongIds(answers, qs), ['b', 'c']);
  assert.deepEqual(wrongIds([], qs), []);
  assert.equal(parseRetry('{bad'), null);
  assert.equal(parseRetry('{"ids":[]}'), null);
  assert.deepEqual(parseRetry('{"ids":["b","c"]}'), { ids: ['b', 'c'] });
});
