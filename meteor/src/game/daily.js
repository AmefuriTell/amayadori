// 毎日のお題（docs/design/activity-map.md §4 の J）。日本時間の日付から決まった乱数を作り、その日は誰が遊んでも
// 同じ的・同じ地球の向き・同じ隕石の置き場になるようにする。回数と、いちばん近かった距離は端末の中に覚える（サーバーには送らない）。
import { TARGETS } from "./targets.js";

// 1 日に投げられる回数。
export const DAILY_ATTEMPTS = 3;
const STORAGE_PREFIX = "weatherbot.daily.";
const JST_OFFSET_MS = 9 * 60 * 60 * 1000;

// 日本時間の日付（"2026-11-14"）。
export function dayKey(date) {
  return new Date(date.getTime() + JST_OFFSET_MS).toISOString().slice(0, 10);
}

// 文字から決まった 32 bit の種を作り（FNV-1a）、0 以上 1 未満を返す乱数（mulberry32）にする。
export function seededRandom(text) {
  let seed = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    seed ^= text.charCodeAt(index);
    seed = Math.imul(seed, 16777619) >>> 0;
  }
  return () => {
    seed = (seed + 0x6d2b79f5) >>> 0;
    let value = seed;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

// その日のお題。
export function dailyChallenge(date) {
  const key = dayKey(date);
  const random = seededRandom(key);
  return {
    key,
    label: `${Number(key.slice(5, 7))}/${Number(key.slice(8, 10))}`,
    target: TARGETS[Math.floor(random() * TARGETS.length)],
    earthStart: random() * Math.PI * 2,
    padSign: random() < 0.5 ? -1 : 1,
    padSlide: (random() - 0.5) * 2,
  };
}

// 端末に覚えた、その日の残りの回数といちばん近かった距離。読めなければ（iframe で使えないなど）まだ遊んでいないものとする。
export function loadDaily(key, storage = globalThis.localStorage) {
  try {
    const saved = JSON.parse(storage.getItem(STORAGE_PREFIX + key) || "null");
    if (saved && Number.isInteger(saved.left) && saved.left >= 0 && saved.left <= DAILY_ATTEMPTS) {
      // 1 投ごとの距離（外れは null）。前の版で覚えた記録には無いので、数が合わなければ無いものとする。
      const shots = Array.isArray(saved.shots) && saved.shots.length === DAILY_ATTEMPTS - saved.left && saved.shots.every((km) => km === null || typeof km === "number") ? saved.shots : [];
      return { left: saved.left, best: typeof saved.best === "number" ? saved.best : null, shots };
    }
  } catch {
    // 使えなければ、覚えていないのと同じにする。
  }
  return { left: DAILY_ATTEMPTS, best: null, shots: [] };
}

export function saveDaily(key, record, storage = globalThis.localStorage) {
  try {
    storage.setItem(STORAGE_PREFIX + key, JSON.stringify(record));
  } catch {
    // 覚えられなくても遊べる（開き直すと回数が戻るだけ）。
  }
}

// 1 回投げた後の記録（km は地球に当たったときだけ。外れは null）。
export function afterThrow(record, km) {
  const best = km === null ? record.best : record.best === null ? km : Math.min(record.best, km);
  // 前の版で覚えた記録（shots が無い、数が合わない）から続けたときは、印を並べない（数の合わない印を出さないため）。
  const shots = record.shots || [];
  const complete = shots.length === DAILY_ATTEMPTS - record.left;
  return { left: Math.max(0, record.left - 1), best, shots: complete ? [...shots, km] : [] };
}

// 1 投の印（共有の文に並べる）。外れ（月に当たった・届かなかった）は ⬛。
export function shotMark(km) {
  if (km === null) return "⬛";
  if (km < 300) return "💥";
  if (km < 1000) return "🟩";
  if (km < 3000) return "🟨";
  return "🟥";
}

// 共有の文。
export function shareMessage(challenge, record, ratingOf) {
  const used = DAILY_ATTEMPTS - record.left;
  const result = record.best === null ? "当たらず…" : `${Math.round(record.best).toLocaleString("ja-JP")} km（${ratingOf(record.best)}）`;
  const marks = record.shots && record.shots.length ? ` ${record.shots.map(shotMark).join("")}` : "";
  return `🎯 今日の隕石当て ${challenge.label}・${challenge.target.name}: ${result}  ${used}/${DAILY_ATTEMPTS}回${marks}`;
}
