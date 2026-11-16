// 世界（地球の半径 1、数学の向き）と画面（px、下向きが +y）の変換と、隕石の置き場。画面に頼らないので試験できる。
// 置き場は世界の中で 1 か所（padSign・padSlide だけで決まる）。横長の画面は見せ方だけを 90° 回し、置き場を長い辺の側に見せる。

import { MAX_PULL } from "./physics.js";

// 隕石を置く所: 地球から（月の軌道の外）この距離。世界の上下（y の向き）に置く。
export const PAD_DISTANCE = 6.7;

// 画面の回し方（ラジアン）。横長なら -90°（世界の上が画面の右になる）、それ以外は回さない。
export function viewTurn(width, height) {
  return width > height ? -Math.PI / 2 : 0;
}

// 地球の中心の画面の位置（px）。size に cx・cy が無ければ画面の真ん中。
function centerOf(size) {
  return { x: size.cx ?? size.width / 2, y: size.cy ?? size.height / 2 };
}

// 世界の位置を画面の px に。size は { width, height, scale, turn, cx, cy }（scale は地球の半径の px、cx・cy は地球の中心の px）。
// 回してから上下を返す。
export function toScreen(point, size) {
  const cos = Math.cos(size.turn || 0);
  const sin = Math.sin(size.turn || 0);
  const x = point.x * cos - point.y * sin;
  const y = point.x * sin + point.y * cos;
  const center = centerOf(size);
  return { x: center.x + x * size.scale, y: center.y - y * size.scale };
}

// 画面の px を世界の位置に（toScreen の逆）。
export function toWorld(px, py, size) {
  const cos = Math.cos(size.turn || 0);
  const sin = Math.sin(size.turn || 0);
  const center = centerOf(size);
  const x = (px - center.x) / size.scale;
  const y = (center.y - py) / size.scale;
  return { x: x * cos + y * sin, y: -x * sin + y * cos };
}

// 引き 1.0（地球の半径）あたりの指の動き（CSS px）。いっぱいの 3.0 は 180 px。画面の大きさ（scale）によらない。
export const PULL_PX = 60;

// 指の動き（startPx → nowPx、画面の px）を世界の向きの引き { x, y } に。向き（turn・上下）は toWorld と同じ。長さは MAX_PULL で切る。
export function pullDelta(startPx, nowPx, size) {
  const now = toWorld(nowPx.x, nowPx.y, size);
  const start = toWorld(startPx.x, startPx.y, size);
  const k = size.scale / PULL_PX;
  let dx = (now.x - start.x) * k;
  let dy = (now.y - start.y) * k;
  const length = Math.hypot(dx, dy);
  if (length > MAX_PULL) {
    dx *= MAX_PULL / length;
    dy *= MAX_PULL / length;
  }
  return { x: dx, y: dy };
}

// 隕石の置き場（世界の位置）。padSign（+1・-1）の側に、padSlide だけ横へずらす。
export function padPosition(padSign, padSlide) {
  return { x: padSlide, y: padSign * PAD_DISTANCE };
}

// 回さない画面（軌道に乗せろ）の引き: 指の動き（画面の px）を、上を +y にした引き { x, y } に。PULL_PX で 1.0、長さは MAX_PULL で切る。
export function screenPull(startPx, nowPx) {
  let dx = (nowPx.x - startPx.x) / PULL_PX;
  let dy = -(nowPx.y - startPx.y) / PULL_PX;
  const length = Math.hypot(dx, dy);
  if (length > MAX_PULL) {
    dx *= MAX_PULL / length;
    dy *= MAX_PULL / length;
  }
  return { x: dx, y: dy };
}

// screenPull の逆: 指を置いた所 startPx から引き pull（上が +y）だけ動かした指先の画面の px。
export function pullPx(startPx, pull) {
  return { x: startPx.x + pull.x * PULL_PX, y: startPx.y - pull.y * PULL_PX };
}

// カメラが出したばかりの衛星を追うか。打ち上げだけ追う。置くモードは触った画面の点が置く場所なので、
// 寄ると次に狙った点が地球の中に写ってずれるため、追わずに地球中心・利用者のズームのままにする（DESIGN.md）。
export function followsShot(style) {
  return style === "launch";
}

// 追いかけのカメラの目標: 地球（半径 1 の円）と points（衛星と道筋）が、画面の使える所（幅 width・高さ height から
// 左右 side・上下 edge px を除いた所）に収まる中心（世界の位置）と縮尺（地球の半径の px）。縮尺は [min, max] で切る。
export function followFrame(points, width, height, { side = 16, edge = 120, min = 0, max = Infinity } = {}) {
  let left = -1;
  let right = 1;
  let bottom = -1;
  let top = 1;
  for (const p of points) {
    left = Math.min(left, p.x);
    right = Math.max(right, p.x);
    bottom = Math.min(bottom, p.y);
    top = Math.max(top, p.y);
  }
  const fit = Math.min((width - 2 * side) / (right - left), (height - 2 * edge) / (top - bottom));
  return { x: (left + right) / 2, y: (bottom + top) / 2, scale: Math.min(max, Math.max(min, fit)) };
}

// カメラを目標へ近づける（時定数 tau 秒の指数。縮尺は比で寄せる）。seconds は画面の秒（ゲームの速さによらない）。
export function easeView(view, target, seconds, tau = 0.4) {
  const k = 1 - Math.exp(-seconds / tau);
  return {
    x: view.x + (target.x - view.x) * k,
    y: view.y + (target.y - view.y) * k,
    scale: view.scale * Math.pow(target.scale / view.scale, k),
  };
}
