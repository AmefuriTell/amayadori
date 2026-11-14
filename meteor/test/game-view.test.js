import { test } from "node:test";
import assert from "node:assert/strict";
import { PAD_DISTANCE, padPosition, toScreen, toWorld, viewTurn } from "../src/game/view.js";
import { dailyChallenge } from "../src/game/daily.js";
import { DEFAULT_WORLD, MAX_FLIGHT, MAX_PULL, advance, launch, launchVelocity, longitudeAt, missKm } from "../src/game/physics.js";

// iPhone 13 相当（縦長）と 1280×800（横長）。scale はおよその値（地球の半径の px）。
const PHONE = { width: 390, height: 844, scale: 34, turn: viewTurn(390, 844) };
const PC = { width: 1280, height: 800, scale: 70, turn: viewTurn(1280, 800) };
const close = (a, b, message) => assert.ok(Math.abs(a - b) < 1e-12, `${message}: ${a} vs ${b}`);

test("the view turns only on landscape screens", () => {
  assert.equal(viewTurn(390, 844), 0);
  assert.equal(viewTurn(800, 800), 0);
  assert.equal(viewTurn(1280, 800), -Math.PI / 2);
});

test("toWorld undoes toScreen on both screens", () => {
  for (const size of [PHONE, PC]) {
    for (const point of [{ x: 0, y: 0 }, { x: 1.3, y: -2.4 }, { x: -6.7, y: 0.8 }]) {
      const screen = toScreen(point, size);
      const back = toWorld(screen.x, screen.y, size);
      close(back.x, point.x, "x");
      close(back.y, point.y, "y");
    }
  }
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
      close(phone.x, pc.x, "pull x");
      close(phone.y, pc.y, "pull y");
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
