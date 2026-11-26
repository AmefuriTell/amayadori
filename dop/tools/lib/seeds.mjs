// 作業の一覧に項目を足す seed と、問題を作業フォルダーへ写す関数（F-0001 で loop.mjs から切り出した）。
import fs from 'node:fs';
import path from 'node:path';
import { paths, readJSON, writeJSON, emit, ToolError } from './io.mjs';
import { exam, loadBank } from './bank.mjs';
import { loadBacklog, saveBacklog, nextId } from './backlog.mjs';

// 試験ガイドの「Skills in」の 1 行を 1 項目にする。既にある（状態を問わず）物は足さない
export function seedCoverage(args) {
    const ex = exam();
  if (!ex.verified) throw new ToolError('config/exam.json がまだ試験ガイドと照らされていない（verified: false）');
  const backlog = loadBacklog();
  const have = new Set(backlog.filter((b) => b.kind === 'content').map((b) => `${b.task}|${b.topic}`));
  const add = [];
  for (const d of ex.domains) {
    for (const task of d.tasks) {
      if (typeof args.task === 'string' && task.id !== args.task && d.id !== Number(args.task)) continue;
      const target = (d.weight * ex.target_total_questions) / d.tasks.length;
      const count = Math.max(2, Math.min(5, Math.round(target / Math.max(1, task.skills.length))));
      for (const skill of task.skills) {
        if (have.has(`${task.id}|${skill}`)) continue;
        add.push({ kind: 'content', task: task.id, topic: skill, count, priority: 3, source: 'coverage' });
      }
    }
  }
  if (!args.dry) {
    for (const item of add) { item.id = nextId(backlog, 'content'); item.status = 'todo'; item.attempts = 0; backlog.push(item); }
    saveBacklog(backlog);
  }
  const byTask = {};
  for (const a of add) byTask[a.task] = (byTask[a.task] ?? 0) + a.count;
  emit({
    ok: true,
    summary: `${args.dry ? '（試しに）' : ''}${add.length} 項目、${add.reduce((n, a) => n + a.count, 0)} 問ぶんを足した`,
    extra: { questions_by_task: byTask },
  });
}

// P-012: 日本語版の無い bank の問題を、タスクごとに size 問ずつの訳の項目にする
export function seedTranslate(args) {
  const size = Number(args.size ?? 10);
  const backlog = loadBacklog();
  const pending = new Set(backlog.filter((b) => b.kind === 'translate' && b.status !== 'done').flatMap((b) => b.question_ids ?? []));
  const byTask = {};
  for (const q of loadBank()) {
    if (q.status !== 'verified' || q.stem_ja || pending.has(q.id)) continue;
    (byTask[q.task] ??= []).push(q.id);
  }
  const add = [];
  for (const task of Object.keys(byTask).sort((a, b) => a.localeCompare(b, 'en', { numeric: true }))) {
    const ids = byTask[task].sort();
    for (let i = 0; i < ids.length; i += size) {
      const part = ids.slice(i, i + size);
      add.push({ kind: 'translate', task, question_ids: part, priority: 1, source: 'translate', title: `日本語版（タスク ${task}、${part.length} 問）` });
    }
  }
  if (!args.dry) {
    for (const item of add) { item.id = nextId(backlog, 'translate'); item.status = 'todo'; item.attempts = 0; backlog.push(item); }
    saveBacklog(backlog);
  }
  emit({ ok: true, summary: `${args.dry ? '（試しに）' : ''}訳の項目 ${add.length} 個、${add.reduce((n, a) => n + a.question_ids.length, 0)} 問ぶんを足した` });
}

// P-014: 問題の services に出るのに事典に無いサービスを、多く出る順に size 個ずつの事典の項目にする
const NOT_AWS = new Set(['GitHub']);
export function seedGlossary(args) {
  const size = Number(args.size ?? 5);
  const backlog = loadBacklog();
  const dir = paths.glossary('services');
  const have = new Set(fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith('.json')).flatMap((f) => readJSON(path.join(dir, f))?.aliases ?? []) : []);
  const pending = new Set(backlog.filter((b) => b.kind === 'glossary' && b.status !== 'done').flatMap((b) => b.services ?? []));
  const count = {};
  for (const q of loadBank()) if (q.status === 'verified') for (const s of q.services ?? []) count[s] = (count[s] ?? 0) + 1;
  const todo = Object.entries(count).filter(([s]) => !have.has(s) && !pending.has(s) && !NOT_AWS.has(s))
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([s]) => s);
  const add = [];
  for (let i = 0; i < todo.length; i += size) {
    const part = todo.slice(i, i + size);
    add.push({ kind: 'glossary', services: part, priority: 1, source: 'glossary', title: `サービス事典: ${part.join('、')}` });
  }
  if (!args.dry) {
    for (const item of add) { item.id = nextId(backlog, 'glossary'); item.status = 'todo'; item.attempts = 0; backlog.push(item); }
    saveBacklog(backlog);
  }
  emit({ ok: true, summary: `${args.dry ? '（試しに）' : ''}事典の項目 ${add.length} 個、${todo.length} サービスぶんを足した`, items: add.map((a) => a.services.join(', ')) });
}

// P-015: 構成図の項目。--ids q-…,q-… で問題を選ぶ（無ければ図の無い問題をタスクごとに size 問ずつ）
export function seedDiagram(args) {
  const size = Number(args.size ?? 5);
  const backlog = loadBacklog();
  const done = new Set(fs.existsSync(paths.diagrams()) ? fs.readdirSync(paths.diagrams()).map((f) => f.replace(/\.json$/, '')) : []);
  const pending = new Set(backlog.filter((b) => b.kind === 'diagram' && b.status !== 'done').flatMap((b) => b.question_ids ?? []));
  const bank = loadBank().filter((q) => q.status === 'verified');
  const groups = [];
  if (typeof args.ids === 'string') {
    const ids = args.ids.split(',').map((s) => s.trim()).filter(Boolean);
    const missing = ids.filter((i) => !bank.some((q) => q.id === i));
    if (missing.length) throw new ToolError(`bank に無い: ${missing.join(', ')}`);
    groups.push(ids);
  } else {
    const byTask = {};
    for (const q of bank) if (!done.has(q.id) && !pending.has(q.id)) (byTask[q.task] ??= []).push(q.id);
    for (const t of Object.keys(byTask).sort((a, b) => a.localeCompare(b, 'en', { numeric: true }))) {
      const ids = byTask[t].sort();
      for (let i = 0; i < ids.length; i += size) groups.push(ids.slice(i, i + size));
    }
  }
  const add = groups.map((ids) => ({ kind: 'diagram', task: ids[0].match(/^q-([1-6]\.[0-9]+)-/)[1], question_ids: ids, priority: Number(args.priority ?? 2), source: 'diagram', title: `構成図（${ids.join(', ')}）` }));
  if (!args.dry) {
    for (const item of add) { item.id = nextId(backlog, 'diagram'); item.status = 'todo'; item.attempts = 0; backlog.push(item); }
    saveBacklog(backlog);
  }
  emit({ ok: true, summary: `${args.dry ? '（試しに）' : ''}図の項目 ${add.length} 個、${add.reduce((n, a) => n + a.question_ids.length, 0)} 問ぶんを足した`, extra: { added: add.map((a) => a.id) } });
}

// 図を描く人が読む問題の中身（日本語の問題文・選択肢・答え・解説・補足）。bank は読ませない
export function copyContext(item) {
  const qs = [];
  for (const qid of item.question_ids ?? []) {
    const task = qid.match(/^q-([1-6]\.[0-9]+)-/)?.[1];
    const q = readJSON(paths.bank(task ?? '_', `${qid}.json`), null);
    if (!q) continue;
    qs.push({ id: q.id, services: q.services, type: q.type, stem: q.stem_ja ?? q.stem, choices: q.choices.map((c) => ({ key: c.key, text: c.text_ja ?? c.text })), answer: q.answer, explanation: q.explanation, note: q.note });
  }
  writeJSON(paths.work(item.id, 'context.json'), { item: item.id, questions: qs });
}

export function copyForRecheck(item) {
  const qs = [];
  for (const qid of item.question_ids ?? []) {
    const task = qid.match(/^q-([1-6]\.[0-9]+)-/)?.[1];
    const file = paths.bank(task ?? '_', `${qid}.json`);
    if (fs.existsSync(file)) qs.push(readJSON(file));
  }
  writeJSON(paths.work(item.id, 'questions.json'), { item: item.id, recheck: true, ...(item.kind === 'translate' ? { translate: true } : {}), questions: qs });
}
