#!/usr/bin/env node
// 返答を日本語にするための hook（.claude/settings.json の Stop から呼ぶ）。
// 最後の返答の文が日本語でなければ止めずに返し、日本語で書き直させる。
// コードの囲み・`…`・URL は数えない（英語のままでよい物）。2 回目（stop_hook_active）は止めない。
import fs from 'node:fs';

let ev = {};
try { ev = JSON.parse(fs.readFileSync(0, 'utf8') || '{}'); } catch { process.exit(0); }
if (ev.stop_hook_active || !ev.transcript_path || !fs.existsSync(ev.transcript_path)) process.exit(0);

let last = '';
for (const line of fs.readFileSync(ev.transcript_path, 'utf8').split('\n')) {
  if (!line.trim()) continue;
  let e;
  try { e = JSON.parse(line); } catch { continue; }
  if (e.type !== 'assistant' || !Array.isArray(e.message?.content)) continue;
  const text = e.message.content.filter((c) => c.type === 'text').map((c) => c.text).join('\n');
  if (text.trim()) last = text;
}

export function japaneseShare(text) {
  const prose = text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/https?:\/\/\S+/g, ' ');
  const ja = (prose.match(/[぀-ヿ㐀-鿿]/g) ?? []).length;
  const latin = (prose.match(/[A-Za-z]/g) ?? []).length;
  return { ja, latin, share: ja / Math.max(1, ja + latin / 4) }; // 英語は 4 文字でおよそ 1 語として比べる
}

const { ja, latin, share } = japaneseShare(last);
if (ja + latin / 4 >= 20 && share < 0.5) {
  process.stderr.write('最後の返答が日本語になっていない。利用者への返答は日本語で書き直す（思考は英語でよい。コード・コマンド・サービス名などは原語のまま）。\n');
  process.exit(2);
}
