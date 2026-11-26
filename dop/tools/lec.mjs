#!/usr/bin/env node
// 講義のツール: validate / verdict / yomi / gate / publish（形の検査と図の描画は lib/lecture.mjs）
// 講義の項目（K-）の束は work/<ID>/lecture.json に
//   { task, title, slides: [{ id, title, bullets, visual, dialogue | narration, refs: [{ source_id, quote, url }] }] }。
// dialogue は掛け合いの台本 [{ who: 'teacher' | 'student', text }]（先生 = 四国めたん、生徒 = ずんだもん）。
// narration は 1 人で読む前の形（先生の 1 行として扱う）。
// C3 の 2 人の検証役は work/<ID>/review-consistency.json と review-clarity.json を書く。
// 出来上がりは lectures/<task>.json（講義の元）と app/public/lectures/<task>/（アプリが読む形・図・音声）。
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { CODE, paths, readJSON, writeJSON, appendLine, emit, main, ToolError, today, setResult, writeReport, rel } from './lib/io.mjs';
import { itemIdOf as idOf, requireState, failToFeedback as toFeedback } from './lib/step.mjs';
import { synthesize, creditOf } from './lib/tts.mjs';
import { buildYomi, sayErrors, sayMap } from './lib/yomi.mjs';

const APP = process.env.DOP_APP ? path.resolve(process.env.DOP_APP) : path.join(CODE, 'app');

const REVIEWS = { consistency: 'review-consistency.json', clarity: 'review-clarity.json' };
const SEVERITY = ['重', '中', '軽'];
const itemIdOf = (arg) => idOf(arg, { prefix: 'K', message: '講義の項目 ID（例 K-0001）を渡す' });

import { LIMITS, CHARS_PER_MINUTE, len, spokenLen, loadLecture, boxesOf, checkLecture, renderVisuals, yomiErrors } from './lib/lecture.mjs';

export { LIMITS, boxesOf, checkLecture, renderVisuals };

async function gateLecture(id) {
  const lec = loadLecture(id);
  const fails = checkLecture(id, lec).map((e) => ({ check: 'form', ...e }));
  const vfile = paths.work(id, 'verdict.json');
  const verdict = readJSON(vfile, null);
  if (verdict?.result !== 'pass') fails.push({ check: 'verified', id: null, message: `検証の結果が pass でない（${verdict?.result ?? 'なし'}）` });
  if (verdict && fs.statSync(paths.work(id, 'lecture.json')).mtimeMs > fs.statSync(vfile).mtimeMs + 1) {
    fails.push({ check: 'verified', id: null, message: '検証（lec verdict）の後に lecture.json を書き換えた。C3 からやり直す' });
  }
  if (process.env.DOP_TTS !== 'skip') for (const m of yomiErrors(id, lec)) fails.push({ check: 'yomi', id: null, message: m });
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
    const chars = lec.slides.reduce((t, s) => t + spokenLen(s), 0);
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

  // C3（検証の後）: よみ台本を作る。--done で、読みを確かめ終えた印を付ける
  async yomi(args) {
    const id = itemIdOf(args._[0]);
    const lec = loadLecture(id);
    const file = paths.work(id, 'yomi.json');
    const prev = readJSON(file, null);
    if (args.done) {
      const errs = yomiErrors(id, lec).filter((m) => !m.startsWith('読みを確かめ終えていない'));
      if (errs.length) return emit({ ok: false, summary: `確かめ終えた印を付けられない（${errs.length} 件）`, items: errs, repeatKey: `kyomi:${id}` });
      writeJSON(file, { ...prev, checked: prev.hash });
      return emit({ ok: true, summary: `読みを確かめ終えた印を付けた（say ${prev.slides.flatMap((s) => s.lines).filter((l) => l.say).length} 行）`, items: [] });
    }
    for (const s of prev?.slides ?? []) s.lines.forEach((l, k) => { if (l.say) { const e = sayErrors(l.text, l.say); if (e.length) throw new ToolError(`${s.id} の ${k + 1} 行目の say: ${e.join('、')}`); } });
    const { slides, hash } = await buildYomi(lec, prev);
    writeJSON(file, { hash, checked: prev?.checked === hash ? hash : null, slides });
    const lines = slides.flatMap((s) => s.lines);
    emit({
      ok: true,
      summary: `よみ台本を作った（${lines.length} 行、say ${lines.filter((l) => l.say).length} 行）→ 読みを台本と照らし、読み違いは say で直して lec yomi をもう一度。終えたら lec yomi --done`,
      items: [],
      details_path: rel(file),
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
    const chars = lec.slides.reduce((t, s) => t + spokenLen(s), 0);
    let audio = null;
    if (!skipTTS) {
      const tmp = paths.work(id, 'audio');
      fs.rmSync(tmp, { recursive: true, force: true });
      audio = { dir: tmp, ...(await synthesize(lec, tmp, { says: sayMap(readJSON(paths.work(id, 'yomi.json'), null)) })) };
    }
    const minutes = audio ? audio.minutes : Math.round((chars / CHARS_PER_MINUTE) * 10) / 10;

    // 講義の元
    const srcFile = path.join(paths.lectures(), `${lec.task}.json`);
    const prev = readJSON(srcFile, null);
    const credit = creditOf(lec);
    const source = { ...lec, credit, audio: !!audio, minutes, status: 'verified', created: prev?.created ?? today(), last_checked: today() };
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
        id: s.id, title: s.title, bullets: s.bullets, visual,
        ...(Array.isArray(s.dialogue) ? { dialogue: s.dialogue } : { narration: s.narration }),
        refs: s.refs.map((r) => ({ quote: r.quote, url: r.url })),
        ...(audio ? { audio: `audio/${s.id}.mp3`, seconds: sec } : {}),
      };
    });
    writeJSON(path.join(dir, 'lecture.json'), { task: lec.task, title: lec.title, credit, audio: !!audio, minutes, last_checked: source.last_checked, slides });

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
