import test from 'node:test';
import assert from 'node:assert/strict';
import { allocate, pickMock, scoreMock, parseMock, remaining, formatTime } from '../src/logic/mock.js';

const W = { 1: { name: 'd1', weight: 0.22 }, 2: { name: 'd2', weight: 0.17 }, 3: { name: 'd3', weight: 0.15 }, 4: { name: 'd4', weight: 0.15 }, 5: { name: 'd5', weight: 0.14 }, 6: { name: 'd6', weight: 0.17 } };

test('A-0003 AC1 割り振り・選び方・採点・途中の状態・残り時間', () => {
  const many = { 1: 34, 2: 24, 3: 21, 4: 18, 5: 21, 6: 28 };
  const c = allocate(75, W, many);
  assert.equal(Object.values(c).reduce((a, b) => a + b, 0), 75);
  assert.deepEqual(c, { 1: 17, 2: 13, 3: 11, 4: 11, 5: 10, 6: 13 });
  // 足りないドメインの分はほかへ回す
  const few = allocate(75, W, { 1: 40, 2: 2, 3: 30, 4: 30, 5: 30, 6: 30 });
  assert.equal(few[2], 2);
  assert.equal(Object.values(few).reduce((a, b) => a + b, 0), 75);
  // 全部で n より少なければ全部
  assert.equal(Object.values(allocate(75, W, { 1: 3, 6: 2 })).reduce((a, b) => a + b, 0), 5);

  const qs = [];
  for (const [d, k] of Object.entries(many)) for (let i = 0; i < k; i++) qs.push({ id: `q-${d}-${i}`, domain: Number(d), type: 'single', select_count: 1, answer: ['A'] });
  let seed = 1;
  const rng = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const ids = pickMock(qs, W, 75, rng);
  assert.equal(ids.length, 75);
  assert.equal(new Set(ids).size, 75);
  assert.equal(ids.filter((id) => id.startsWith('q-1-')).length, 17);

  const s = scoreMock(qs, ids.slice(0, 3), { [ids[0]]: ['A'], [ids[1]]: ['B'] }, W);
  assert.equal(s.total, 3);
  assert.equal(s.correct, 1);
  assert.deepEqual(s.wrong, [ids[1], ids[2]]);
  assert.equal(s.byDomain.reduce((a, d) => a + d.total, 0), 3);

  assert.equal(parseMock('{bad'), null);
  assert.equal(parseMock('{"ids":[1],"deadline":5}'), null);
  assert.deepEqual(parseMock('{"ids":["a","b"],"index":9,"deadline":5}'), { ids: ['a', 'b'], index: 0, answers: {}, deadline: 5, done: false });
  assert.equal(remaining(1000, 5000), 0);
  assert.equal(remaining(61000, 1000), 60);
  assert.equal(formatTime(3 * 3600), '3:00:00');
  assert.equal(formatTime(65), '0:01:05');
});
