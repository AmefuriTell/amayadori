#!/usr/bin/env node
// ループを進めるツール。状態の移り方は loop/LOOP.md 2 章の JSON をそのまま読む（決まりを 1 か所に置くため）。
// コマンド: start / status / next / advance / close / add / seed / list / set / block / pause / resume
import fs from 'node:fs';
import path from 'node:path';
import { CODE, paths, readJSON, writeJSON, appendLine, emit, main, ToolError, today, ITEM_ID, rel } from './lib/io.mjs';
import { validate } from './lib/schema.mjs';
import { coverage, exam, loadBank } from './lib/bank.mjs';

export function loadMachine() {
  const md = fs.readFileSync(path.join(CODE, 'loop', 'LOOP.md'), 'utf8');
  const sec = md.slice(md.indexOf('## 2.'));
  const block = sec.match(/```json\n([\s\S]*?)```/);
  if (!block) throw new ToolError('loop/LOOP.md 2 章に状態の移り方の JSON が無い');
  return JSON.parse(block[1]);
}

// 結果の札（result.json）を求める工程と結果。ツールの検査を通らずに進めないため。
const GUARDED = {
  C1_research: ['ok'],
  C2_author: ['ok'],
  C3_verify: ['pass', 'fix', 'drop'],
  C4_gate: ['pass', 'fail'],
  A3_check: ['pass', 'fail'],
  L1_learn: ['ok'],
};
// 前の工程へ戻る結果（attempts を 1 増やす）
const BACK = new Set(['fix', 'fail']);
// S9 へ行く時の項目の終わり方
const OUTCOME = { pass: 'done', ok: 'done', no_source: 'dropped', drop: 'dropped' };
const KIND_PREFIX = { content: 'C', app: 'A', learn: 'L', recheck: 'R', translate: 'T', glossary: 'G' };
const FIRST_STATE = { content: 'C1_research', recheck: 'C1_research', translate: 'C2_author', glossary: 'C1_research', app: 'A1_spec', learn: 'L1_learn' };

function loadState() {
  return readJSON(paths.state(), { state: 'S0_pick', item: null, prev: null, session: { active: false, started: null, closed: 0 } });
}
const saveState = (s) => writeJSON(paths.state(), s);
const loadBacklog = () => readJSON(paths.backlog(), []);
const saveBacklog = (b) => writeJSON(paths.backlog(), b);

function docOf(machine, state) {
  return machine.states[state]?.doc ? `loop/${machine.states[state].doc}` : null;
}

function brief(item) {
  if (!item) return null;
  const { id, kind, title, task, topic, count, attempts, priority, question_ids } = item;
  return Object.fromEntries(Object.entries({ id, kind, title, task, topic, count, attempts, priority, question_ids }).filter(([, v]) => v !== undefined));
}

const commands = {
  start() {
    const s = loadState();
    s.session = { active: true, started: new Date().toISOString(), closed: 0 };
    if (s.state === 'STOP') s.state = 'S0_pick';
    saveState(s);
    return commands.status({});
  },

  status() {
    const machine = loadMachine();
    const s = loadState();
    const item = s.item ? loadBacklog().find((i) => i.id === s.item) : null;
    const todo = loadBacklog().filter((i) => i.status === 'todo').length;
    emit({
      ok: true,
      summary: `${s.state}${item ? ` / ${item.id}` : ''}（残り ${todo} 項目、この回で閉じた数 ${s.session.closed}/${machine.limits.max_items_per_session}）`,
      extra: { state: s.state, doc: docOf(machine, s.state), item: brief(item), session_active: s.session.active, human_reason: s.human_reason ?? null },
    });
  },

  next() {
    const machine = loadMachine();
    const s = loadState();
    if (s.state !== 'S0_pick' && s.state !== 'STOP') throw new ToolError(`next は S0_pick でだけ使う（今は ${s.state}）`);
    const stop = (summary) => {
      s.state = 'STOP'; s.session.active = false; s.item = null; saveState(s);
      emit({ ok: true, summary, extra: { state: 'STOP', empty: true } });
    };
    if (s.session.closed >= machine.limits.max_items_per_session) return stop(`この回の上限（${machine.limits.max_items_per_session} 項目）に達した。止まる`);

    const backlog = loadBacklog();
    const item = pickNext(backlog);
    if (!item) return stop('やれる項目が無い（backlog が空、または全部が blocked か依存待ち）。止まる');

    item.status = 'doing';
    saveBacklog(backlog);
    fs.mkdirSync(paths.work(item.id), { recursive: true });
    writeJSON(paths.work(item.id, 'item.json'), { ...item, task_info: taskInfo(item.task) });
    if (item.kind === 'recheck' || item.kind === 'translate') copyForRecheck(item);

    s.state = FIRST_STATE[item.kind];
    s.item = item.id;
    s.session.active = true;
    saveState(s);
    emit({ ok: true, summary: `${item.id}（${item.kind}）を始める → ${s.state}`, extra: { state: s.state, doc: docOf(machine, s.state), item: brief(item) } });
  },

  advance(args) {
    const machine = loadMachine();
    const s = loadState();
    const key = args.result;
    if (typeof key !== 'string') throw new ToolError('--result <key> が要る');
    const def = machine.states[s.state];
    if (!def) throw new ToolError(`今の状態 ${s.state} からは advance できない（S0 は next、HUMAN は resume、S9 は close）`);
    if (s.state === 'S0_pick') throw new ToolError('S0_pick では next を使う');
    if (s.state === 'S9_close') throw new ToolError('S9_close では close を使う');
    if (!(key in def.next)) throw new ToolError(`${s.state} の結果は ${Object.keys(def.next).join(' / ')} のどれか（${key} は無い）`);

    const backlog = loadBacklog();
    const item = backlog.find((i) => i.id === s.item);
    if (!item) throw new ToolError(`項目 ${s.item} が backlog に無い`);

    // ツールの札と照らす
    let count = true;
    if (GUARDED[s.state]?.includes(key)) {
      const r = readJSON(paths.work(item.id, 'result.json'), null);
      if (!r || r.state !== s.state || r.result !== key) {
        throw new ToolError(`${s.state} を ${key} で進めるには、先にツールの結果が要る（今の札: ${r ? `${r.state}/${r.result}` : 'なし'}）。工程の文書のツールを呼ぶ`);
      }
      if (r.count === false) count = false;
    }
    fs.rmSync(paths.work(item.id, 'result.json'), { force: true });

    let target = def.next[key];
    let summary;
    if (BACK.has(key) && count) {
      item.attempts = (item.attempts ?? 0) + 1;
      if (item.attempts >= machine.limits.max_attempts_per_item) {
        item.pending_outcome = 'blocked';
        item.note = `${s.state} で ${item.attempts} 回やり直して上限。人に回す`;
        target = 'S9_close';
        summary = `やり直しの上限（${item.attempts} 回）。${item.id} を blocked にして S9_close へ`;
      }
    }
    if (target === 'HUMAN') {
      s.prev = s.state;
      s.human_reason = args.reason ?? `${s.state} の結果 ${key}`;
      s.session.active = false;
      summary = `人の判断を待つ（${s.human_reason}）。人が決めたら loop resume`;
    } else if (target === 'S9_close' && !item.pending_outcome) {
      item.pending_outcome = OUTCOME[key] ?? 'done';
    }
    s.state = target;
    saveBacklog(backlog);
    saveState(s);
    emit({
      ok: true,
      summary: summary ?? `${key} → ${target}${BACK.has(key) ? `（attempts ${item.attempts}）` : ''}`,
      extra: { state: target, doc: docOf(machine, target), item: brief(item), stop: target === 'HUMAN' },
    });
  },

  close() {
    const s = loadState();
    if (s.state !== 'S9_close') throw new ToolError(`close は S9_close でだけ使う（今は ${s.state}）`);
    const backlog = loadBacklog();
    const item = backlog.find((i) => i.id === s.item);
    if (!item) throw new ToolError(`項目 ${s.item} が backlog に無い`);
    const outcome = item.pending_outcome ?? 'done';
    delete item.pending_outcome;
    item.status = outcome;

    // 同じ種類の指摘が 2 回以上（q.mjs が work/<ID>/history.jsonl に書く）
    const hist = paths.work(item.id, 'history.jsonl');
    const counts = {};
    if (fs.existsSync(hist)) {
      for (const line of fs.readFileSync(hist, 'utf8').split('\n').filter(Boolean)) {
        const h = JSON.parse(line);
        for (const k of h.kinds ?? []) counts[k] = (counts[k] ?? 0) + 1;
      }
    }
    const repeated = Object.entries(counts).filter(([, n]) => n >= 2).map(([kind, n]) => ({ kind, n }));

    appendLine(paths.runs(), { item: item.id, kind: item.kind, outcome, attempts: item.attempts ?? 0, repeated, closed: new Date().toISOString() });

    let archived = null;
    if (fs.existsSync(paths.work(item.id))) {
      const dest = paths.archive(item.id);
      fs.rmSync(dest, { recursive: true, force: true });
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.renameSync(paths.work(item.id), dest);
      archived = rel(dest);
    }
    saveBacklog(backlog);
    s.state = 'S0_pick'; s.item = null; s.session.closed += 1;
    saveState(s);
    emit({
      ok: true,
      summary: `${item.id} を ${outcome} で閉じた。次は S0_pick（loop next）`,
      extra: { state: 'S0_pick', outcome, archived, repeated_issues: repeated, human_needed: outcome === 'blocked' ? item.note : null },
    });
  },

  add(args) {
    let input;
    if (args.file) input = readJSON(path.resolve(args.file));
    else if (typeof args.json === 'string') {
      try { input = JSON.parse(args.json); } catch (e) { throw new ToolError(`--json が JSON でない: ${e.message}`); }
    } else throw new ToolError('--json <項目> か --file <path> が要る');
    const list = Array.isArray(input) ? input : [input];
    const backlog = loadBacklog();
    const schema = readJSON(paths.schema('backlog-item.schema.json'));
    const added = [];
    const skipped = [];
    for (const raw of list) {
      const item = { status: 'todo', attempts: 0, priority: 3, ...raw };
      if (item.kind === 'content' && item.count === undefined) item.count = 5;
      if (!item.id) item.id = nextId(backlog, item.kind);
      const errs = validate(schema, item);
      if (errs.length) throw new ToolError(`項目の形が違う: ${errs.slice(0, 3).map((e) => `${e.pointer} ${e.message}`).join(' / ')}`);
      if (backlog.some((b) => b.id === item.id)) { skipped.push({ id: item.id, why: '同じ ID がある' }); continue; }
      const dup = item.kind === 'content' && backlog.find((b) => b.status === 'todo' && b.kind === 'content'
        && b.task === item.task && (b.topic ?? '') === (item.topic ?? ''));
      if (dup && !args.force) { skipped.push({ id: item.id, why: `同じ中身の ${dup.id} がある` }); continue; }
      backlog.push(item);
      added.push(item.id);
    }
    saveBacklog(backlog);
    emit({ ok: true, summary: `${added.length} 項目を足した${skipped.length ? `、${skipped.length} 項目は足さなかった` : ''}`, items: skipped, extra: { added } });
  },

  // backlog を絞って見る（AI は backlog.json を直接読まない）
  list(args) {
    let b = loadBacklog();
    for (const k of ['kind', 'task', 'status', 'id']) if (typeof args[k] === 'string') b = b.filter((i) => i[k] === args[k]);
    if (!args.status) b = b.filter((i) => i.status === 'todo' || i.status === 'doing');
    emit({
      ok: true,
      summary: `${b.length} 項目`,
      items: b.map((i) => `${i.id} [${i.status} p${i.priority}] ${i.task ? `${i.task} ` : ''}${i.title ?? i.topic ?? ''}${i.count ? `（${i.count} 問）` : ''}`),
    });
  },

  // 人の指示で優先度などを変える（priority・count・status=todo|dropped だけ）
  set(args) {
    const id = args._[0];
    const backlog = loadBacklog();
    const item = backlog.find((i) => i.id === id);
    if (!item) throw new ToolError(`項目 ${id} が無い`);
    const changed = {};
    if (args.priority !== undefined) changed.priority = Number(args.priority);
    if (args.count !== undefined) changed.count = Number(args.count);
    if (args.status !== undefined) {
      if (!['todo', 'dropped'].includes(args.status)) throw new ToolError('status は todo か dropped だけ変えられる');
      if (item.status === 'doing') throw new ToolError('進めている項目の status は変えない（loop block を使う）');
      changed.status = args.status;
    }
    const next = { ...item, ...changed };
    const errs = validate(readJSON(paths.schema('backlog-item.schema.json')), next);
    if (errs.length) throw new ToolError(`値が違う: ${errs.map((e) => `${e.pointer} ${e.message}`).join(' / ')}`);
    Object.assign(item, changed);
    saveBacklog(backlog);
    emit({ ok: true, summary: `${id} を変えた: ${JSON.stringify(changed)}` });
  },

  // 試験ガイドの「Skills in」の 1 行を 1 項目にする。既にある（状態を問わず）物は足さない
  seed(args) {
    if (args.translate) return seedTranslate(args);
    if (args.glossary) return seedGlossary(args);
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
  },

  block(args) {
    const s = loadState();
    if (typeof args.reason !== 'string') throw new ToolError('--reason "<人に伝える理由>" が要る');
    if (!s.item) throw new ToolError('進めている項目が無い');
    s.prev = s.state; s.state = 'HUMAN'; s.human_reason = args.reason; s.session.active = false;
    saveState(s);
    emit({ ok: true, summary: `人の判断を待つ: ${args.reason}`, extra: { state: 'HUMAN', stop: true } });
  },

  pause() {
    const s = loadState();
    s.session.active = false;
    saveState(s);
    emit({ ok: true, summary: `一時停止（${s.state}${s.item ? ` / ${s.item}` : ''} のまま）。続けるときは loop start`, extra: { state: s.state } });
  },

  resume(args) {
    const machine = loadMachine();
    const s = loadState();
    if (s.state !== 'HUMAN') throw new ToolError(`resume は HUMAN でだけ使う（今は ${s.state}）`);
    const to = typeof args.to === 'string' ? args.to : s.prev;
    if (!machine.states[to]) throw new ToolError(`--to の状態 ${to} が無い`);
    s.state = to; s.prev = null; s.human_reason = null; s.session.active = true;
    saveState(s);
    emit({ ok: true, summary: `${to} から続ける`, extra: { state: to, doc: docOf(machine, to) } });
  },
};

function taskInfo(taskId) {
  if (!taskId) return undefined;
  for (const d of exam().domains) {
    const t = d.tasks.find((x) => x.id === taskId);
    if (t) return { domain: `${d.id} ${d.name}`, title: t.title, url: t.url, knowledge: t.knowledge, skills: t.skills };
  }
  return undefined;
}

function nextId(backlog, kind) {
  const prefix = KIND_PREFIX[kind];
  if (!prefix) throw new ToolError(`kind が違う: ${kind}`);
  const n = Math.max(0, ...backlog.filter((b) => b.id.startsWith(prefix + '-')).map((b) => Number(b.id.slice(2))));
  return `${prefix}-${String(n + 1).padStart(4, '0')}`;
}

/** loop/steps/S0-pick.md の「並べ方」 */
export function pickNext(backlog) {
  const done = new Set(backlog.filter((b) => b.status === 'done').map((b) => b.id));
  const ready = backlog.filter((b) => b.status === 'todo' && (b.depends_on ?? []).every((d) => done.has(d)));
  if (!ready.length) return null;
  let deficit = {};
  if (ready.some((b) => b.kind === 'content')) {
    try { deficit = Object.fromEntries(coverage().rows.map((r) => [r.key, r.deficit])); } catch { deficit = {}; }
  }
  const def = (b) => (b.kind === 'content' ? (deficit[b.task] ?? deficit[b.task?.split('.')[0]] ?? 0) : 0);
  ready.sort((a, b) => a.priority - b.priority || def(b) - def(a) || a.id.localeCompare(b.id));
  return ready[0];
}

// P-012: 日本語版の無い bank の問題を、タスクごとに size 問ずつの訳の項目にする
function seedTranslate(args) {
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
function seedGlossary(args) {
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

function copyForRecheck(item) {
  const qs = [];
  for (const qid of item.question_ids ?? []) {
    const task = qid.match(/^q-([1-6]\.[0-9]+)-/)?.[1];
    const file = paths.bank(task ?? '_', `${qid}.json`);
    if (fs.existsSync(file)) qs.push(readJSON(file));
  }
  writeJSON(paths.work(item.id, 'questions.json'), { item: item.id, recheck: true, ...(item.kind === 'translate' ? { translate: true } : {}), questions: qs });
}

if (import.meta.url === `file://${process.argv[1]}`) main(commands);
export { commands, ITEM_ID, today };
