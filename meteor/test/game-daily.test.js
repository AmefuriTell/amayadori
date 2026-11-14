import { test } from "node:test";
import assert from "node:assert/strict";
import { DAILY_ATTEMPTS, afterThrow, dailyChallenge, dayKey, loadDaily, saveDaily, seededRandom, shareMessage, shotMark } from "../src/game/daily.js";
import { TARGETS } from "../src/game/targets.js";
import { rating } from "../src/game/physics.js";

function memoryStorage() {
  const data = new Map();
  return { getItem: (key) => (data.has(key) ? data.get(key) : null), setItem: (key, value) => data.set(key, String(value)) };
}

test("the day changes at midnight in Japan", () => {
  assert.equal(dayKey(new Date("2026-11-14T14:59:00Z")), "2026-11-14");
  assert.equal(dayKey(new Date("2026-11-14T15:00:00Z")), "2026-11-15");
});

test("everyone gets the same challenge on the same day, and it changes by day", () => {
  const morning = dailyChallenge(new Date("2026-11-13T23:00:00Z"));
  const evening = dailyChallenge(new Date("2026-11-14T12:00:00Z"));
  assert.deepEqual(morning, evening);
  assert.equal(morning.label, "11/14");
  assert.ok(TARGETS.includes(morning.target));
  // 30 日のうちには、違う的も違う向きも出る。
  const days = Array.from({ length: 30 }, (_, index) => dailyChallenge(new Date(Date.UTC(2026, 10, 1 + index, 3))));
  assert.ok(new Set(days.map((day) => day.target.name)).size > 3);
  assert.ok(new Set(days.map((day) => day.earthStart.toFixed(3))).size === 30);
});

test("the seeded random is in [0, 1) and repeatable", () => {
  const a = seededRandom("2026-11-14");
  const b = seededRandom("2026-11-14");
  for (let index = 0; index < 100; index += 1) {
    const value = a();
    assert.equal(value, b());
    assert.ok(value >= 0 && value < 1);
  }
});

test("attempts and the best distance are kept per day on the device", () => {
  const storage = memoryStorage();
  assert.deepEqual(loadDaily("2026-11-14", storage), { left: DAILY_ATTEMPTS, best: null, shots: [] });
  let record = afterThrow(loadDaily("2026-11-14", storage), null);
  record = afterThrow(record, 900);
  record = afterThrow(record, 1200);
  saveDaily("2026-11-14", record, storage);
  assert.deepEqual(loadDaily("2026-11-14", storage), { left: 0, best: 900, shots: [null, 900, 1200] });
  assert.deepEqual(afterThrow(record, 10), { left: 0, best: 10, shots: [null, 900, 1200, 10] });
  // 次の日は、また最初から。
  assert.deepEqual(loadDaily("2026-11-15", storage), { left: DAILY_ATTEMPTS, best: null, shots: [] });
});

test("broken or unavailable storage means a fresh day", () => {
  const broken = { getItem: () => "{not json", setItem: () => {} };
  assert.deepEqual(loadDaily("2026-11-14", broken), { left: DAILY_ATTEMPTS, best: null, shots: [] });
  const blocked = { getItem: () => { throw new Error("blocked"); }, setItem: () => { throw new Error("blocked"); } };
  assert.deepEqual(loadDaily("2026-11-14", blocked), { left: DAILY_ATTEMPTS, best: null, shots: [] });
  saveDaily("2026-11-14", { left: 1, best: 5 }, blocked);
  const tampered = memoryStorage();
  tampered.setItem("weatherbot.daily.2026-11-14", JSON.stringify({ left: 99, best: 1 }));
  assert.deepEqual(loadDaily("2026-11-14", tampered), { left: DAILY_ATTEMPTS, best: null, shots: [] });
});

test("a record saved by an older version (no shots) still loads", () => {
  const storage = memoryStorage();
  storage.setItem("weatherbot.daily.2026-11-14", JSON.stringify({ left: 1, best: 500 }));
  assert.deepEqual(loadDaily("2026-11-14", storage), { left: 1, best: 500, shots: [] });
  // 前の版の記録から投げても、数の合わない印は付けない。
  assert.deepEqual(afterThrow(loadDaily("2026-11-14", storage), 200), { left: 0, best: 200, shots: [] });
  storage.setItem("weatherbot.daily.2026-11-14", JSON.stringify({ left: 1, best: 500, shots: [500] }));
  assert.deepEqual(loadDaily("2026-11-14", storage).shots, []);
  storage.setItem("weatherbot.daily.2026-11-14", JSON.stringify({ left: 1, best: 500, shots: [500, "x"] }));
  assert.deepEqual(loadDaily("2026-11-14", storage).shots, []);
});

test("each shot gets a mark", () => {
  assert.deepEqual([null, 100, 500, 2000, 8000].map(shotMark), ["⬛", "💥", "🟩", "🟨", "🟥"]);
});

test("the share message", () => {
  const challenge = { label: "11/14", target: { name: "東京" } };
  assert.equal(shareMessage(challenge, { left: 1, best: 123.4 }, rating), "🎯 今日の隕石当て 11/14・東京: 123 km（ぴったり！）  2/3回");
  assert.equal(shareMessage(challenge, { left: 0, best: null }, rating), "🎯 今日の隕石当て 11/14・東京: 当たらず…  3/3回");
  assert.equal(shareMessage(challenge, { left: 0, best: 123.4, shots: [null, 2000, 123.4] }, rating), "🎯 今日の隕石当て 11/14・東京: 123 km（ぴったり！）  3/3回 ⬛🟨💥");
});
