import test from 'node:test';
import assert from 'node:assert/strict';
import { skipEntry, domainStats } from '../src/logic/record.js';
import { parseProgress, resume, snapshot } from '../src/logic/progress.js';
import { analyze } from '../../tools/learn.mjs';

test('A-0012 AC1 「分からない」は無回答の不正解。続きでも戻せ、誤りの疑いには数えない', () => {
  const q = { id: 'q-1.1-0001', task: '1.1', domain: 1, choices: [{ key: 'A' }, { key: 'B' }] };
  const e = skipEntry(q, 5);
  assert.deepEqual(e, { id: 'q-1.1-0001', task: '1.1', domain: 1, selected: [], correct: false, skipped: true, at: 5 });
  const [d] = domainStats([e], [q], { 1: { name: 'SDLC' } });
  assert.equal(d.answered, 1);
  assert.equal(d.correct, 0);

  const qs = [q];
  const snap = snapshot({ questions: qs, index: 0, selected: [], answered: true, skipped: true, correct: 0 });
  assert.deepEqual(resume(qs, parseProgress(JSON.stringify(snap))), { index: 0, selected: [], answered: true, skipped: true, correct: 0 });

  const bank = [{ id: 'q-1.1-0001', task: '1.1' }];
  const ex = { domains: [{ tasks: [{ id: '1.1', title: 't' }] }] };
  const skips = [1, 2, 3, 4].map((at) => ({ ...e, at }));
  assert.deepEqual(analyze({ answers: skips, reports: [] }, bank, ex).suspect, []);
  const wrongs = skips.map((a) => ({ ...a, skipped: undefined, selected: ['A'] }));
  assert.equal(analyze({ answers: wrongs, reports: [] }, bank, ex).suspect.length, 1);
});
