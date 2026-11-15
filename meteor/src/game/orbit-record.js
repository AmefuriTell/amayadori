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
// 動くコマの数の下限と上限。コマの数は見せる時間の長さに比例させ、1 コマで衛星の印が進む量を低い軌道（GIF_LOW_PERIOD）の
// 1/6 周以下にする。上限は再生 8 秒（20 fps で 160 コマ）。衛星は 3 機までで見どころは 1 機 GIF_FOCUS_CAP 秒までなので、ふつうは届かない。
export const GIF_MIN_FRAMES = 45;
export const GIF_MAX_FRAMES = 160;
// 低い軌道（地球の中心から 1.2、地球の重さ 2.0）の 1 周の秒。
export const GIF_LOW_PERIOD = 2 * Math.PI * Math.sqrt(1.2 ** 3 / 2);
// 濃く描く直近の跡の長さ（ゲームの秒。低い軌道の 1 周ほど）と、衛星が 1 周を回り切ってから見せる秒。
export const GIF_RECENT = 8;
export const GIF_AFTER_TURN = 3;
// 衛星ごとの見どころの区間の長さの上限（出してからのゲームの秒）。高い軌道で 1 周が長くても、ここまで。
export const GIF_FOCUS_CAP = 20;
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

// 衛星ごとの見どころの区間（ゲームの時刻）を、重なりを合わせて時刻の順に並べたもの。区間は [出した時刻, 1 周を回り切った
// 時刻 + GIF_AFTER_TURN]。回り切らなければ [出した時刻, その衛星の記録の終わり]。どちらも出してから cap 秒までと、記録の終わりまで。
export function gifFocusRanges(points, cap = GIF_FOCUS_CAP) {
  if (!points.length) return [];
  const last = points[points.length - 1].t;
  const ranges = gifSatellites(points)
    .map((satellite) => {
      const end = satellite.turnAt === null ? satellite.last : satellite.turnAt + GIF_AFTER_TURN;
      return [satellite.first, Math.min(end, satellite.first + cap, last)];
    })
    .sort((a, b) => a[0] - b[0]);
  const merged = [];
  for (const [from, to] of ranges) {
    const top = merged[merged.length - 1];
    if (top && from <= top[1] + 1e-9) top[1] = Math.max(top[1], to);
    else merged.push([from, to]);
  }
  return merged;
}

const rangesLength = (ranges) => ranges.reduce((sum, [from, to]) => sum + (to - from), 0);

// 動くコマが見せる範囲の終わり: 見どころの区間の最後の終わり。
export function gifFocusEnd(points) {
  const ranges = gifFocusRanges(points);
  return ranges.length ? ranges[ranges.length - 1][1] : 0;
}

// 動くコマごとの、そこまで描く時刻。見どころの区間を合わせて区間の外を詰めた時間軸で等しく分ける（区間のつなぎ目は 1 コマで飛ぶ）。
// コマの数は、1 コマで進むゲームの秒が低い軌道の 1/6 周以下になるように（下限と上限の間で）。上限でも足りなければ、
// 区間の長さの上限（cap）を短くして収める。
export function gifCutoffs(points, { min = GIF_MIN_FRAMES, max = GIF_MAX_FRAMES, lowPeriod = GIF_LOW_PERIOD, cap = GIF_FOCUS_CAP } = {}) {
  if (!points.length) return [];
  const step = lowPeriod / 6;
  let ranges = gifFocusRanges(points, cap);
  if (rangesLength(ranges) > max * step) {
    // 区間の合わせた長さは cap について減らない。収まる cap を 2 分で探す。
    let low = 0;
    let high = cap;
    for (let index = 0; index < 40; index += 1) {
      const mid = (low + high) / 2;
      if (rangesLength(gifFocusRanges(points, mid)) <= max * step) low = mid;
      else high = mid;
    }
    ranges = gifFocusRanges(points, low);
  }
  const total = rangesLength(ranges);
  const frames = Math.min(max, Math.max(min, Math.ceil(total / step - 1e-9)));
  const cutoffs = [];
  for (let frame = 1; frame <= frames; frame += 1) {
    if (total === 0) {
      cutoffs.push(ranges[0][0]);
      continue;
    }
    if (frame === frames) {
      cutoffs.push(ranges[ranges.length - 1][1]);
      continue;
    }
    // 時間軸の位置 at が入る区間（つなぎ目ちょうどなら前の区間の終わり）。
    let at = (total * frame) / frames;
    let index = 0;
    while (index < ranges.length - 1 && at > ranges[index][1] - ranges[index][0] + 1e-9) {
      at -= ranges[index][1] - ranges[index][0];
      index += 1;
    }
    cutoffs.push(Math.min(ranges[index][1], ranges[index][0] + at));
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
