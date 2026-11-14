import { test } from "node:test";
import assert from "node:assert/strict";
import { CLEAR_KM, STAGES, afterStageThrow, isOpen, loadProgress, saveProgress } from "../src/game/stages.js";
import { PAD_DISTANCE, padPosition } from "../src/game/view.js";
import { DEFAULT_WORLD, MAX_FLIGHT, MAX_PULL, advance, launch, launchVelocity, longitudeAt, moonPositions, outerOrbit } from "../src/game/physics.js";

// 作り替える前（世界を引数にする前、#83 の時点）の物理で、同じ投げ方を計算した値。
const GOLDEN = { kind: "earth", angle: 1.8281145058661332, t: 9.505064676428013 };

function memoryStorage() {
  const data = new Map();
  return { getItem: (key) => (data.has(key) ? data.get(key) : null), setItem: (key, value) => data.set(key, String(value)) };
}

test("every stage is a sane world: moons outside the Earth and inside the play area", () => {
  assert.equal(new Set(STAGES.map((stage) => stage.id)).size, STAGES.length);
  for (const stage of STAGES) {
    assert.ok(stage.world.earthGM > 0 && stage.world.earthPeriod > 0, stage.id);
    for (const moon of stage.world.moons) {
      assert.ok(moon.distance - moon.radius > 1.5, `${stage.id} moon too close`);
      assert.ok(moon.period > 0 && moon.gm > 0 && moon.radius > 0, stage.id);
    }
    // 隕石は半径 6.7 に置くので、いちばん外の月の軌道はその内側（余白 0.5 以上）に収まる。
    assert.ok(outerOrbit(stage.world) + 0.5 <= 6.7, stage.id);
  }
  // 最初の面には月が無い（易しく始めるため）。
  assert.equal(STAGES[0].world.moons.length, 0);
});

test("every stage can be cleared from the real pad within the real pull", () => {
  // 画面と同じ置き場（padPosition。半径 6.7 の上か下）から、引ける長さ（MAX_PULL）までで投げ、時刻・向き・強さを変えて、
  // 赤道を 30° ごとに分けたどの区間にも当てられることを確かめる（どの的も、間合いしだいで狙える）。
  for (const stage of STAGES) {
    const covered = new Set();
    for (const pad of [padPosition(1, 0), padPosition(-1, 0)]) {
      for (let t = 0; t < stage.world.earthPeriod; t += 1.5) {
        for (let side = -2.5; side <= 2.5; side += 0.5) {
          for (const pull of [1.2, 2.0, MAX_PULL]) {
            const outward = { x: pad.x / PAD_DISTANCE, y: pad.y / PAD_DISTANCE };
            const to = { x: pad.x + outward.x * pull - outward.y * side, y: pad.y + outward.y * pull + outward.x * side };
            const state = launch(pad, launchVelocity(pad, to), t, 0, stage.world);
            advance(state, MAX_FLIGHT + 1);
            if (state.result.kind === "earth") covered.add(Math.floor((longitudeAt(state.result.angle, state.t, 0, stage.world.earthPeriod) + 180) / 30));
          }
        }
      }
    }
    assert.equal(covered.size, 12, `${stage.id}: ${[...covered].sort((a, b) => a - b)}`);
  }
});

test("the default world is the same as before (a fixed throw lands in the same place)", () => {
  // 世界を引数にした後も、ふつうの世界の軌道が変わっていないこと（作り替える前の値で確かめる）。
  const state = launch({ x: 0, y: 6.7 }, launchVelocity({ x: 0, y: 6.7 }, { x: 0.5, y: 8.0 }), 3, 0, DEFAULT_WORLD);
  advance(state, MAX_FLIGHT + 1);
  assert.equal(state.result.kind, GOLDEN.kind);
  assert.ok(Math.abs(state.result.angle - GOLDEN.angle) < 1e-9, `${state.result.angle}`);
  assert.ok(Math.abs(state.t - GOLDEN.t) < 1e-9, `${state.t}`);
});

test("the second moon also collides", () => {
  const twin = STAGES.find((stage) => stage.id === "twin").world;
  const [, outer] = moonPositions(twin, 1.4);
  // 外の月の通り道の少し先に止まった隕石を置くと、外の月が回ってきて当たる。
  const state = launch({ x: outer.x, y: outer.y }, { x: 0, y: 0 }, 1.0, 0, twin);
  advance(state, 0.8);
  assert.equal(state.result.kind, "moon");
});

test("moons can turn the other way", () => {
  const heavy = STAGES.find((stage) => stage.id === "heavy").world;
  const [start] = moonPositions(heavy, 0);
  const [later] = moonPositions(heavy, 1);
  // 時計回り: 角度が減る。
  assert.ok(Math.atan2(later.y, later.x) < Math.atan2(start.y, start.x));
  const [forward] = moonPositions(DEFAULT_WORLD, 1);
  assert.ok(Math.atan2(forward.y, forward.x) > 0);
});

test("clearing the newest stage opens the next one; replays do not skip ahead", () => {
  let progress = { cleared: 0, best: {} };
  assert.ok(isOpen(progress, 0));
  assert.ok(!isOpen(progress, 1));
  progress = afterStageThrow(progress, 0, CLEAR_KM + 1);
  assert.equal(progress.cleared, 0);
  assert.equal(progress.best.first, CLEAR_KM + 1);
  progress = afterStageThrow(progress, 0, 400);
  assert.equal(progress.cleared, 1);
  assert.equal(progress.best.first, 400);
  // 前の面をもう一度クリアしても、先へは飛ばない。
  progress = afterStageThrow(progress, 0, 100);
  assert.equal(progress.cleared, 1);
  // 外れは記録を変えない。
  assert.deepEqual(afterStageThrow(progress, 1, null), progress);
  // 最後の面までクリアしても、面の数を超えない。
  let all = { cleared: STAGES.length - 1, best: {} };
  all = afterStageThrow(all, STAGES.length - 1, 10);
  assert.equal(all.cleared, STAGES.length);
  assert.ok(!isOpen(all, STAGES.length));
});

test("progress is kept on the device, and bad data means a fresh start", () => {
  const storage = memoryStorage();
  assert.deepEqual(loadProgress(storage), { cleared: 0, best: {} });
  saveProgress({ cleared: 2, best: { first: 300, moon: 800 } }, storage);
  assert.deepEqual(loadProgress(storage), { cleared: 2, best: { first: 300, moon: 800 } });
  storage.setItem("weatherbot.stages", JSON.stringify({ cleared: 99, best: {} }));
  assert.deepEqual(loadProgress(storage), { cleared: 0, best: {} });
  storage.setItem("weatherbot.stages", JSON.stringify({ cleared: 1, best: { first: "x", nope: 1 } }));
  assert.deepEqual(loadProgress(storage), { cleared: 1, best: {} });
  const blocked = { getItem: () => { throw new Error("blocked"); }, setItem: () => { throw new Error("blocked"); } };
  assert.deepEqual(loadProgress(blocked), { cleared: 0, best: {} });
  saveProgress({ cleared: 1, best: {} }, blocked);
});
