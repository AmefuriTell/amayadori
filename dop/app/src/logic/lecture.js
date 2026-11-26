// 講義の進み具合（A-0017）: 講義ごとに最後に見たスライドの番号、見終えた講義、開いていた講義。
export const LECTURE_KEY = 'dop:v1:lecture';

const empty = () => ({ last: {}, seen: [], open: null });
const isTask = (t) => typeof t === 'string' && /^\d+\.\d+$/.test(t);

/** 端末に残した物を読む。壊れていれば空 */
export function parseLecture(raw) {
  try {
    const p = JSON.parse(raw);
    if (!p || typeof p !== 'object' || Array.isArray(p)) return empty();
    const last = {};
    if (p.last && typeof p.last === 'object') {
      for (const [t, i] of Object.entries(p.last)) if (isTask(t) && Number.isInteger(i) && i >= 0) last[t] = i;
    }
    const seen = Array.isArray(p.seen) ? [...new Set(p.seen.filter(isTask))] : [];
    return { last, seen, open: isTask(p.open) ? p.open : null };
  } catch {
    return empty();
  }
}

/** その講義で続きから見るスライド（0 から）。枚数を超えていれば 1 枚目 */
export function slideOf(p, task, count) {
  const i = p.last[task];
  return Number.isInteger(i) && i < count ? i : 0;
}

export const setSlide = (p, task, index) => ({ ...p, last: { ...p.last, [task]: index }, open: task });
export const markSeen = (p, task) => (p.seen.includes(task) ? p : { ...p, seen: [...p.seen, task] });
export const isSeen = (p, task) => p.seen.includes(task);
export const closeLecture = (p) => ({ ...p, open: null });
