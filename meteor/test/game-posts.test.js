import { test } from "node:test";
import assert from "node:assert/strict";
import { allClearedMessage, hitMessage, orbitMessage } from "../src/game/posts.js";
import { rating } from "../src/game/physics.js";

test("the post for a hit says where, how far and how good", () => {
  assert.equal(hitMessage({ stage: null, cleared: false }, "東京", 1234.4, rating), "☄️ 隕石当て フリー練習: 東京 まで 1,234 km（まあまあ）");
  assert.equal(hitMessage({ stage: { number: 3, name: "早回りの地球" }, cleared: true }, "パリ", 250, rating), "☄️ 隕石当て ステージ3「早回りの地球」: パリ まで 250 km（ぴったり！） クリア！");
  assert.equal(allClearedMessage(5), "🪐 隕石当て 全5ステージ クリア！");
});

test("the post for the orbit game has the points, turns and the biggest orbit", () => {
  assert.equal(orbitMessage({ points: 12345, turns: 7, biggest: 4.26 }, false, true), "🛰️ 軌道に乗せろ（ふつうモード）: 12,345 点・7 周・いちばん大きな軌道は地球の半径の 4.3 倍 新記録！");
  assert.equal(orbitMessage({ points: 0, turns: 0, biggest: 0 }, true, false), "🛰️ 軌道に乗せろ（🧲引き合うモード）: 0 点・0 周・いちばん大きな軌道は地球の半径の 0.0 倍");
});
