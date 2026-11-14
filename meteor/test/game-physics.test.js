import { test } from "node:test";
import assert from "node:assert/strict";
import {
  EARTH_GM,
  EARTH_PERIOD,
  MAX_PULL,
  MOON_DISTANCE,
  MOON_PERIOD,
  MOON_RADIUS,
  advance,
  angleOfLongitude,
  earthRotation,
  launch,
  launchVelocity,
  longitudeAt,
  missKm,
  moonPosition,
  preview,
  rating,
  wrapDegrees,
} from "../src/game/physics.js";

test("a meteor dropped straight in hits the Earth where it falls", () => {
  // 月が遠い側（西）にいる時刻に、東の 8 から真っすぐ地球へ向けて投げる。
  const state = launch({ x: 8, y: 0 }, { x: -1, y: 0 }, 0, Math.PI);
  advance(state, 20);
  assert.equal(state.result.kind, "earth");
  // 月は反対側なので、ほとんど曲がらずに東（角度 0 の近く）に当たる。
  assert.ok(Math.abs(state.result.angle) < 0.05, `angle ${state.result.angle}`);
});

test("a circular orbit neither falls nor flies away within the time limit", () => {
  // 半径 3 の円軌道の速さ √(GM/r)。月を反対側の遠くに置いても少しは引かれるので、当たらず・外へ出ないことだけを見る。
  const r = 3;
  const state = launch({ x: r, y: 0 }, { x: 0, y: Math.sqrt(EARTH_GM / r) }, 0, Math.PI);
  advance(state, 10);
  assert.equal(state.result, null);
  const distance = Math.hypot(state.x, state.y);
  assert.ok(distance > 2 && distance < 4.5, `distance ${distance}`);
});

test("fast throws away from the Earth fly off and are a miss", () => {
  const state = launch({ x: 8, y: 0 }, { x: 3, y: 0 }, 0);
  advance(state, 30);
  assert.equal(state.result.kind, "away");
});

test("the meteor can hit the Moon when the Moon comes round", () => {
  // 月より少し先の通り道に、止まった隕石を置く（月の半径の外）。月が回ってきて当たる。
  const ahead = moonPosition(1.3);
  const now = moonPosition(1);
  assert.ok(Math.hypot(ahead.x - now.x, ahead.y - now.y) > MOON_RADIUS);
  const state = launch(ahead, { x: 0, y: 0 }, 1);
  advance(state, 0.6);
  assert.equal(state.result.kind, "moon");
});

test("a fast meteor does not pass through the Earth between steps, and stops on the surface", () => {
  // 引ける最大の速さより速く、地球の真ん中へ向けて投げる。
  const state = launch({ x: 3, y: 0.001 }, { x: -4, y: 0 }, 0, Math.PI);
  advance(state, 2);
  assert.equal(state.result.kind, "earth");
  assert.ok(Math.abs(Math.hypot(state.x, state.y) - 1) < 1e-9);
});

test("a grazing hit is placed where it crosses the surface", () => {
  // 表面をかすめる向きに投げる。当たった所は半径 1 の上で、1 刻み分の内側ではない。
  const state = launch({ x: 4, y: 0.98 }, { x: -2.5, y: 0 }, 0, Math.PI);
  advance(state, 3);
  assert.equal(state.result.kind, "earth");
  assert.ok(Math.abs(Math.hypot(state.x, state.y) - 1) < 1e-9);
  assert.ok(Math.abs(state.result.angle - Math.atan2(state.y, state.x)) < 1e-12);
});

test("energy is kept while flying (the step is small enough)", () => {
  // 月の重力が無い遠い所で比べるため、月を反対側に置き、地球だけの力学的エネルギーがほとんど変わらないことを見る。
  const state = launch({ x: 4, y: 0 }, { x: 0, y: 0.6 }, 0, Math.PI);
  const energy = (s) => 0.5 * (s.vx ** 2 + s.vy ** 2) - EARTH_GM / Math.hypot(s.x, s.y);
  const before = energy(state);
  advance(state, 2);
  assert.ok(Math.abs(energy(state) - before) < 0.02, `${energy(state)} vs ${before}`);
});

test("pulling back throws the other way, capped at the longest pull", () => {
  assert.deepEqual(launchVelocity({ x: 8, y: 0 }, { x: 9, y: 0 }), { x: -0.55, y: 0 });
  const capped = launchVelocity({ x: 0, y: 0 }, { x: 10, y: 0 });
  assert.ok(Math.abs(Math.hypot(capped.x, capped.y) - MAX_PULL * 0.55) < 1e-9);
});

test("the Earth turns once in EARTH_PERIOD and the Moon once in MOON_PERIOD", () => {
  assert.ok(Math.abs(earthRotation(EARTH_PERIOD) - Math.PI * 2) < 1e-9);
  const moon = moonPosition(MOON_PERIOD);
  assert.ok(Math.abs(moon.x - MOON_DISTANCE) < 1e-9 && Math.abs(moon.y) < 1e-9);
});

test("longitude on the turning Earth", () => {
  // 回り始めは、経度 0° が東（角度 0）。地球が 1/4 回ったら、東を向いているのは経度 -90°。
  assert.equal(longitudeAt(0, 0), 0);
  assert.ok(Math.abs(longitudeAt(0, EARTH_PERIOD / 4) + 90) < 1e-9);
  // 経度から角度へ、角度から経度へで元に戻る。
  for (const longitude of [-170, -45, 0, 139.7]) {
    assert.ok(Math.abs(longitudeAt(angleOfLongitude(longitude, 7.3), 7.3) - longitude) < 1e-9);
  }
});

test("miss distance along the equator, across the date line", () => {
  assert.equal(wrapDegrees(190), -170);
  assert.ok(Math.abs(missKm(179, -179) - 2 * 111.32) < 1e-9);
  assert.equal(missKm(139.7, 139.7), 0);
  assert.equal(rating(100), "ぴったり！");
  assert.equal(rating(5000), "遠い…");
});

test("the preview stops where the flight would end", () => {
  const points = preview({ x: 1.5, y: 0 }, { x: -2, y: 0 }, 0, Math.PI);
  assert.ok(points.length > 0 && points.length < 24);
});
