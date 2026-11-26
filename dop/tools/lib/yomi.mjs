// 講義の読み（よみ台本）: 台本の各行を VOICEVOX ENGINE がどう読むかを、ひらがなで書き出して確かめる。
// 読み違い（例: 値 を「ね」と読む）は、その行の say（読ませる文）で、その語だけひらがなにして直す。
// 漢字を全部ひらがなにすると抑揚が崩れる語があり、カタカナ語をひらがなにすると大きく崩れるため、直すのは読み違いの語だけ。
//
// work/<ID>/yomi.json:
//   { hash, checked, slides: [{ id, lines: [{ who, text, say?, yomi }] }] }
//   text  = 台本の行（画面に出す文。lecture.json と同じ）
//   say   = 読ませる文（無ければ text）。text の漢字をひらがなに置き換えただけの文にする
//   yomi  = エンジンが say を読んだ読み（ひらがな。アクセントの区切りを空白で示す）
//   hash  = lecture.json の台本と say から作る。checked がこれと同じなら、読みを確かめ終えている
import crypto from 'node:crypto';
import { ENGINE, ensureEngine, installAccents, linesOf } from './tts.mjs';
import { ToolError } from './io.mjs';

const KANJI = /[㐀-鿿豈-﫿々〆ヶ]/u;
const toHira = (s) => s.replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60));

/** 読みの束の hash（台本の文と say が変われば変わる） */
export function yomiHash(slides) {
  const body = slides.map((s) => s.lines.map((l) => `${l.who}\t${l.text}\t${l.say ?? ''}`).join('\n')).join('\n--\n');
  return crypto.createHash('sha256').update(body).digest('hex').slice(0, 16);
}

/**
 * say が text の漢字の部分をひらがなに置き換えただけか。
 * 漢字でもひらがなでもない字（カタカナ・句読点など）の並びが同じで、漢字が減るか同じなら ok。
 */
export function sayErrors(text, say) {
  const rest = (t) => [...t].filter((c) => !KANJI.test(c) && !/[ぁ-ゖー]/.test(c)).join('');
  const errs = [];
  if (rest(text) !== rest(say)) errs.push('say は台本の漢字をひらがなにしただけの文にする（カタカナ・句読点は変えない）');
  if ([...say].filter((c) => KANJI.test(c)).length > [...text].filter((c) => KANJI.test(c)).length) errs.push('say に台本より多い漢字がある');
  return errs;
}

/** エンジンが文をどう読むか（ひらがな、アクセント句の区切りは空白） */
export async function readingOf(text, speaker = 2) {
  const q = await fetch(`${ENGINE}/audio_query?speaker=${speaker}&text=${encodeURIComponent(text)}`, { method: 'POST' });
  if (!q.ok) throw new ToolError(`読みを取れない（audio_query）: ${q.status}`);
  const { accent_phrases: phrases } = await q.json();
  return phrases.map((p) => toHira(p.moras.map((m) => m.text).join('') + (p.pause_mora ? '、' : ''))).join(' ').replace(/ 、/g, '、');
}

/**
 * 講義の台本から読みの束を作る。前の yomi.json の say は、同じ行（同じ text）なら引き継ぐ。
 * @returns {{ slides, hash }}
 */
export async function buildYomi(lecture, prev) {
  await ensureEngine();
  await installAccents();
  const keep = new Map();
  for (const s of prev?.slides ?? []) for (const l of s.lines) if (l.say) keep.set(`${s.id}\t${l.text}`, l.say);
  const slides = [];
  for (const s of lecture.slides) {
    const lines = [];
    for (const l of linesOf(s)) {
      const say = keep.get(`${s.id}\t${l.text}`);
      lines.push({ who: l.who, text: l.text, ...(say ? { say } : {}), yomi: await readingOf(say ?? l.text) });
    }
    slides.push({ id: s.id, lines });
  }
  return { slides, hash: yomiHash(slides) };
}

/** 読ませる文の表（slide id → 行の say の配列）。yomi.json が無ければ null */
export function sayMap(yomi) {
  if (!yomi) return null;
  return new Map(yomi.slides.map((s) => [s.id, s.lines.map((l) => l.say ?? l.text)]));
}
