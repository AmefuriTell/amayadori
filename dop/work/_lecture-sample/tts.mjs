// 講義の台本（L-*.json の slides[].narration）を VOICEVOX ENGINE（http://127.0.0.1:50021）で音声にする。
// 使い方: node tts.mjs L-1.4.json <話者の style id> <出力フォルダ>
// 声の利用条件: 生成した音声には「VOICEVOX:<キャラクター名>」のクレジットが要る。
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const [file, speaker = '2', outDir = 'audio'] = process.argv.slice(2);
const ENGINE = process.env.VOICEVOX_URL ?? 'http://127.0.0.1:50021';
const lecture = JSON.parse(fs.readFileSync(file, 'utf8'));
// 一般的なアクセントにそろえる語を、ユーザー辞書に入れる（accents.json。同じ語は入れ直す）
const ACCENTS = new URL('./accents.json', import.meta.url);
if (fs.existsSync(ACCENTS)) {
  const have = await (await fetch(`${ENGINE}/user_dict`)).json();
  for (const [uuid, w] of Object.entries(have)) await fetch(`${ENGINE}/user_dict_word/${uuid}`, { method: 'DELETE' });
  for (const w of JSON.parse(fs.readFileSync(ACCENTS, 'utf8')).words) {
    const q = new URLSearchParams({ surface: w.surface, pronunciation: w.pronunciation, accent_type: String(w.accent), word_type: 'PROPER_NOUN', priority: '10' });
    const r = await fetch(`${ENGINE}/user_dict_word?${q}`, { method: 'POST' });
    if (!r.ok) throw new Error(`user_dict_word ${w.surface}: ${r.status} ${await r.text()}`);
  }
}
fs.mkdirSync(outDir, { recursive: true });
const out = [];
for (const s of lecture.slides) {
  const q = await fetch(`${ENGINE}/audio_query?speaker=${speaker}&text=${encodeURIComponent(s.narration)}`, { method: 'POST' });
  if (!q.ok) throw new Error(`audio_query ${s.id}: ${q.status}`);
  const query = await q.json();
  query.speedScale = Number(process.env.SPEED ?? 1.1);
  query.postPhonemeLength = 0.6;
  const w = await fetch(`${ENGINE}/synthesis?speaker=${speaker}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(query) });
  if (!w.ok) throw new Error(`synthesis ${s.id}: ${w.status}`);
  const wav = path.join(outDir, `${s.id}.wav`);
  fs.writeFileSync(wav, Buffer.from(await w.arrayBuffer()));
  const mp3 = path.join(outDir, `${s.id}.mp3`);
  execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-i', wav, '-b:a', '64k', mp3]);
  fs.rmSync(wav);
  const sec = Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', mp3]).toString());
  out.push({ id: s.id, seconds: Math.round(sec) });
}
const total = out.reduce((n, x) => n + x.seconds, 0);
console.log(JSON.stringify({ ok: true, slides: out.length, minutes: +(total / 60).toFixed(1), files: out }, null, 1));
