// ゲームで共通に使う絵（隕石当て・軌道に乗せろ）。北極の上から見た地球と、宇宙の星。
import land from "../../assets/world_land.json";
import { polarPoint } from "./targets.js";

// 陸の形を、北極の上から見た地図（地球の半径 1）の Path2D にしておく（毎回は作らない）。
let landPath = null;
export function landShapes() {
  if (landPath) return landPath;
  landPath = new Path2D();
  for (const polygon of land.polygons) {
    // 南半球だけの陸（南極など）は描かない。縁（赤道）に寄せると縁いっぱいの輪になり、塗りが反転するため。
    if (polygon[0].every(([, latitude]) => latitude < 0)) continue;
    for (const ring of polygon) {
      ring.forEach(([longitude, latitude], index) => {
        const point = polarPoint(latitude, longitude);
        if (index === 0) landPath.moveTo(point.x, point.y);
        else landPath.lineTo(point.x, point.y);
      });
      landPath.closePath();
    }
  }
  return landPath;
}

export function makeStars(count) {
  return Array.from({ length: count }, () => ({ x: Math.random(), y: Math.random(), size: Math.random() < 0.85 ? 1 : 2, level: 90 + Math.floor(Math.random() * 140) }));
}

export function drawSpace(c, width, height, stars) {
  c.fillStyle = "#05070d";
  c.fillRect(0, 0, width, height);
  for (const star of stars) {
    c.fillStyle = `rgb(${star.level},${star.level},${Math.min(255, star.level + 20)})`;
    c.fillRect(star.x * width, star.y * height, star.size, star.size);
  }
}

// 地球（北極の上から見た地図を rotation だけ回す）。center は画面の px、scale は地球の半径の px。
export function drawEarth(c, center, scale, rotation) {
  c.save();
  c.translate(center.x, center.y);
  c.scale(scale, -scale);
  c.beginPath();
  c.arc(0, 0, 1.08, 0, Math.PI * 2);
  c.fillStyle = "rgba(143,195,255,0.25)";
  c.fill();
  c.beginPath();
  c.arc(0, 0, 1, 0, Math.PI * 2);
  c.fillStyle = "#4f86b8";
  c.fill();
  c.clip();
  c.rotate(rotation);
  c.fillStyle = "#d9d2bd";
  c.fill(landShapes(), "evenodd");
  c.restore();
}
