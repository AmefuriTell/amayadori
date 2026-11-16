import { test } from "node:test";
import assert from "node:assert/strict";
import { DEFAULT_WORLD, EARTH_GM, MOON_DISTANCE, launchVelocity } from "../src/game/physics.js";
import {
  CUE_RISING,
  CUE_SAFE,
  LAUNCH_ANGLE,
  LAUNCH_SPEED,
  aimClick,
  autoSpeed,
  boostCue,
  aimLineStyle,
  BOOST,
  ESCAPE_DISTANCE,
  FUEL,
  LAUNCH_RADIUS,
  MIN_PLACE_DISTANCE,
  ORBIT_WORLD,
  GAME_SECONDS,
  SATELLITES,
  SAT_RADIUS,
  addSatellite,
  beforeFirstSatellite,
  boost,
  boostTarget,
  canLaunch,
  canPlace,
  elapsed,
  clampZoom,
  createOrbitGame,
  endSound,
  firstTurns,
  isOver,
  launchFromSite,
  launchShot,
  launchSite,
  loadBest,
  nextSlot,
  predictOrbit,
  saveBest,
  satellitesLeft,
  scoreOf,
  step,
  turnsOf,
  PREVIEW_START,
  previewShot,
} from "../src/game/orbit.js";

const NO_MOON = { ...DEFAULT_WORLD, moons: [] };

function circular(r, angle = 0) {
  const v = Math.sqrt(EARTH_GM / r);
  return { position: { x: r * Math.cos(angle), y: r * Math.sin(angle) }, velocity: { x: -v * Math.sin(angle), y: v * Math.cos(angle) } };
}

test("a circular orbit without a moon keeps going and counts turns", () => {
  const game = createOrbitGame(NO_MOON);
  const { position, velocity } = circular(2);
  addSatellite(game, position, velocity);
  // 半径 2 の円軌道の周期は 2π√(r³/GM) = 2π·2 ≈ 12.57 秒。100 秒で 7 周。
  step(game, 100);
  const [satellite] = game.satellites;
  assert.ok(satellite.alive);
  assert.equal(satellite.turns, 7);
  assert.deepEqual(scoreOf(game), { turns: 7 });
});

test("a smaller orbit makes more turns (the score is the turns)", () => {
  const score = (r) => {
    const game = createOrbitGame(NO_MOON);
    const { position, velocity } = circular(r);
    addSatellite(game, position, velocity);
    step(game, 200);
    return scoreOf(game);
  };
  const small = score(1.5);
  const big = score(4);
  assert.ok(small.turns > big.turns, `${small.turns} vs ${big.turns}`);
});

test("a clockwise orbit counts turns too", () => {
  const game = createOrbitGame(NO_MOON);
  const { position, velocity } = circular(2);
  addSatellite(game, position, { x: -velocity.x, y: -velocity.y });
  step(game, 30);
  assert.equal(game.satellites[0].turns, 2);
});

test("satellites fall to Earth, fly away, or hit each other", () => {
  const game = createOrbitGame(NO_MOON);
  addSatellite(game, { x: 3, y: 0 }, { x: 0, y: 0 });
  addSatellite(game, { x: 3, y: 1 }, { x: 3, y: 0 });
  step(game, 20);
  assert.equal(game.satellites[0].end, "earth");
  assert.equal(game.satellites[1].end, "away");
  // 同じ円軌道を逆向きに回る 2 機は、半周ほどでぶつかる。
  const crash = createOrbitGame(NO_MOON);
  const a = circular(2, 0);
  const b = circular(2, Math.PI);
  addSatellite(crash, a.position, a.velocity);
  addSatellite(crash, b.position, { x: -b.velocity.x, y: -b.velocity.y });
  step(crash, 10);
  assert.deepEqual(crash.satellites.map((s) => s.end), ["crash", "crash"]);
});

test("the Moon disturbs orbits and can be hit", () => {
  // 月の軌道のすぐ外の円軌道は、月に乱されて長くは同じ形でいられない（落ちる・ぶつかる・飛び去るのどれか）。
  const game = createOrbitGame(ORBIT_WORLD);
  const { position, velocity } = circular(MOON_DISTANCE + 0.5, Math.PI / 3);
  addSatellite(game, position, velocity);
  step(game, GAME_SECONDS);
  assert.ok(game.satellites[0].end !== null, "the Moon should end this orbit");
});

test("in mutual mode satellites pull each other; in normal mode they do not", () => {
  const run = (mutual) => {
    const game = createOrbitGame(NO_MOON, mutual);
    const a = circular(2, 0);
    const b = circular(2.4, 0.2);
    addSatellite(game, a.position, a.velocity);
    addSatellite(game, b.position, b.velocity);
    step(game, 5);
    return game.satellites.map((s) => [s.x, s.y]);
  };
  const normal = run(false);
  const mutual = run(true);
  assert.ok(Math.hypot(normal[0][0] - mutual[0][0], normal[0][1] - mutual[0][1]) > 1e-4);
  // ふつうのモードの 1 機目は、ひとりで回したときと同じ。
  const alone = createOrbitGame(NO_MOON);
  const a = circular(2, 0);
  addSatellite(alone, a.position, a.velocity);
  step(alone, 5);
  assert.ok(Math.abs(alone.satellites[0].x - normal[0][0]) < 1e-12);
});

test("placing: not too close to Earth or the Moon, not too far, at most SATELLITES", () => {
  const game = createOrbitGame(ORBIT_WORLD);
  assert.ok(!canPlace(game, { x: 1.1, y: 0 }));
  assert.ok(!canPlace(game, { x: MOON_DISTANCE, y: 0 }));
  assert.ok(!canPlace(game, { x: 20, y: 0 }));
  assert.ok(canPlace(game, { x: 0, y: 2.5 }));
  assert.equal(addSatellite(game, { x: 1.1, y: 0 }, { x: 0, y: 0 }), null);
  for (let index = 0; index < SATELLITES; index += 1) assert.ok(addSatellite(game, { x: 0, y: 2 + index }, { x: 1, y: 0 }));
  assert.equal(satellitesLeft(game), 0);
  assert.equal(addSatellite(game, { x: 0, y: 6 }, { x: 1, y: 0 }), null);
});

test("the game ends only when time is up, not when every satellite is gone", () => {
  const game = createOrbitGame(NO_MOON);
  assert.ok(!isOver(game));
  for (let index = 0; index < SATELLITES; index += 1) addSatellite(game, { x: 0, y: 3 + index * 0.5 }, { x: 0, y: 0 });
  step(game, 30);
  assert.ok(game.satellites.every((satellite) => !satellite.alive));
  assert.ok(!isOver(game));
  assert.equal(satellitesLeft(game), SATELLITES);
  step(game, GAME_SECONDS);
  assert.ok(isOver(game));
  const long = createOrbitGame(NO_MOON);
  const { position, velocity } = circular(2);
  addSatellite(long, position, velocity);
  step(long, GAME_SECONDS + 100);
  assert.ok(Math.abs(long.t - GAME_SECONDS) < 1e-9);
  assert.ok(isOver(long));
});

test("energy is kept on a long fast-forward (the step stays small)", () => {
  const game = createOrbitGame(NO_MOON);
  addSatellite(game, { x: 2, y: 0 }, { x: 0, y: 1.2 });
  const energy = (s) => 0.5 * (s.vx ** 2 + s.vy ** 2) - EARTH_GM / Math.hypot(s.x, s.y);
  const before = energy(game.satellites[0]);
  step(game, 300);
  assert.ok(game.satellites[0].alive);
  assert.ok(Math.abs(energy(game.satellites[0]) - before) < 0.005, `${energy(game.satellites[0])} vs ${before}`);
});

test("zoom is clamped and best scores are kept per mode", () => {
  assert.equal(clampZoom(10), 3);
  assert.equal(clampZoom(0.01), 0.35);
  const data = new Map();
  const storage = { getItem: (key) => data.get(key) ?? null, setItem: (key, value) => data.set(key, value) };
  assert.deepEqual(loadBest(storage), {});
  saveBest({ normal: 42, mutual: 7 }, storage);
  assert.deepEqual(loadBest(storage), { normal: 42, mutual: 7 });
  storage.setItem("weatherbot.orbitLaunch3", "{bad");
  assert.deepEqual(loadBest(storage), {});
  assert.equal(ESCAPE_DISTANCE > MOON_DISTANCE * 2, true);
  assert.ok(SAT_RADIUS > 0);
});

test("a launch starts on the turning Earth and carries the spin", () => {
  const game = createOrbitGame(NO_MOON);
  const site = launchSite(game, 0);
  assert.ok(Math.abs(Math.hypot(site.position.x, site.position.y) - LAUNCH_RADIUS) < 1e-12);
  // 自転は反時計回りなので、自転の速さは位置に直角で、反時計回りの向き。
  assert.ok(Math.abs(site.position.x * site.spin.x + site.position.y * site.spin.y) < 1e-12);
  assert.ok(site.position.x * site.spin.y - site.position.y * site.spin.x > 0);
  // 時間がたつと射場は回る。
  step(game, 10);
  const later = launchSite(game, 0);
  assert.ok(Math.hypot(later.position.x - site.position.x, later.position.y - site.position.y) > 0.1);
  // 打ち上げた衛星の速さには自転の速さが足される。
  const satellite = launchFromSite(game, { x: 0, y: 0 }, 0);
  assert.ok(Math.abs(Math.hypot(satellite.vx, satellite.vy) - Math.hypot(later.spin.x, later.spin.y)) < 1e-12);
});

test("one push from the ground only grazes; boosting at the top makes a lasting orbit", () => {
  // 射場から真横（東）へ、円軌道より少し速く打ち出す。そのままだと、打ち出した高さ（地表のすぐ上）にまた戻ってくる。
  const throwFrom = (withBoost) => {
    const game = createOrbitGame(NO_MOON);
    const site = launchSite(game, 0);
    const r = Math.hypot(site.position.x, site.position.y);
    const tangent = { x: -site.position.y / r, y: site.position.x / r };
    const speed = 1.6 - Math.hypot(site.spin.x, site.spin.y);
    const satellite = launchFromSite(game, { x: tangent.x * speed, y: tangent.y * speed }, 0);
    // いちばん高い所（遠ざかるのが止まった所）を過ぎてから、いちばん低い所を測る（打ち出した直後の低さを数えないため）。
    let lowest = Infinity;
    let topReached = false;
    for (let seconds = 0; seconds < 60; seconds += 0.05) {
      const before = Math.hypot(satellite.x, satellite.y);
      step(game, 0.05);
      const after = Math.hypot(satellite.x, satellite.y);
      if (!topReached && after < before) {
        topReached = true;
        // 加速するなら、ここで燃料を使い切るまで。
        if (withBoost) while (boost(satellite));
      }
      if (topReached) lowest = Math.min(lowest, after);
    }
    return { satellite, lowest };
  };
  const once = throwFrom(false);
  const boosted = throwFrom(true);
  // 加速しなければ、いちばん高い所を過ぎた後、打ち出した高さ（地表のすぐ上）まで戻ってくる。
  assert.ok(Math.abs(once.lowest - LAUNCH_RADIUS) < 0.02, `one push comes back to ${once.lowest}`);
  assert.ok(boosted.satellite.alive);
  assert.ok(boosted.lowest > once.lowest + 0.2, `boosted lowest ${boosted.lowest}`);
  assert.ok(boosted.satellite.fuel < BOOST);
});

test("boost uses fuel along the direction of motion and targets the newest flying satellite", () => {
  const game = createOrbitGame(NO_MOON);
  const first = addSatellite(game, { x: 2, y: 0 }, { x: 0, y: 1 });
  const second = addSatellite(game, { x: 0, y: 3 }, { x: -0.8, y: 0 });
  assert.equal(boostTarget(game), second);
  assert.ok(boost(second));
  assert.ok(Math.abs(second.vx + 0.8 + BOOST) < 1e-12 && Math.abs(second.vy) < 1e-12);
  assert.ok(Math.abs(second.fuel - (FUEL - BOOST)) < 1e-12);
  while (boost(second));
  assert.ok(!boost(second));
  second.alive = false;
  assert.equal(boostTarget(game), first);
});

test("a satellite cannot be placed or launched on top of a flying one", () => {
  const game = createOrbitGame(NO_MOON);
  const { position, velocity } = circular(2);
  addSatellite(game, position, velocity);
  assert.ok(!canPlace(game, { x: 2.1, y: 0 }));
  assert.equal(addSatellite(game, { x: 2.1, y: 0 }, { x: 0, y: 1 }), null);
  assert.ok(canPlace(game, { x: -2, y: 0 }));
  // 打ち上げた直後に続けて打ち上げると、前の衛星がまだ射場にいるので打ち上げられない（連打で 2 機とも壊れないように）。
  const launches = createOrbitGame(NO_MOON);
  assert.ok(launchFromSite(launches, { x: 0, y: 0.1 }, 0));
  step(launches, 0.05);
  assert.ok(!canLaunch(launches, 0));
  assert.equal(launchFromSite(launches, { x: 0, y: 0.1 }, 0), null);
});

test("game time starts at the first satellite; Earth and Moon move before that", () => {
  const game = createOrbitGame(ORBIT_WORLD);
  step(game, 100);
  assert.equal(elapsed(game), 0);
  assert.ok(game.t > 99);
  assert.ok(!isOver(game));
  const { position, velocity } = circular(2, Math.PI);
  addSatellite(game, position, velocity);
  step(game, GAME_SECONDS + 50);
  assert.ok(Math.abs(elapsed(game) - GAME_SECONDS) < 1e-6);
  assert.ok(isOver(game));
});

test("three satellites touching at once all crash", () => {
  const game = createOrbitGame(NO_MOON);
  // 3 機を少し離して置き、同じ点へ向けて動かす（置ける間隔を空けて、真ん中で同時に触れる）。
  game.satellites.push(
    ...[[-0.5, 3], [0.5, 3], [0, 3.5]].map(([x, y], index) => ({
      id: 100 + index, x, y, vx: -x * 2, vy: (3.1 - y) * 2, alive: true, fuel: 0, end: null, turns: 0, sweep: 0, angle: Math.atan2(y, x),
    })),
  );
  game.started = 0;
  step(game, 0.5);
  assert.deepEqual(game.satellites.map((s) => s.end), ["crash", "crash", "crash"]);
});

test("before the first satellite, until one is placed", () => {
  const game = createOrbitGame(NO_MOON);
  assert.equal(beforeFirstSatellite(game), true);
  step(game, 30);
  assert.equal(beforeFirstSatellite(game), true);
  const { position, velocity } = circular(2);
  assert.ok(addSatellite(game, position, velocity));
  assert.equal(beforeFirstSatellite(game), false);
});

test("loadBest reads a record saved in the current shape", () => {
  const storage = { getItem: (key) => (key === "weatherbot.orbitLaunch3" ? '{"normal":222,"mutual":50}' : null), setItem: () => {} };
  assert.deepEqual(loadBest(storage), { normal: 222, mutual: 50 });
});

test("loadBest reads only the new key (not weatherbot.orbitLaunch, weatherbot.orbitTurns or weatherbot.orbitBest) and saveBest leaves the old ones", () => {
  const data = new Map([
    ["weatherbot.orbitBest", '{"normal":853.6}'],
    ["weatherbot.orbitTurns", '{"normal":91,"mutual":40}'],
    ["weatherbot.orbitLaunch", '{"normal":222,"mutual":50}'],
  ]);
  const storage = { getItem: (key) => data.get(key) ?? null, setItem: (key, value) => data.set(key, value) };
  assert.deepEqual(loadBest(storage), {});
  saveBest({ normal: 3 }, storage);
  assert.equal(data.get("weatherbot.orbitLaunch3"), '{"normal":3}');
  assert.deepEqual(loadBest(storage), { normal: 3 });
  assert.equal(data.get("weatherbot.orbitLaunch"), '{"normal":222,"mutual":50}');
  assert.equal(data.get("weatherbot.orbitBest"), '{"normal":853.6}');
  assert.equal(data.get("weatherbot.orbitTurns"), '{"normal":91,"mutual":40}');
});

test("satellitesLeft counts the flying satellites: one gone after three lets a fourth go out", () => {
  const game = createOrbitGame(NO_MOON);
  const [a, b, c] = [2, 3, 4].map((r, index) => {
    const { position, velocity } = circular(r, index * 2);
    return addSatellite(game, position, velocity);
  });
  assert.ok(a && b && c);
  assert.equal(satellitesLeft(game), 0);
  assert.equal(addSatellite(game, circular(5).position, circular(5).velocity), null);
  assert.equal(launchFromSite(game, { x: 0, y: 2 }, 0), null);
  // 1 機を地球へ落とす（いなくなる）。
  b.vx = 0;
  b.vy = 0;
  b.x = 0;
  b.y = 1.05;
  step(game, 1);
  assert.equal(b.alive, false);
  assert.equal(satellitesLeft(game), 1);
  const { position, velocity } = circular(5, 1);
  assert.ok(addSatellite(game, position, velocity));
  assert.equal(satellitesLeft(game), 0);
  assert.equal(game.satellites.length, 4);
});

test("slot: 0, 1, 2 in order; the next one after slot 1 is gone takes slot 1; flying slots never overlap", () => {
  const game = createOrbitGame(NO_MOON);
  const made = [2, 3, 4].map((r, index) => {
    const { position, velocity } = circular(r, index * 2);
    return addSatellite(game, position, velocity);
  });
  assert.deepEqual(made.map((satellite) => satellite.slot), [0, 1, 2]);
  assert.equal(nextSlot(game), 3);
  made[1].x = 0;
  made[1].y = 1.05;
  made[1].vx = 0;
  made[1].vy = 0;
  step(game, 1);
  assert.equal(nextSlot(game), 1);
  const { position, velocity } = circular(5, 1);
  const fourth = addSatellite(game, position, velocity);
  assert.equal(fourth.slot, 1);
  const slots = game.satellites.filter((satellite) => satellite.alive).map((satellite) => satellite.slot);
  assert.equal(new Set(slots).size, slots.length);
  assert.deepEqual([...slots].sort(), [0, 1, 2]);
  // いなくなった衛星の周も点に入る。
  made[1].turns = 4;
  assert.equal(scoreOf(game).turns, game.satellites.reduce((sum, satellite) => sum + satellite.turns, 0));
});

test("predictOrbit: a circular orbit at r=3 without a moon comes back to where it started after one turn", () => {
  const game = createOrbitGame(NO_MOON);
  const { position, velocity } = circular(3);
  const { points, end } = predictOrbit(game, position, velocity);
  assert.equal(end, "turn");
  // 周期は 2π√(27/GM)。
  const seconds = (points.length - 1) * 0.25;
  assert.ok(Math.abs(seconds - 2 * Math.PI * Math.sqrt(27 / EARTH_GM)) < 0.3 && Math.abs(seconds - 23.1) < 0.3, `${seconds}`);
  const lastPoint = points[points.length - 1];
  assert.ok(Math.hypot(lastPoint.x - position.x, lastPoint.y - position.y) < 0.05);
});

test("predictOrbit: faster than escape speed at r=6 flies away", () => {
  const game = createOrbitGame(ORBIT_WORLD);
  const v = Math.sqrt((2 * EARTH_GM) / 6) * 1.05;
  assert.equal(predictOrbit(game, { x: 0, y: -6 }, { x: v, y: 0 }).end, "away");
});

test("predictOrbit: thrown toward the earth falls on it", () => {
  const game = createOrbitGame(ORBIT_WORLD);
  const { points, end } = predictOrbit(game, { x: 3, y: 0 }, { x: -0.5, y: 0 });
  assert.equal(end, "earth");
  const lastPoint = points[points.length - 1];
  assert.ok(Math.hypot(lastPoint.x, lastPoint.y) <= 1);
});

test("predictOrbit agrees with step() for several throws with the moon", () => {
  const outcome = (satellite) => (satellite.turns > 0 ? "turn" : satellite.end || "long");
  const cases = [];
  for (const r of [2, 3, 4.5, 6, 8]) {
    for (const factor of [0.6, 0.9, 1, 1.15, 1.4]) cases.push({ r, factor, angle: r });
  }
  const ends = new Set();
  for (const { r, factor, angle } of cases) {
    const game = createOrbitGame(ORBIT_WORLD);
    step(game, 7);
    const { position, velocity } = circular(r, angle);
    velocity.x *= factor;
    velocity.y *= factor;
    if (!canPlace(game, position)) continue;
    const predicted = predictOrbit(game, position, velocity).end;
    const satellite = addSatellite(game, position, velocity);
    for (let t = 0; t < 240 && satellite.alive && satellite.turns === 0; t += 0.5) step(game, 0.5);
    assert.equal(predicted, outcome(satellite), `r=${r} ×${factor}`);
    ends.add(predicted);
  }
  for (const end of ["turn", "earth", "away"]) assert.ok(ends.has(end), `${[...ends]}`);
});

test("predictOrbit stops at its limit for a very long throw and keeps the points few", () => {
  // 月なしで半径 15 の円軌道（周期 2π√(15³/GM) ≈ 258 秒）は、240 秒たっても 1 周しない。
  const game = createOrbitGame(NO_MOON);
  const { position, velocity } = circular(15);
  const { points, end } = predictOrbit(game, position, velocity);
  assert.equal(end, "long");
  assert.ok(points.length <= 961, `${points.length}`);
  assert.ok(points.length > 900, `${points.length}`);
});

test("predictOrbit leaves the game as it was", () => {
  const game = createOrbitGame(ORBIT_WORLD, true);
  addSatellite(game, ...Object.values(circular(2)));
  step(game, 3);
  const before = JSON.stringify(game);
  predictOrbit(game, { x: 0, y: 4 }, { x: -0.5, y: 0 });
  assert.equal(JSON.stringify(game), before);
  assert.equal(game.nextId, 2);
  assert.equal(game.satellites.length, 1);
});

test("predictOrbit: the same place and speed gives a different line later, because the moon has moved", () => {
  // 画面は時計が進めば計算し直す（orbit-game.js）。その理由を残す: 月の近くを通る軌道は、時刻で結果が変わる。
  const early = createOrbitGame(ORBIT_WORLD);
  const late = createOrbitGame(ORBIT_WORLD);
  late.t = 3;
  const position = { x: 0, y: -4 };
  const velocity = { x: Math.sqrt(EARTH_GM / 4), y: 0 };
  const a = predictOrbit(early, position, velocity);
  const b = predictOrbit(late, position, velocity);
  const last = (r) => r.points[r.points.length - 1];
  assert.ok(a.end !== b.end || Math.hypot(last(a).x - last(b).x, last(a).y - last(b).y) > 0.1);
});

test("the first-turn cue fires exactly once for a grazing circular orbit (not on later turns)", () => {
  const game = createOrbitGame(NO_MOON);
  const { position, velocity } = circular(MIN_PLACE_DISTANCE + 0.05);
  addSatellite(game, position, velocity);
  let cues = 0;
  for (let index = 0; index < 60 * 120; index += 1) {
    const before = turnsOf(game);
    step(game, 1 / 60);
    if (firstTurns(before, game)) cues += 1;
  }
  assert.ok(game.satellites[0].alive);
  assert.ok(game.satellites[0].turns >= 3, `${game.satellites[0].turns}`);
  assert.equal(cues, 1);
});

test("the first-turn cue counts once even when two satellites finish their first turn in the same frame", () => {
  const game = createOrbitGame(NO_MOON);
  const a = addSatellite(game, { x: 2, y: 0 }, { x: 0, y: 1 });
  const b = addSatellite(game, { x: -2, y: 0 }, { x: 0, y: -1 });
  const before = turnsOf(game);
  a.turns = 1;
  b.turns = 1;
  assert.equal(firstTurns(before, game), true);
  assert.equal(firstTurns(turnsOf(game), game), false);
});

test("the leaving sound follows the reason, prefers a crash, and ignores satellites that were already gone", () => {
  const game = createOrbitGame(NO_MOON);
  const sats = [0, 1, 2].map((index) => addSatellite(game, { x: 2 + index, y: 0 }, { x: 0, y: 0.5 }));
  const before = turnsOf(game);
  assert.equal(endSound(before, game), null);
  const gone = (satellite, end) => Object.assign(satellite, { alive: false, end });
  gone(sats[0], "moon");
  assert.deepEqual(endSound(before, game), { event: "moon" });
  gone(sats[1], "away");
  assert.deepEqual(endSound(before, game), { event: "moon" });
  gone(sats[2], "crash");
  assert.deepEqual(endSound(before, game), { event: "earth", km: 1000 });
  assert.equal(endSound(turnsOf(game), game), null);
  const one = (end) => {
    const g = createOrbitGame(NO_MOON);
    const s = addSatellite(g, { x: 2, y: 0 }, { x: 0, y: 0.5 });
    const b = turnsOf(g);
    gone(s, end);
    return endSound(b, g);
  };
  assert.deepEqual(one("earth"), { event: "earth", km: 1000 });
  assert.deepEqual(one("away"), { event: "away" });
});

test("a 60-degree launch with no boost falls back to Earth; boosting a few times at the top makes the line go round", () => {
  const game = createOrbitGame(NO_MOON);
  const site = launchSite(game, 0).position;
  const r0 = Math.hypot(site.x, site.y);
  // 外向きから 60° 東へ傾けて打ち上げる。
  const angle = Math.atan2(site.y, site.x) + Math.PI / 3;
  const satellite = launchFromSite(game, { x: Math.cos(angle) * 1.2, y: Math.sin(angle) * 1.2 }, 0);
  const line = () => predictOrbit(game, { x: satellite.x, y: satellite.y }, { x: satellite.vx, y: satellite.vy }).end;
  // 噴射 0 回なら、打ち上げた直後も途中も地球に落ちる線。
  assert.equal(line(), "earth");
  let before = r0;
  for (;;) {
    step(game, 0.05);
    const now = Math.hypot(satellite.x, satellite.y);
    if (now < before) break;
    before = now;
  }
  assert.ok(satellite.alive);
  assert.equal(line(), "earth");
  // てっぺんで噴射を重ねると、ある回数から 1 周回る線になる。
  let shots = 0;
  while (line() !== "turn" && boost(satellite)) shots += 1;
  assert.equal(line(), "turn");
  assert.ok(shots >= 2, `turned after ${shots} shots`);
});

test("step: one 30-second step and 120 steps of 0.25 seconds give the same orbits and turns", () => {
  const run = (split) => {
    const game = createOrbitGame(ORBIT_WORLD);
    for (const [r, angle] of [[1.3, 0], [2.4, 2], [3.5, 4]]) {
      const { position, velocity } = circular(r, angle);
      addSatellite(game, position, velocity);
    }
    if (split) for (let i = 0; i < 120; i += 1) step(game, 0.25);
    else step(game, 30);
    return game;
  };
  const whole = run(false);
  const parts = run(true);
  assert.ok(Math.abs(whole.t - parts.t) < 1e-6);
  whole.satellites.forEach((satellite, index) => {
    const other = parts.satellites[index];
    assert.equal(satellite.alive, other.alive);
    assert.equal(satellite.turns, other.turns);
    assert.ok(Math.hypot(satellite.x - other.x, satellite.y - other.y) < 1e-6, `${index}`);
  });
  assert.ok(whole.satellites.every((satellite) => satellite.turns > 0));
  assert.equal(scoreOf(whole).turns, scoreOf(parts).turns);
});

test("step: uneven frame steps (like ×1) and 0.25-second parts (like ×32) give the same game over GAME_SECONDS", () => {
  const run = (next) => {
    const game = createOrbitGame(ORBIT_WORLD);
    for (const [r, angle] of [[1.3, 0], [2.4, 2], [2.9, 4]]) {
      const { position, velocity } = circular(r, angle);
      addSatellite(game, position, velocity);
    }
    for (let i = 0; !isOver(game); i += 1) step(game, next(i));
    return game;
  };
  // ×1: 1/60 秒に決まったゆらぎを足したコマ。×32: 1/60 × 32 を 3 つに区切った 0.25 秒未満の dt。
  const slow = run((i) => 1 / 60 + 0.004 * Math.sin(i * 1.7));
  const fast = run(() => 32 / 60 / 3);
  assert.ok(Math.abs(elapsed(slow) - GAME_SECONDS) < 1e-6 && Math.abs(elapsed(fast) - GAME_SECONDS) < 1e-6);
  slow.satellites.forEach((satellite, index) => {
    const other = fast.satellites[index];
    assert.equal(satellite.end, other.end, `${index}`);
    assert.equal(satellite.turns, other.turns, `${index}`);
  });
  assert.equal(scoreOf(slow).turns, scoreOf(fast).turns);
});

test("aimClick: true only when the predicted end turns into a full turn", () => {
  assert.equal(aimClick(null, "turn"), true);
  assert.equal(aimClick("earth", "turn"), true);
  assert.equal(aimClick("turn", "turn"), false);
  assert.equal(aimClick("turn", "away"), false);
});

test("aimLineStyle: only the orbit that goes around uses the satellite colour; the others are a faint dashed white", () => {
  for (const color of ["#ffd166", "#06d6a0", "#ef476f"]) {
    const turn = aimLineStyle("turn", color);
    assert.equal(turn.color, color);
    assert.deepEqual(turn.dash, []);
    for (const end of ["earth", "moon", "away"]) {
      const miss = aimLineStyle(end, color);
      assert.notEqual(miss.color, color);
      assert.ok(miss.dash.length > 0);
    }
  }
  assert.deepEqual(aimLineStyle("long", "#ffd166").dash, []);
});

// 射場から、真上から自転の向きへ deg 度、強さ length で打ち出す引き（ぱちんこ式なので反対向き）。
function pullAt(site, deg, length) {
  const r = Math.hypot(site.position.x, site.position.y);
  const up = { x: site.position.x / r, y: site.position.y / r };
  const a = (deg * Math.PI) / 180;
  return { x: -length * (Math.cos(a) * up.x - Math.sin(a) * up.y), y: -length * (Math.cos(a) * up.y + Math.sin(a) * up.x) };
}

// 月と地球の向きの k 通り目のゲーム（月は 24 秒を 16 に分けた時刻、地球の回り始めは k × 2.399）。
function orientation(k) {
  return { game: step(createOrbitGame(ORBIT_WORLD), (k * 24) / 16), earth: (k * 2.399) % (Math.PI * 2) };
}

// 人の押し方: 合図（boostCue。画面と同じく離した後の道筋の end と low で決める）が出てから react 秒遅れて押し始め、合図の間だけ
// every 秒ごとに押す（合図が消えてまた出たら、また react 秒待つ）。1 周に乗るかいなくなるまで。押した数を返す。
function rideOnCue(game, satellite, react, every = 0.4) {
  const dt = 0.05;
  let next = Infinity;
  let was = false;
  let pressed = 0;
  for (let t = 0; satellite.alive && satellite.turns === 0 && t < 240; t += dt) {
    step(game, dt);
    const line = predictOrbit(game, satellite, { x: satellite.vx, y: satellite.vy });
    const cue = boostCue(satellite, line.end, line.low);
    if (cue && !was) next = t + react;
    was = cue;
    if (cue && t >= next - 1e-9) {
      if (boost(satellite)) pressed += 1;
      next = t + every;
    }
  }
  return pressed;
}

// 地球だけの 2 体の近地点（今の位置と速さから）。
function perigee(satellite) {
  const r = Math.hypot(satellite.x, satellite.y);
  const a = 1 / (2 / r - (satellite.vx ** 2 + satellite.vy ** 2) / EARTH_GM);
  const h = satellite.x * satellite.vy - satellite.y * satellite.vx;
  return a * (1 - Math.sqrt(Math.max(0, 1 - (h * h) / (EARTH_GM * a))));
}

test("launchShot: the direction is LAUNCH_ANGLE from straight up toward the spin, and only the pull length sets the speed (up to 3)", () => {
  const site = launchSite(createOrbitGame(ORBIT_WORLD), 0.7);
  const r = Math.hypot(site.position.x, site.position.y);
  const up = { x: site.position.x / r, y: site.position.y / r };
  const spin = Math.hypot(site.spin.x, site.spin.y);
  const along = { x: site.spin.x / spin, y: site.spin.y / spin };
  for (const [length, speed] of [[0.3, 1.298], [1, 1.34], [3, 1.46], [5, 1.46]]) {
    const v = launchShot(site, length);
    assert.ok(Math.abs(Math.hypot(v.x, v.y) - speed) < 1e-9, `${length}`);
    const deg = (Math.atan2(v.x * along.x + v.y * along.y, v.x * up.x + v.y * up.y) * 180) / Math.PI;
    assert.ok(Math.abs(deg - LAUNCH_ANGLE) < 1e-9, `${deg}`);
  }
  assert.equal(LAUNCH_ANGLE, 77.5);
  assert.deepEqual(LAUNCH_SPEED, { base: 1.28, perPull: 0.06 });
});

test("launch: the same pull length in any direction (0, 90, 180, 270°) gives the same velocity", () => {
  const site = launchSite(createOrbitGame(ORBIT_WORLD), 1.3);
  for (const length of [0.3, 1.5, 3]) {
    const [first, ...rest] = [0, 90, 180, 270].map((deg) => {
      const pull = { x: length * Math.cos((deg * Math.PI) / 180), y: length * Math.sin((deg * Math.PI) / 180) };
      return launchShot(site, Math.hypot(pull.x, pull.y));
    });
    for (const v of rest) assert.ok(Math.hypot(v.x - first.x, v.y - first.y) < 1e-12, `${length}`);
  }
});

test("launch: for pulls 0.3, 1, 1.5, 2, 3, a person who boosts on the cue (0.6 s or 1.0 s late, every 0.4 s) always makes the first turn (16 moon and Earth angles)", () => {
  for (const length of [0.3, 1, 1.5, 2, 3]) {
    for (const react of [0.6, 1.0]) {
      for (let k = 0; k < 16; k += 1) {
        const { game, earth } = orientation(k);
        const satellite = launchFromSite(game, launchShot(launchSite(game, earth), length), earth);
        const pressed = rideOnCue(game, satellite, react);
        const label = `pull ${length}, ${react} s, #${k}`;
        assert.ok(satellite.alive && satellite.turns >= 1, label);
        assert.ok(pressed <= 3, `${label}: ${pressed} presses`);
        assert.ok(perigee(satellite) >= 1.1, `${label}: perigee ${perigee(satellite)}`);
      }
    }
  }
});

test("launch: for pulls 1, 1.5, 3, a satellite put on its first turn by the cue lasts to GAME_SECONDS in at least 15 of 16 moon and Earth angles", () => {
  for (const length of [1, 1.5, 3]) {
    let survived = 0;
    for (let k = 0; k < 16; k += 1) {
      const { game, earth } = orientation(k);
      const satellite = launchFromSite(game, launchShot(launchSite(game, earth), length), earth);
      rideOnCue(game, satellite, 0.6);
      while (satellite.alive && elapsed(game) < GAME_SECONDS - 1e-6) step(game, 0.25);
      survived += satellite.alive ? 1 : 0;
    }
    assert.ok(survived >= 15, `pull ${length}: alive after ${GAME_SECONDS} s: ${survived}/16`);
  }
});

test("launch: while pulling, the line's top (largest radius) is between 1.25 and 2.3 for any pull from 0.3 to 3", () => {
  for (let length = 0.3; length <= 3 + 1e-9; length += 0.15) {
    for (let k = 0; k < 16; k += 1) {
      const { game, earth } = orientation(k);
      const site = launchSite(game, earth);
      const shot = launchShot(site, length);
      const { points } = predictOrbit(game, site.position, { x: shot.x + site.spin.x, y: shot.y + site.spin.y });
      const top = Math.max(...points.map((point) => Math.hypot(point.x, point.y)));
      assert.ok(top >= 1.25 && top <= 2.3, `pull ${length.toFixed(2)}, #${k}: top ${top}`);
    }
  }
});

test("boostCue: not right after launch, yes near the top, and a full-turn line turns it off only once its lowest point is CUE_SAFE or higher", () => {
  const game = createOrbitGame(ORBIT_WORLD);
  const satellite = launchFromSite(game, launchShot(launchSite(game, 0), 1.5), 0);
  assert.equal(boostCue(satellite, "earth", 1), false);
  while ((satellite.x * satellite.vx + satellite.y * satellite.vy) / Math.hypot(satellite.x, satellite.y) >= CUE_RISING) step(game, 0.05);
  assert.equal(satellite.alive, true);
  assert.equal(CUE_SAFE, 1.15);
  assert.equal(boostCue(satellite, "earth", 0.99), true);
  assert.equal(boostCue(satellite, "turn", 1.1), true);
  assert.equal(boostCue(satellite, "turn", CUE_SAFE - 1e-6), true);
  assert.equal(boostCue(satellite, "turn", CUE_SAFE), false);
  assert.equal(boostCue(satellite, "turn", 1.4), false);
});

test("boostCue: the second and third satellites get the cue too (with or without a record)", () => {
  const game = createOrbitGame(ORBIT_WORLD);
  let cues = 0;
  for (let index = 0; index < SATELLITES; index += 1) {
    while (!canLaunch(game, 0)) step(game, 0.25);
    const satellite = launchFromSite(game, launchShot(launchSite(game, 0), 1.5), 0);
    let seen = false;
    for (let t = 0; satellite.alive && satellite.turns === 0 && t < 60; t += 0.05) {
      step(game, 0.05);
      const line = predictOrbit(game, satellite, { x: satellite.vx, y: satellite.vy });
      if (boostCue(satellite, line.end, line.low)) {
        seen = true;
        boost(satellite);
      }
    }
    assert.ok(seen, `satellite ${index + 1}`);
    assert.ok(satellite.turns >= 1, `satellite ${index + 1}`);
    cues += seen ? 1 : 0;
  }
  assert.equal(cues, SATELLITES);
});

test("autoSpeed: 1 with two or fewer, 1 while one of three has no turn yet, 16 once all three have turned, back to 1 when one is gone", () => {
  const game = createOrbitGame(NO_MOON);
  assert.equal(autoSpeed(game), 1);
  const satellites = [1.4, 2, 2.6].map((r, index) => {
    const { position, velocity } = circular(r, index * 2);
    return addSatellite(game, position, velocity);
  });
  satellites[2].alive = false;
  assert.equal(autoSpeed(game), 1);
  satellites[2].alive = true;
  assert.equal(autoSpeed(game), 1);
  satellites[0].turns = 1;
  satellites[1].turns = 2;
  assert.equal(autoSpeed(game), 1);
  satellites[2].turns = 1;
  assert.equal(autoSpeed(game), 16);
  satellites[1].alive = false;
  assert.equal(autoSpeed(game), 1);
});

// 画面と同じ進め方（orbit-game.js の update）: 1 フレーム seconds を、0.25 ゲーム秒以下の区切りで、区切りごとに速さ（rate）を見直して進める。
function advance(game, seconds, rate) {
  let left = seconds;
  while (left > 1e-9) {
    const speed = rate(game);
    const part = Math.min(left * speed, 0.25);
    step(game, part);
    left -= part / speed;
    if (isOver(game)) break;
  }
}

test("the same play gives the same score at GAME_SECONDS at ×1 only and with autoSpeed (which reaches ×16)", () => {
  const play = (rate) => {
    const game = createOrbitGame(ORBIT_WORLD);
    let fast = 0;
    let pulls = [0.4, 1.5, 2.6];
    let since = null;
    let last = -Infinity;
    for (let frame = 0; !isOver(game); frame += 1) {
      // 遊ぶ人: 打てる時は 1 秒待って次の引きで打ち、合図から 0.6 秒遅れて 0.4 秒ごとに押す（1/60 秒のコマごとに決める）。
      const target = boostTarget(game);
      if (pulls.length && satellitesLeft(game) > 0 && canLaunch(game, 0) && (!target || target.turns > 0)) {
        if (since === null) since = game.t;
        if (game.t - since >= 1) {
          launchFromSite(game, launchShot(launchSite(game, 0), pulls[0]), 0);
          pulls = pulls.slice(1);
          since = null;
        }
      }
      if (target && target.turns === 0) {
        const line = predictOrbit(game, target, { x: target.vx, y: target.vy });
        if (boostCue(target, line.end, line.low) && game.t - last >= 0.4) {
          boost(target);
          last = game.t;
        }
      }
      if (rate(game) > 1) fast += 1;
      advance(game, 1 / 60, rate);
    }
    return { game, fast };
  };
  const slow = play(() => 1);
  const auto = play(autoSpeed);
  assert.ok(auto.fast > 0, "autoSpeed reached ×16");
  assert.ok(Math.abs(elapsed(slow.game) - GAME_SECONDS) < 1e-6 && Math.abs(elapsed(auto.game) - GAME_SECONDS) < 1e-6);
  assert.equal(slow.game.satellites.length, auto.game.satellites.length);
  slow.game.satellites.forEach((satellite, index) => {
    assert.equal(satellite.end, auto.game.satellites[index].end, `${index}`);
    assert.equal(satellite.turns, auto.game.satellites[index].turns, `${index}`);
  });
  assert.ok(scoreOf(slow.game).turns > 0);
  assert.equal(scoreOf(slow.game).turns, scoreOf(auto.game).turns);
});

test("the game is GAME_SECONDS = 180 seconds long", () => {
  assert.equal(GAME_SECONDS, 180);
  const game = createOrbitGame(NO_MOON);
  const { position, velocity } = circular(2);
  addSatellite(game, position, velocity);
  step(game, 179.9);
  assert.equal(isOver(game), false);
  step(game, 0.2);
  assert.equal(isOver(game), true);
  assert.ok(Math.abs(elapsed(game) - 180) < 1e-9);
});

test("boostCue: a weak shot that falls back without rising past CUE_HEIGHT never shows the cue", () => {
  const game = createOrbitGame(ORBIT_WORLD);
  const site = launchSite(game, 0);
  const pull = pullAt(site, 67.5, 1.0);
  const satellite = launchFromSite(game, launchVelocity(site.position, { x: site.position.x + pull.x, y: site.position.y + pull.y }), 0);
  let steps = 0;
  while (satellite.alive && steps < 400) {
    const line = predictOrbit(game, satellite, { x: satellite.vx, y: satellite.vy });
    assert.equal(boostCue(satellite, line.end, line.low), false);
    step(game, 0.05);
    steps += 1;
  }
  assert.equal(satellite.alive, false);
  assert.ok(steps > 3);
});

test("the launch preview, boosted on the cue like a player, stays up for several turns", () => {
  const game = createOrbitGame(ORBIT_WORLD, false);
  const shot = previewShot(game, "launch");
  // 射場から、引き 1.5 で打ち出す。
  assert.deepEqual(shot.position, launchSite(game, PREVIEW_START).position);
  assert.deepEqual(shot.velocity, launchShot(launchSite(game, PREVIEW_START), 1.5));
  const satellite = launchFromSite(game, shot.velocity, PREVIEW_START);
  assert.ok(satellite);
  // 画面の見本と同じく、合図の間は 0.4 秒ごとに噴射する。
  let boostedAt = -Infinity;
  for (let index = 0; index < 30 * 90; index += 1) {
    step(game, 1 / 30);
    if (game.t - boostedAt >= 0.4 - 1e-9 && boostCue(satellite, null, null)) {
      const line = predictOrbit(game, satellite, { x: satellite.vx, y: satellite.vy });
      if (boostCue(satellite, line.end, line.low) && boost(satellite)) boostedAt = game.t;
    }
  }
  assert.ok(satellite.alive);
  assert.ok(satellite.turns >= 3, `turns ${satellite.turns}`);
});

test("the place preview goes round at circular speed", () => {
  const game = createOrbitGame(ORBIT_WORLD, false);
  const shot = previewShot(game, "place");
  assert.ok(canPlace(game, shot.position));
  const satellite = addSatellite(game, shot.position, shot.velocity);
  step(game, 60);
  assert.ok(satellite.alive);
  assert.ok(satellite.turns >= 3, `turns ${satellite.turns}`);
});
