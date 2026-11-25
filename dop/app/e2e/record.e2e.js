import test from 'node:test';
import assert from 'node:assert/strict';
import { startServer, launch, openPage, shot, overflowX } from './helpers.js';
import { DATA } from './fixtures.js';

let server;
let browser;
test.before(async () => { server = await startServer(); browser = await launch(); });
test.after(async () => { await browser?.close(); await server?.close(); });

async function answerFirst(page, idx) {
  await page.locator('[data-testid=choice] input').nth(idx).check();
  await page.getByRole('button', { name: '答える' }).click();
}

test('A-0002 AC3 答えると記録され、開き直しても残る', async () => {
  const { page, errors } = await openPage(browser, server.url, { data: DATA });
  await answerFirst(page, 1); // 正解
  await page.reload();
  await page.getByRole('button', { name: '記録' }).click();
  const row = page.locator('[data-testid=stats-row][data-domain="1"]');
  assert.match(await row.textContent(), /1\s*\/\s*3/);
  assert.match(await row.textContent(), /100%/);
  assert.deepEqual(errors, []);
  await page.close();
});

test('A-0002 AC4 全ドメインを出し、解いていないものは —、解くに戻れる', async () => {
  const { page } = await openPage(browser, server.url, { data: DATA });
  await page.getByRole('button', { name: '記録' }).click();
  assert.equal(await page.locator('[data-testid=stats-row]').count(), 2);
  const sec = page.locator('[data-testid=stats-row][data-domain="6"]');
  assert.match(await sec.textContent(), /Security and Compliance/);
  assert.match(await sec.textContent(), /—/);
  await page.getByRole('button', { name: '解く' }).click();
  await page.locator('[data-testid=stem]').waitFor();
  await page.close();
});

test('A-0002 AC4 記録を見て戻っても、解いている途中の問題のまま', async () => {
  const { page } = await openPage(browser, server.url, { data: DATA });
  await answerFirst(page, 1);
  await page.getByRole('button', { name: '次へ' }).click();
  await page.getByRole('button', { name: '記録' }).click();
  await page.getByRole('button', { name: '解く' }).click();
  assert.match(await page.locator('[data-testid=progress]').textContent(), /2\s*\/\s*3/);
  await page.close();
});

test('A-0002 AC5 localStorage が使えなくても解け、その旨を出す', async () => {
  const init = () => {
    const boom = () => { throw new Error('denied'); };
    Storage.prototype.getItem = boom; Storage.prototype.setItem = boom; Storage.prototype.removeItem = boom;
  };
  const { page, errors } = await openPage(browser, server.url, { data: DATA, init });
  await answerFirst(page, 1);
  assert.match(await page.locator('[data-testid=verdict]').textContent(), /正解/);
  await page.getByRole('button', { name: '記録' }).click();
  assert.match(await page.locator('[data-testid=storage-note]').textContent(), /記録を残せません/);
  assert.deepEqual(errors, []);
  await page.close();
});

test('A-0002 AC6 記録を消すは確かめてから（取り消せば残る）', async () => {
  const { page } = await openPage(browser, server.url, { data: DATA });
  await answerFirst(page, 1);
  await page.getByRole('button', { name: '記録' }).click();
  page.once('dialog', (d) => d.dismiss());
  await page.getByRole('button', { name: '記録を消す' }).click();
  assert.match(await page.locator('[data-testid=stats-row][data-domain="1"]').textContent(), /1\s*\/\s*3/);
  page.once('dialog', (d) => d.accept());
  await page.getByRole('button', { name: '記録を消す' }).click();
  assert.match(await page.locator('[data-testid=stats-row][data-domain="1"]').textContent(), /0\s*\/\s*3/);
  await page.close();
});

for (const width of [375, 1280]) {
  test(`A-0002 AC7 記録の画面が幅 ${width} で横に溢れない`, async () => {
    const { page } = await openPage(browser, server.url, { width, data: DATA });
    await answerFirst(page, 0);
    await page.getByRole('button', { name: '記録' }).click();
    await page.locator('[data-testid=stats-row]').first().waitFor();
    assert.equal(await overflowX(page), false);
    await shot(page, `A-0002-stats-${width}`);
    await page.close();
  });
}
