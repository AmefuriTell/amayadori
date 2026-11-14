import { test } from "node:test";
import assert from "node:assert/strict";
import { EXPLOSION_SECONDS, advanceExplosion, createExplosion, isExplosionOver, shakeOffset } from "../src/game/explosion.js";

function fixedRandom() {
  let seed = 1;
  return () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
}

test("a stronger hit makes a bigger explosion", () => {
  const small = createExplosion(0, fixedRandom());
  const big = createExplosion(1, fixedRandom());
  assert.ok(big.sparks.length > small.sparks.length);
  assert.ok(big.reach > small.reach);
  // 範囲の外の power は 0〜1 に収める。
  assert.equal(createExplosion(5, fixedRandom()).strength, 1);
});

test("the explosion ends after its time, and the shake stops earlier", () => {
  const explosion = createExplosion(1, fixedRandom());
  const shake = shakeOffset(explosion, false, () => 1);
  assert.ok(shake.x > 0 && shake.y > 0);
  assert.deepEqual(shakeOffset(explosion, true, () => 1), { x: 0, y: 0 });
  assert.equal(advanceExplosion(explosion, 0.5), true);
  assert.deepEqual(shakeOffset(explosion, false, () => 1), { x: 0, y: 0 });
  assert.equal(advanceExplosion(explosion, EXPLOSION_SECONDS), false);
  assert.equal(isExplosionOver(explosion), true);
});

test("an explosion on a moon or on the Earth follows it", async () => {
  const { DEFAULT_WORLD, moonPositions } = await import("../src/game/physics.js");
  const { anchorPosition, earthAnchor, moonAnchor } = await import("../src/game/explosion.js");
  const moon = moonPositions(DEFAULT_WORLD, 0)[0];
  const anchor = moonAnchor(DEFAULT_WORLD, 0, { x: moon.x + 0.1, y: moon.y });
  const later = moonPositions(DEFAULT_WORLD, 30)[0];
  const at = anchorPosition(anchor, DEFAULT_WORLD, 30);
  assert.ok(Math.abs(at.x - (later.x + 0.1)) < 1e-9 && Math.abs(at.y - later.y) < 1e-9);
  const ground = earthAnchor({ x: 1, y: 0 }, 0);
  const turned = anchorPosition(ground, DEFAULT_WORLD, 0, Math.PI / 2);
  assert.ok(Math.abs(turned.x) < 1e-9 && Math.abs(turned.y - 1) < 1e-9);
  assert.deepEqual(anchorPosition({ x: 2, y: 3 }, DEFAULT_WORLD, 10), { x: 2, y: 3 });
});
