// e2e の手伝い: app/ を配る小さなサーバーと、Playwright のブラウザ。
// Playwright はこの環境に入っている物を使う（npm では入れない。NODE_PATH から読む）。
// 画面写真は DOP_SHOTS（app:check が .loop/reports/<ID>/ を渡す）に置く。
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const APP = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png' };

/** app/ を /dop/app/ の下に配る（GitHub Pages と同じく深い場所に置かれても動くことを確かめるため） */
export async function startServer() {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, 'http://x');
    const prefix = '/amayadori/dop/app/';
    if (!url.pathname.startsWith(prefix)) { res.writeHead(404).end(); return; }
    let file = path.join(APP, decodeURIComponent(url.pathname.slice(prefix.length)));
    if (!file.startsWith(APP)) { res.writeHead(403).end(); return; }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    if (!fs.existsSync(file)) { res.writeHead(404).end(); return; }
    res.writeHead(200, { 'content-type': TYPES[path.extname(file)] ?? 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const { port } = server.address();
  return { url: `http://127.0.0.1:${port}/amayadori/dop/app/`, close: () => new Promise((r) => server.close(r)) };
}

export async function launch() {
  const { chromium } = createRequire(import.meta.url)('playwright');
  return chromium.launch();
}

/**
 * ページを開く。ブラウザのコンソールのエラーを errors に集める（試験で 0 件を確かめる）。
 * data を渡すと public/questions.json の代わりにそれを返す（null なら 404 にする）。
 * init はページの前に動かす JavaScript（localStorage を壊すなど）。
 */
export async function openPage(browser, url, { width = 1280, height = 800, data, init, context } = {}) {
  // context を渡すと、その中で開く（localStorage を開き直しの間で残す試験のため）
  const page = await (context ?? browser).newPage(context ? undefined : { viewport: { width, height } });
  if (context) await page.setViewportSize({ width, height });
  if (init) await page.addInitScript(init);
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  if (data !== undefined) {
    await page.route('**/public/questions.json', (route) => (data === null
      ? route.fulfill({ status: 404, body: 'not found' })
      : route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(data) })));
  }
  await page.goto(url);
  return { page, errors };
}

export async function shot(page, name) {
  const dir = process.env.DOP_SHOTS;
  if (!dir) return;
  fs.mkdirSync(dir, { recursive: true });
  await page.screenshot({ path: path.join(dir, `${name}.png`), fullPage: true });
}

/** 横に溢れていないか（幅 375 の確認に使う） */
export async function overflowX(page) {
  return page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
}
