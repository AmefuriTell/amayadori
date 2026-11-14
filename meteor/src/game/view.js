// 世界（地球の半径 1、数学の向き）と画面（px、下向きが +y）の変換と、隕石の置き場。画面に頼らないので試験できる。
// 置き場は世界の中で 1 か所（padSign・padSlide だけで決まる）。横長の画面は見せ方だけを 90° 回し、置き場を長い辺の側に見せる。

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

// 隕石の置き場（世界の位置）。padSign（+1・-1）の側に、padSlide だけ横へずらす。
export function padPosition(padSign, padSlide) {
  return { x: padSlide, y: padSign * PAD_DISTANCE };
}
