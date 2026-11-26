import test from 'node:test';
import assert from 'node:assert/strict';
import { LECTURE_KEY, parseLecture, slideOf, setSlide, markSeen, isSeen, closeLecture } from '../src/logic/lecture.js';
import { loadLecture, saveLecture } from '../src/storage.js';

test('A-0017 AC9 講義の進み具合の形（最後に見たスライド・見た講義・開いていた講義）', () => {
  const empty = { last: {}, seen: [], open: null };
  assert.deepEqual(parseLecture(null), empty);
  assert.deepEqual(parseLecture('{bad'), empty);
  assert.deepEqual(parseLecture('[1,2]'), empty);
  assert.deepEqual(parseLecture('{"last":{"1.4":2,"x":1,"6.1":-1,"2.1":1.5},"seen":["1.4","1.4",3],"open":"zz"}'), { last: { '1.4': 2 }, seen: ['1.4'], open: null });
  let p = setSlide(empty, '1.4', 2);
  assert.deepEqual(p, { last: { '1.4': 2 }, seen: [], open: '1.4' });
  assert.equal(slideOf(p, '1.4', 3), 2);
  assert.equal(slideOf(p, '1.4', 2), 0, '枚数が減っていれば 1 枚目から');
  assert.equal(slideOf(p, '6.1', 5), 0);
  p = markSeen(p, '1.4');
  assert.equal(isSeen(p, '1.4'), true);
  assert.equal(markSeen(p, '1.4'), p);
  assert.equal(isSeen(p, '6.1'), false);
  p = closeLecture(p);
  assert.equal(p.open, null);
  assert.deepEqual(parseLecture(JSON.stringify(p)), p, '書いた物を読み戻せる');
  assert.equal(LECTURE_KEY, 'dop:v1:lecture');
});

test('A-0017 AC9 localStorage が使えない時も、読み書きは例外を外に出さない', () => {
  const had = Object.hasOwn(globalThis, 'window');
  const before = globalThis.window;
  try {
    globalThis.window = { get localStorage() { throw new Error('SecurityError'); } };
    assert.deepEqual(loadLecture(), { last: {}, seen: [], open: null });
    assert.equal(saveLecture({ last: { '1.4': 1 }, seen: [], open: null }), false);
    globalThis.window = { localStorage: { getItem() { throw new Error('denied'); }, setItem() { throw new Error('QuotaExceededError'); } } };
    assert.deepEqual(loadLecture(), { last: {}, seen: [], open: null });
    assert.equal(saveLecture({ last: {}, seen: ['1.4'], open: null }), false);
    const mem = new Map();
    globalThis.window = { localStorage: { getItem: (k) => mem.get(k) ?? null, setItem: (k, v) => mem.set(k, v) } };
    assert.equal(saveLecture({ last: { '1.4': 1 }, seen: ['6.1'], open: '1.4' }), true);
    assert.deepEqual(loadLecture(), { last: { '1.4': 1 }, seen: ['6.1'], open: '1.4' });
  } finally {
    if (had) globalThis.window = before; else delete globalThis.window;
  }
});
