// ツールの共通部分: 置き場所・JSON の読み書き・出力の約束（loop/tools.md「共通の約束」）。
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

// 設定とスキーマはコードと一緒に置く（CODE）。作業の物は DOP_DATA で差し替えられる（試験のため）。
export const CODE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
export const DATA = process.env.DOP_DATA ? path.resolve(process.env.DOP_DATA) : CODE;

export const paths = {
  loopDir: () => path.join(DATA, '.loop'),
  state: () => path.join(DATA, '.loop', 'state.json'),
  backlog: () => path.join(DATA, '.loop', 'backlog.json'),
  runs: () => path.join(DATA, '.loop', 'runs.jsonl'),
  lastFail: () => path.join(DATA, '.loop', 'last_fail.json'),
  reports: (...p) => path.join(DATA, '.loop', 'reports', ...p),
  archive: (...p) => path.join(DATA, '.loop', 'archive', ...p),
  answers: () => path.join(DATA, '.loop', 'answers'),
  work: (id, ...p) => path.join(DATA, 'work', id, ...p),
  bank: (...p) => path.join(DATA, 'bank', ...p),
  config: (name) => path.join(CODE, 'config', name),
  schema: (name) => path.join(CODE, 'schemas', name),
};

export const ITEM_ID = /^[CALR]-[0-9]{4}$/;

export function readJSON(file, fallback) {
  if (!fs.existsSync(file)) {
    if (fallback !== undefined) return fallback;
    throw new ToolError(`ファイルが無い: ${rel(file)}`);
  }
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    throw new ToolError(`JSON として読めない: ${rel(file)}: ${e.message}`);
  }
}

export function writeJSON(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(value, null, 2) + '\n');
}

export function appendLine(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.appendFileSync(file, JSON.stringify(value) + '\n');
}

export function writeReport(name, text) {
  const file = paths.reports(name);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, text);
  return rel(file);
}

export function rel(file) {
  return path.relative(DATA, file) || '.';
}

export function today() {
  // 日本時間の日付
  return new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10);
}

// 使い方の誤り・ツールの故障（終了コード 2）
export class ToolError extends Error {}

// 種から決まる乱数（mulberry32）
export function seeded(seedText) {
  let a = parseInt(crypto.createHash('sha256').update(seedText).digest('hex').slice(0, 8), 16);
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * 出力の約束どおりに 1 つの JSON を出して終わる。
 * repeatKey を渡すと、同じ key の直前の失敗と items が同じかを repeat に入れる。
 */
export function emit({ ok, summary, items = [], details_path, repeatKey, extra = {} }) {
  const shown = items.slice(0, 10);
  const out = { ok, summary, ...extra, items: shown };
  if (items.length > shown.length) out.more = items.length - shown.length;
  if (details_path) out.details_path = details_path;
  if (repeatKey) out.repeat = trackRepeat(repeatKey, ok, items);
  process.stdout.write(compact(out) + '\n');
  process.exitCode = ok ? 0 : 1;
  return out;
}

// 1 段目の鍵を 1 行ずつ、配列は 1 要素 1 行にする（30 行に収めるため）。出力は JSON として読める。
export function compact(obj) {
  const lines = Object.entries(obj).map(([k, v]) => {
    if (Array.isArray(v) && v.length) {
      return `  ${JSON.stringify(k)}: [\n${v.map((x) => '    ' + JSON.stringify(x)).join(',\n')}\n  ]`;
    }
    return `  ${JSON.stringify(k)}: ${JSON.stringify(v)}`;
  });
  return `{\n${lines.join(',\n')}\n}`;
}

function trackRepeat(key, ok, items) {
  const file = paths.lastFail();
  const all = readJSON(file, {});
  const sig = crypto.createHash('sha256').update(JSON.stringify(items)).digest('hex').slice(0, 16);
  const repeat = !ok && all[key] === sig;
  if (ok) delete all[key]; else all[key] = sig;
  writeJSON(file, all);
  return repeat;
}

// コマンドの入口。ToolError は終了コード 2 の JSON にする。
export async function main(commands, argv = process.argv.slice(2)) {
  const [cmd, ...rest] = argv;
  try {
    const fn = commands[cmd];
    if (!fn) throw new ToolError(`コマンドが無い: ${cmd ?? '(なし)'}。使えるもの: ${Object.keys(commands).join(', ')}`);
    await fn(parseArgs(rest));
  } catch (e) {
    if (!(e instanceof ToolError)) throw e;
    process.stdout.write(JSON.stringify({ ok: false, summary: e.message, items: [] }) + '\n');
    process.exitCode = 2;
  }
}

export function parseArgs(list) {
  const args = { _: [] };
  for (let i = 0; i < list.length; i++) {
    const a = list[i];
    if (a.startsWith('--')) {
      const key = a.slice(2);
      const next = list[i + 1];
      if (next === undefined || next.startsWith('--')) args[key] = true;
      else { args[key] = next; i++; }
    } else args._.push(a);
  }
  return args;
}

// 結果の札: 工程の結果をツールが書き、loop advance が照らす（AI が結果を取り違えないように）。
export function setResult(itemId, state, result, extra = {}) {
  writeJSON(paths.work(itemId, 'result.json'), { state, result, ...extra, at: new Date().toISOString() });
}
