import { test } from "node:test";
import assert from "node:assert/strict";
import {
  GIF_AFTER_TURN,
  GIF_LOW_PERIOD,
  GIF_MAX_FRAMES,
  GIF_MIN_FRAMES,
  RECORD_EVERY,
  gifCutoffs,
  gifFocusEnd,
  gifPaths,
  gifSatellites,
  gifScale,
} from "../src/game/orbit-record.js";

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

// 半径 r の円を period 秒で回る衛星の記録（from から to まで RECORD_EVERY ごと）。
function circle(c, r, period, from, to) {
  const out = [];
  for (let t = from; t <= to + 1e-9; t += RECORD_EVERY) {
    const angle = (2 * Math.PI * (t - from)) / period;
    out.push({ t, x: r * Math.cos(angle), y: r * Math.sin(angle), c });
  }
  return out;
}

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

test("the first full turn of each satellite is found from the recorded angles", () => {
  const [one] = gifSatellites(circle(0, 1.5, 10, 0, 30));
  assert.equal(one.first, 0);
  assert.equal(one.last, 30);
  assert.equal(one.turnAt, 10);
  const [none] = gifSatellites(circle(0, 1.5, 10, 0, 5));
  assert.equal(none.turnAt, null);
});

test("the moving frames end a few seconds after the last launched satellite's first turn", () => {
  // 1 機目は 0 秒から 600 秒まで、2 機目は 20 秒から 10 秒で 1 周（30 秒で回り切る）。
  const record = [...circle(0, 1.5, 6, 0, 600), ...circle(1, 2.5, 10, 20, 600)].sort((a, b) => a.t - b.t);
  // 角度の足し算の誤差で、回り切るのが次の記録になることがある。
  const near = (actual, expected) => assert.ok(Math.abs(actual - expected) <= RECORD_EVERY + 1e-9, `${actual} ≈ ${expected}`);
  near(gifFocusEnd(record), 30 + GIF_AFTER_TURN);
  // 最後に出した衛星が回り切らずにいなくなったら、そこまで。
  const crashed = [...circle(0, 1.5, 6, 0, 100), ...circle(1, 2.5, 10, 20, 24)].sort((a, b) => a.t - b.t);
  assert.equal(gifFocusEnd(crashed), 24);
  assert.equal(gifFocusEnd(circle(0, 1.5, 6, 0, 1)), 1);
});

test("the frames skip the time with no satellite and step at most a sixth of a low orbit", () => {
  // 1 機目は 0〜10 秒でいなくなり、200 秒から 2 機目（12 秒で回り切る）。
  const record = [...circle(0, 1.3, 7, 0, 10), ...circle(1, 2, 12, 200, 260)];
  const cutoffs = gifCutoffs(record);
  assert.ok(Math.abs(cutoffs[cutoffs.length - 1] - (200 + 12 + GIF_AFTER_TURN)) <= RECORD_EVERY + 1e-9);
  assert.ok(cutoffs.every((cutoff, index) => index === 0 || cutoff >= cutoffs[index - 1]));
  // 待っていた 10〜200 秒に入るコマは、詰めた時間軸の 1 区切り分（多くて 1 コマ）。
  assert.ok(cutoffs.filter((cutoff) => cutoff > 10.01 && cutoff < 199.99).length <= 1);
  // 詰めた長さは 10 + 0.25 + 15 秒ほど。1 コマで進むのは低い軌道の 1/6 周以下。
  const steps = cutoffs.slice(1).map((cutoff, index) => cutoff - cutoffs[index]).filter((step) => step < 1);
  assert.ok(Math.max(...steps) <= GIF_LOW_PERIOD / 6 + 1e-9);
  assert.ok(cutoffs.length >= GIF_MIN_FRAMES && cutoffs.length <= GIF_MAX_FRAMES);
  // 短い回は下限、長い回は上限のコマ数。
  assert.equal(gifCutoffs(circle(0, 1.5, 4, 0, 6)).length, GIF_MIN_FRAMES);
  assert.equal(gifCutoffs(circle(0, 5, 400, 0, 600)).length, GIF_MAX_FRAMES);
  assert.deepEqual(gifCutoffs([]), []);
});

test("each frame draws the whole line up to that time, the recent part, and ended once it is gone", () => {
  const early = gifPaths(points, 0.6);
  assert.deepEqual(early, [{ color: 0, points: [{ x: 1, y: 0 }, { x: 2, y: 0 }], recent: [{ x: 1, y: 0 }, { x: 2, y: 0 }], ended: false }]);
  const mid = gifPaths(points, 1.5);
  assert.equal(mid.length, 2);
  assert.equal(mid[1].points.length, 2);
  assert.equal(mid[1].ended, false);
  const all = gifPaths(points, 2, 0.6);
  assert.equal(all[0].points.length, 5);
  // 直近 0.6 秒（1.4 秒から）: 1.5 秒・2 秒の点に、1 つ前（1 秒）の点からつなぐ。
  assert.deepEqual(all[0].recent, [{ x: 3, y: 0 }, { x: 3, y: 1 }, { x: 3, y: 2 }]);
  assert.equal(all[0].ended, false);
  assert.equal(all[1].ended, true);
});
