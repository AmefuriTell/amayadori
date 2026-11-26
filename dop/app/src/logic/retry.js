// 間違えた問題だけ解き直す（A-0004）の画面に頼らない部分。
import { latestById } from './record.js';

export const RETRY_KEY = 'dop:v1:retry';

/** 最新の答えが不正解（分からないを含む）の問題 ID を、問題集の順に */
export function wrongIds(answers, questions) {
  const latest = latestById(answers);
  return questions.filter((q) => latest.get(q.id)?.correct === false).map((q) => q.id);
}

/** 解き直しの状態 { ids } */
export function parseRetry(raw) {
  try {
    const r = JSON.parse(raw);
    return r && Array.isArray(r.ids) && r.ids.length && r.ids.every((x) => typeof x === 'string') ? { ids: r.ids } : null;
  } catch {
    return null;
  }
}
