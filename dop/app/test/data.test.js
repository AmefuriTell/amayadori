import test from 'node:test';
import assert from 'node:assert/strict';
import { toAppQuestion } from '../../tools/app.mjs';

const q = {
  id: 'q-1.4-0001', task: '1.4', services: ['AWS CodeDeploy'], type: 'single', select_count: 1, stem: 's',
  choices: [], answer: ['A'], explanation: { summary: 'x', per_choice: {} },
  references: [{ url: 'https://docs.aws.amazon.com/x', source_id: 'S1', quote: 'q' }], status: 'verified', created: '2026-11-25',
};

test('A-0007 AC1 note があればそのまま入り、無ければ鍵ごと無い', () => {
  assert.equal(toAppQuestion({ ...q, note: '補足の文' }).note, '補足の文');
  assert.equal('note' in toAppQuestion(q), false);
  assert.equal('source_id' in toAppQuestion(q).references[0], false);
});
