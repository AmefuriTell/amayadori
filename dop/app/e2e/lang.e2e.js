import test from 'node:test';
import assert from 'node:assert/strict';
import { startServer, launch, openPage, shot, overflowX } from './helpers.js';
import { DATA } from './fixtures.js';

let server;
let browser;
test.before(async () => { server = await startServer(); browser = await launch(); });
test.after(async () => { await browser?.close(); await server?.close(); });

const stem = (page) => page.locator('[data-testid=stem]').textContent();

test('A-0008 AC2 はじめは日本語。English で英語に変わり、選んだ物は残る', async () => {
  const { page, errors } = await openPage(browser, server.url, { data: DATA });
  assert.match(await stem(page), /1 問目の問題文/);
  assert.match(await page.locator('[data-testid=choice]').nth(0).textContent(), /選択肢 A/);
  await page.locator('[data-testid=choice] input').nth(2).check();
  await page.getByRole('button', { name: 'English' }).click();
  assert.match(await stem(page), /First question stem/);
  assert.equal(await page.locator('[data-testid=choice] input').nth(2).isChecked(), true);
  await page.getByRole('button', { name: '日本語' }).click();
  assert.match(await stem(page), /1 問目の問題文/);
  assert.deepEqual(errors, []);
  await page.close();
});

test('A-0008 AC3 選んだ言葉は読み込み直しても残る', async () => {
  const { page } = await openPage(browser, server.url, { data: DATA });
  await page.getByRole('button', { name: 'English' }).click();
  await page.reload();
  assert.match(await stem(page), /First question stem/);
  await page.close();
});

for (const width of [375, 1280]) {
  test(`A-0008 AC4 日本語版の無い問題は英語で出し、その旨を出す（幅 ${width}）`, async () => {
    const { page } = await openPage(browser, server.url, { width, data: { ...DATA, questions: [DATA.questions[2], DATA.questions[0]] } });
    assert.match(await stem(page), /Third question stem/);
    assert.match(await page.locator('[data-testid=no-ja]').textContent(), /日本語版はまだありません/);
    assert.equal(await overflowX(page), false);
    await shot(page, `A-0008-no-ja-${width}`);
    await page.getByRole('button', { name: '答える' }).isVisible();
    await page.locator('[data-testid=choice] input').nth(0).check();
    await page.getByRole('button', { name: '答える' }).click();
    await page.getByRole('button', { name: '次へ' }).click();
    assert.match(await stem(page), /1 問目の問題文/);
    assert.equal(await overflowX(page), false);
    await shot(page, `A-0008-ja-${width}`);
    await page.close();
  });
}
