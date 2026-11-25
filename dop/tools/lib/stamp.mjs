// アプリの版の番号（A-0011）。src/**/*.js と style.css の中身から作る。
// index.html の印の間に、版の番号付きの読み込み（import map）を書き、public/version.json に版を書く。
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const START = '<!-- version:start（node dop/tools/app.mjs stamp が書く。手で直さない） -->';
const END = '<!-- version:end -->';

function files(app) {
  const out = [];
  const walk = (dir) => {
    for (const f of fs.readdirSync(dir).sort()) {
      const p = path.join(dir, f);
      if (fs.statSync(p).isDirectory()) walk(p);
      else if (f.endsWith('.js')) out.push(p);
    }
  };
  walk(path.join(app, 'src'));
  return out;
}

export function version(app) {
  const h = crypto.createHash('sha256');
  for (const p of [...files(app), path.join(app, 'style.css')]) h.update(path.relative(app, p)).update('\0').update(fs.readFileSync(p)).update('\0');
  return h.digest('hex').slice(0, 10);
}

export function block(app, v = version(app)) {
  const imports = Object.fromEntries(files(app).map((p) => {
    const r = './' + path.relative(app, p).split(path.sep).join('/');
    return [r, `${r}?v=${v}`];
  }));
  return [
    START,
    `  <meta name="app-version" content="${v}">`,
    `  <link rel="stylesheet" href="style.css?v=${v}">`,
    `  <script type="importmap">${JSON.stringify({ imports })}</script>`,
    `  <script type="module" src="src/main.js?v=${v}"></script>`,
    `  ${END}`,
  ].join('\n');
}

/** index.html の印の間を書き直す。{ version, changed } */
export function stamp(app) {
  const file = path.join(app, 'index.html');
  const html = fs.readFileSync(file, 'utf8');
  const i = html.indexOf(START);
  const j = html.indexOf(END);
  if (i < 0 || j < 0) throw new Error('index.html に version の印が無い');
  const v = version(app);
  const next = html.slice(0, i) + block(app, v) + html.slice(j + END.length);
  const changed = next !== html;
  if (changed) fs.writeFileSync(file, next);
  fs.mkdirSync(path.join(app, 'public'), { recursive: true });
  fs.writeFileSync(path.join(app, 'public', 'version.json'), JSON.stringify({ version: v }) + '\n');
  return { version: v, changed };
}

/** 印が今のファイルと合っているか */
export function isStamped(app) {
  const html = fs.readFileSync(path.join(app, 'index.html'), 'utf8');
  const v = version(app);
  const pub = (() => { try { return JSON.parse(fs.readFileSync(path.join(app, 'public', 'version.json'), 'utf8')).version; } catch { return null; } })();
  return html.includes(block(app, v)) && pub === v;
}
