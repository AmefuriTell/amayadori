import { test } from "node:test";
import assert from "node:assert/strict";
import { DEFAULT_WORLD, EARTH_GM, MOON_DISTANCE } from "../src/game/physics.js";
import {
  BOOST,
  CRUISE_AFTER,
  CRUISE_SPEED,
  ESCAPE_DISTANCE,
  FUEL,
  LAUNCH_RADIUS,
  MIN_PLACE_DISTANCE,
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
  launchSite,
  loadBest,
  predictOrbit,
  saveBest,
  satellitesLeft,
  scoreOf,
  step,
  targetSpeed,
  turnsOf,
} from "../src/game/orbit.js";

const NO_MOON = { ...DEFAULT_WORLD, moons: [] };

function circular(r, angle = 0) {
  const v = Math.sqrt(EARTH_GM / r);
  return { position: { x: r * Math.cos(angle), y: r * Math.sin(angle) }, velocity: { x: -v * Math.sin(angle), y: v * Math.cos(angle) } };
}

test("a circular orbit without a moon keeps going and counts turns with its size", () => {
  const game = createOrbitGame(NO_MOON);
  const { position, velocity } = circular(2);
  addSatellite(game, position, velocity);
  // 半径 2 の円軌道の周期は 2π√(r³/GM) = 2π·2 ≈ 12.57 秒。100 秒で 7 周。
  step(game, 100);
  const [satellite] = game.satellites;
  assert.ok(satellite.alive);
  assert.equal(satellite.turns, 7);
  // 1 周ごとに、いちばん遠い距離（ほぼ 2）の 2 乗を足す。
  assert.ok(Math.abs(satellite.points - 28) < 0.1, `${satellite.points}`);
  assert.ok(Math.abs(satellite.biggest - 2) < 0.01);
});

test("a bigger orbit makes fewer turns but more points (size matters, as asked)", () => {
  const score = (r) => {
    const game = createOrbitGame(NO_MOON);
    const { position, velocity } = circular(r);
    addSatellite(game, position, velocity);
    step(game, 200);
    return scoreOf(game);
  };
  const small = score(1.5);
  const big = score(4);
  assert.ok(small.turns > big.turns);
  assert.ok(big.biggest > small.biggest);
  // 時間あたりの点は大きな軌道ほど多い（距離をそのまま足すと、小さな軌道ほど得になっていた）。
  assert.ok(big.points > small.points, `${big.points} vs ${small.points}`);
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
  const game = createOrbitGame(DEFAULT_WORLD);
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
  const game = createOrbitGame(DEFAULT_WORLD);
  assert.ok(!canPlace(game, { x: 1.1, y: 0 }));
  assert.ok(!canPlace(game, { x: MOON_DISTANCE, y: 0 }));
  assert.ok(!canPlace(game, { x: 20, y: 0 }));
  assert.ok(canPlace(game, { x: 0, y: 2.5 }));
  assert.equal(addSatellite(game, { x: 1.1, y: 0 }, { x: 0, y: 0 }), null);
  for (let index = 0; index < SATELLITES; index += 1) assert.ok(addSatellite(game, { x: 0, y: 2 + index }, { x: 1, y: 0 }));
  assert.equal(satellitesLeft(game), 0);
  assert.equal(addSatellite(game, { x: 0, y: 6 }, { x: 1, y: 0 }), null);
});

test("the game ends when time is up or every satellite is placed and gone", () => {
  const game = createOrbitGame(NO_MOON);
  assert.ok(!isOver(game));
  for (let index = 0; index < SATELLITES; index += 1) addSatellite(game, { x: 0, y: 3 + index * 0.5 }, { x: 0, y: 0 });
  step(game, 30);
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
  saveBest({ normal: 42.5, mutual: 7 }, storage);
  assert.deepEqual(loadBest(storage), { normal: 42.5, mutual: 7 });
  storage.setItem("weatherbot.orbitBest", "{bad");
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
  const game = createOrbitGame(DEFAULT_WORLD);
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
      id: 100 + index, x, y, vx: -x * 2, vy: (3.1 - y) * 2, alive: true, fuel: 0, end: null, turns: 0, points: 0, biggest: 0, sweep: 0, revMax: 3, angle: Math.atan2(y, x),
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
  const storage = { getItem: (key) => (key === "weatherbot.orbitBest" ? '{"normal":222.2,"mutual":50}' : null), setItem: () => {} };
  assert.deepEqual(loadBest(storage), { normal: 222.2, mutual: 50 });
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
  const game = createOrbitGame(DEFAULT_WORLD);
  const v = Math.sqrt((2 * EARTH_GM) / 6) * 1.05;
  assert.equal(predictOrbit(game, { x: 0, y: -6 }, { x: v, y: 0 }).end, "away");
});

test("predictOrbit: thrown toward the earth falls on it", () => {
  const game = createOrbitGame(DEFAULT_WORLD);
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
    const game = createOrbitGame(DEFAULT_WORLD);
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
  const game = createOrbitGame(DEFAULT_WORLD, true);
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
  const early = createOrbitGame(DEFAULT_WORLD);
  const late = createOrbitGame(DEFAULT_WORLD);
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

test("targetSpeed: fast-forwards only after every satellite is out, some still fly, and nothing was done for CRUISE_AFTER seconds", () => {
  const game = createOrbitGame(DEFAULT_WORLD);
  let lastAction = 0;
  const place = (r, angle) => {
    const { position, velocity } = circular(r, angle);
    assert.ok(addSatellite(game, position, velocity));
    lastAction = game.t;
  };
  place(2, 0);
  step(game, 1);
  place(2.6, 2);
  // 2 機まで: 何秒たっても ×1。
  step(game, CRUISE_AFTER + 5);
  assert.equal(targetSpeed(game, lastAction), 1);
  place(3.2, 4);
  // 3 機を出した直後・10 秒未満は ×1、10 秒以上で CRUISE_SPEED。
  assert.equal(targetSpeed(game, lastAction), 1);
  step(game, CRUISE_AFTER - 0.5);
  assert.equal(targetSpeed(game, lastAction), 1);
  // （STEP を足し合わせた時刻の丸めの誤差があるので、少しだけ多く進める）
  step(game, 0.51);
  assert.equal(targetSpeed(game, lastAction), CRUISE_SPEED);
  // 操作した直後（加速など）は ×1 に戻る。
  assert.ok(boost(boostTarget(game)));
  lastAction = game.t;
  assert.equal(targetSpeed(game, lastAction), 1);
  step(game, CRUISE_AFTER + 0.01);
  assert.equal(targetSpeed(game, lastAction), CRUISE_SPEED);
  // 全機いなくなったら ×1。
  for (const satellite of game.satellites) satellite.alive = false;
  assert.equal(targetSpeed(game, lastAction), 1);
});

test("step: one 30-second step and 120 steps of 0.25 seconds give the same orbits and points", () => {
  const run = (split) => {
    const game = createOrbitGame(DEFAULT_WORLD);
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
  assert.ok(Math.abs(scoreOf(whole).points - scoreOf(parts).points) < 0.05);
});
