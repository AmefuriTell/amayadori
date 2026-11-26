import test from 'node:test';
import assert from 'node:assert/strict';
import { startServer, launch, openPage, shot, overflowX } from './helpers.js';
import { DATA } from './fixtures.js';

let server;
let browser;
test.before(async () => { server = await startServer(); browser = await launch(); });
test.after(async () => { await browser?.close(); await server?.close(); });

const records = (page) => page.evaluate(() => JSON.parse(localStorage.getItem('dop:v1:answers') ?? '{"answers":[]}').answers);
const openMock = async (page) => {
  await page.locator('[data-testid=stem]').waitFor();
  await page.getByRole('button', { name: '模試', exact: true }).click();
};

test('A-0003 AC2 説明から始め、次へ・前へで動き、途中では正誤を出さない', async () => {
  const { page, errors } = await openPage(browser, server.url, { data: DATA });
  await openMock(page);
  const intro = await page.locator('[data-testid=mock-start]').textContent();
  assert.match(intro, /3 問/);
  assert.match(intro, /180 分/);
  assert.match(intro, /換算点/);
  await page.getByRole('button', { name: '開始' }).click();
  assert.match(await page.locator('[data-testid=progress]').textContent(), /1\s*\/\s*3/);
  assert.match(await page.locator('[data-testid=mock-time]').textContent(), /残り [23]:\d\d:\d\d/);
  await page.locator('[data-testid=choice] input').nth(0).check();
  await page.getByRole('button', { name: '次へ' }).click();
  assert.match(await page.locator('[data-testid=progress]').textContent(), /2\s*\/\s*3/);
  await page.getByRole('button', { name: '前へ' }).click();
  assert.equal(await page.locator('[data-testid=choice] input').nth(0).isChecked(), true);
  assert.equal(await page.locator('[data-testid=verdict]').count(), 0);
  assert.equal(await page.locator('[data-testid=explain-item]').count(), 0);
  assert.deepEqual(errors, []);
  await page.close();
});

test('A-0003 AC3 終えると結果と間違えた問題の解説、記録に足す。読み込み直しても続き、時間切れで自動で終える', async () => {
  const context = await browser.newContext();
  const { page, errors } = await openPage(browser, server.url, { data: DATA, context });
  page.on('dialog', (d) => d.accept());
  await openMock(page);
  await page.getByRole('button', { name: '開始' }).click();
  await page.locator('[data-testid=choice] input').nth(0).check();
  await page.getByRole('button', { name: '次へ' }).click();
  await page.reload();
  await page.getByRole('button', { name: '模試', exact: true }).click();
  assert.match(await page.locator('[data-testid=progress]').textContent(), /2\s*\/\s*3/);
  await page.getByRole('button', { name: '終える' }).click();
  const result = page.locator('[data-testid=mock-result]');
  await result.waitFor();
  assert.match(await result.textContent(), /3 問中 [0-3] 問 正解（\d+%）/);
  assert.ok(await result.locator('tbody tr').count() >= 1);
  const wrong = page.locator('[data-testid=mock-wrong]');
  assert.ok(await wrong.count() >= 2); // 2 問は答えていない
  await wrong.first().locator('summary').click();
  assert.match(await wrong.first().textContent(), /正解 [A-E]/);
  assert.match(await wrong.first().textContent(), /要約 \d/);
  const rec = await records(page);
  assert.equal(rec.length, 3);
  assert.ok(rec.every((r) => r.mock === true));
  assert.equal(rec.filter((r) => r.skipped).length, 2);
  assert.deepEqual(errors, []);

  // 時間切れ: 締め切りを過去にして読み込み直すと、自動で結果になる
  await page.getByRole('button', { name: 'もう一度（新しい模試）' }).click();
  await page.getByRole('button', { name: '開始' }).click();
  await page.evaluate(() => { const m = JSON.parse(localStorage.getItem('dop:v1:mock')); m.deadline = Date.now() - 1000; localStorage.setItem('dop:v1:mock', JSON.stringify(m)); });
  await page.reload();
  await page.getByRole('button', { name: '模試', exact: true }).click();
  await page.locator('[data-testid=mock-result]').waitFor();
  assert.equal((await records(page)).length, 6);
  await context.close();
});

for (const width of [375, 1280]) {
  test(`A-0003 AC4 模試の途中と結果が幅 ${width} で溢れない`, async () => {
    const { page } = await openPage(browser, server.url, { width, data: DATA });
    page.on('dialog', (d) => d.accept());
    await openMock(page);
    await page.getByRole('button', { name: '開始' }).click();
    assert.equal(await overflowX(page), false);
    await shot(page, `A-0003-mock-${width}`);
    await page.getByRole('button', { name: '終える' }).click();
    await page.locator('[data-testid=mock-result]').waitFor();
    await page.locator('[data-testid=mock-wrong] summary').first().click();
    assert.equal(await overflowX(page), false);
    await shot(page, `A-0003-result-${width}`);
    await page.close();
  });
}
