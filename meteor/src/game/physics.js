// 「重力で曲げて的に当てる」ゲームの物理（docs/design/activity-map.md §4 の J）。画面に頼らない純粋な計算だけを置く（node --test で確かめる）。
//
// 地球を北極の上から見下ろした 2D の世界。長さは地球の半径を 1 とする。地球は反時計回り（東向き）に自転し、
// 月が回っていて、どちらの重力も隕石を引く。縮尺と強さは遊びやすいように変えてある（本物の比ではない）。
// 画面の y は下向きだが、ここでは数学の向き（y が上、角度は反時計回り）で計算し、描くときに上下を返す。

// 地球の重力の強さ（GM）。半径 1 の表面をかすめる円軌道の速さが √GM。
export const EARTH_GM = 2.0;
// 月の軌道の半径・一周の秒数・重力の強さ（地球の 1/8。本物の 1/81 より強くして、曲がりを遊びにする）・半径。
export const MOON_DISTANCE = 4.5;
export const MOON_PERIOD = 24;
export const MOON_GM = EARTH_GM / 8;
export const MOON_RADIUS = 0.27;
// 地球が一周する秒数（本物の 1 日を 40 秒に縮める）。
export const EARTH_PERIOD = 40;
// 引っ張った長さから速さへの倍率と、引っ張れる長さの上限。
export const LAUNCH_SCALE = 0.55;
export const MAX_PULL = 3.0;
// 飛んでいる時間の上限（秒）と、ここより遠くへ出たら外れとする距離。
export const MAX_FLIGHT = 30;
export const OUT_DISTANCE = 14;
// 1 回の計算の刻み（秒）。小さいほど正確（月の近くで速くなっても突き抜けないように細かくする）。
export const STEP = 1 / 240;
// 赤道 1° の長さ（km）。当たった所と的の経度のずれを km にする。
export const KM_PER_DEGREE = 111.32;

const TAU = Math.PI * 2;

// 遊ぶ世界（ステージごとに変える。game/stages.js）。moons の phase は、時刻 0 の月の向き（ラジアン）。
// direction は回る向き（1 が反時計回り、-1 が時計回り）。
export const DEFAULT_WORLD = {
  earthGM: EARTH_GM,
  earthPeriod: EARTH_PERIOD,
  moons: [{ distance: MOON_DISTANCE, period: MOON_PERIOD, gm: MOON_GM, radius: MOON_RADIUS, phase: 0, direction: 1 }],
};

// 時刻 t（秒）のそれぞれの月の位置。offset は、すべての月の向きに足す角度（試験で月を遠ざけるため）。
export function moonPositions(world, t, offset = 0) {
  return world.moons.map((moon) => {
    const angle = moon.phase + offset + (moon.direction || 1) * ((TAU * t) / moon.period);
    return { x: moon.distance * Math.cos(angle), y: moon.distance * Math.sin(angle), radius: moon.radius, gm: moon.gm };
  });
}

// 時刻 t（秒）の、ふつうの世界の月の位置（最初は東（角度 0）から、反時計回り）。
export function moonPosition(t, phase = 0) {
  return moonPositions(DEFAULT_WORLD, t, phase)[0];
}

// 時刻 t（秒）に地球がどれだけ回ったか（ラジアン、反時計回り）。
export function earthRotation(t, start = 0, period = EARTH_PERIOD) {
  return start + (TAU * t) / period;
}

// 引っ張った向きと逆へ飛ばす（パチンコのように）。from は隕石の位置、to は指を離した位置。長さは MAX_PULL で切る。
export function launchVelocity(from, to) {
  let dx = from.x - to.x;
  let dy = from.y - to.y;
  const length = Math.hypot(dx, dy);
  if (length > MAX_PULL) {
    dx *= MAX_PULL / length;
    dy *= MAX_PULL / length;
  }
  return { x: dx * LAUNCH_SCALE, y: dy * LAUNCH_SCALE };
}

function acceleration(x, y, world, moons) {
  const r2 = x * x + y * y;
  const r = Math.sqrt(r2);
  let ax = (-world.earthGM * x) / (r2 * r);
  let ay = (-world.earthGM * y) / (r2 * r);
  for (const moon of moons) {
    const mx = x - moon.x;
    const my = y - moon.y;
    const m2 = mx * mx + my * my;
    const m = Math.sqrt(m2);
    ax += (-moon.gm * mx) / (m2 * m);
    ay += (-moon.gm * my) / (m2 * m);
  }
  return { x: ax, y: ay };
}

// 飛んでいる隕石の状態を作る。t は投げた時刻（ゲームの時計の秒）。moonPhase は月の向きに足す角度、world は遊ぶ世界。
export function launch(position, velocity, t, moonPhase = 0, world = DEFAULT_WORLD) {
  return { x: position.x, y: position.y, vx: velocity.x, vy: velocity.y, t, flight: 0, moonPhase, world, result: null };
}

// 状態を seconds だけ進める（STEP ごとに、速度ベルレ法）。当たり・外れが決まったら result を入れて止める。
// result: { kind: "earth", angle }（地球に当たった。angle は空間の向き）、{ kind: "moon" }、{ kind: "away" }（遠くへ出た・時間切れ）。
export function advance(state, seconds) {
  let remaining = seconds;
  while (remaining > 1e-9 && state.result === null) {
    const dt = Math.min(STEP, remaining);
    const world = state.world;
    const moonsNow = moonPositions(world, state.t, state.moonPhase);
    const [x0, y0] = [state.x, state.y];
    const a = acceleration(state.x, state.y, world, moonsNow);
    const x = state.x + state.vx * dt + 0.5 * a.x * dt * dt;
    const y = state.y + state.vy * dt + 0.5 * a.y * dt * dt;
    const moonsNext = moonPositions(world, state.t + dt, state.moonPhase);
    const b = acceleration(x, y, world, moonsNext);
    state.vx += 0.5 * (a.x + b.x) * dt;
    state.vy += 0.5 * (a.y + b.y) * dt;
    state.x = x;
    state.y = y;
    state.t += dt;
    state.flight += dt;
    remaining -= dt;
    const r = Math.hypot(x, y);
    if (r <= 1) {
      // 刻みの中で表面（半径 1）を横切った所まで戻す（かすめるように当たったとき、1 刻み分の角度のずれを出さないため）。
      const f = crossing(x0, y0, x - x0, y - y0);
      state.x = x0 + f * (x - x0);
      state.y = y0 + f * (y - y0);
      state.t -= (1 - f) * dt;
      state.flight -= (1 - f) * dt;
      state.result = { kind: "earth", angle: Math.atan2(state.y, state.x) };
    } else if (moonsNext.some((moon) => Math.hypot(x - moon.x, y - moon.y) <= moon.radius)) {
      state.result = { kind: "moon" };
    } else if (r >= OUT_DISTANCE || state.flight >= MAX_FLIGHT) {
      state.result = { kind: "away" };
    }
  }
  return state;
}

// 線分 p0 + f·d（0 ≤ f ≤ 1）が、半径 1 の円に外から入る所の f。
function crossing(x0, y0, dx, dy) {
  const a = dx * dx + dy * dy;
  const b = 2 * (x0 * dx + y0 * dy);
  const c = x0 * x0 + y0 * y0 - 1;
  const disc = b * b - 4 * a * c;
  if (a === 0 || disc < 0) return 1;
  return Math.min(1, Math.max(0, (-b - Math.sqrt(disc)) / (2 * a)));
}

// 投げる前に見せる、少し先までの道筋（狙いの手助け）。月と自転の効きを読む楽しみを残すため、短い時間だけ。
export function preview(position, velocity, t, moonPhase = 0, seconds = 1.2, every = 0.05, world = DEFAULT_WORLD) {
  const state = launch(position, velocity, t, moonPhase, world);
  const points = [];
  for (let elapsed = 0; elapsed < seconds && state.result === null; elapsed += every) {
    advance(state, every);
    points.push({ x: state.x, y: state.y });
  }
  return points;
}

// 空間の向き（ラジアン）を、その時刻の地球の上の経度（度、-180〜180）にする。地図の経度 0° は、回り始め（start）で東（角度 0）を向く。
export function longitudeAt(angle, t, start = 0, period = EARTH_PERIOD) {
  const degrees = ((angle - earthRotation(t, start, period)) * 180) / Math.PI;
  return wrapDegrees(degrees);
}

// 経度（度）を、その時刻の空間の向き（ラジアン）にする（的を描く所）。
export function angleOfLongitude(longitude, t, start = 0, period = EARTH_PERIOD) {
  return (longitude * Math.PI) / 180 + earthRotation(t, start, period);
}

export function wrapDegrees(degrees) {
  return ((((degrees + 180) % 360) + 360) % 360) - 180;
}

// 当たった経度と的の経度のずれ（赤道の上の km）。
export function missKm(hitLongitude, targetLongitude) {
  return Math.abs(wrapDegrees(hitLongitude - targetLongitude)) * KM_PER_DEGREE;
}

// 世界のいちばん外の月の軌道（月が無ければ 0）。画面の広さと隕石の置き場を決めるのに使う。
export function outerOrbit(world) {
  return Math.max(0, ...world.moons.map((moon) => moon.distance + moon.radius));
}

// ずれから、短い評価の言葉。
export function rating(km) {
  if (km < 300) return "ぴったり！";
  if (km < 1000) return "おしい！";
  if (km < 3000) return "まあまあ";
  return "遠い…";
}
