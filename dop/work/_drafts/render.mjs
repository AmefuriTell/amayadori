// 図の下書きを描いて確かめる（並列の下書き用。正式の検査は dg validate）。
// 使い方: node work/_drafts/render.mjs work/_drafts/D-0002.json
import fs from 'node:fs';
import path from 'node:path';
import { renderAll } from '../../tools/lib/diagram.mjs';
const file = process.argv[2];
const b = JSON.parse(fs.readFileSync(file, 'utf8'));
const errors = [];
for (const d of b.diagrams) {
  if (!/^\s*flowchart\s+(TB|TD|LR)\b/.test(d.source ?? '')) errors.push(`${d.id}: source は flowchart TB で始める`);
  if (!/@\{\s*svc:/.test(d.source ?? '')) errors.push(`${d.id}: サービスの箱（X@{ svc: "…" }）が無い`);
  if (typeof d.alt !== 'string' || d.alt.length < 20) errors.push(`${d.id}: alt は日本語 20 字以上`);
}
const out = await renderAll(b.diagrams.map((d) => ({ id: d.id, source: d.source })), { previewDir: path.join(path.dirname(file), path.basename(file, '.json') + '-preview') });
for (const r of out) if (r.error) errors.push(`${r.id}: 描けない: ${r.error}`);
const unknown = [...new Set(out.flatMap((r) => r.unknown))];
console.log(JSON.stringify({ ok: !errors.length, errors, unknown_services: unknown, previews: path.basename(file, '.json') + '-preview/' }, null, 1));
