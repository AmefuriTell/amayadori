// 当たったときの爆発の演出（隕石当て・軌道に乗せろ）。光・広がる輪・火の粉・煙を、画面の px で描く。
// 位置は描くたびに渡す（地球に当たった所は自転で動くので、その時の位置に描く）。
// 計算はしない見た目だけのもの。power（0〜1）で大きさを変える（ぴったり当てたほど大きい）。
import { moonPositions } from "./physics.js";

// 爆発を見せる長さ（秒）。
export const EXPLOSION_SECONDS = 1.4;
// 画面の揺れの長さ（秒）と、いちばん大きいときの幅（px）。
const SHAKE_SECONDS = 0.45;
const SHAKE_PX = 9;
const SPARK_COLORS = ["#fff3b0", "#ffd166", "#ff9f1c", "#ff5a1f", "#ef476f"];

export function createExplosion(power = 0.5, random = Math.random) {
  const strength = Math.max(0, Math.min(1, power));
  const reach = 70 + 110 * strength;
  const sparks = Array.from({ length: Math.round(36 + 40 * strength) }, () => {
    const angle = random() * Math.PI * 2;
    return {
      dx: Math.cos(angle),
      dy: Math.sin(angle),
      // 止まるまでに進む長さ（px）。
      reach: reach * (0.35 + 0.65 * random()),
      size: 1.5 + random() * 2.5,
      color: SPARK_COLORS[Math.floor(random() * SPARK_COLORS.length)],
      life: 0.6 + random() * 0.7,
    };
  });
  const smoke = Array.from({ length: 10 }, () => {
    const angle = random() * Math.PI * 2;
    return { dx: Math.cos(angle), dy: Math.sin(angle), reach: reach * (0.15 + 0.3 * random()), size: 10 + random() * 14 * (0.5 + strength) };
  });
  return { age: 0, strength, reach, sparks, smoke };
}

export function advanceExplosion(explosion, seconds) {
  explosion.age += seconds;
  return explosion.age < EXPLOSION_SECONDS;
}

export function isExplosionOver(explosion) {
  return explosion.age >= EXPLOSION_SECONDS;
}

// 画面の揺れ（px）。動きを減らす設定の端末では揺らさない。
export function shakeOffset(explosion, reduceMotion, random = Math.random) {
  if (!explosion || reduceMotion || explosion.age >= SHAKE_SECONDS) return { x: 0, y: 0 };
  const amount = SHAKE_PX * (0.4 + 0.6 * explosion.strength) * (1 - explosion.age / SHAKE_SECONDS);
  return { x: (random() * 2 - 1) * amount, y: (random() * 2 - 1) * amount };
}

// 速く飛び出して、だんだん止まる（0〜1）。
function easeOut(t) {
  return 1 - (1 - Math.min(1, t)) ** 3;
}

export function drawExplosion(c, explosion, at) {
  const t = explosion.age;
  if (t >= EXPLOSION_SECONDS) return;
  c.save();
  // 煙（下に描く）。
  for (const puff of explosion.smoke) {
    const k = t / EXPLOSION_SECONDS;
    const distance = puff.reach * easeOut(k * 1.4);
    c.globalAlpha = 0.35 * (1 - k);
    c.fillStyle = "#5a4a42";
    c.beginPath();
    c.arc(at.x + puff.dx * distance, at.y + puff.dy * distance, puff.size * (0.6 + k), 0, Math.PI * 2);
    c.fill();
  }
  // 広がる輪（衝撃波）。
  const ring = Math.min(1, t / 0.7);
  if (ring < 1) {
    c.globalAlpha = 0.7 * (1 - ring);
    c.strokeStyle = "#ffe8a3";
    c.lineWidth = 3 * (1 - ring) + 1;
    c.beginPath();
    c.arc(at.x, at.y, explosion.reach * 0.9 * easeOut(ring), 0, Math.PI * 2);
    c.stroke();
  }
  // 火の粉。
  c.globalCompositeOperation = "lighter";
  for (const spark of explosion.sparks) {
    const k = t / spark.life;
    if (k >= 1) continue;
    const distance = spark.reach * easeOut(k);
    c.globalAlpha = 1 - k;
    c.fillStyle = spark.color;
    c.beginPath();
    c.arc(at.x + spark.dx * distance, at.y + spark.dy * distance, spark.size * (1 - 0.5 * k), 0, Math.PI * 2);
    c.fill();
  }
  // 最初の光。
  const flash = t / 0.3;
  if (flash < 1) {
    const radius = 12 + explosion.reach * 0.45 * easeOut(flash);
    const glow = c.createRadialGradient(at.x, at.y, 0, at.x, at.y, radius);
    glow.addColorStop(0, "rgba(255,255,255,1)");
    glow.addColorStop(0.35, "rgba(255,226,140,0.9)");
    glow.addColorStop(1, "rgba(255,120,40,0)");
    c.globalAlpha = 1 - flash;
    c.fillStyle = glow;
    c.beginPath();
    c.arc(at.x, at.y, radius, 0, Math.PI * 2);
    c.fill();
  }
  c.restore();
}

// 爆発の場所（世界の位置）。月に当たったら、いちばん近い月からのずれを覚えて月に付いていく。
export function moonAnchor(world, t, point) {
  const moons = moonPositions(world, t);
  let index = 0;
  moons.forEach((moon, i) => {
    if (Math.hypot(point.x - moon.x, point.y - moon.y) < Math.hypot(point.x - moons[index].x, point.y - moons[index].y)) index = i;
  });
  return { moon: index, dx: point.x - moons[index].x, dy: point.y - moons[index].y };
}

// 地球に落ちたら、そのときの自転の角度からの向きを覚えて、自転に付いていく。
export function earthAnchor(point, rotation) {
  return { earth: Math.atan2(point.y, point.x) - rotation, r: Math.hypot(point.x, point.y) };
}

// 今の時刻の、爆発の場所（世界の位置）。rotation は今の自転の角度（地球に付いていくときだけ使う）。
export function anchorPosition(anchor, world, t, rotation = 0) {
  if (anchor.moon !== undefined) {
    const moon = moonPositions(world, t)[anchor.moon];
    return { x: moon.x + anchor.dx, y: moon.y + anchor.dy };
  }
  if (anchor.earth !== undefined) {
    return { x: anchor.r * Math.cos(anchor.earth + rotation), y: anchor.r * Math.sin(anchor.earth + rotation) };
  }
  return anchor;
}
