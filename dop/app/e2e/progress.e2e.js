import test from 'node:test';
import assert from 'node:assert/strict';
import { startServer, launch, openPage, shot, overflowX } from './helpers.js';
import { DATA } from './fixtures.js';

let server;
let browser;
test.before(async () => { server = await startServer(); browser = await launch(); });
test.after(async () => { await browser?.close(); await server?.close(); });

const stem = (page) => page.locator('[data-testid=stem]').textContent();
const records = (page) => page.evaluate(() => JSON.parse(localStorage.getItem('dop:v1:answers') ?? '{"answers":[]}'));

test('A-0010 AC2 読み込み直すと、選んだ状態・答えた画面のまま続く', async () => {
  const context = await browser.newContext();
  const { page, errors } = await openPage(browser, server.url, { data: DATA, context });
  await page.locator('[data-testid=choice] input').nth(1).check();
  await page.getByRole('button', { name: '答える' }).click();
  await page.getByRole('button', { name: '次へ' }).click();
  await page.locator('[data-testid=choice] input').nth(0).check();
  await page.reload();
  assert.match(await stem(page), /2 問目の問題文/);
  assert.equal(await page.locator('[data-testid=choice] input').nth(0).isChecked(), true);
  assert.match(await page.locator('[data-testid=progress]').textContent(), /2\s*\/\s*3/);

  await page.locator('[data-testid=choice] input').nth(3).check();
  await page.getByRole('button', { name: '答える' }).click();
  const before = JSON.stringify(await records(page));
  await page.reload();
  assert.match(await page.locator('[data-testid=verdict]').textContent(), /正解|不正解/);
  assert.equal(JSON.stringify(await records(page)), before); // 答えは増えない
  assert.equal(await overflowX(page), false);
  await shot(page, 'A-0010-resumed-1280');
  assert.deepEqual(errors, []);
  await context.close();
});

test('A-0010 AC3 結果の画面で読み込み直すと結果、もう一度で 1 問目に戻る', async () => {
  const context = await browser.newContext();
  const { page } = await openPage(browser, server.url, { data: DATA, context });
  const picks = [[1], [0, 3], [2]];
  for (const p of picks) {
    for (const i of p) await page.locator('[data-testid=choice] input').nth(i).check();
    await page.getByRole('button', { name: '答える' }).click();
    await page.getByRole('button', { name: /次へ|結果を見る/ }).click();
  }
  assert.match(await page.locator('[data-testid=result]').textContent(), /3 問中 3 問 正解/);
  await page.reload();
  assert.match(await page.locator('[data-testid=result]').textContent(), /3 問中 3 問 正解/);
  await page.getByRole('button', { name: 'もう一度' }).click();
  assert.match(await stem(page), /1 問目の問題文/);
  await page.reload();
  assert.match(await stem(page), /1 問目の問題文/);
  await context.close();
});

test('A-0010 AC4 localStorage が使えなくても 1 問目から解ける', async () => {
  const init = () => {
    const boom = () => { throw new Error('denied'); };
    Storage.prototype.getItem = boom; Storage.prototype.setItem = boom; Storage.prototype.removeItem = boom;
  };
  const { page, errors } = await openPage(browser, server.url, { data: DATA, init });
  assert.match(await stem(page), /1 問目の問題文/);
  await page.locator('[data-testid=choice] input').nth(1).check();
  await page.getByRole('button', { name: '答える' }).click();
  await page.getByRole('button', { name: '次へ' }).click();
  assert.match(await stem(page), /2 問目の問題文/);
  assert.deepEqual(errors, []);
  await page.close();
});
