import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { startServer, launch, openPage, shot, overflowX } from './helpers.js';
import { DATA } from './fixtures.js';

let server;
let browser;
test.before(async () => { server = await startServer(); browser = await launch(); });
test.after(async () => { await browser?.close(); await server?.close(); });

async function answerAndReport(page) {
  await page.locator('[data-testid=choice] input').nth(0).check();
  await page.getByRole('button', { name: '答える' }).click();
  await page.getByRole('button', { name: '誤りを報告' }).click();
  await page.getByLabel('コメント').fill('check');
  await page.getByRole('button', { name: '保存' }).click();
}

test('A-0005 AC2 記録を書き出すと、答えと報告の入ったファイルを保存できる', async () => {
  const context = await browser.newContext({ acceptDownloads: true });
  const { page, errors } = await openPage(browser, server.url, { data: DATA, context });
  await answerAndReport(page);
  await page.getByRole('button', { name: '記録', exact: true }).click();
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('button', { name: '記録を書き出す' }).click(),
  ]);
  assert.match(download.suggestedFilename(), /^dop-record-\d{8}-\d{4}\.json$/);
  const data = JSON.parse(fs.readFileSync(await download.path(), 'utf8'));
  assert.equal(data.v, 1);
  assert.equal(data.answers.length, 1);
  assert.equal(data.answers[0].id, 'q-1.4-0001');
  assert.equal(data.reports.length, 1);
  assert.equal(data.reports[0].comment, 'check');
  assert.deepEqual(errors, []);
  await context.close();
});

test('A-0005 AC3 記録が無い時は押せず、理由を出す', async () => {
  const { page } = await openPage(browser, server.url, { data: DATA });
  await page.getByRole('button', { name: '記録', exact: true }).click();
  assert.equal(await page.getByRole('button', { name: '記録を書き出す' }).isDisabled(), true);
  assert.match(await page.locator('[data-testid=export-hint]').textContent(), /まだ記録がありません/);
  await page.close();
});

for (const width of [375, 1280]) {
  test(`A-0005 AC4 書き出しの説明があり、幅 ${width} で横に溢れない`, async () => {
    const { page } = await openPage(browser, server.url, { width, data: DATA });
    await page.locator('[data-testid=choice] input').nth(0).check();
    await page.getByRole('button', { name: '答える' }).click();
    await page.getByRole('button', { name: '記録', exact: true }).click();
    assert.match(await page.locator('[data-testid=export-help]').textContent(), /Claude/);
    assert.equal(await overflowX(page), false);
    await shot(page, `A-0005-export-${width}`);
    await page.close();
  });
}
