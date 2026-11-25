// 解いている所（A-0010）。読み込み直しても続けられるように、何問目かではなく問題 ID で覚える。
export const PROGRESS_KEY = 'dop:v1:progress';

export function parseProgress(raw) {
  try {
    const p = JSON.parse(raw);
    if (!p || typeof p !== 'object') return null;
    if (p.done === true) return { done: true, correct: Number.isInteger(p.correct) && p.correct >= 0 ? p.correct : 0 };
    if (typeof p.id !== 'string' || !Array.isArray(p.selected) || !p.selected.every((k) => typeof k === 'string')) return null;
    return { id: p.id, selected: p.selected, answered: p.answered === true, skipped: p.skipped === true, correct: Number.isInteger(p.correct) && p.correct >= 0 ? p.correct : 0 };
  } catch {
    return null;
  }
}

/** 続きの状態 { index, selected, answered, correct }。問題集に無い ID なら最初から */
export function resume(questions, p) {
  const fresh = { index: 0, selected: [], answered: false, skipped: false, correct: 0 };
  if (!p) return fresh;
  if (p.done) return { ...fresh, index: questions.length, correct: p.correct };
  const index = questions.findIndex((q) => q.id === p.id);
  if (index < 0) return fresh;
  const keys = new Set(questions[index].choices.map((c) => c.key));
  const selected = p.selected.filter((k) => keys.has(k));
  const skipped = p.answered && p.skipped;
  return { index, selected: skipped ? [] : selected, answered: p.answered && (skipped || selected.length > 0), skipped, correct: p.correct };
}

/** 今の状態から、残す物 */
export function snapshot(state) {
  if (state.index >= state.questions.length) return { done: true, correct: state.correct };
  return { id: state.questions[state.index].id, selected: [...state.selected], answered: state.answered, skipped: !!state.skipped, correct: state.correct };
}
