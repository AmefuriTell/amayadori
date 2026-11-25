// 解いた記録（画面にも localStorage にも頼らない部分）

export const RECORD_KEY = 'dop:v1:answers';
export const MAX_ANSWERS = 5000;

const valid = (x) => x && typeof x.id === 'string' && typeof x.correct === 'boolean' && typeof x.at === 'number';

/** 保存した文字列から答えの一覧を取る。壊れていれば空 */
export function parseRecord(text) {
  if (typeof text !== 'string') return [];
  try {
    const data = JSON.parse(text);
    if (data?.v !== 1 || !Array.isArray(data.answers)) return [];
    return data.answers.filter(valid);
  } catch {
    return [];
  }
}

export function serializeRecord(answers) {
  return JSON.stringify({ v: 1, answers });
}

/** 答えを 1 つ足す（古い方を捨てて MAX_ANSWERS 件まで） */
export function addAnswer(answers, entry) {
  const next = [...answers, entry];
  return next.length > MAX_ANSWERS ? next.slice(next.length - MAX_ANSWERS) : next;
}

/** 問題ごとの最新の答え（id → 答え） */
export function latestById(answers) {
  const map = new Map();
  for (const x of answers) {
    const prev = map.get(x.id);
    if (!prev || x.at >= prev.at) map.set(x.id, x);
  }
  return map;
}

/** ドメインごとの 問題数・解いた数・正解数・正答率（解いていなければ null） */
export function domainStats(answers, questions, domains) {
  const latest = latestById(answers);
  return Object.entries(domains)
    .map(([id, d]) => {
      const domain = Number(id);
      const qs = questions.filter((q) => q.domain === domain);
      const done = qs.map((q) => latest.get(q.id)).filter(Boolean);
      const correct = done.filter((x) => x.correct).length;
      return { domain, name: d.name, total: qs.length, answered: done.length, correct, rate: done.length ? correct / done.length : null };
    })
    .sort((x, y) => x.domain - y.domain);
}
