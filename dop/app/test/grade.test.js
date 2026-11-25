import test from 'node:test';
import assert from 'node:assert/strict';
import { grade, canSubmit } from '../src/logic/grade.js';

const single = { type: 'single', select_count: 1, answer: ['B'] };
const multi = { type: 'multi', select_count: 2, answer: ['A', 'D'] };

test('A-0001 AC3 1 つ選ぶ問題は答えと同じなら正解', () => {
  assert.equal(grade(single, ['B']), true);
  assert.equal(grade(single, ['A']), false);
  assert.equal(grade(single, []), false);
});

test('A-0001 AC3 複数選ぶ問題は組が完全に同じ時だけ正解（順は問わない）', () => {
  assert.equal(grade(multi, ['D', 'A']), true);
  assert.equal(grade(multi, ['A']), false);
  assert.equal(grade(multi, ['A', 'B']), false);
  assert.equal(grade(multi, ['A', 'D', 'B']), false);
});

test('A-0001 AC4 select_count 個そろうまで答えられない', () => {
  assert.equal(canSubmit(multi, ['A']), false);
  assert.equal(canSubmit(multi, ['A', 'B']), true);
  assert.equal(canSubmit(single, []), false);
  assert.equal(canSubmit(single, ['C']), true);
});
