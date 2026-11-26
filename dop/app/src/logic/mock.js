// 模試（A-0003）の画面に頼らない部分: 問題の選び方・採点・途中の状態・残り時間。
import { grade } from './grade.js';

export const MOCK_KEY = 'dop:v1:mock';
export const MOCK_QUESTIONS = 75;
export const MOCK_MINUTES = 180;

/** n 問をドメインの割合で分ける（最大剰余法）。avail: ドメイン → 使える問題の数。足りない分はほかへ回す */
export function allocate(n, domains, avail) {
  const ids = Object.keys(domains).filter((d) => (avail[d] ?? 0) > 0);
  const total = Math.min(n, ids.reduce((s, d) => s + avail[d], 0));
  const count = Object.fromEntries(ids.map((d) => [d, 0]));
  let left = total;
  while (left > 0) {
    const open = ids.filter((d) => count[d] < avail[d]);
    const wsum = open.reduce((s, d) => s + (domains[d].weight ?? 0), 0) || open.length;
    const share = open.map((d) => ({ d, x: (left * (domains[d].weight ?? 1)) / wsum }));
    let given = 0;
    for (const s of share) {
      const k = Math.min(Math.floor(s.x), avail[s.d] - count[s.d]);
      count[s.d] += k;
      given += k;
    }
    const rest = left - given;
    const frac = (s) => Math.round((s.x - Math.floor(s.x)) * 1e9); // 小数の誤差で同点の順が変わらないように丸める
    share.sort((a, b) => frac(b) - frac(a) || Number(a.d) - Number(b.d));
    let r = rest;
    for (const s of share) {
      if (r <= 0) break;
      if (count[s.d] < avail[s.d]) { count[s.d]++; r--; }
    }
    left = total - Object.values(count).reduce((a, b) => a + b, 0);
    if (given === 0 && r === rest) break; // これ以上入らない
  }
  return count;
}

/** 模試の問題 ID を選ぶ。rng は 0〜1 を返す関数 */
export function pickMock(questions, domains, n = MOCK_QUESTIONS, rng = Math.random) {
  const byDomain = {};
  for (const q of questions) (byDomain[q.domain] ??= []).push(q.id);
  const avail = Object.fromEntries(Object.entries(byDomain).map(([d, list]) => [d, list.length]));
  const count = allocate(n, domains, avail);
  const ids = [];
  for (const [d, k] of Object.entries(count)) {
    const list = [...byDomain[d]];
    for (let i = list.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [list[i], list[j]] = [list[j], list[i]]; }
    ids.push(...list.slice(0, k));
  }
  for (let i = ids.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [ids[i], ids[j]] = [ids[j], ids[i]]; }
  return ids;
}

/** 採点。answers: 問題 ID → 選んだ選択肢。答えなかった問題は不正解 */
export function scoreMock(questions, ids, answers, domains) {
  const byId = Object.fromEntries(questions.map((q) => [q.id, q]));
  const rows = ids.map((id) => byId[id]).filter(Boolean).map((q) => {
    const selected = answers[q.id] ?? [];
    return { id: q.id, domain: q.domain, answered: selected.length > 0, correct: selected.length > 0 && grade(q, selected) };
  });
  const byDomain = Object.keys(domains).map((d) => {
    const r = rows.filter((x) => String(x.domain) === String(d));
    const c = r.filter((x) => x.correct).length;
    return { domain: Number(d), name: domains[d].name, total: r.length, correct: c, rate: r.length ? c / r.length : null };
  }).filter((x) => x.total > 0);
  const correct = rows.filter((x) => x.correct).length;
  return { total: rows.length, correct, rate: rows.length ? correct / rows.length : 0, byDomain, wrong: rows.filter((x) => !x.correct).map((x) => x.id) };
}

/** 途中の状態 { ids, index, answers, deadline, done } */
export function parseMock(raw) {
  try {
    const m = JSON.parse(raw);
    if (!m || !Array.isArray(m.ids) || !m.ids.every((x) => typeof x === 'string') || typeof m.deadline !== 'number') return null;
    const answers = m.answers && typeof m.answers === 'object' ? m.answers : {};
    return { ids: m.ids, index: Number.isInteger(m.index) && m.index >= 0 && m.index < m.ids.length ? m.index : 0, answers, deadline: m.deadline, done: m.done === true };
  } catch {
    return null;
  }
}

/** 残りの秒数（0 より下にしない） */
export function remaining(deadline, now = Date.now()) {
  return Math.max(0, Math.floor((deadline - now) / 1000));
}

export function formatTime(sec) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}
