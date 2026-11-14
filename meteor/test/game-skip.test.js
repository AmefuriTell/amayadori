import { test } from "node:test";
import assert from "node:assert/strict";
import { DEFAULT_WORLD, MAX_FLIGHT, STEP, advance, launch, launchVelocity } from "../src/game/physics.js";
import { padPosition, toWorld, viewTurn } from "../src/game/view.js";
import { insideArea, missAhead, visibleArea } from "../src/game/skip.js";
import { STAGES } from "../src/game/stages.js";

// iPhone 13 相当（縦長）と 1280×800（横長）。scale はおよその値（地球の半径の px）。
const PHONE = { width: 390, height: 844, scale: 34, turn: viewTurn(390, 844) };
const PC = { width: 1280, height: 800, scale: 70, turn: viewTurn(1280, 800), cy: 419 };
const visibleOn = (size) => {
  const area = visibleArea(size, 7);
  return (point) => insideArea(point, area);
};

// 置き場（世界の上）から pull だけ引いて投げた状態。
function thrown(pull, world = DEFAULT_WORLD, slide = 0) {
  const pad = padPosition(1, slide);
  return launch(pad, launchVelocity(pad, { x: pad.x + pull.x, y: pad.y + pull.y }), 0, 0, world);
}

// 画面に見えている間、STEP ずつ進める（game.js では、ここで外へ出たと分かって先読みする）。
function flyUntilOut(state, isVisible) {
  while (state.result === null && isVisible(state)) advance(state, STEP);
  return state;
}

test("the visible area is the screen's corners in the world, on turned and shifted screens", () => {
  for (const size of [PHONE, PC]) {
    const area = visibleArea(size, 0);
    const inside = (point) => insideArea(point, area);
    for (const [px, py, expected] of [[size.width / 2, size.height / 2, true], [1, 1, true], [size.width - 1, size.height - 1, true], [-2, 10, false], [size.width + 2, 10, false], [10, size.height + 2, false]]) {
      // 画面の px の点を世界に直して、範囲の中かを見る。
      const world = toWorld(px, py, size);
      assert.equal(inside(world), expected, `${size.width}x${size.height} (${px}, ${py})`);
    }
  }
});

test("a throw that flies straight off the screen is a miss decided ahead, the same as advancing to the end", () => {
  for (const size of [PHONE, PC]) {
    const isVisible = visibleOn(size);
    // 地球の方へいっぱいに引く＝地球と反対の向きへまっすぐ飛ぶ。
    const state = flyUntilOut(thrown({ x: 0, y: -3 }), isVisible);
    assert.equal(state.result, null);
    const before = { ...state };
    const ahead = missAhead(state, isVisible);
    assert.ok(ahead, "decided ahead");
    assert.equal(ahead.result.kind, "away");
    // 元の状態は変えない。
    assert.deepEqual(state, before);
    const full = advance({ ...state }, MAX_FLIGHT);
    assert.equal(ahead.flight, full.flight);
    assert.equal(ahead.t, full.t);
    assert.deepEqual(ahead.result, full.result);
    assert.equal(ahead.x, full.x);
    assert.equal(ahead.y, full.y);
  }
});

test("a throw that leaves the screen, comes back and hits the Earth is not decided ahead", () => {
  // 逆回りの重い月の面で、横へ振られて画面の外へ出てから戻り、約 29 秒で地球に当たる投げ（physics.js で探した）。
  const world = STAGES.find((stage) => stage.id === "heavy").world;
  const isVisible = visibleOn(PHONE);
  const state = flyUntilOut(thrown({ x: 1, y: -0.5 }, world), isVisible);
  assert.equal(state.result, null, "left the screen while flying");
  assert.equal(missAhead(state, isVisible), null);
  assert.equal(advance({ ...state }, MAX_FLIGHT).result.kind, "earth");
});

test("throws that hit the Moon or the Earth are never decided ahead, even when nothing is visible", () => {
  for (const pull of [{ x: -3, y: 2.75 }, { x: -0.5, y: 0 }]) {
    const state = thrown(pull);
    const kind = advance({ ...state }, MAX_FLIGHT).result.kind;
    assert.ok(kind === "moon" || kind === "earth", kind);
    assert.equal(missAhead(state, () => false), null);
  }
  assert.equal(advance(thrown({ x: -3, y: 2.75 }), MAX_FLIGHT).result.kind, "moon");
  assert.equal(advance(thrown({ x: -0.5, y: 0 }), MAX_FLIGHT).result.kind, "earth");
});
