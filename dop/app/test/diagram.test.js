import test from 'node:test';
import assert from 'node:assert/strict';
import { diagramOf, toAppQuestion } from '../../tools/app.mjs';

test('A-0014 AC1 図のある問題にだけ diagram: { alt } を付ける', () => {
  const d = diagramOf('q-1.3-0002'); // D-0001 で入れた図
  assert.ok(d && typeof d.alt === 'string' && d.alt.length >= 20);
  assert.equal(diagramOf('q-9.9-9999'), null);
  const q = { id: 'q-1.3-0002', task: '1.3', services: [], type: 'single', select_count: 1, stem: 's', choices: [], answer: ['A'], explanation: { summary: 'x', per_choice: {} }, references: [] };
  assert.deepEqual(toAppQuestion(q, d).diagram, d);
  assert.equal('diagram' in toAppQuestion(q), false);
});
