import { test } from "node:test";
import assert from "node:assert/strict";
import { canLaunch, clockRuns } from "../src/game/clock.js";

test("the clock stops while aiming and runs while flying or while a panel is open", () => {
  assert.equal(clockRuns(null, false), false);
  assert.equal(clockRuns({ x: 0, y: 0 }, false), true);
  assert.equal(clockRuns(null, true), true);
});

test("a pull launches only while aiming with no panel open", () => {
  assert.equal(canLaunch({ flying: null, panelOpen: false, pulled: 1 }), true);
  assert.equal(canLaunch({ flying: null, panelOpen: true, pulled: 1 }), false);
  assert.equal(canLaunch({ flying: { x: 0, y: 0 }, panelOpen: false, pulled: 1 }), false);
  assert.equal(canLaunch({ flying: null, panelOpen: false, pulled: 0.1 }), false);
});
