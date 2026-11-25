#!/usr/bin/env node
// Claude Code の hooks から呼ぶ（.claude/settings.json）。標準入力に hooks の JSON が来る。
// 終了コード 2 で止め、標準エラーの文を AI に返す。dop/ に関係しない時は何もしない（0）。
//   post-write: work/<ID>/questions.json を書いたら形を確かめる
//   pre-write:  ループの実行中は、工程の文書（loop/LOOP.md・loop/steps/*.md）を書き換えさせない
//   stop:       ループの工程の途中で止まらせない
import fs from 'node:fs';
import { paths, readJSON } from './lib/io.mjs';
import { checkBatch } from './q.mjs';

function input() {
  try { return JSON.parse(fs.readFileSync(0, 'utf8') || '{}'); } catch { return {}; }
}
function block(message) {
  process.stderr.write(message + '\n');
  process.exit(2);
}
const state = () => readJSON(paths.state(), { state: 'S0_pick', session: { active: false } });

const mode = process.argv[2];
const ev = input();
const file = String(ev.tool_input?.file_path ?? ev.tool_input?.notebook_path ?? '').replace(/\\/g, '/');

if (mode === 'post-write') {
  const m = file.match(/(?:^|\/)dop\/work\/([CALRT]-[0-9]{4})\/questions\.json$/);
  if (m) {
    let errors;
    try { errors = checkBatch(m[1]); } catch (e) { block(`questions.json を読めない: ${e.message}`); }
    if (errors.length) {
      block(`questions.json の形の誤り ${errors.length} 件（直してから進める）:\n` + errors.slice(0, 10).map((e) => `- ${e.qid} ${e.pointer}: ${e.message}`).join('\n'));
    }
  }
} else if (mode === 'pre-write') {
  if (/(?:^|\/)dop\/loop\/(LOOP\.md|steps\/[^/]+\.md)$/.test(file) && state().session?.active) {
    block('ループの実行中は工程の文書を書き換えない。変えたい事は .loop/proposals.md に案として書く（loop/steps/S9-close.md）');
  }
} else if (mode === 'stop') {
  if (!ev.stop_hook_active) {
    const s = state();
    if (s.session?.active && !['STOP', 'HUMAN'].includes(s.state)) {
      const how = s.state === 'S0_pick' ? 'loop next を呼ぶ' : s.state === 'S9_close' ? 'loop close を呼ぶ' : `工程を終えて loop advance を呼ぶ`;
      block(`ループの途中（${s.state}${s.item ? ` / ${s.item}` : ''}）。${how}。進められないなら loop block --reason "…"、人に止められたなら loop pause`);
    }
  }
}
