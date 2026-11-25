// コードを測る（P-016）: ファイルの行数・関数の長さ・ファイルをまたいだ重複。
// 測る物と決まりは config/refactor.json。結果は「直す所」（finding）の一覧で、key は直した後に消えたかを見るのに使う。
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { CODE, readJSON } from './io.mjs';

export function rules() {
  return readJSON(path.join(CODE, 'config', 'refactor.json'));
}

export function sourceFiles(root = CODE, r = rules()) {
  const out = [];
  const walk = (dir) => {
    for (const f of fs.readdirSync(dir).sort()) {
      const p = path.join(dir, f);
      const relp = path.relative(root, p).split(path.sep).join('/');
      if (r.exclude.some((x) => relp === x || relp.startsWith(`${x}/`))) continue;
      if (fs.statSync(p).isDirectory()) walk(p);
      else if (r.ext.includes(path.extname(f))) out.push(relp);
    }
  };
  for (const inc of r.include) if (fs.existsSync(path.join(root, inc))) walk(path.join(root, inc));
  return out;
}

const strip = (line) => line.replace(/\/\/.*$/, '').trim();

/** 関数（function 宣言・オブジェクトのメソッド・const f = (…) =>）の始まりと長さ。{ name, start, lines } */
export function functions(text) {
  const lines = text.split('\n');
  const out = [];
  const head = /^\s*(?:export\s+)?(?:async\s+)?(?:function\s+([A-Za-z0-9_$]+)\s*\(|([A-Za-z0-9_$]+)\s*\([^)]*\)\s*\{\s*$|(?:const|let)\s+([A-Za-z0-9_$]+)\s*=\s*(?:async\s*)?\([^)]*\)\s*=>\s*\{\s*$)/;
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(head);
    if (!m || /^\s*(if|for|while|switch|catch|return)\b/.test(lines[i])) continue;
    let depth = 0;
    let seen = false;
    for (let j = i; j < lines.length; j++) {
      for (const ch of strip(lines[j]).replace(/(['"`])(?:\\.|(?!\1).)*\1/g, '')) {
        if (ch === '{') { depth++; seen = true; } else if (ch === '}') depth--;
      }
      if (seen && depth <= 0) { out.push({ name: m[1] ?? m[2] ?? m[3], start: i + 1, lines: j - i + 1 }); break; }
    }
  }
  return out;
}

/** 重複: 意味のある行を dup_window 行ずつ並べた塊が、別の場所にも同じ形である所 */
export function duplicates(files, read, r = rules()) {
  const seen = new Map();
  const pairs = new Map();
  for (const f of files) {
    const rows = read(f).split('\n').map((l, i) => ({ n: i + 1, t: strip(l).replace(/\s+/g, ' ') })).filter((x) => x.t.length >= r.dup_min_chars || /[A-Za-z]{4}/.test(x.t) && x.t.length > 8);
    for (let i = 0; i + r.dup_window <= rows.length; i++) {
      const chunk = rows.slice(i, i + r.dup_window);
      if (chunk.filter((x) => x.t.length >= r.dup_min_chars).length < Math.ceil(r.dup_window / 2)) continue;
      const h = crypto.createHash('sha1').update(chunk.map((x) => x.t).join('\n')).digest('hex');
      const here = { file: f, line: chunk[0].n };
      const prev = seen.get(h);
      if (!prev) { seen.set(h, here); continue; }
      if (prev.file === here.file && Math.abs(prev.line - here.line) < r.dup_window) continue;
      const key = [prev.file, here.file].sort().join(' ⇔ ');
      const p = pairs.get(key) ?? { files: [prev.file, here.file].sort(), blocks: 0, at: [] };
      p.blocks++;
      if (p.at.length < 3) p.at.push(`${prev.file}:${prev.line} = ${here.file}:${here.line}`);
      pairs.set(key, p);
    }
  }
  return [...pairs.values()];
}

/** 直す所の一覧 [{ key, kind, files, detail }] */
export function scan(root = CODE, r = rules()) {
  const files = sourceFiles(root, r);
  const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');
  const findings = [];
  for (const f of files) {
    const text = read(f);
    const n = text.split('\n').length;
    if (n > r.max_file_lines) findings.push({ key: `file:${f}`, kind: 'long_file', files: [f], detail: `${f} が ${n} 行（決まり ${r.max_file_lines} 行）` });
    for (const fn of functions(text)) {
      if (fn.lines > r.max_function_lines) findings.push({ key: `fn:${f}#${fn.name}`, kind: 'long_function', files: [f], detail: `${f}:${fn.start} ${fn.name} が ${fn.lines} 行（決まり ${r.max_function_lines} 行）` });
    }
  }
  for (const d of duplicates(files, read, r)) {
    findings.push({ key: `dup:${d.files.join('|')}`, kind: 'duplicate', files: d.files, detail: `${d.files.join(' と ')} に同じ形の塊 ${d.blocks} 個（例 ${d.at.join(' / ')}）` });
  }
  return findings;
}
