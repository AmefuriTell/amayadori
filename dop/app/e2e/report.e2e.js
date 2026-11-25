import test from 'node:test';
import assert from 'node:assert/strict';
import { startServer, launch, openPage, shot, overflowX } from './helpers.js';
import { DATA } from './fixtures.js';

let server;
let browser;
test.before(async () => { server = await startServer(); browser = await launch(); });
test.after(async () => { await browser?.close(); await server?.close(); });

async function openReport(page) {
  await page.locator('[data-testid=choice] input').nth(0).check();
  await page.getByRole('button', { name: '答える' }).click();
  await page.getByRole('button', { name: '誤りを報告' }).click();
}

test('A-0006 AC1 種類とコメントを保存し、印が出る', async () => {
  const { page, errors } = await openPage(browser, server.url, { data: DATA });
  await openReport(page);
  await page.getByLabel('答えが違う').check();
  await page.getByLabel('コメント').fill('B ではなく A では');
  await page.getByRole('button', { name: '保存' }).click();
  assert.match(await page.locator('[data-testid=report-status]').textContent(), /報告を保存しました/);
  assert.match(await page.locator('[data-testid=reported]').textContent(), /報告済み/);
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('dop:v1:reports')));
  assert.equal(saved.reports[0].id, 'q-1.4-0001');
  assert.equal(saved.reports[0].kind, 'answer');
  assert.deepEqual(errors, []);
  await page.close();
});

test('A-0006 AC4 GitHub に送るは issue の下書きを新しいタブで開くリンク', async () => {
  const { page } = await openPage(browser, server.url, { data: DATA });
  await openReport(page);
  await page.getByLabel('問題文がおかしい').check();
  await page.getByLabel('コメント').fill('test');
  const link = page.getByRole('link', { name: 'GitHub に送る' });
  const href = new URL(await link.getAttribute('href'));
  assert.equal(href.pathname, '/AmefuriTell/amayadori/issues/new');
  assert.match(href.searchParams.get('body'), /問題文がおかしい/);
  assert.match(href.searchParams.get('body'), /test/);
  assert.equal(await link.getAttribute('target'), '_blank');
  assert.match(await link.getAttribute('rel'), /noopener/);
  await page.close();
});

test('A-0006 AC5 localStorage が使えなくても欄は開け、GitHub に送れる', async () => {
  const init = () => {
    const boom = () => { throw new Error('denied'); };
    Storage.prototype.getItem = boom; Storage.prototype.setItem = boom; Storage.prototype.removeItem = boom;
  };
  const { page, errors } = await openPage(browser, server.url, { data: DATA, init });
  await openReport(page);
  await page.getByLabel('その他').check();
  await page.getByRole('button', { name: '保存' }).click();
  assert.match(await page.locator('[data-testid=report-status]').textContent(), /端末に残せません/);
  assert.equal(await page.getByRole('link', { name: 'GitHub に送る' }).count(), 1);
  assert.deepEqual(errors, []);
  await page.close();
});

for (const width of [375, 1280]) {
  test(`A-0006 AC6 報告の欄が幅 ${width} で横に溢れない`, async () => {
    const { page } = await openPage(browser, server.url, { width, data: DATA });
    await openReport(page);
    await page.getByLabel('コメント').waitFor();
    assert.equal(await overflowX(page), false);
    await shot(page, `A-0006-report-${width}`);
    await page.close();
  });
}
