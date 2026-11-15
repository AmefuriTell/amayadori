// 軌道に乗せろの投稿に付ける GIF: 360 px の正方形に、地球を中心に衛星ごとの跡の線が伸びていく（約 3 秒・45 コマ、
// 最後のコマを 1 秒ほど止めて、くり返す。文字は入れない）。DESIGN.md。符号化は gifenc（MIT）。
// 画面に出さない canvas で 1 コマずつ描き、コマごとに間をあけて画面を固まらせない。
import { GIFEncoder, applyPalette, quantize } from "gifenc";
import { drawEarth, drawSatellite, drawSpace } from "./draw.js";
import { SAT_RADIUS } from "./orbit.js";
import { GIF_DELAY, GIF_FRAMES, GIF_HOLD, GIF_SIZE, gifCutoffs, gifPaths, gifScale } from "./orbit-record.js";

const pause = () => new Promise((resolve) => setTimeout(resolve, 0));

function makeCanvas(size) {
  if (typeof OffscreenCanvas !== "undefined") return new OffscreenCanvas(size, size);
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  return canvas;
}

// points は記録（orbit-record.js）、colors は色の番号の色、stars は背景の星。isCancelled が真になったらやめて null を返す。
export async function makeOrbitGif(points, { colors, stars, isCancelled = () => false }) {
  if (!points.length) return null;
  const size = GIF_SIZE;
  const center = { x: size / 2, y: size / 2 };
  const scale = gifScale(points, size);
  const toScreen = (point) => ({ x: center.x + point.x * scale, y: center.y - point.y * scale });
  // 背景と地球はどのコマも同じなので 1 回だけ描いておく（地球の回転は 0）。
  const back = makeCanvas(size);
  const backContext = back.getContext("2d");
  drawSpace(backContext, size, size, stars);
  drawEarth(backContext, center, scale, 0);
  const canvas = makeCanvas(size);
  const c = canvas.getContext("2d", { willReadFrequently: true });
  const satelliteSize = Math.max(3, SAT_RADIUS * scale);

  function drawFrame(cutoff) {
    c.drawImage(back, 0, 0);
    for (const path of gifPaths(points, cutoff)) {
      const color = colors[path.color % colors.length];
      const at = path.points.map(toScreen);
      // 跡の線は遊ぶ時と同じ太さと濃さ（いなくなった衛星は薄く）。
      if (at.length > 1) {
        c.strokeStyle = color;
        c.globalAlpha = path.ended ? 0.2 : 0.55;
        c.lineWidth = 1.5;
        c.beginPath();
        at.forEach((point, index) => (index === 0 ? c.moveTo(point.x, point.y) : c.lineTo(point.x, point.y)));
        c.stroke();
        c.globalAlpha = 1;
      }
      // 先頭に衛星の印（進む向きは最後の 2 点から）。いなくなった衛星には出さない。
      if (!path.ended) {
        const head = at[at.length - 1];
        const before = at[Math.max(0, at.length - 2)];
        drawSatellite(c, head.x, head.y, Math.atan2(head.y - before.y, head.x - before.x), color, satelliteSize);
      }
    }
    return c.getImageData(0, 0, size, size).data;
  }

  const cutoffs = gifCutoffs(points, GIF_FRAMES);
  // 色は 256 色以下。全部の線がそろう最後のコマから選び、全コマで同じパレットを使う（ファイルを小さくする）。
  const palette = quantize(drawFrame(cutoffs[cutoffs.length - 1]), 256);
  await pause();
  const gif = GIFEncoder();
  for (let index = 0; index < cutoffs.length; index += 1) {
    if (isCancelled()) return null;
    const data = drawFrame(cutoffs[index]);
    const last = index === cutoffs.length - 1;
    gif.writeFrame(applyPalette(data, palette), size, size, {
      palette: index === 0 ? palette : undefined,
      delay: last ? GIF_DELAY + GIF_HOLD : GIF_DELAY,
      repeat: 0,
    });
    await pause();
  }
  gif.finish();
  return new Blob([gif.bytes()], { type: "image/gif" });
}
