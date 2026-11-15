// 軌道に乗せろの投稿に付ける GIF（衛星の跡が伸びていく絵）の、記録と組み立ての計算（DESIGN.md）。
// 絵を描く所（orbit-gif.js）から分けて、画面に頼らずに node --test で確かめる。
// 記録は { t: ゲームの時刻, x, y, c: 色の番号 } の並び（時刻の順）。

// 記録の間隔（ゲームの秒。速さによらずゲームの時間で数える）。0.5 秒では低い軌道の跡が角張ったので 0.25 秒。
export const RECORD_EVERY = 0.25;
// GIF の大きさ（px）・コマの数・1 コマの長さ（ms。15 fps）・最後のコマを止めて見せる長さ（ms）・縁の余白（px）。
export const GIF_SIZE = 360;
export const GIF_FRAMES = 45;
export const GIF_DELAY = 67;
export const GIF_HOLD = 1000;
export const GIF_MARGIN = 14;
// 地球の縁（drawEarth の大気の輪の半径）。
const EARTH_EDGE = 1.08;

// 地球の半径の px: 記録した点と地球が、余白を除いた所に収まる大きさ。地球から limit（月の軌道の半径）より遠い点は数えない
// （飛んでいった衛星に合わせると地球が小さくなりすぎるため。その跡は画面の外へ出ていく線のまま描く）。
export function gifScale(points, size = GIF_SIZE, margin = GIF_MARGIN, limit = Infinity) {
  const far = points.reduce((most, point) => {
    const distance = Math.hypot(point.x, point.y);
    return distance > limit ? most : Math.max(most, distance);
  }, EARTH_EDGE);
  return (size / 2 - margin) / far;
}

// コマごとの、そこまで描く時刻（記録の初めから終わりまでを等しく分け、最後のコマで全部）。
export function gifCutoffs(points, frames = GIF_FRAMES) {
  if (!points.length) return [];
  const first = points[0].t;
  const last = points[points.length - 1].t;
  return Array.from({ length: frames }, (_, index) => (index === frames - 1 ? last : first + ((last - first) * (index + 1)) / frames));
}

// その時刻までの、色ごとの跡の線。ended は、その衛星の記録がその時刻より前に終わっている（いなくなった）か。
export function gifPaths(points, cutoff) {
  const lastOf = new Map();
  for (const point of points) lastOf.set(point.c, point.t);
  const paths = new Map();
  for (const point of points) {
    if (point.t > cutoff + 1e-9) break;
    if (!paths.has(point.c)) paths.set(point.c, { color: point.c, points: [], ended: lastOf.get(point.c) < cutoff - 1e-9 });
    paths.get(point.c).points.push({ x: point.x, y: point.y });
  }
  return [...paths.values()];
}
