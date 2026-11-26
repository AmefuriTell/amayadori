import test from 'node:test';
import assert from 'node:assert/strict';
import { startServer, launch, openPage, shot, overflowX } from './helpers.js';
import { DATA } from './fixtures.js';

let server;
let browser;
test.before(async () => { server = await startServer(); browser = await launch(); });
test.after(async () => { await browser?.close(); await server?.close(); });

const stem = (page) => page.locator('[data-testid=stem]').textContent();
// 1 問目は不正解（A）、2 問目は「分からない」、3 問目は正解（C）
async function answerThree(page) {
  await page.locator('[data-testid=choice] input').nth(0).check();
  await page.getByRole('button', { name: '答える' }).click();
  await page.getByRole('button', { name: '次へ' }).click();
  await page.getByRole('button', { name: '分からない' }).click();
  await page.getByRole('button', { name: '次へ' }).click();
  await page.locator('[data-testid=choice] input').nth(2).check();
  await page.getByRole('button', { name: '答える' }).click();
}

test('A-0004 AC2 0 問なら押せず、間違えた 2 問だけを解き直す', async () => {
  const { page, errors } = await openPage(browser, server.url, { data: DATA });
  await page.locator('[data-testid=stem]').waitFor();
  await page.getByRole('button', { name: '記録', exact: true }).click();
  assert.equal(await page.locator('[data-testid=retry-start]').isDisabled(), true);
  assert.match(await page.locator('[data-testid=retry-hint]').textContent(), /まだありません/);
  await page.getByRole('button', { name: '解く', exact: true }).click();
  await answerThree(page);
  await page.getByRole('button', { name: '記録', exact: true }).click();
  await page.getByRole('button', { name: '間違えた問題を解き直す（2 問）' }).click();
  assert.match(await page.locator('[data-testid=progress]').textContent(), /1\s*\/\s*2/);
  assert.match(await page.locator('[data-testid=retry-bar]').textContent(), /間違えた問題だけ（2 問）/);
  assert.match(await stem(page), /1 問目/);
  assert.deepEqual(errors, []);
  await page.close();
});

test('A-0004 AC3 途中で正解しても一覧は変わらず、読み込み直しても続き、やめると全部に戻る', async () => {
  const context = await browser.newContext();
  const { page } = await openPage(browser, server.url, { data: DATA, context });
  await page.locator('[data-testid=stem]').waitFor();
  await answerThree(page);
  await page.getByRole('button', { name: '記録', exact: true }).click();
  await page.getByRole('button', { name: '間違えた問題を解き直す（2 問）' }).click();
  await page.locator('[data-testid=choice] input').nth(1).check(); // 今度は正解（B）
  await page.getByRole('button', { name: '答える' }).click();
  await page.getByRole('button', { name: '次へ' }).click();
  assert.match(await page.locator('[data-testid=progress]').textContent(), /2\s*\/\s*2/);
  assert.match(await stem(page), /2 問目/);
  await page.reload();
  assert.match(await page.locator('[data-testid=retry-bar]').textContent(), /（2 問）/);
  assert.match(await page.locator('[data-testid=progress]').textContent(), /2\s*\/\s*2/);
  await page.getByRole('button', { name: 'やめる' }).click();
  assert.equal(await page.locator('[data-testid=retry-bar]').count(), 0);
  assert.match(await page.locator('[data-testid=progress]').textContent(), /2\s*\/\s*3/);
  // 記録の正答率の表は全部の問題で数える
  await page.getByRole('button', { name: '記録', exact: true }).click();
  assert.match(await page.locator('[data-testid=retry-start]').textContent(), /（1 問）/);
  await context.close();
});

for (const width of [375, 1280]) {
  test(`A-0004 AC4 解き直しの画面と記録のボタンが幅 ${width} で溢れない`, async () => {
    const { page } = await openPage(browser, server.url, { width, data: DATA });
    await page.locator('[data-testid=stem]').waitFor();
    await answerThree(page);
    await page.getByRole('button', { name: '記録', exact: true }).click();
    assert.equal(await overflowX(page), false);
    await page.getByRole('button', { name: /間違えた問題を解き直す/ }).click();
    assert.equal(await overflowX(page), false);
    await shot(page, `A-0004-retry-${width}`);
    await page.close();
  });
}
