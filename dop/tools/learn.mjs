#!/usr/bin/env node
// 苦手の分析（L1）: 解いた記録と誤りの報告から、作業の一覧（backlog）に項目を足す。
//   weak [--dry]
// 入力: .loop/answers/*.json
//   - アプリの「記録の書き出し」のファイル { v: 1, exported_at, answers: [...], reports: [...] }
//   - issues.json: GitHub の issue の一覧 [{ number, title, body, state }]（進行役が GitHub の道具で取って置く）
// 決まりは loop/steps/L1-learn.md。AI は記録の中身を読まず、この出力の要約だけを見る。
import fs from 'node:fs';
import path from 'node:path';
import { paths, readJSON, writeJSON, emit, main, setResult } from './lib/io.mjs';
import { loadBank, exam } from './lib/bank.mjs';

export const RULES = {
  weakRate: 0.7, weakMin: 5,            // タスクの正答率が 70% 未満、解いた問題が 5 以上
  suspectRate: 0.2, suspectMin: 3,      // 問題の正答率が 20% 未満、3 回以上解かれた
  passRate: 0.8, passMin: 100,          // 直近 100 回の正答率が 80% 以上
};
const QID = /q-[1-6]\.[0-9]+-[0-9]{4}/;

/** answers/ の中のファイルを読み、答えと報告と issue をまとめる（同じ物は 1 つに） */
export function loadInputs(dir = paths.answers()) {
  const answers = new Map();
  const reports = [];
  const issues = [];
  if (!fs.existsSync(dir)) return { answers: [], reports, issues };
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.json')).sort()) {
    const data = readJSON(path.join(dir, f), null);
    if (Array.isArray(data)) { issues.push(...data.filter((i) => i && typeof i.title === 'string')); continue; }
    if (!data || data.v !== 1) continue;
    for (const a of data.answers ?? []) {
      if (a && typeof a.id === 'string' && typeof a.correct === 'boolean' && typeof a.at === 'number') answers.set(`${a.id}|${a.at}`, a);
    }
    for (const r of data.reports ?? []) if (r && typeof r.id === 'string') reports.push({ ...r, from: 'app' });
  }
  return { answers: [...answers.values()].sort((a, b) => a.at - b.at), reports, issues };
}

/** issue から誤りの報告を取る（題か本文に問題 ID がある物だけ） */
export function reportsFromIssues(issues) {
  return issues
    .filter((i) => (i.state ?? 'open') === 'open' && /\[DOP\]/.test(i.title))
    .map((i) => {
      const id = (i.title.match(QID) ?? String(i.body ?? '').match(QID))?.[0];
      const kind = String(i.body ?? '').match(/- 種類: (.+)/)?.[1]?.trim() ?? '';
      const comment = String(i.body ?? '').split('\n').filter((l) => l && !l.startsWith('- ') && !l.startsWith('<!--')).join(' ').slice(0, 300);
      return id ? { id, kind, comment, issue: i.number, from: 'issue' } : null;
    })
    .filter(Boolean);
}

/** 計算だけ（backlog は変えない） */
export function analyze({ answers, reports }, bank = loadBank(), ex = exam()) {
  const taskOf = Object.fromEntries(bank.map((q) => [q.id, q.task]));
  const titles = Object.fromEntries(ex.domains.flatMap((d) => (d.tasks ?? []).map((t) => [t.id, t.title])));

  // タスクごと: 問題ごとの最新の答えで数える（アプリの正答率と同じ）
  const latest = new Map();
  for (const a of answers) latest.set(a.id, a);
  const byTask = {};
  for (const a of latest.values()) {
    const task = a.task ?? taskOf[a.id];
    if (!task) continue;
    const t = (byTask[task] ??= { task, answered: 0, correct: 0 });
    t.answered++; if (a.correct) t.correct++;
  }
  const weak = Object.values(byTask)
    .filter((t) => t.answered >= RULES.weakMin && t.correct / t.answered < RULES.weakRate)
    .map((t) => ({ ...t, rate: t.correct / t.answered, title: titles[t.task] ?? '' }));

  // 問題ごと: 全ての答えで数える
  const perQ = {};
  for (const a of answers) { const q = (perQ[a.id] ??= { id: a.id, n: 0, ok: 0 }); q.n++; if (a.correct) q.ok++; }
  const suspect = new Map();
  for (const q of Object.values(perQ)) {
    if (q.n >= RULES.suspectMin && q.ok / q.n < RULES.suspectRate) suspect.set(q.id, [`正答率 ${Math.round((q.ok / q.n) * 100)}%（${q.n} 回）`]);
  }
  for (const r of reports) {
    if (!taskOf[r.id]) continue; // 問題集に無い ID は捨てる
    const why = `${r.from === 'issue' ? `issue #${r.issue}` : '端末の報告'}: ${[r.kind, r.comment].filter(Boolean).join(' / ')}`.slice(0, 200);
    suspect.set(r.id, [...(suspect.get(r.id) ?? []), why]);
  }

  const recent = answers.slice(-RULES.passMin);
  const recentRate = recent.length ? recent.filter((a) => a.correct).length / recent.length : null;
  return {
    weak,
    suspect: [...suspect.entries()].map(([id, why]) => ({ id, task: taskOf[id], why })),
    pass: recent.length >= RULES.passMin && recentRate >= RULES.passRate,
    recent: { n: recent.length, rate: recentRate },
    total: answers.length,
  };
}

/** 分析の結果を backlog の項目にする（既にある物は足さない） */
export function toItems(result, backlog) {
  const open = backlog.filter((b) => b.status === 'todo' || b.status === 'doing');
  const items = [];
  for (const w of result.weak) {
    if (open.some((b) => b.kind === 'content' && b.task === w.task && b.source === 'learn')) continue;
    items.push({
      kind: 'content', task: w.task, topic: `苦手の補強: ${w.title}`, count: 5, priority: 2, source: 'learn',
      why: `タスク ${w.task} の正答率 ${Math.round(w.rate * 100)}%（${w.answered} 問）`,
    });
  }
  const pending = new Set(open.filter((b) => b.kind === 'recheck').flatMap((b) => b.question_ids ?? []));
  const byTask = {};
  for (const s of result.suspect) if (!pending.has(s.id)) (byTask[s.task] ??= []).push(s);
  for (const [task, list] of Object.entries(byTask)) {
    items.push({
      kind: 'recheck', task, question_ids: list.map((s) => s.id), priority: 1, source: 'learn',
      title: `誤りが疑わしい問題の見直し（タスク ${task}、${list.length} 問）`,
      note: list.map((s) => `${s.id}: ${s.why.join(' | ')}`).join('\n').slice(0, 2000),
    });
  }
  return items;
}

const commands = {
  weak(args) {
    const input = loadInputs();
    const result = analyze({ answers: input.answers, reports: [...input.reports, ...reportsFromIssues(input.issues)] });
    const backlog = readJSON(paths.backlog(), []);
    const items = toItems(result, backlog);
    const added = [];
    if (!args.dry) {
      for (const it of items) {
        const prefix = it.kind === 'recheck' ? 'R' : 'C';
        const n = Math.max(0, ...backlog.filter((b) => b.id.startsWith(prefix + '-')).map((b) => Number(b.id.slice(2))));
        const item = { id: `${prefix}-${String(n + 1).padStart(4, '0')}`, status: 'todo', attempts: 0, ...it };
        backlog.push(item);
        added.push(item.id);
      }
      writeJSON(paths.backlog(), backlog);
      const s = readJSON(paths.state(), {});
      if (s.state === 'L1_learn' && s.item) setResult(s.item, 'L1_learn', 'ok');
    }
    const pct = (r) => (r == null ? '—' : `${Math.round(r * 100)}%`);
    emit({
      ok: true,
      summary: `答え ${result.total} 件・報告 ${input.reports.length + reportsFromIssues(input.issues).length} 件 → 苦手 ${result.weak.length} タスク・疑わしい問題 ${result.suspect.length} 問。${args.dry ? '（試しに）' : ''}${items.length} 項目を足す${result.pass ? '。直近の正答率が 80% 以上: 受けてよい頃' : ''}`,
      items: items.map((i) => `${i.kind} ${i.task}: ${i.why ?? i.title}`),
      extra: { added, recent: `直近 ${result.recent.n} 回の正答率 ${pct(result.recent.rate)}`, pass_signal: result.pass },
    });
  },
};

if (import.meta.url === `file://${process.argv[1]}`) main(commands);
export { commands };
