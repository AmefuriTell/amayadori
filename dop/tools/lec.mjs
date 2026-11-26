#!/usr/bin/env node
// 講義のツール: validate / verdict / gate / publish
// 講義の項目（K-）の束は work/<ID>/lecture.json に
//   { task, title, slides: [{ id, title, bullets, visual, narration, refs: [{ source_id, quote, url }] }] }。
// C3 の 2 人の検証役は work/<ID>/review-consistency.json と review-clarity.json を書く。
// 出来上がりは lectures/<task>.json（講義の元）と app/public/lectures/<task>/（アプリが読む形・図・音声）。
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { CODE, paths, readJSON, writeJSON, appendLine, emit, main, ToolError, today, setResult, writeReport, rel } from './lib/io.mjs';
import { itemIdOf as idOf, requireState, referenceErrors, failToFeedback as toFeedback } from './lib/step.mjs';
import { iconMap, renderAll } from './lib/diagram.mjs';
import { parseSources } from './lib/text.mjs';
import { synthesize, CREDIT } from './lib/tts.mjs';
import { readability } from './dg.mjs';

const APP = process.env.DOP_APP ? path.resolve(process.env.DOP_APP) : path.join(CODE, 'app');

export const LIMITS = { slidesMin: 12, slidesMax: 16, narrationMin: 3000, narrationMax: 5000, bullets: 3, bulletWidth: 22, boxes: 7, rows: 5, cellWidth: 15, steps: 6 };
// 読み上げで崩れる字: 英字・数字・記号（半角は全部、全角は英数字と括弧・かぎ括弧・斜線・中黒・矢印・コロンなど）
const UNSPEAKABLE = /[\x21-\x7e０-９Ａ-Ｚａ-ｚ（）「」『』【】［］〔〕〈〉《》＜＞／・→←↑↓⇒：；＃＄％＆＊＋＝＠＼＾｜～〜]/g;
// 台本 1 分あたりの字数（試作: 4,477 字で約 15 分。速さ 1.1）。音声を作らない時の見積もりに使う
const CHARS_PER_MINUTE = 300;
const REVIEWS = { consistency: 'review-consistency.json', clarity: 'review-clarity.json' };
const SEVERITY = ['重', '中', '軽'];

const itemIdOf = (arg) => idOf(arg, { prefix: 'K', message: '講義の項目 ID（例 K-0001）を渡す' });
const width = (t) => [...String(t)].reduce((n, c) => n + (c.charCodeAt(0) < 128 ? 0.5 : 1), 0);
const len = (t) => [...String(t ?? '')].length;
const isText = (t) => typeof t === 'string' && t.trim().length > 0;

function loadLecture(id) {
  const l = readJSON(paths.work(id, 'lecture.json'), null);
  if (!l || typeof l !== 'object' || !Array.isArray(l.slides)) throw new ToolError(`work/${id}/lecture.json は { "task", "title", "slides": [ … ] } の形にする`);
  return l;
}

function examTasks() {
  return new Set(readJSON(paths.config('exam.json'), { domains: [] }).domains.flatMap((d) => d.tasks.map((t) => t.id)));
}

/** mermaid の箱の id（subgraph の id は数えない） */
export function boxesOf(source) {
  const ids = new Set();
  const skip = /^\s*(flowchart|graph|subgraph|end|classDef|class|style|linkStyle|direction|click|%%)\b/;
  for (const raw of source.split('\n')) {
    if (!raw.trim() || skip.test(raw)) continue;
    const line = raw
      .replace(/"[^"]*"/g, '')
      .replace(/@\{[^}]*\}/g, ' ')
      .replace(/\[[^\]]*\]|\([^)]*\)|\{[^}]*\}/g, ' ')
      .replace(/\|[^|]*\|/g, ' ')
      .replace(/:::\w+/g, ' ');
    for (const part of line.split(/<?[-=.]{2,}>?|<?-\.+->?|&/)) {
      const m = part.trim().match(/^([A-Za-z_][\w]*)$/);
      if (m) ids.add(m[1]);
    }
  }
  return [...ids];
}

/** 1 枚の図の誤り */
function visualErrors(v, add) {
  if (!v || typeof v !== 'object') return add('visual が無い（mermaid・compare・steps のどれかを 1 つ）');
  if (v.type === 'mermaid') {
    if (typeof v.source !== 'string' || !/^\s*flowchart\s+TB\b/.test(v.source)) return add('mermaid の source は "flowchart TB" で始める');
    const boxes = boxesOf(v.source);
    if (boxes.length > LIMITS.boxes) add(`図の箱が ${boxes.length} 個。${LIMITS.boxes} 個までにする`);
    for (const m of readability(v.source)) add(m);
    const map = iconMap();
    for (const [, , svc, label] of v.source.matchAll(/(\b[A-Za-z][A-Za-z0-9_]*)@\{\s*svc:\s*"([^"]+)"\s*(?:,\s*label:\s*"([^"]*)"\s*)?\}/g)) {
      if (!map[svc] && !(label ?? svc).startsWith(svc)) add(`svc の「${svc}」は config/icon-map.json に無い。表にある名前にするか、ラベルの頭にサービス名を書く`);
    }
  } else if (v.type === 'compare') {
    if (!Array.isArray(v.columns) || !v.columns.length || !Array.isArray(v.rows) || !v.rows.length) return add('compare は columns と rows が要る');
    if (v.rows.length > LIMITS.rows) add(`表の行が ${v.rows.length} 行。${LIMITS.rows} 行までにする`);
    const cells = [...v.columns, ...v.rows.flatMap((r) => (Array.isArray(r) ? r : [r]))];
    v.rows.forEach((r, i) => { if (!Array.isArray(r) || r.length !== v.columns.length) add(`表の ${i + 1} 行目のセルの数が columns（${v.columns.length}）と違う`); });
    for (const c of cells) if (typeof c === 'string' && width(c) > LIMITS.cellWidth) add(`表のセルが長い（${c}）。幅 ${LIMITS.cellWidth} まで`);
  } else if (v.type === 'steps') {
    if (!Array.isArray(v.items) || !v.items.length) return add('steps は items が要る');
    if (v.items.length > LIMITS.steps) add(`手順が ${v.items.length} 個。${LIMITS.steps} 個までにする`);
    v.items.forEach((x, i) => { if (!isText(x?.label)) add(`手順の ${i + 1} 個目に label が無い`); });
  } else {
    add(`visual の type が違う（${v.type}）。mermaid・compare・steps のどれか`);
  }
}

/** 描かずに見られる誤り。[{ id: スライドの id | null, message }] */
export function checkLecture(id, lec = loadLecture(id)) {
  const errors = [];
  const top = (message) => errors.push({ id: null, message });
  const item = readJSON(paths.work(id, 'item.json'), {});
  if (!isText(lec.task) || !examTasks().has(lec.task)) top(`task（${lec.task}）が試験ガイドの task に無い`);
  else if (item.task && item.task !== lec.task) top(`task が項目の task（${item.task}）と違う`);
  if (!isText(lec.title)) top('講義の title が要る');
  const n = lec.slides.length;
  if (n < LIMITS.slidesMin || n > LIMITS.slidesMax) top(`スライドが ${n} 枚。${LIMITS.slidesMin}〜${LIMITS.slidesMax} 枚にする`);
  const total = lec.slides.reduce((t, s) => t + len(s?.narration), 0);
  if (total < LIMITS.narrationMin || total > LIMITS.narrationMax) top(`台本の合計が ${total} 字。${LIMITS.narrationMin}〜${LIMITS.narrationMax} 字にする`);
  const srcFile = paths.work(id, 'sources.md');
  const sources = fs.existsSync(srcFile) ? parseSources(fs.readFileSync(srcFile, 'utf8')) : null;

  lec.slides.forEach((s, i) => {
    const want = `s${String(i + 1).padStart(2, '0')}`;
    const sid = s?.id ?? `#${i + 1}`;
    const add = (message) => errors.push({ id: sid, message });
    if (!s || typeof s !== 'object') return add('形が違う');
    if (s.id !== want) add(`id は ${want} にする（s01 から連番）`);
    if (!isText(s.title)) add('title が要る');
    if (!Array.isArray(s.bullets)) add('bullets（要点の配列）が要る');
    else {
      if (s.bullets.length > LIMITS.bullets) add(`bullets が ${s.bullets.length} 個。${LIMITS.bullets} 個までにする`);
      for (const b of s.bullets) {
        if (!isText(b)) add('bullets に空の要点がある');
        else if (width(b) > LIMITS.bulletWidth) add(`要点が長い（${b}）。幅 ${LIMITS.bulletWidth} まで（全角 1・半角 0.5）`);
      }
    }
    if (!isText(s.narration)) add('narration（台本）が要る');
    else {
      const bad = [...new Set(s.narration.match(UNSPEAKABLE) ?? [])];
      if (bad.length) add(`台本に読み上げで崩れる字がある（${bad.slice(0, 8).join(' ')}）。英字・数字・記号はかなや言葉に直す`);
    }
    visualErrors(s.visual, add);
    if (!Array.isArray(s.refs) || !s.refs.length) add('refs（出典）が 1 つ以上要る');
    else referenceErrors(s.refs, sources, (pointer, message) => add(`refs${pointer.replace(/^\/references/, '')} ${message}`), id);
  });
  return errors;
}

/** mermaid の図を描く（previewDir があれば PNG を置く）。{ errors, results } */
export async function renderVisuals(lec, { previewDir } = {}) {
  const list = lec.slides.filter((s) => s?.visual?.type === 'mermaid' && typeof s.visual.source === 'string').map((s) => ({ id: s.id, source: s.visual.source }));
  if (!list.length) return { errors: [], results: [] };
  // 試験と CI（ブラウザが無い）では描かない。中身の無い絵を置く（形の検査は描く前に済んでいる）
  if (process.env.DOP_RENDER === 'skip') return { errors: [], results: list.map((d) => ({ id: d.id, svg: '<svg xmlns="http://www.w3.org/2000/svg"/>', unknown: [] })) };
  const results = await renderAll(list, { previewDir });
  const errors = results.filter((r) => r.error).map((r) => ({ id: r.id, message: `図が描けない: ${r.error}` }));
  return { errors, results };
}

async function gateLecture(id) {
  const lec = loadLecture(id);
  const fails = checkLecture(id, lec).map((e) => ({ check: 'form', ...e }));
  const vfile = paths.work(id, 'verdict.json');
  const verdict = readJSON(vfile, null);
  if (verdict?.result !== 'pass') fails.push({ check: 'verified', id: null, message: `検証の結果が pass でない（${verdict?.result ?? 'なし'}）` });
  if (verdict && fs.statSync(paths.work(id, 'lecture.json')).mtimeMs > fs.statSync(vfile).mtimeMs + 1) {
    fails.push({ check: 'verified', id: null, message: '検証（lec verdict）の後に lecture.json を書き換えた。C3 からやり直す' });
  }
  let results = [];
  if (!fails.some((f) => f.check === 'form')) {
    const r = await renderVisuals(lec, { previewDir: paths.work(id, 'preview') });
    for (const e of r.errors) fails.push({ check: 'render', ...e });
    results = r.results;
  }
  return { fails, lec, results };
}

const failToFeedback = (id, step, fails) => toFeedback(id, step, fails, { idField: 'id', key: 'slides' });
const failItems = (fails) => fails.map((f) => `${f.check} ${f.id ?? ''}: ${f.message}`);

// ---- C3: 2 人の検証役の指摘 ----

function reviewRaw(id) {
  const out = {};
  for (const [who, file] of Object.entries(REVIEWS)) {
    const p = paths.work(id, file);
    if (!fs.existsSync(p)) throw new ToolError(`work/${id}/${file} が無い（検証役が書く）`);
    out[who] = { file: p, raw: fs.readFileSync(p, 'utf8') };
  }
  return out;
}
const reviewHash = (raws) => crypto.createHash('sha256').update(Object.values(raws).map((r) => r.raw).join('\0')).digest('hex').slice(0, 16);

/** 前の verdict.json と同じ 2 つのファイルなら、前の結論（null なら初めて）。step.mjs の sameVerdict を 2 つの組にした物 */
function sameLecVerdict(id, raws) {
  const dfile = paths.work(id, 'verdict.json');
  const prev = readJSON(dfile, null);
  if (!prev?.result || prev.verify_hash !== reviewHash(raws)) return null;
  const at = fs.statSync(dfile).mtimeMs;
  return Object.values(raws).every((r) => fs.statSync(r.file).mtimeMs <= at) ? prev : null;
}

function parseReview(id, who, { raw }, slideIds) {
  let r;
  try { r = JSON.parse(raw); } catch (e) { throw new ToolError(`work/${id}/${REVIEWS[who]} が JSON として読めない: ${e.message}`); }
  if (!r || !Array.isArray(r.slides)) throw new ToolError(`work/${id}/${REVIEWS[who]} は { "slides": [ … ], "global": [ … ] } の形にする`);
  const sev = (i, where) => {
    if (!SEVERITY.includes(i?.severity)) throw new ToolError(`work/${id}/${REVIEWS[who]} の ${where} の severity が「重・中・軽」のどれでもない（${i?.severity}）`);
    return { from: who, kind: i.kind ?? null, severity: i.severity, detail: i.detail ?? '', suggest: i.suggest ?? '' };
  };
  const slides = {};
  for (const s of r.slides) {
    if (!slideIds.has(s?.id)) throw new ToolError(`work/${id}/${REVIEWS[who]} に lecture.json に無いスライド（${s?.id}）がある`);
    for (const i of s.issues ?? []) (slides[s.id] ??= []).push(sev(i, s.id));
  }
  const global = (r.global ?? []).map((i) => sev(i, 'global'));
  return { slides, global };
}

const commands = {
  async validate(args) {
    const id = itemIdOf(args._[0]);
    const lec = loadLecture(id);
    const errors = checkLecture(id, lec);
    let results = [];
    if (!errors.length) {
      const r = await renderVisuals(lec, { previewDir: paths.work(id, 'preview') });
      errors.push(...r.errors);
      results = r.results;
    }
    const unknown = [...new Set(results.flatMap((r) => r.unknown))];
    const details = errors.length ? writeReport(`${id}/validate.txt`, errors.map((e) => `${e.id ?? '(全体)'}\t${e.message}`).join('\n') + '\n') : undefined;
    if (!errors.length) setResult(id, 'C2_author', 'ok');
    const chars = lec.slides.reduce((t, s) => t + len(s?.narration), 0);
    emit({
      ok: !errors.length,
      summary: errors.length
        ? `誤りが ${errors.length} 件`
        : `${lec.slides.length} 枚・台本 ${chars} 字。図 ${results.length} 枚を描いた（絵は work/${id}/preview/）${unknown.length ? `。アイコンの無いサービス: ${unknown.join(', ')}` : ''}`,
      items: errors.map((e) => `${e.id ?? '(全体)'}: ${e.message}`),
      details_path: details,
      repeatKey: `kvalidate:${id}`,
    });
  },

  // C3: review-consistency.json と review-clarity.json の重・中があれば fix、軽だけなら pass
  verdict(args) {
    const id = itemIdOf(args._[0]);
    requireState(id, 'C3_verify');
    const lec = loadLecture(id);
    const raws = reviewRaw(id);
    const lecAt = fs.statSync(paths.work(id, 'lecture.json')).mtimeMs;
    const stale = Object.entries(raws).filter(([, r]) => fs.statSync(r.file).mtimeMs + 1 < lecAt).map(([w]) => REVIEWS[w]);
    if (stale.length) throw new ToolError(`${stale.join('・')} が今の lecture.json より古い。検証役に今の版を見直してもらう`);

    const again = sameLecVerdict(id, raws);
    if (again) {
      const r = readJSON(paths.work(id, 'result.json'), null);
      if (r?.state !== 'C3_verify' || r.result !== again.result) setResult(id, 'C3_verify', again.result, { count: false });
      return emit({ ok: true, summary: `前と同じ指摘なので前の結論のまま（数え直さない）→ loop advance --result ${again.result}`, extra: { result: again.result } });
    }

    const slideIds = new Set(lec.slides.map((s) => s?.id));
    const reviews = Object.fromEntries(Object.keys(REVIEWS).map((w) => [w, parseReview(id, w, raws[w], slideIds)]));
    const heavy = (i) => i.severity !== '軽';
    const fbSlides = {};
    const fbGlobal = [];
    const mild = [];
    const counts = { 重: 0, 中: 0, 軽: 0 };
    for (const r of Object.values(reviews)) {
      for (const [sid, list] of Object.entries(r.slides)) {
        for (const i of list) {
          counts[i.severity]++;
          if (heavy(i)) (fbSlides[sid] ??= []).push(i); else mild.push({ slide: sid, ...i });
        }
      }
      for (const i of r.global) {
        counts[i.severity]++;
        if (heavy(i)) fbGlobal.push(i); else mild.push({ slide: null, ...i });
      }
    }
    const result = counts.重 + counts.中 > 0 ? 'fix' : 'pass';
    if (result === 'fix') writeJSON(paths.work(id, 'feedback.json'), { from: 'C3_verify', slides: fbSlides, global: fbGlobal });
    writeJSON(paths.work(id, 'verdict.json'), { result, counts, mild, verify_hash: reviewHash(raws) });
    const kinds = [...new Set(Object.values(reviews).flatMap((r) => [...Object.values(r.slides).flat(), ...r.global]).filter(heavy).map((i) => i.kind ?? i.severity))];
    appendLine(paths.work(id, 'history.jsonl'), { step: 'C3_verify', result, counts, kinds });
    setResult(id, 'C3_verify', result, { count: true });
    const items = Object.entries(fbSlides).map(([sid, l]) => `${sid}: ${l.map((i) => `[${i.severity}] ${i.detail}`).join(' / ')}`.slice(0, 120));
    if (fbGlobal.length) items.unshift(`(全体): ${fbGlobal.map((i) => `[${i.severity}] ${i.detail}`).join(' / ')}`.slice(0, 120));
    emit({
      ok: true,
      summary: `重 ${counts.重} / 中 ${counts.中} / 軽 ${counts.軽} → loop advance --result ${result}${result === 'fix' ? `（直す所は work/${id}/feedback.json）` : ''}`,
      items,
      extra: { result },
    });
  },

  async gate(args) {
    const id = itemIdOf(args._[0]);
    const { fails } = await gateLecture(id);
    if (fails.length) { failToFeedback(id, 'C4_gate', fails); setResult(id, 'C4_gate', 'fail'); }
    emit({ ok: !fails.length, summary: fails.length ? `${fails.length} 件の検査に落ちた → loop advance --result fail` : '全ての検査を通った → lec publish', items: failItems(fails), repeatKey: `kgate:${id}` });
  },

  async publish(args) {
    const id = itemIdOf(args._[0]);
    requireState(id, 'C4_gate');
    const { fails, lec, results } = await gateLecture(id);
    if (fails.length) {
      failToFeedback(id, 'C4_gate', fails);
      setResult(id, 'C4_gate', 'fail');
      return emit({ ok: false, summary: `検査に落ちたので入れない（${fails.length} 件）→ loop advance --result fail`, items: failItems(fails), repeatKey: `kgate:${id}` });
    }

    // 音声を先に作る（失敗したら何も入れない）。作業の場所で作ってから写す
    const skipTTS = process.env.DOP_TTS === 'skip';
    const chars = lec.slides.reduce((t, s) => t + len(s.narration), 0);
    let audio = null;
    if (!skipTTS) {
      const tmp = paths.work(id, 'audio');
      fs.rmSync(tmp, { recursive: true, force: true });
      audio = { dir: tmp, ...(await synthesize(lec, tmp)) };
    }
    const minutes = audio ? audio.minutes : Math.round((chars / CHARS_PER_MINUTE) * 10) / 10;

    // 講義の元
    const srcFile = path.join(paths.lectures(), `${lec.task}.json`);
    const prev = readJSON(srcFile, null);
    const source = { ...lec, credit: CREDIT, audio: !!audio, minutes, status: 'verified', created: prev?.created ?? today(), last_checked: today() };
    writeJSON(srcFile, source);

    // アプリが読む形・図・音声
    const dir = path.join(APP, 'public', 'lectures', lec.task);
    fs.rmSync(path.join(dir, 'visuals'), { recursive: true, force: true });
    fs.rmSync(path.join(dir, 'audio'), { recursive: true, force: true });
    fs.mkdirSync(path.join(dir, 'visuals'), { recursive: true });
    for (const r of results) fs.writeFileSync(path.join(dir, 'visuals', `${r.id}.svg`), r.svg + '\n');
    if (audio) {
      fs.mkdirSync(path.join(dir, 'audio'), { recursive: true });
      for (const f of audio.files) fs.copyFileSync(path.join(audio.dir, `${f.id}.mp3`), path.join(dir, 'audio', `${f.id}.mp3`));
    }
    const slides = lec.slides.map((s) => {
      const { type, alt, source: _src, ...rest } = s.visual;
      const visual = type === 'mermaid' ? { type, alt, svg: `visuals/${s.id}.svg` } : { type, ...rest };
      const sec = audio?.files.find((f) => f.id === s.id)?.seconds;
      return {
        id: s.id, title: s.title, bullets: s.bullets, visual, narration: s.narration,
        refs: s.refs.map((r) => ({ quote: r.quote, url: r.url })),
        ...(audio ? { audio: `audio/${s.id}.mp3`, seconds: sec } : {}),
      };
    });
    writeJSON(path.join(dir, 'lecture.json'), { task: lec.task, title: lec.title, credit: CREDIT, audio: !!audio, minutes, last_checked: source.last_checked, slides });

    // 一覧を書き直す
    const ldir = paths.lectures();
    const list = fs.readdirSync(ldir).filter((f) => f.endsWith('.json')).map((f) => readJSON(path.join(ldir, f), null)).filter((l) => l?.status === 'verified');
    const num = (t) => t.split('.').map(Number);
    list.sort((a, b) => num(a.task)[0] - num(b.task)[0] || num(a.task)[1] - num(b.task)[1]);
    writeJSON(path.join(APP, 'public', 'lectures', 'index.json'), list.map((l) => ({ task: l.task, title: l.title, slides: l.slides.length, minutes: l.minutes })));

    setResult(id, 'C4_gate', 'pass');
    emit({
      ok: true,
      summary: `講義 ${lec.task} を入れた（${lec.slides.length} 枚・約 ${minutes} 分・図 ${results.length} 枚・${audio ? `音声 ${audio.files.length} 本` : '音声なし（DOP_TTS=skip）'}）→ loop advance --result pass`,
      items: [rel(srcFile), path.relative(path.dirname(APP), dir)],
    });
  },
};

if (import.meta.url === `file://${process.argv[1]}`) main(commands);
export { commands };
