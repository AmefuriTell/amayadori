// 軌道に乗せろの投稿に付ける GIF（衛星の跡が伸びていく絵）の、記録と組み立ての計算（DESIGN.md）。
// 絵を描く所（orbit-gif.js）から分けて、画面に頼らずに node --test で確かめる。
// 記録は { t: ゲームの時刻, x, y, c: 色の番号 } の並び（時刻の順）。

// 記録の間隔（ゲームの秒。速さによらずゲームの時間で数える）。0.5 秒では低い軌道の跡が角張ったので 0.25 秒。
export const RECORD_EVERY = 0.25;
// GIF の大きさ（px）・1 コマの長さ（ms。20 fps）・最後のコマを止めて見せる長さ（ms）・縁の余白（px）。
export const GIF_SIZE = 360;
export const GIF_DELAY = 50;
export const GIF_HOLD = 1000;
export const GIF_MARGIN = 14;
// 動くコマの数の下限と上限。1 コマで衛星の印が進む量を、低い軌道（GIF_LOW_PERIOD）の 1/6 周以下を目安にして決める。
export const GIF_MIN_FRAMES = 45;
export const GIF_MAX_FRAMES = 90;
// 低い軌道（地球の中心から 1.2、地球の重さ 2.0）の 1 周の秒。
export const GIF_LOW_PERIOD = 2 * Math.PI * Math.sqrt(1.2 ** 3 / 2);
// 濃く描く直近の跡の長さ（ゲームの秒。低い軌道の 1 周ほど）と、最後に出した衛星が 1 周を回り切ってから見せる秒。
export const GIF_RECENT = 8;
export const GIF_AFTER_TURN = 3;
// 地球の縁（drawEarth の大気の輪の半径）。
const EARTH_EDGE = 1.08;
const TAU = Math.PI * 2;

// 地球の半径の px: 記録した点と地球が、余白を除いた所に収まる大きさ。地球から limit（月の軌道の半径）より遠い点は数えない
// （飛んでいった衛星に合わせると地球が小さくなりすぎるため。その跡は画面の外へ出ていく線のまま描く）。
export function gifScale(points, size = GIF_SIZE, margin = GIF_MARGIN, limit = Infinity) {
  const far = points.reduce((most, point) => {
    const distance = Math.hypot(point.x, point.y);
    return distance > limit ? most : Math.max(most, distance);
  }, EARTH_EDGE);
  return (size / 2 - margin) / far;
}

// 色ごとの、記録の初めと終わりの時刻と、最初の 1 周を回り切った時刻（地球の周りを回った角度が 2π に届いた時。届かなければ null）。
export function gifSatellites(points) {
  const map = new Map();
  for (const point of points) {
    const angle = Math.atan2(point.y, point.x);
    const satellite = map.get(point.c);
    if (!satellite) {
      map.set(point.c, { color: point.c, first: point.t, last: point.t, turnAt: null, angle, sweep: 0 });
      continue;
    }
    let delta = angle - satellite.angle;
    if (delta > Math.PI) delta -= TAU;
    if (delta < -Math.PI) delta += TAU;
    satellite.angle = angle;
    satellite.sweep += delta;
    satellite.last = point.t;
    if (satellite.turnAt === null && Math.abs(satellite.sweep) >= TAU) satellite.turnAt = point.t;
  }
  return [...map.values()].map(({ color, first, last, turnAt }) => ({ color, first, last, turnAt }));
}

// 動くコマが見せる範囲の終わり（見どころ）: 最後に出した衛星が 1 周を回り切った時刻 + GIF_AFTER_TURN。
// 回り切らなければ、その衛星の記録の終わり（いなくなった時刻か、ゲームの終わり）。記録の終わりは超えない。
export function gifFocusEnd(points) {
  if (!points.length) return 0;
  const satellites = gifSatellites(points);
  const latest = satellites.reduce((most, satellite) => (satellite.first > most.first ? satellite : most));
  const end = latest.turnAt === null ? latest.last : latest.turnAt + GIF_AFTER_TURN;
  return Math.min(end, points[points.length - 1].t);
}

// 動くコマごとの、そこまで描く時刻。記録の初めから見どころの終わりまでを、生きている衛星がいない時間（記録の間があいた所）を
// 詰めた時間軸で等しく分ける。コマの数は、1 コマで進むゲームの秒が低い軌道の 1/6 周以下になるように（下限と上限の間で）。
export function gifCutoffs(points, { min = GIF_MIN_FRAMES, max = GIF_MAX_FRAMES, lowPeriod = GIF_LOW_PERIOD } = {}) {
  if (!points.length) return [];
  const end = gifFocusEnd(points);
  // 詰めた時間軸: 記録の時刻ごとに、前の時刻からの間（RECORD_EVERY より長い間は RECORD_EVERY に詰める）を足す。
  const times = [];
  for (const point of points) {
    if (point.t > end + 1e-9) break;
    if (!times.length || point.t > times[times.length - 1] + 1e-9) times.push(point.t);
  }
  if (times[times.length - 1] < end - 1e-9) times.push(end);
  const axis = [0];
  for (let index = 1; index < times.length; index += 1) axis.push(axis[index - 1] + Math.min(times[index] - times[index - 1], RECORD_EVERY));
  const total = axis[axis.length - 1];
  const frames = Math.min(max, Math.max(min, Math.ceil(total / (lowPeriod / 6))));
  const cutoffs = [];
  let segment = 1;
  for (let frame = 1; frame <= frames; frame += 1) {
    if (frame === frames || total === 0) {
      cutoffs.push(frame === frames ? times[times.length - 1] : times[0]);
      continue;
    }
    const at = (total * frame) / frames;
    while (segment < axis.length - 1 && axis[segment] < at) segment += 1;
    const share = (at - axis[segment - 1]) / (axis[segment] - axis[segment - 1]);
    cutoffs.push(times[segment - 1] + share * (times[segment] - times[segment - 1]));
  }
  return cutoffs;
}

// その時刻までの、色ごとの跡の線。points はその時刻までの全部、recent は直近 recent 秒（1 つ前の点からつなぐ）。
// ended は、その衛星の記録がその時刻より前に終わっている（いなくなった）か。
export function gifPaths(points, cutoff, recent = Infinity) {
  const lastOf = new Map();
  for (const point of points) lastOf.set(point.c, point.t);
  const paths = new Map();
  for (const point of points) {
    if (point.t > cutoff + 1e-9) break;
    if (!paths.has(point.c)) paths.set(point.c, { color: point.c, points: [], recent: [], ended: lastOf.get(point.c) < cutoff - 1e-9 });
    const path = paths.get(point.c);
    const at = { x: point.x, y: point.y };
    if (point.t >= cutoff - recent - 1e-9 && !path.recent.length && path.points.length) path.recent.push(path.points[path.points.length - 1]);
    if (point.t >= cutoff - recent - 1e-9) path.recent.push(at);
    path.points.push(at);
  }
  return [...paths.values()];
}
