// 判断の要点の講義（利用者の希望 2026-11-27: 講義を見ても問題が解けるようにする）。
// work/<ID>/points.json があれば、その講義は「判断の要点」の講義。
//   points.json = { task, questions: [{ id, stem_ja, choices_ja, answer, summary, per_choice, references }] }
// 講義の各スライドは covers: [問題 ID] で、どの問題の決め手を扱うかを書く。全部の問題を 1 回以上覆う。
// 解けるかの試し（solve）: 答えを見ない検証役が、講義だけを見て task の問題を解く。
//   work/<ID>/solve-blind.json（答えの無い問題）→ 検証役が work/<ID>/solve.json [{ id, answer: [...], slide, quote, why }] を書く。
//   quote は決め手にした講義の文（slide の台本・要点・図の文をそのまま）。講義に無い知識で解いた物は解けなかったと数える。
import fs from 'node:fs';
import path from 'node:path';
import { CODE, paths, readJSON, writeJSON } from './io.mjs';

const QUESTIONS = () => path.join(process.env.DOP_APP ? path.resolve(process.env.DOP_APP) : path.join(CODE, 'app'), 'public', 'questions.json');

export const pointsOf = (id) => readJSON(paths.work(id, 'points.json'), null);

/** task の問題（questions.json から） */
export function taskQuestions(task) {
  const data = readJSON(QUESTIONS(), { questions: [] });
  return (data.questions ?? []).filter((q) => q.task === task);
}

/** 問題 1 つを、講義の書き手に渡す形に（答えと解説を含む） */
export function pointOf(q) {
  return {
    id: q.id,
    stem_ja: q.stem_ja ?? q.stem,
    choices_ja: Object.fromEntries(q.choices.map((c) => [c.key, c.text_ja ?? c.text])),
    answer: q.answer,
    summary: q.explanation?.summary,
    per_choice: q.explanation?.per_choice,
    references: q.references,
  };
}

/** 答えの無い問題（解けるかの試しで検証役に渡す） */
export const blindOf = (q) => ({
  id: q.id, type: q.type, select_count: q.select_count, stem_ja: q.stem_ja ?? q.stem,
  choices_ja: Object.fromEntries(q.choices.map((c) => [c.key, c.text_ja ?? c.text])),
});

/** その task の問題を作った項目（C-）の、資料と原文の控えの場所 */
export function questionArchives(task) {
  const dir = paths.archive();
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((d) => d.startsWith('C-')).sort()
    .filter((d) => readJSON(path.join(dir, d, 'item.json'), {}).task === task)
    .map((d) => ({ id: d, dir: path.join(dir, d) }));
}

/**
 * 問題の資料を講義の資料に足す: sources.md の出典を、今の最後の番号の後ろに付け直して足し、raw/ を写す。
 * 同じ URL・同じ引用の出典は足さない。足した出典の数を返す。
 */
export function mergeQuestionSources(id, task) {
  const file = paths.work(id, 'sources.md');
  let md = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
  const cut = md.indexOf('\n### 覆えなかった行');
  const tail = cut >= 0 ? md.slice(cut) : '';
  if (cut >= 0) md = md.slice(0, cut);
  let n = Math.max(0, ...[...md.matchAll(/^## S(\d+)/gm)].map((m) => Number(m[1])));
  const sections = (text) => [...text.matchAll(/^## S\d+([^\n]*\n[\s\S]*?)(?=^## |^### |(?![\s\S]))/gm)].map((m) => m[1]);
  const seen = new Set(sections(md).map((r) => r.trimEnd()));
  let added = 0;
  fs.mkdirSync(paths.work(id, 'raw'), { recursive: true });
  for (const a of questionArchives(task)) {
    const src = path.join(a.dir, 'sources.md');
    if (fs.existsSync(src)) {
      const body = fs.readFileSync(src, 'utf8');
      for (const r of sections(body)) {
        const rest = r.trimEnd();
        if (seen.has(rest)) continue;
        seen.add(rest);
        n += 1;
        added += 1;
        md += `${md.endsWith('\n\n') ? '' : md.endsWith('\n') ? '\n' : '\n\n'}## S${n}${rest}\n`;
      }
    }
    const raw = path.join(a.dir, 'raw');
    if (fs.existsSync(raw)) for (const f of fs.readdirSync(raw)) fs.copyFileSync(path.join(raw, f), paths.work(id, 'raw', `${a.id}-${f}`));
  }
  fs.writeFileSync(file, md + tail);
  return added;
}

/** points.json と solve-blind.json を書く。[問題の数, 足した出典の数] */
export function buildPoints(id, task) {
  const qs = taskQuestions(task);
  writeJSON(paths.work(id, 'points.json'), { task, questions: qs.map(pointOf) });
  writeJSON(paths.work(id, 'solve-blind.json'), { task, questions: qs.map(blindOf) });
  return [qs.length, mergeQuestionSources(id, task)];
}

/** covers の誤り（判断の要点の講義だけ）。add(slideId|null, message) */
export function coverErrors(lec, points, add) {
  const ids = new Set(points.questions.map((q) => q.id));
  const covered = new Set();
  for (const s of lec.slides) {
    if (s?.covers === undefined) continue;
    if (!Array.isArray(s.covers)) { add(s.id, 'covers は問題 ID の配列にする'); continue; }
    for (const q of s.covers) {
      if (!ids.has(q)) add(s.id, `covers の ${q} はこの task の問題に無い`);
      covered.add(q);
    }
  }
  const missing = [...ids].filter((q) => !covered.has(q));
  if (missing.length) add(null, `決め手を扱っていない問題がある（${missing.join(', ')}）。どれかのスライドの covers に入れ、その決め手を台本と画面で扱う`);
}

/**
 * 解けるかの試しの結果。{ ok, wrong: [{ id, got, want }], errors: [文] }
 * solve.json が無い・lecture.json より古い・問題が欠けている時は errors。
 */
export function solveResult(id, points, lec = readJSON(paths.work(id, 'lecture.json'), { slides: [] })) {
  const slideText = new Map(lec.slides.map((s) => [s.id, JSON.stringify([s.title, s.bullets, s.visual, s.dialogue ?? s.narration])]));
  const file = paths.work(id, 'solve.json');
  if (!fs.existsSync(file)) return { ok: false, wrong: [], errors: ['解けるかの試し（solve.json）が無い。答えを見ない検証役に、講義だけで solve-blind.json の問題を解いてもらう'] };
  if (fs.statSync(file).mtimeMs + 1 < fs.statSync(paths.work(id, 'lecture.json')).mtimeMs) return { ok: false, wrong: [], errors: ['solve.json が今の lecture.json より古い。今の講義で解き直してもらう'] };
  const got = new Map((readJSON(file, []) ?? []).map((a) => [a.id, a]));
  const errors = [];
  const wrong = [];
  for (const q of points.questions) {
    const a = got.get(q.id);
    if (!a) { errors.push(`${q.id} の答えが solve.json に無い`); continue; }
    const g = [...(a.answer ?? [])].sort().join(',');
    const w = [...q.answer].sort().join(',');
    // 答えの決め手が講義に書いてあるか: slide の台本・画面に quote がそのままある
    const text = slideText.get(a.slide);
    const grounded = text && typeof a.quote === 'string' && a.quote.trim().length >= 4 && text.includes(a.quote.trim());
    if (g !== w) wrong.push({ id: q.id, got: g, want: w, slide: a.slide ?? null, why: a.why ?? null });
    else if (!grounded) wrong.push({ id: q.id, got: g, want: w, slide: a.slide ?? null, why: `答えは合ったが、決め手の引用（slide ${a.slide ?? '無し'} の quote）が講義に無い。講義から言えない` });
  }
  return { ok: !errors.length && !wrong.length, wrong, errors };
}
