// 掛け合いの試作: work/K-0001/lecture.json から、音声（2 人の声）と図を work/_dialogue-sample/ に作る。
// ループの外の試作なので lec publish は使わず、同じライブラリ（tts・図）を直接呼ぶ。
import fs from 'node:fs';
import path from 'node:path';
import { paths, readJSON, writeJSON } from '../../tools/lib/io.mjs';
import { synthesize, creditOf } from '../../tools/lib/tts.mjs';
import { renderVisuals } from '../../tools/lec.mjs';
import { sayMap } from '../../tools/lib/yomi.mjs';

const out = paths.work('_dialogue-sample');
const lec = readJSON(paths.work('K-0001', 'lecture.json'));
fs.mkdirSync(path.join(out, 'visuals'), { recursive: true });
const { results, errors } = await renderVisuals(lec, {});
if (errors.length) throw new Error(JSON.stringify(errors));
for (const r of results) fs.writeFileSync(path.join(out, 'visuals', `${r.id}.svg`), r.svg + '\n');
const audio = await synthesize(lec, path.join(out, 'audio'), { says: sayMap(readJSON(paths.work('K-0001', 'yomi.json'), null)) });
const slides = lec.slides.map((s) => {
  const { type, alt, source: _s, ...rest } = s.visual;
  return {
    id: s.id, title: s.title, bullets: s.bullets, dialogue: s.dialogue,
    visual: type === 'mermaid' ? { type, alt, svg: `visuals/${s.id}.svg` } : { type, ...rest },
    refs: s.refs.map((r) => ({ quote: r.quote, url: r.url })),
    seconds: audio.files.find((f) => f.id === s.id)?.seconds,
  };
});
writeJSON(path.join(out, 'lecture.json'), { task: lec.task, title: lec.title, credit: creditOf(lec), minutes: audio.minutes, slides });
console.log(JSON.stringify({ minutes: audio.minutes, slides: slides.length, visuals: results.length }));
