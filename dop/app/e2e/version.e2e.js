import test from 'node:test';
import assert from 'node:assert/strict';
import { startServer, launch, openPage, shot, overflowX } from './helpers.js';
import { DATA } from './fixtures.js';

let server;
let browser;
test.before(async () => { server = await startServer(); browser = await launch(); });
test.after(async () => { await browser?.close(); await server?.close(); });

async function withVersion(page, body) {
  await page.route('**/public/version.json', (route) => (body === null
    ? route.fulfill({ status: 404, body: 'not found' })
    : route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(body) })));
}

test('A-0011 AC2 JS と CSS は全部、版の番号付きで読み、画面の下に版を出す', async () => {
  const page = await browser.newPage();
  const urls = [];
  page.on('request', (r) => urls.push(r.url()));
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.route('**/public/questions.json', (route) => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(DATA) }));
  await page.goto(server.url);
  await page.locator('[data-testid=stem]').waitFor();
  const v = await page.locator('meta[name=app-version]').getAttribute('content');
  assert.match(v, /^[0-9a-f]{10}$/);
  const code = urls.filter((u) => /\.(js|css)(\?|$)/.test(u));
  assert.ok(code.length >= 5, code.join('\n'));
  for (const u of code) assert.ok(u.endsWith(`?v=${v}`), `版の番号が無い: ${u}`);
  assert.equal(await page.locator('[data-testid=version]').textContent(), `版 ${v}`);
  assert.deepEqual(errors, []);
  await page.close();
});

test('A-0011 AC3 サーバーの版が違えばお知らせを出し、押すと読み込み直す。同じなら出さない', async () => {
  const same = await browser.newPage();
  await same.route('**/public/questions.json', (route) => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(DATA) }));
  await same.goto(server.url);
  await same.locator('[data-testid=stem]').waitFor();
  await same.waitForTimeout(300);
  assert.equal(await same.locator('[data-testid=update]').count(), 0); // 本物の version.json は今の版
  await same.close();

  const { page, errors } = await openPage(browser, server.url, { data: DATA });
  await withVersion(page, { version: '0000000000' });
  await page.reload();
  const banner = page.locator('[data-testid=update]');
  await banner.waitFor();
  assert.match(await banner.textContent(), /新しい版があります/);
  const nav = page.waitForEvent('framenavigated');
  await page.getByRole('button', { name: '読み込み直す' }).click();
  await nav;
  assert.deepEqual(errors, []);
  await page.close();
});

for (const width of [375, 1280]) {
  test(`A-0011 AC4 version.json が取れなくても解け、お知らせがあっても幅 ${width} で溢れない`, async () => {
    const broken = await browser.newPage({ viewport: { width, height: 800 } });
    const errs = [];
    broken.on('pageerror', (e) => errs.push(String(e)));
    await broken.route('**/public/questions.json', (route) => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(DATA) }));
    await withVersion(broken, null);
    await broken.goto(server.url);
    await broken.locator('[data-testid=stem]').waitFor();
    await broken.waitForTimeout(300);
    assert.equal(await broken.locator('[data-testid=update]').count(), 0);
    assert.deepEqual(errs, []);
    await broken.close();

    const page = await browser.newPage({ viewport: { width, height: 800 } });
    await page.route('**/public/questions.json', (route) => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(DATA) }));
    await withVersion(page, { version: '0000000000' });
    await page.goto(server.url);
    await page.locator('[data-testid=update]').waitFor();
    assert.equal(await overflowX(page), false);
    await shot(page, `A-0011-update-${width}`);
    await page.close();
  });
}
