import { test } from "node:test";
import assert from "node:assert/strict";
import { GIF_FRAMES, RECORD_EVERY, gifCutoffs, gifPaths, gifScale } from "../src/game/orbit-record.js";

// 2 機: 0 番は 0〜2 秒、1 番は 1〜1.5 秒（そこでいなくなる）。
const points = [
  { t: 0, x: 1, y: 0, c: 0 },
  { t: 0.5, x: 2, y: 0, c: 0 },
  { t: 1, x: 3, y: 0, c: 0 },
  { t: 1, x: 0, y: 1, c: 1 },
  { t: 1.5, x: 3, y: 1, c: 0 },
  { t: 1.5, x: 0, y: -4, c: 1 },
  { t: 2, x: 3, y: 2, c: 0 },
];

test("the record is taken every quarter of a game second", () => {
  assert.equal(RECORD_EVERY, 0.25);
});

test("the gif fits every recorded point and the earth inside the margin", () => {
  assert.equal(gifScale(points, 360, 14), 166 / 4);
  // 点が地球の中だけなら、地球（大気の輪 1.08）が収まる大きさ。
  assert.equal(gifScale([{ t: 0, x: 0.5, y: 0, c: 0 }], 360, 14), 166 / 1.08);
  // 月の軌道（limit）より遠い点（飛んでいった衛星）は縮尺に数えない。
  assert.equal(gifScale([...points, { t: 3, x: 12, y: 0, c: 0 }], 360, 14, 5), 166 / 4);
});

test("the frames grow from the first record to the last, the last frame has everything", () => {
  const cutoffs = gifCutoffs(points);
  assert.equal(cutoffs.length, GIF_FRAMES);
  assert.ok(cutoffs.every((cutoff, index) => index === 0 || cutoff > cutoffs[index - 1]));
  assert.equal(cutoffs[cutoffs.length - 1], 2);
  assert.deepEqual(gifCutoffs([]), []);
});

test("each frame draws the line of each satellite up to that time, ended once it is gone", () => {
  const early = gifPaths(points, 0.6);
  assert.deepEqual(early, [{ color: 0, points: [{ x: 1, y: 0 }, { x: 2, y: 0 }], ended: false }]);
  const mid = gifPaths(points, 1.5);
  assert.equal(mid.length, 2);
  assert.equal(mid[1].points.length, 2);
  assert.equal(mid[1].ended, false);
  const all = gifPaths(points, 2);
  assert.equal(all[0].points.length, 5);
  assert.equal(all[0].ended, false);
  assert.equal(all[1].ended, true);
});
