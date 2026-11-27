// 講義の形の検査と図の描画（lec.mjs から分けた。F-0010）。
// 講義の束（work/<ID>/lecture.json）の形・台本の字・図の決まり・出典を見る checkLecture と、
// mermaid の図を描く renderVisuals、よみ台本が今の台本に合うかを見る yomiErrors。
import { paths, readJSON, ToolError } from './io.mjs';
import { referenceErrors } from './step.mjs';
import { iconMap, renderAll } from './diagram.mjs';
import { parseSources } from './text.mjs';
import { linesOf, VOICES } from './tts.mjs';
import { yomiHash, sayErrors } from './yomi.mjs';
import { readability } from '../dg.mjs';
import fs from 'node:fs';

export const LIMITS = { slidesMin: 12, slidesMax: 16, narrationMin: 3000, narrationMax: 5000, dialogueMax: 6000, lineMax: 160, bullets: 3, bulletWidth: 22, boxes: 7, rows: 5, cellWidth: 15, steps: 6 };
// 読み上げで崩れる字: 英字・数字・記号（半角は全部、全角は英数字と括弧・かぎ括弧・斜線・中黒・矢印・コロンなど）
export const UNSPEAKABLE = /[\x21-\x7e０-９Ａ-Ｚａ-ｚ（）「」『』【】［］〔〕〈〉《》＜＞／・→←↑↓⇒：；＃＄％＆＊＋＝＠＼＾｜～〜]/g;
// 台本 1 分あたりの字数（試作: 4,477 字で約 15 分。速さ 1.1）。音声を作らない時の見積もりに使う
export const CHARS_PER_MINUTE = 300;

export const width = (t) => [...String(t)].reduce((n, c) => n + (c.charCodeAt(0) < 128 ? 0.5 : 1), 0);
export const len = (t) => [...String(t ?? '')].length;
export const isText = (t) => typeof t === 'string' && t.trim().length > 0;
/** スライドの台本の字数（掛け合いなら全部の行） */
export const spokenLen = (s) => linesOf(s).reduce((n, l) => n + len(l?.text), 0);

export function loadLecture(id) {
  const l = readJSON(paths.work(id, 'lecture.json'), null);
  if (!l || typeof l !== 'object' || !Array.isArray(l.slides)) throw new ToolError(`work/${id}/lecture.json は { "task", "title", "slides": [ … ] } の形にする`);
  return l;
}

export function examTasks() {
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
export function visualErrors(v, add) {
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
  const total = lec.slides.reduce((t, s) => t + spokenLen(s), 0);
  const isDialogue = lec.slides.some((s) => Array.isArray(s?.dialogue));
  const max = isDialogue ? LIMITS.dialogueMax : LIMITS.narrationMax;
  if (total < LIMITS.narrationMin || total > max) top(`台本の合計が ${total} 字。${LIMITS.narrationMin}〜${max} 字にする`);
  if (isDialogue && lec.slides.some((s) => s && !Array.isArray(s.dialogue))) top('掛け合いにするなら、全部のスライドを dialogue にする');
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
    if (Array.isArray(s.dialogue)) {
      if (s.dialogue.length < 2) add('dialogue（掛け合い）は 2 行以上にする');
      if (!s.dialogue.some((l) => l?.who === 'teacher')) add('dialogue に先生（teacher）の行が要る');
      s.dialogue.forEach((l, k) => {
        const at = `dialogue の ${k + 1} 行目`;
        if (!l || !VOICES[l.who]) return add(`${at}: who は ${Object.keys(VOICES).join(' か ')} にする`);
        if (!isText(l.text)) return add(`${at}: text が要る`);
        if (len(l.text) > LIMITS.lineMax) add(`${at}が ${len(l.text)} 字。1 行は ${LIMITS.lineMax} 字までにして、相手の返しを挟む`);
        const bad = [...new Set(l.text.match(UNSPEAKABLE) ?? [])];
        if (bad.length) add(`${at}に読み上げで崩れる字がある（${bad.slice(0, 8).join(' ')}）。英字・数字・記号はかなや言葉に直す`);
      });
    } else if (!isText(s.narration)) add('dialogue（掛け合いの台本）か narration（台本）が要る');
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

/** よみ台本（work/<ID>/yomi.json）が今の台本に合い、確かめ終えているか。誤りの文の配列 */
export function yomiErrors(id, lec) {
  const yomi = readJSON(paths.work(id, 'yomi.json'), null);
  if (!yomi) return ['よみ台本が無い。lec yomi で作り、読みを確かめてから lec yomi --done'];
  const errs = [];
  const want = lec.slides.map((s) => linesOf(s).map((l) => `${l.who}\t${l.text}`).join('\n')).join('\n--\n');
  const have = yomi.slides.map((s) => s.lines.map((l) => `${l.who}\t${l.text}`).join('\n')).join('\n--\n');
  if (want !== have) errs.push('よみ台本が今の台本と合わない（台本を書き換えた）。lec yomi で作り直して確かめる');
  for (const s of yomi.slides) s.lines.forEach((l, k) => { if (l.say) for (const e of sayErrors(l.text, l.say)) errs.push(`${s.id} の ${k + 1} 行目: ${e}`); });
  if (yomi.hash !== yomiHash(yomi.slides)) errs.push('say を書き換えた後に読みを作り直していない。lec yomi を呼ぶ');
  else if (yomi.checked !== yomi.hash) errs.push('読みを確かめ終えていない（lec yomi --done が無い）');
  return errs;
}
