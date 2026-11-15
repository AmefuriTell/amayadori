// 「軌道に乗せろ」の計算（docs/design/activity-map.md §4 の K）。画面に頼らない純粋な計算だけを置く（node --test で確かめる）。
//
// 宇宙の好きな場所に衛星を置いて打ち出し、地球を回らせ続ける。衛星は（1 回に 3 機まで）同時に動く。地球と月（physics.js の世界）が引き、
// 「引き合うモード」では衛星どうしも引き合う。地球に落ちる・月や衛星どうしでぶつかる・遠くへ出ると、その衛星はいなくなる。
// 点は回り切った周の合計（画面に出る輪の数そのもの）。小さな輪ほど早く回れて周が増えるが、低すぎると地球に落ちやすく、
// 同じ低い輪に何機も入れるとぶつかりやすいので、どこを回らせるかを考える遊びになる。
import { DEFAULT_WORLD, STEP, angleOfLongitude, launchVelocity, moonPositions } from "./physics.js";

// 1 回に置ける衛星の数と、1 回のゲームの長さ（ゲームの時計の秒。画面は下の欄のボタンで ×1・×4・×16 に速められる）。
export const SATELLITES = 3;
export const GAME_SECONDS = 600;
// 衛星の大きさ（ぶつかりの判定。2 機の中心がこの 2 倍より近いとぶつかる）と、引き合うモードでの衛星の重さ（地球の 1/100）。
export const SAT_RADIUS = 0.06;
export const SAT_GM = 0.02;
// これより遠くへ出た衛星は、戻ってこないものとしていなくす。
export const ESCAPE_DISTANCE = 16;
// 衛星を置ける所: 地球の表面からこれだけ離れ（半径）、月からもこれだけ離れ、地球からこの距離より内側。
// 回っている衛星からもこれだけ離れる（重ねて置くと、置いたとたんに 2 機ともぶつかるため）。
export const MIN_PLACE_DISTANCE = 1.2;
export const SATELLITE_PLACE_MARGIN = 0.3;
export const MOON_PLACE_MARGIN = 0.3;
export const MAX_PLACE_DISTANCE = 12;

// 打ち上げ（置き方「打ち上げ」）: 射場は地表のすぐ上（半径 1.02）で、地球と一緒に回る（自転の速さも隕石に乗る）。
// 地表から 1 回押し出すだけの軌道は、打ち出した高さを必ずもう一度通るので、すぐ地面をかすめやすい。
// 本物のロケットと同じく、上がった後に進む向きへ加速（噴射）して軌道を整えられるようにする。
export const LAUNCH_RADIUS = 1.02;
// 射場の経度（種子島宇宙センター、東経 131°）。北極の上から見ると、北半球の地図の上を回る。
export const LAUNCH_LONGITUDE = 131;
// 1 回の加速の大きさと、1 機の衛星が持つ燃料（加速できる合計）。
export const BOOST = 0.08;
export const FUEL = 0.48;

// 軌道に乗せろの世界: 月の重さだけ隕石当て（physics.js の DEFAULT_WORLD）の 1/4（大きさ・距離・周期は同じ）。
// 地球の 1/8 の月では、合図どおりに乗せた衛星もほとんど 1〜5 周で月に乱されて落ちたため（DESIGN.md）。
export const ORBIT_WORLD = { ...DEFAULT_WORLD, moons: DEFAULT_WORLD.moons.map((moon) => ({ ...moon, gm: moon.gm / 4 })) };

const TAU = Math.PI * 2;

// started は 1 機目を出した時刻（ゲームの時間はそこから数える。狙っている間に時間が減らないように）。地球と月は始めから動く。
export function createOrbitGame(world = ORBIT_WORLD, mutual = false) {
  return { world, mutual, t: 0, started: null, satellites: [], nextId: 1 };
}

// 1 機目を出してからたった時間。
export function elapsed(game) {
  return game.started === null ? 0 : game.t - game.started;
}

// まだ 1 機も出していないか（画面は、この間は遊ぶときのボタンを出さない）。
export function beforeFirstSatellite(game) {
  return game.started === null;
}

// 回っている衛星から離れているか。
function clearOfSatellites(game, position) {
  return game.satellites.every((satellite) => !satellite.alive || Math.hypot(position.x - satellite.x, position.y - satellite.y) > 2 * SAT_RADIUS + SATELLITE_PLACE_MARGIN);
}

// その場所に衛星を置けるか（地球・月・回っている衛星に近すぎず、遠すぎない）。
export function canPlace(game, position) {
  const r = Math.hypot(position.x, position.y);
  if (r < MIN_PLACE_DISTANCE || r > MAX_PLACE_DISTANCE) return false;
  if (!clearOfSatellites(game, position)) return false;
  return moonPositions(game.world, game.t).every((moon) => Math.hypot(position.x - moon.x, position.y - moon.y) > moon.radius + MOON_PLACE_MARGIN);
}

// 射場から打ち上げられるか（前に打ち上げた衛星が、まだ射場の近くにいないか）。
export function canLaunch(game, start = 0) {
  return satellitesLeft(game) > 0 && clearOfSatellites(game, launchSite(game, start).position);
}

// 置ける衛星が残っているか。
export function satellitesLeft(game) {
  return SATELLITES - game.satellites.length;
}

// 射場の今の位置と、自転で動いている速さ（打ち上げの初めの速さに足す）。start は地球の回り始めの向き。
export function launchSite(game, start = 0) {
  const angle = angleOfLongitude(LAUNCH_LONGITUDE, game.t, start, game.world.earthPeriod);
  const speed = (TAU / game.world.earthPeriod) * LAUNCH_RADIUS;
  return {
    position: { x: LAUNCH_RADIUS * Math.cos(angle), y: LAUNCH_RADIUS * Math.sin(angle) },
    spin: { x: -speed * Math.sin(angle), y: speed * Math.cos(angle) },
  };
}

// 射場から打ち上げる。velocity は引っ張って決めた速さで、自転の速さを足して打ち出す。打ち上げられなければ null。
export function launchFromSite(game, velocity, start = 0) {
  if (!canLaunch(game, start)) return null;
  const { position, spin } = launchSite(game, start);
  const satellite = createSatellite(game, position, { x: velocity.x + spin.x, y: velocity.y + spin.y });
  // 射場から打ち上げた衛星の印（噴射の合図 boostCue は、打ち上げた衛星にだけ出す）。
  satellite.launched = true;
  return satellite;
}

// 衛星を置いて打ち出す。置けなければ null。
export function addSatellite(game, position, velocity) {
  if (satellitesLeft(game) <= 0 || !canPlace(game, position)) return null;
  return createSatellite(game, position, velocity);
}

// 飛んでいる衛星を、進む向きへ 1 回加速する（燃料を BOOST だけ使う）。加速できなければ false。
export function boost(satellite) {
  if (!satellite || !satellite.alive || satellite.fuel < BOOST - 1e-9) return false;
  const speed = Math.hypot(satellite.vx, satellite.vy);
  if (speed < 1e-9) return false;
  satellite.vx += (satellite.vx / speed) * BOOST;
  satellite.vy += (satellite.vy / speed) * BOOST;
  satellite.fuel = Math.max(0, satellite.fuel - BOOST);
  return true;
}

// 加速の対象: いちばん新しい、まだ回っている衛星。
export function boostTarget(game) {
  return [...game.satellites].reverse().find((satellite) => satellite.alive) || null;
}

function createSatellite(game, position, velocity) {
  if (game.started === null) game.started = game.t;
  const satellite = {
    id: game.nextId++,
    x: position.x,
    y: position.y,
    vx: velocity.x,
    vy: velocity.y,
    alive: true,
    fuel: FUEL,
    // いなくなった理由（"earth"・"moon"・"crash"・"away"）。回っている間は null。
    end: null,
    // 回り切った周の数。
    turns: 0,
    // 今の周で、地球の周りを回った角度（符号付き）。
    sweep: 0,
    angle: Math.atan2(position.y, position.x),
  };
  game.satellites.push(satellite);
  return satellite;
}

function accelerations(game, moons, positions) {
  const { world, mutual } = game;
  return positions.map((p, index) => {
    const r2 = p.x * p.x + p.y * p.y;
    const r = Math.sqrt(r2);
    let ax = (-world.earthGM * p.x) / (r2 * r);
    let ay = (-world.earthGM * p.y) / (r2 * r);
    for (const moon of moons) {
      const dx = p.x - moon.x;
      const dy = p.y - moon.y;
      const d2 = dx * dx + dy * dy;
      const d = Math.sqrt(d2);
      ax += (-moon.gm * dx) / (d2 * d);
      ay += (-moon.gm * dy) / (d2 * d);
    }
    if (mutual) {
      positions.forEach((other, otherIndex) => {
        if (otherIndex === index) return;
        const dx = p.x - other.x;
        const dy = p.y - other.y;
        // 近づきすぎたときに力が無限に大きくならないよう、ぶつかりの距離で和らげる。
        const d2 = dx * dx + dy * dy + (2 * SAT_RADIUS) ** 2;
        const d = Math.sqrt(d2);
        ax += (-SAT_GM * dx) / (d2 * d);
        ay += (-SAT_GM * dy) / (d2 * d);
      });
    }
    return { x: ax, y: ay };
  });
}

function retire(satellite, reason) {
  satellite.alive = false;
  satellite.end = reason;
}

// 周回を数える: 地球の周りを回った角度を足し、1 周（2π）を超えたら周を 1 つ足す。
function track(satellite) {
  const angle = Math.atan2(satellite.y, satellite.x);
  let delta = angle - satellite.angle;
  if (delta > Math.PI) delta -= TAU;
  if (delta < -Math.PI) delta += TAU;
  satellite.angle = angle;
  satellite.sweep += delta;
  if (Math.abs(satellite.sweep) >= TAU) {
    satellite.turns += 1;
    satellite.sweep -= Math.sign(satellite.sweep) * TAU;
  }
}

// ゲームを seconds だけ進める（STEP ごとに、すべての衛星をまとめて速度ベルレ法で）。1 機目を出してからゲームの時間の上限で止める
// （1 機目を出す前は、地球と月だけが動く）。
export function step(game, seconds) {
  let remaining = game.started === null ? seconds : Math.min(seconds, GAME_SECONDS - elapsed(game));
  while (remaining > 1e-9) {
    const dt = Math.min(STEP, remaining);
    const alive = game.satellites.filter((satellite) => satellite.alive);
    if (alive.length > 0) {
      const moonsNow = moonPositions(game.world, game.t);
      const moonsNext = moonPositions(game.world, game.t + dt);
      const a = accelerations(game, moonsNow, alive);
      const next = alive.map((s, index) => ({ x: s.x + s.vx * dt + 0.5 * a[index].x * dt * dt, y: s.y + s.vy * dt + 0.5 * a[index].y * dt * dt }));
      const b = accelerations(game, moonsNext, next);
      alive.forEach((s, index) => {
        s.vx += 0.5 * (a[index].x + b[index].x) * dt;
        s.vy += 0.5 * (a[index].y + b[index].y) * dt;
        s.x = next[index].x;
        s.y = next[index].y;
      });
      for (const s of alive) {
        const r = Math.hypot(s.x, s.y);
        if (r <= 1) retire(s, "earth");
        else if (moonsNext.some((moon) => Math.hypot(s.x - moon.x, s.y - moon.y) <= moon.radius + SAT_RADIUS)) retire(s, "moon");
        else if (r >= ESCAPE_DISTANCE) retire(s, "away");
        else track(s);
      }
      // 衛星どうしのぶつかり（触れ合ったものは全部いなくなる。先に組を集めてから消し、3 機が同時に触れても漏らさない）。
      const crashed = new Set();
      for (let i = 0; i < alive.length; i += 1) {
        for (let j = i + 1; j < alive.length; j += 1) {
          const [p, q] = [alive[i], alive[j]];
          if (p.alive && q.alive && Math.hypot(p.x - q.x, p.y - q.y) <= 2 * SAT_RADIUS) {
            crashed.add(p);
            crashed.add(q);
          }
        }
      }
      for (const satellite of crashed) retire(satellite, "crash");
    }
    game.t += dt;
    remaining -= dt;
  }
  return game;
}

// 引っ張っている間に見せる道筋: position から velocity で出した 1 機が、1 周回り切るか、地球・月に落ちるか、遠くへ出るか、
// limit 秒たつまでを先読みする（速度ベルレ法、dt 秒刻み。決まりは step() と同じ）。points は every 秒ごとの位置（最初と最後は必ず入れる）、
// end は "turn"（1 周した）・"earth"・"moon"・"away"・"long"（limit 秒たっても決まらない）。
// 引き合うモードでも、ほかの衛星の重さとぶつかりは入れない（その 1 機を地球と月だけで動かす）。game は書き換えない。
export function predictOrbit(game, position, velocity, { dt = 1 / 30, limit = 240, every = 0.25 } = {}) {
  const alone = { world: game.world, mutual: false };
  let x = position.x;
  let y = position.y;
  let vx = velocity.x;
  let vy = velocity.y;
  let angle = Math.atan2(y, x);
  let sweep = 0;
  const points = [{ x, y }];
  const steps = Math.round(limit / dt);
  let mark = every;
  let [a] = accelerations(alone, moonPositions(game.world, game.t), [{ x, y }]);
  let end = "long";
  for (let index = 1; index <= steps; index += 1) {
    const moonsNext = moonPositions(game.world, game.t + index * dt);
    x += vx * dt + 0.5 * a.x * dt * dt;
    y += vy * dt + 0.5 * a.y * dt * dt;
    const [b] = accelerations(alone, moonsNext, [{ x, y }]);
    vx += 0.5 * (a.x + b.x) * dt;
    vy += 0.5 * (a.y + b.y) * dt;
    a = b;
    const r = Math.hypot(x, y);
    if (r <= 1) end = "earth";
    else if (moonsNext.some((moon) => Math.hypot(x - moon.x, y - moon.y) <= moon.radius + SAT_RADIUS)) end = "moon";
    else if (r >= ESCAPE_DISTANCE) end = "away";
    else {
      const now = Math.atan2(y, x);
      let delta = now - angle;
      if (delta > Math.PI) delta -= TAU;
      if (delta < -Math.PI) delta += TAU;
      angle = now;
      sweep += delta;
      if (Math.abs(sweep) >= TAU) end = "turn";
    }
    const done = end !== "long" || index === steps;
    const due = index * dt >= mark - 1e-9;
    while (index * dt >= mark - 1e-9) mark += every;
    if (done || due) points.push({ x, y });
    if (done) break;
  }
  return { points, end };
}

// 引いている間の道筋の終わり方（predictOrbit の end）が、1 周回る（"turn"）に変わったか（変わった時だけ小さく鳴らす）。
export function aimClick(before, after) {
  return after === "turn" && before !== "turn";
}

// 道筋の線の見た目。1 周回るなら次に出す衛星の色の実線、時間切れ（long）は白の実線、
// 落ちる・ぶつかる・飛んでいくは薄い白の破線（衛星の色と重ならず、色を見分けにくくても線の形で分かるように）。
export function aimLineStyle(end, satelliteColor) {
  if (end === "turn") return { color: satelliteColor, alpha: 0.6, dash: [] };
  if (end === "long") return { color: "#ffffff", alpha: 0.6, dash: [] };
  return { color: "#ffffff", alpha: 0.45, dash: [4, 6] };
}

// 周回に乗せるまでの手がかり（DESIGN.md）。打ち上げの正解の範囲: 打ち出す向きは真上から自転の向きへ from〜to 度、強さは引き near〜far
// （合図から 0.6〜1 秒遅れて押し始める人でも乗る範囲）。てっぺん（外へ向かう速さが CUE_RISING 未満、地球の中心から CUE_HEIGHT より外）で、
// 道筋が 1 周回る線になるまで噴射する（CUE_HEIGHT は、弱く打って上がり切らずに落ちていく衛星に合図を出さないため）。
export const AIM_ZONE = { from: 67.5, to: 87.5, near: 2.38, far: 2.53 };
export const CUE_RISING = 0.15;
export const CUE_HEIGHT = 1.2;

// 射場の外向き（真上）と自転の向きの単位ベクトル（site は launchSite の結果）。
function siteAxes(site) {
  const { position, spin } = site;
  const r = Math.hypot(position.x, position.y);
  const up = { x: position.x / r, y: position.y / r };
  const sense = up.x * spin.y - up.y * spin.x < 0 ? -1 : 1;
  return { up, along: { x: -up.y * sense, y: up.x * sense } };
}

// 引きが入るべき範囲（扇形）の多角形（引きのベクトルの点。射場からゴムの先まで）。ぱちんこ式なので、打ち出す向きの反対側
// （真下から自転と逆の向きへ from〜to 度）。画面には、指を置いた所から指の動きの px（引き × PULL_PX）で描く。
export function aimZone(site, steps = 6) {
  const { up, along } = siteAxes(site);
  const arc = (radius) =>
    Array.from({ length: steps + 1 }, (_, index) => {
      const a = ((AIM_ZONE.from + ((AIM_ZONE.to - AIM_ZONE.from) * index) / steps) * Math.PI) / 180;
      return { x: -radius * (Math.cos(a) * up.x + Math.sin(a) * along.x), y: -radius * (Math.cos(a) * up.y + Math.sin(a) * along.y) };
    });
  return [...arc(AIM_ZONE.far), ...arc(AIM_ZONE.near).reverse()];
}

// 設定の欄の後ろに出す見本の、初めの位置と速さ（画面に頼らない）。速さは引きから決めた速さで、打ち上げは launchFromSite、
// 置くは addSatellite にそのまま渡す。打ち上げ: 射場から、扇形（aimZone）の中心の引きで打ち出す（てっぺんでは噴射の合図で噴射する）。
// 置く: 決まった 1 点（PREVIEW_PLACE）から、地球を回る円軌道の速さで、自転と同じ向きへ打ち出す。
// 見本の地球の回り始めの向きは PREVIEW_START（射場が画面の右の少し上に来て、噴射の合図で噴射すれば周回に乗る向き）。
// 置く点は地球の中心から 1.4（月に乱されず回り続ける高さ）。
export const PREVIEW_START = -2;
export const PREVIEW_PLACE = { x: -0.99, y: 0.99 };
export function previewShot(game, style) {
  if (style === "place") {
    const { x, y } = PREVIEW_PLACE;
    const r = Math.hypot(x, y);
    const speed = Math.sqrt(game.world.earthGM / r);
    return { position: { x, y }, velocity: { x: (-y / r) * speed, y: (x / r) * speed } };
  }
  const site = launchSite(game, PREVIEW_START);
  const { up, along } = siteAxes(site);
  const a = (((AIM_ZONE.from + AIM_ZONE.to) / 2) * Math.PI) / 180;
  const length = (AIM_ZONE.near + AIM_ZONE.far) / 2;
  const pull = { x: -length * (Math.cos(a) * up.x + Math.sin(a) * along.x), y: -length * (Math.cos(a) * up.y + Math.sin(a) * along.y) };
  const { position } = site;
  return { position: { ...position }, velocity: launchVelocity(position, { x: position.x + pull.x, y: position.y + pull.y }) };
}

// 引き（射場からゴムの先まで）が範囲に入っているか。
export function inAimZone(site, pull) {
  const { up, along } = siteAxes(site);
  const length = Math.hypot(pull.x, pull.y);
  const angle = (Math.atan2(-(pull.x * along.x + pull.y * along.y), -(pull.x * up.x + pull.y * up.y)) * 180) / Math.PI;
  const e = 1e-9;
  return length >= AIM_ZONE.near - e && length <= AIM_ZONE.far + e && angle >= AIM_ZONE.from - e && angle <= AIM_ZONE.to + e;
}

// 今が噴射の時か: 打ち上げてまだ 1 周していない衛星が、燃料を残して、CUE_HEIGHT より高いてっぺんにいて、道筋（end）がまだ 1 周回る線でない。
export function boostCue(satellite, end) {
  if (!satellite || !satellite.alive || satellite.launched !== true || satellite.turns !== 0 || satellite.fuel < BOOST - 1e-9) return false;
  const r = Math.hypot(satellite.x, satellite.y);
  return r > CUE_HEIGHT && (satellite.x * satellite.vx + satellite.y * satellite.vy) / r < CUE_RISING && end !== "turn";
}

// 手がかりを出すか: まだ記録が無く、今のゲームで 1 周した衛星も無い間だけ。
export function coaching(best, game) {
  return !(best.normal > 0 || best.mutual > 0) && !game.satellites.some((satellite) => satellite.turns >= 1);
}

// ゲームが終わったか: 時間切れか、全部置いて全部いなくなった。
export function isOver(game) {
  if (game.started !== null && elapsed(game) >= GAME_SECONDS - 1e-9) return true;
  return satellitesLeft(game) === 0 && game.satellites.every((satellite) => !satellite.alive);
}

// 結果（点）: 回り切った周の合計。
export function scoreOf(game) {
  return { turns: game.satellites.reduce((sum, satellite) => sum + satellite.turns, 0) };
}

// 音の合図（orbit-game.js が step の前後で使う。DESIGN.md の「音」）。
// turnsOf: 生きている衛星ごとの、回り切った周の数（id → turns）。step の前に覚えておく。
export function turnsOf(game) {
  return new Map(game.satellites.filter((satellite) => satellite.alive).map((satellite) => [satellite.id, satellite.turns]));
}

// firstTurns: step の前（before。turnsOf の結果）に 0 周だった衛星が、後で 1 周以上になったか（何機あっても 1 つの真偽）。
export function firstTurns(before, game) {
  return game.satellites.some((satellite) => before.get(satellite.id) === 0 && satellite.turns >= 1);
}

// endSound: step の前に生きていて、後でいなくなった衛星の理由から、鳴らす音を 1 つ選ぶ（衝突を優先）。無ければ null。
// 地球と衝突は爆発音（"earth"。強さは 1000 km の段）、月は "moon"、飛んでいったのは "away"。
export function endSound(before, game) {
  const ends = new Set(game.satellites.filter((satellite) => before.has(satellite.id) && !satellite.alive).map((satellite) => satellite.end));
  if (ends.has("crash") || ends.has("earth")) return { event: "earth", km: 1000 };
  if (ends.has("moon")) return { event: "moon" };
  if (ends.has("away")) return { event: "away" };
  return null;
}

// ズームの範囲（画面の基準の大きさに掛ける倍率）。
export const ZOOM_MIN = 0.35;
export const ZOOM_MAX = 3;
export function clampZoom(zoom) {
  return Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, zoom));
}

// いちばん良かった結果（モードごと、回り切った周の合計）を端末に覚える。読めなければ無し。
// 点の単位が変わったので、前のキー（weatherbot.orbitBest）は読まない（消しもしない）。
const BEST_STORAGE = "weatherbot.orbitTurns";
export function loadBest(storage = globalThis.localStorage) {
  try {
    const saved = JSON.parse(storage.getItem(BEST_STORAGE) || "null");
    const best = {};
    for (const mode of ["normal", "mutual"]) {
      const value = saved && saved[mode];
      if (typeof value === "number" && Number.isFinite(value) && value >= 0) best[mode] = value;
    }
    return best;
  } catch {
    return {};
  }
}

export function saveBest(best, storage = globalThis.localStorage) {
  try {
    storage.setItem(BEST_STORAGE, JSON.stringify(best));
  } catch {
    // 覚えられなくても遊べる。
  }
}
