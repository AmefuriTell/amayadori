// 画面に戻らない外れを待たずに結果にするための先読み（game.js の update）。画面に頼らない純粋な計算なので試験できる。
// 判定は physics.js の advance そのまま（OUT_DISTANCE・MAX_FLIGHT も変えない）。見せ方だけを縮める。
import { STEP, advance } from "./physics.js";
import { toWorld } from "./view.js";

// 飛んでいる状態を複製し、結果が出るまで STEP ずつ進める。結果が away で、それまで一度も isVisible(point) が真に
// ならなければ、その最終状態を返す。画面に戻る・地球や月に当たるなら null（今までどおり見せる）。
// 元の state は変えない（world は読むだけなので共有のまま）。
export function missAhead(state, isVisible) {
  const ahead = { ...state };
  while (ahead.result === null) {
    advance(ahead, STEP);
    if (ahead.result === null && isVisible(ahead)) return null;
  }
  return ahead.result.kind === "away" ? ahead : null;
}

// 画面に見えている範囲（size は view.js の形）を世界の座標の 4 隅にした四角（回した画面・中心のずれも toWorld が直す）。
// marginPx だけ外へ広げる（隕石の半径ぶん、縁にかかっていれば見えているとする）。
export function visibleArea(size, marginPx = 0) {
  const m = marginPx;
  return [
    toWorld(-m, -m, size),
    toWorld(size.width + m, -m, size),
    toWorld(size.width + m, size.height + m, size),
    toWorld(-m, size.height + m, size),
  ];
}

// 点が四角（visibleArea の 4 隅、順に回る凸の四角）の中か（縁の上も中とする）。
export function insideArea(point, corners) {
  let sign = 0;
  for (let i = 0; i < corners.length; i++) {
    const a = corners[i];
    const b = corners[(i + 1) % corners.length];
    const cross = (b.x - a.x) * (point.y - a.y) - (b.y - a.y) * (point.x - a.x);
    if (cross === 0) continue;
    if (sign === 0) sign = Math.sign(cross);
    else if (Math.sign(cross) !== sign) return false;
  }
  return true;
}
