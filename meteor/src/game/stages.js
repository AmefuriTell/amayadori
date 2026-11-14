// ステージ（docs/design/activity-map.md §4 の J）。面ごとに地球の回る速さと月を変えて、だんだん難しくする。
// CLEAR_KM より近く当てると次の面が開く。どこまで開いたかと、面ごとのいちばん近かった距離は端末に覚える。
import { DEFAULT_WORLD, EARTH_GM } from "./physics.js";

// この距離（km）より近く当てると、その面をクリアにする（評価の「おしい！」以上）。
export const CLEAR_KM = 1000;
const STORAGE_KEY = "weatherbot.stages";

export const STAGES = [
  {
    id: "first",
    name: "はじめての一投",
    note: "月なし・地球はゆっくり",
    world: { earthGM: EARTH_GM, earthPeriod: 60, moons: [] },
  },
  { id: "moon", name: "月のいたずら", note: "月が軌道を曲げる", world: DEFAULT_WORLD },
  {
    id: "spin",
    name: "早回りの地球",
    note: "地球が 16 秒で 1 回り",
    world: { ...DEFAULT_WORLD, earthPeriod: 16 },
  },
  {
    id: "twin",
    name: "ふたつの月",
    note: "内と外に月がひとつずつ",
    world: {
      earthGM: EARTH_GM,
      earthPeriod: 40,
      moons: [
        { distance: 3.0, period: 12, gm: 0.2, radius: 0.22, phase: 0, direction: 1 },
        { distance: 5.0, period: 30, gm: 0.3, radius: 0.3, phase: Math.PI, direction: 1 },
      ],
    },
  },
  {
    id: "heavy",
    name: "逆回りの重い月",
    note: "重い月が逆向きに回る",
    world: {
      earthGM: EARTH_GM,
      earthPeriod: 30,
      moons: [{ distance: 3.8, period: 16, gm: 0.8, radius: 0.35, phase: Math.PI / 2, direction: -1 }],
    },
  },
];

// 端末に覚えた進み具合: cleared はクリアした面の数（次に遊べるのは STAGES[cleared] まで）、best は面ごとのいちばん近かった距離。
// 読めない・おかしな値なら、最初から。
export function loadProgress(storage = globalThis.localStorage) {
  try {
    const saved = JSON.parse(storage.getItem(STORAGE_KEY) || "null");
    if (saved && Number.isInteger(saved.cleared) && saved.cleared >= 0 && saved.cleared <= STAGES.length) {
      const best = {};
      for (const stage of STAGES) {
        const km = saved.best && saved.best[stage.id];
        if (typeof km === "number" && Number.isFinite(km) && km >= 0) best[stage.id] = km;
      }
      return { cleared: saved.cleared, best };
    }
  } catch {
    // 使えなければ、覚えていないのと同じにする。
  }
  return { cleared: 0, best: {} };
}

export function saveProgress(progress, storage = globalThis.localStorage) {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // 覚えられなくても遊べる（開き直すと最初の面からになるだけ）。
  }
}

// その面を遊べるか（クリアした面と、その次の面）。
export function isOpen(progress, index) {
  return index >= 0 && index < STAGES.length && index <= progress.cleared;
}

// 1 回投げた後の進み具合（km は地球に当たったときだけ。外れは null）。クリアしたのが今の最後の面なら、次を開く。
export function afterStageThrow(progress, index, km) {
  const stage = STAGES[index];
  const best = { ...progress.best };
  if (km !== null && (best[stage.id] === undefined || km < best[stage.id])) best[stage.id] = km;
  const cleared = km !== null && km < CLEAR_KM && index === progress.cleared ? progress.cleared + 1 : progress.cleared;
  return { cleared: Math.min(cleared, STAGES.length), best };
}
