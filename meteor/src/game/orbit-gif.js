// 軌道に乗せろの投稿に付ける GIF: 360 px の正方形に、地球を中心に衛星ごとの跡の線が伸びていく（20 fps・45〜160 コマ、
// 最後に記録の終わりまでの全体を 1 秒ほど止めて見せ、くり返す。文字は入れない）。DESIGN.md。符号化は gifenc（MIT）。
// 動くコマは衛星ごとの見どころ（出してから最初の 1 周まで）の区間を合わせて見せ、区間の外は詰める。
// 跡は 2 段: そのコマの時刻までの全体を薄く、直近（GIF_RECENT 秒）を遊ぶ時の濃さで描き、先頭に衛星の印。
// 画面に出さない canvas で 1 コマずつ描き、コマごとに間をあけて画面を固まらせない。
import { GIFEncoder, applyPalette, quantize } from "gifenc";
import { drawEarth, drawSatellite, drawSpace } from "./draw.js";
import { SAT_RADIUS } from "./orbit.js";
import { GIF_DELAY, GIF_HOLD, GIF_RECENT, GIF_SIZE, gifCutoffs, gifPaths, gifScale } from "./orbit-record.js";

/*! @license gifenc v1.0.3 (c) 2017 Matt DesLauriers, MIT License
 *
 * The MIT License (MIT)
 * Copyright (c) 2017 Matt DesLauriers
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 */

// 遊ぶ時の跡の濃さ（生きている衛星）と、いなくなった衛星・薄く描く全体の濃さ。
const ALPHA = 0.55;
const FAINT = 0.2;

const pause = () => new Promise((resolve) => setTimeout(resolve, 0));

function makeCanvas(size) {
  if (typeof OffscreenCanvas !== "undefined") return new OffscreenCanvas(size, size);
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  return canvas;
}

// points は記録（orbit-record.js）、colors は色の番号の色、stars は背景の星、limit は縮尺に数える点の地球からの距離の上限
// （月の軌道の半径）。isCancelled が真になったらやめて null を返す。
export async function makeOrbitGif(points, { colors, stars, limit = Infinity, isCancelled = () => false }) {
  if (!points.length) return null;
  const size = GIF_SIZE;
  const center = { x: size / 2, y: size / 2 };
  const scale = gifScale(points, size, undefined, limit);
  const toScreen = (point) => ({ x: center.x + point.x * scale, y: center.y - point.y * scale });
  // 背景と地球はどのコマも同じなので 1 回だけ描いておく（地球の回転は 0）。
  const back = makeCanvas(size);
  const backContext = back.getContext("2d");
  drawSpace(backContext, size, size, stars);
  drawEarth(backContext, center, scale, 0);
  const canvas = makeCanvas(size);
  const c = canvas.getContext("2d", { willReadFrequently: true });
  const satelliteSize = Math.max(3, SAT_RADIUS * scale);

  function line(at, color, alpha) {
    if (at.length < 2) return;
    c.strokeStyle = color;
    c.globalAlpha = alpha;
    c.lineWidth = 1.5;
    // 点の間は、隣の点との中点を通る 2 次の曲線でなめらかにつなぐ（低い軌道で角張らないように）。
    c.beginPath();
    c.moveTo(at[0].x, at[0].y);
    for (let index = 1; index < at.length - 1; index += 1) {
      c.quadraticCurveTo(at[index].x, at[index].y, (at[index].x + at[index + 1].x) / 2, (at[index].y + at[index + 1].y) / 2);
    }
    c.lineTo(at[at.length - 1].x, at[at.length - 1].y);
    c.stroke();
    c.globalAlpha = 1;
  }

  // 2 段で描く（そこまでの全体を薄く・直近を濃く）。最後に止めるコマも同じ（長い回でも厚い帯にならず、最後の 1 周が濃く乗る）。
  function drawFrame(cutoff) {
    c.drawImage(back, 0, 0);
    for (const path of gifPaths(points, cutoff, GIF_RECENT)) {
      const color = colors[path.color % colors.length];
      const at = path.points.map(toScreen);
      if (path.ended) line(at, color, FAINT);
      else {
        line(at, color, FAINT);
        line(path.recent.map(toScreen), color, ALPHA);
      }
      // 先頭に衛星の印（進む向きは、先頭と違う所にある 1 つ前の点から）。いなくなった衛星には出さない。
      if (!path.ended) {
        const head = at[at.length - 1];
        let before = head;
        for (let index = at.length - 2; index >= 0 && before.x === head.x && before.y === head.y; index -= 1) before = at[index];
        drawSatellite(c, head.x, head.y, Math.atan2(head.y - before.y, head.x - before.x), color, satelliteSize);
      }
    }
    return c.getImageData(0, 0, size, size).data;
  }

  const cutoffs = gifCutoffs(points);
  const end = points[points.length - 1].t;
  // 色は 256 色以下。最後のコマと、動くコマを 5 つ（薄い跡・濃い跡・衛星の印。途中でいなくなる衛星の色も入るように）
  // から選び、全コマで同じパレットを使う。
  const picks = [drawFrame(end), ...[0, 0.25, 0.5, 0.75, 1].map((share) => drawFrame(cutoffs[Math.max(0, Math.ceil(share * cutoffs.length) - 1)]))];
  const sample = new Uint8ClampedArray(picks[0].length * picks.length);
  picks.forEach((data, index) => sample.set(data, index * data.length));
  const palette = quantize(sample, 256);
  await pause();
  const gif = GIFEncoder();
  const frames = [...cutoffs, end];
  for (let index = 0; index < frames.length; index += 1) {
    if (isCancelled()) return null;
    const final = index === frames.length - 1;
    gif.writeFrame(applyPalette(drawFrame(frames[index]), palette), size, size, {
      palette: index === 0 ? palette : undefined,
      delay: final ? GIF_DELAY + GIF_HOLD : GIF_DELAY,
      repeat: 0,
    });
    await pause();
  }
  gif.finish();
  return new Blob([gif.bytes()], { type: "image/gif" });
}
