import test from 'node:test';
import assert from 'node:assert/strict';
import { startServer, launch, openPage, shot, overflowX } from './helpers.js';
import { DATA } from './fixtures.js';

let server;
let browser;
test.before(async () => { server = await startServer(); browser = await launch(); });
test.after(async () => { await browser?.close(); await server?.close(); });

async function answer(page) {
  await page.locator('[data-testid=choice] input').nth(0).check();
  await page.getByRole('button', { name: '答える' }).click();
}

test('A-0007 AC2 答えた後、解説の後・出典の前に補足を出す', async () => {
  const { page, errors } = await openPage(browser, server.url, { data: DATA });
  await page.locator('[data-testid=stem]').waitFor();
  assert.equal(await page.locator('[data-testid=note]').count(), 0);
  await answer(page);
  const note = page.locator('[data-testid=note]');
  assert.match(await note.textContent(), /補足.*古い名前/);
  const order = await page.evaluate(() => {
    const pos = (s) => [...document.querySelectorAll('*')].indexOf(document.querySelector(s));
    return [pos('.explain'), pos('[data-testid=note]'), pos('.refs')];
  });
  assert.ok(order[0] < order[1] && order[1] < order[2], `order ${order}`);
  assert.deepEqual(errors, []);
  await page.close();
});

test('A-0007 AC3 note の無い問題では補足を出さない', async () => {
  const { page } = await openPage(browser, server.url, { data: DATA });
  await answer(page);
  await page.getByRole('button', { name: '次へ' }).click();
  await page.locator('[data-testid=choice] input').nth(0).check();
  await page.locator('[data-testid=choice] input').nth(1).check();
  await page.getByRole('button', { name: '答える' }).click();
  await page.locator('[data-testid=verdict]').waitFor();
  assert.equal(await page.locator('[data-testid=note]').count(), 0);
  await page.close();
});

for (const width of [375, 1280]) {
  test(`A-0007 AC4 補足があっても幅 ${width} で横に溢れない`, async () => {
    const { page } = await openPage(browser, server.url, { width, data: DATA });
    await answer(page);
    await page.locator('[data-testid=note]').waitFor();
    assert.equal(await overflowX(page), false);
    await page.locator('[data-testid=note]').scrollIntoViewIfNeeded();
    await shot(page, `A-0007-note-${width}`);
    await page.close();
  });
}
