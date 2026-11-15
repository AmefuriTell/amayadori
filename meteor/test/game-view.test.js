import { test } from "node:test";
import assert from "node:assert/strict";
import { PAD_DISTANCE, PULL_PX, padPosition, pullDelta, screenPull, toScreen, toWorld, viewTurn } from "../src/game/view.js";
import { dailyChallenge } from "../src/game/daily.js";
import { DEFAULT_WORLD, MAX_FLIGHT, MAX_PULL, advance, launch, launchVelocity, longitudeAt, missKm } from "../src/game/physics.js";

// iPhone 13 相当（縦長）と 1280×800（横長）。scale はおよその値（地球の半径の px）。
const PHONE = { width: 390, height: 844, scale: 34, turn: viewTurn(390, 844) };
const PC = { width: 1280, height: 800, scale: 70, turn: viewTurn(1280, 800) };
// 縦長で地球の中心を上の欄と下の安全域の真ん中へずらした画面（見出しが折り返す小さい画面など）。
const SMALL = { width: 320, height: 480, scale: 22.5, turn: viewTurn(320, 480), cx: 160, cy: 262 };
const close = (a, b, message) => assert.ok(Math.abs(a - b) < 1e-12, `${message}: ${a} vs ${b}`);

test("the view turns only on landscape screens", () => {
  assert.equal(viewTurn(390, 844), 0);
  assert.equal(viewTurn(800, 800), 0);
  assert.equal(viewTurn(1280, 800), -Math.PI / 2);
});

test("toWorld undoes toScreen on both screens", () => {
  for (const size of [PHONE, PC, SMALL, { ...PC, cy: 419 }]) {
    for (const point of [{ x: 0, y: 0 }, { x: 1.3, y: -2.4 }, { x: -6.7, y: 0.8 }]) {
      const screen = toScreen(point, size);
      const back = toWorld(screen.x, screen.y, size);
      close(back.x, point.x, "x");
      close(back.y, point.y, "y");
    }
  }
});

test("the Earth's centre on screen is cx, cy when given", () => {
  assert.deepEqual(toScreen({ x: 0, y: 0 }, SMALL), { x: 160, y: 262 });
  assert.deepEqual(toWorld(160, 262, SMALL), { x: 0, y: 0 });
  assert.deepEqual(toScreen({ x: 0, y: 0 }, PHONE), { x: 195, y: 422 });
});

test("the pad is the same world point on any screen, and shown on the long side", () => {
  for (const sign of [1, -1]) {
    for (const slide of [-0.8, 0, 0.6]) {
      const pad = padPosition(sign, slide);
      assert.deepEqual(pad, { x: slide, y: sign * PAD_DISTANCE });
      // 縦長では中心の上下、横長では左右に描かれる。
      const phone = toScreen(pad, PHONE);
      assert.ok(Math.abs(phone.y - PHONE.height / 2) > Math.abs(phone.x - PHONE.width / 2));
      assert.equal(Math.sign(PHONE.height / 2 - phone.y), sign);
      const pc = toScreen(pad, PC);
      assert.ok(Math.abs(pc.x - PC.width / 2) > Math.abs(pc.y - PC.height / 2));
      assert.equal(Math.sign(pc.x - PC.width / 2), sign);
    }
  }
});

// 画面の上で、隕石から地球と反対へ（と少し横へ）、scale に対して同じ割合だけ引く。返すのは世界の引きの量。
function pullOnScreen(size, pad, away, side) {
  const padScreen = toScreen(pad, size);
  const centerScreen = toScreen({ x: 0, y: 0 }, size);
  const length = Math.hypot(padScreen.x - centerScreen.x, padScreen.y - centerScreen.y);
  const out = { x: (padScreen.x - centerScreen.x) / length, y: (padScreen.y - centerScreen.y) / length };
  // 指を置く所は隕石と関係なくてよい（画面のどこからでも引ける）。
  const start = { x: size.width * 0.3, y: size.height * 0.6 };
  const end = {
    x: start.x + (out.x * away - out.y * side) * size.scale,
    y: start.y + (out.y * away + out.x * side) * size.scale,
  };
  const a = toWorld(start.x, start.y, size);
  const b = toWorld(end.x, end.y, size);
  return { x: b.x - a.x, y: b.y - a.y };
}

function throwKm(pad, pull, challenge) {
  const state = launch(pad, launchVelocity(pad, { x: pad.x + pull.x, y: pad.y + pull.y }), 0, 0, DEFAULT_WORLD);
  advance(state, MAX_FLIGHT + 1);
  if (state.result.kind !== "earth") return state.result.kind;
  return missKm(longitudeAt(state.result.angle, state.t, challenge.earthStart, DEFAULT_WORLD.earthPeriod), challenge.target.longitude);
}

test("the same pull on screen gives the same world pull and the same km on both screens", () => {
  let earthHits = 0;
  for (let day = 0; day < 6; day += 1) {
    const challenge = dailyChallenge(new Date(Date.UTC(2026, 10, 10 + day, 3)));
    const pad = padPosition(challenge.padSign, challenge.padSlide);
    for (const [away, side] of [[1.5, 0], [2.2, 0.6], [MAX_PULL * 0.9, -0.9]]) {
      const phone = pullOnScreen(PHONE, pad, away, side);
      const pc = pullOnScreen(PC, pad, away, side);
      const small = pullOnScreen(SMALL, pad, away, side);
      close(phone.x, pc.x, "pull x");
      close(phone.y, pc.y, "pull y");
      close(phone.x, small.x, "pull x (shifted centre)");
      close(phone.y, small.y, "pull y (shifted centre)");
      const c = throwKm(pad, small, challenge);
      const d = throwKm(pad, phone, challenge);
      assert.equal(typeof c, typeof d);
      if (typeof c === "number") assert.ok(Math.abs(c - d) < 1e-6, `${c} vs ${d}`);
      else assert.equal(c, d);
      // 地球と反対へ引いた（隕石は地球へ向かって飛ぶ）。
      assert.ok(phone.x * pad.x + phone.y * pad.y > 0);
      const a = throwKm(pad, phone, challenge);
      const b = throwKm(pad, pc, challenge);
      // 回した画面では cos(-90°) が 0 ちょうどにならず、最後の桁だけ違いうる。出す km（整数）は同じ。
      assert.equal(typeof a, typeof b);
      if (typeof a === "number") {
        assert.ok(Math.abs(a - b) < 1e-6, `${a} vs ${b}`);
        assert.equal(Math.round(a), Math.round(b));
        earthHits += 1;
      } else assert.equal(a, b);
    }
  }
  assert.ok(earthHits > 0);
});

test("the same finger move gives the same pull on any screen size", () => {
  const start = { x: 200, y: 400 };
  const now = { x: 237, y: 351 };
  const a = pullDelta(start, now, PHONE);
  const b = pullDelta(start, now, { ...PHONE, scale: 70 });
  close(a.x, b.x, "x");
  close(a.y, b.y, "y");
  close(Math.hypot(a.x, a.y), Math.hypot(37, 49) / PULL_PX, "length");
});

test("pullDelta points the same way as toWorld", () => {
  // 回さない画面: 上へ 60 px は世界の +y へ 1.0。
  const up = pullDelta({ x: 100, y: 300 }, { x: 100, y: 240 }, PHONE);
  close(up.x, 0, "x");
  close(up.y, 1, "y");
  // -90° 回した画面: 画面の右が世界の上。右へ 60 px は世界の +y、上へ 60 px は世界の -x。
  const right = pullDelta({ x: 300, y: 300 }, { x: 360, y: 300 }, PC);
  close(right.x, 0, "x");
  close(right.y, 1, "y");
  const upPc = pullDelta({ x: 300, y: 300 }, { x: 300, y: 240 }, PC);
  close(upPc.x, -1, "x");
  close(upPc.y, 0, "y");
  // toWorld の差と同じ向き。
  for (const size of [PHONE, PC]) {
    const s = { x: 120, y: 500 };
    const n = { x: 170, y: 470 };
    const w1 = toWorld(s.x, s.y, size);
    const w2 = toWorld(n.x, n.y, size);
    const p = pullDelta(s, n, size);
    close(p.x, ((w2.x - w1.x) * size.scale) / PULL_PX, "x");
    close(p.y, ((w2.y - w1.y) * size.scale) / PULL_PX, "y");
  }
});

test("a long finger move stops at MAX_PULL", () => {
  for (const size of [PHONE, PC]) {
    const p = pullDelta({ x: 0, y: 0 }, { x: 600, y: -800 }, size);
    close(Math.hypot(p.x, p.y), MAX_PULL, "length");
  }
});

test("screenPull: 60 px is a pull of 1, up on the screen is +y, and it stops at MAX_PULL", () => {
  const a = screenPull({ x: 100, y: 100 }, { x: 160, y: 100 });
  assert.ok(Math.abs(a.x - 1) < 1e-12 && Math.abs(a.y) < 1e-12);
  const up = screenPull({ x: 100, y: 100 }, { x: 100, y: 40 });
  assert.ok(Math.abs(up.y - 1) < 1e-12);
  const far = screenPull({ x: 0, y: 0 }, { x: 1000, y: 0 });
  assert.ok(Math.abs(Math.hypot(far.x, far.y) - MAX_PULL) < 1e-12);
});
