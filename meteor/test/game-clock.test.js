import { test } from "node:test";
import assert from "node:assert/strict";
import { clockRuns } from "../src/game/clock.js";

test("the clock stops while aiming and runs while flying or while a panel is open", () => {
  assert.equal(clockRuns(null, false), false);
  assert.equal(clockRuns({ x: 0, y: 0 }, false), true);
  assert.equal(clockRuns(null, true), true);
});
