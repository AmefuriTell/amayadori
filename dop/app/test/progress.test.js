import test from 'node:test';
import assert from 'node:assert/strict';
import { parseProgress, resume, snapshot } from '../src/logic/progress.js';

const qs = ['a', 'b', 'c'].map((id) => ({ id, choices: [{ key: 'A' }, { key: 'B' }] }));

test('A-0010 AC1 進み具合の読み込みと続きの場所', () => {
  assert.equal(parseProgress(null), null);
  assert.equal(parseProgress('{bad'), null);
  assert.equal(parseProgress('{"id":3,"selected":[]}'), null);
  const p = parseProgress('{"id":"b","selected":["B"],"answered":true,"correct":1}');
  assert.deepEqual(resume(qs, p), { index: 1, selected: ['B'], answered: true, correct: 1 });
  assert.deepEqual(resume(qs, parseProgress('{"id":"gone","selected":["A"]}')), { index: 0, selected: [], answered: false, correct: 0 });
  assert.deepEqual(resume(qs, parseProgress('{"id":"a","selected":["Z"],"answered":true}')), { index: 0, selected: [], answered: false, correct: 0 });
  assert.deepEqual(resume(qs, parseProgress('{"done":true,"correct":2}')), { index: 3, selected: [], answered: false, correct: 2 });
  assert.deepEqual(snapshot({ questions: qs, index: 2, selected: ['A'], answered: false, correct: 1 }), { id: 'c', selected: ['A'], answered: false, correct: 1 });
  assert.deepEqual(snapshot({ questions: qs, index: 3, selected: [], answered: false, correct: 3 }), { done: true, correct: 3 });
});
