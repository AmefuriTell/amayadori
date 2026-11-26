#!/usr/bin/env node
// lecture.json の mermaid の図を描いて確かめる。
// 出力: visuals/<id>.svg と preview/<id>.png（このフォルダの中）
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderAll } from '../../tools/lib/diagram.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const lecture = JSON.parse(fs.readFileSync(path.join(here, 'lecture.json'), 'utf8'));
const list = lecture.slides
  .filter((s) => s.visual?.type === 'mermaid' && typeof s.visual.source === 'string')
  .map((s) => ({ id: s.id, source: s.visual.source }));

const results = await renderAll(list, { previewDir: path.join(here, 'preview') });
const svgDir = path.join(here, 'visuals');
fs.mkdirSync(svgDir, { recursive: true });
let failed = 0;
for (const r of results) {
  if (r.error) { failed++; console.log(`NG ${r.id}: ${r.error}`); continue; }
  fs.writeFileSync(path.join(svgDir, `${r.id}.svg`), r.svg + '\n');
  console.log(`ok ${r.id}${r.unknown.length ? `（アイコン無し: ${r.unknown.join(', ')}）` : ''}`);
}
console.log(`${results.length - failed}/${results.length} 枚を描いた`);
process.exit(failed ? 1 : 0);
