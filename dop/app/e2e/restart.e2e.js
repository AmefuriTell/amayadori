import test from 'node:test';
import assert from 'node:assert/strict';
import { startServer, launch, openPage, shot, overflowX } from './helpers.js';
import { DATA } from './fixtures.js';

let server;
let browser;
test.before(async () => { server = await startServer(); browser = await launch(); });
test.after(async () => { await browser?.close(); await server?.close(); });

const qid = (page) => page.locator('[data-testid=qid]').textContent();
const records = (page) => page.evaluate(() => localStorage.getItem('dop:v1:answers'));
const answerFirst = async (page) => {
  await page.locator('[data-testid=choice] input').nth(1).check();
  await page.getByRole('button', { name: '答える' }).click();
  await page.getByRole('button', { name: '次へ' }).click();
  await page.locator('[data-testid=choice] input').nth(0).check();
};

test('A-0016 AC1 「最初から」で確認して OK なら 1 問目の答える前に戻り、読み込み直しても 1 問目', async () => {
  const context = await browser.newContext();
  const { page, errors } = await openPage(browser, server.url, { data: DATA, context });
  await answerFirst(page);
  assert.equal(await qid(page), 'q-1.4-0002');
  page.once('dialog', (d) => d.accept());
  await page.locator('[data-testid=restart]').click();
  assert.equal(await qid(page), 'q-1.4-0001');
  assert.equal(await page.locator('[data-testid=verdict]').count(), 0);
  assert.equal(await page.locator('[data-testid=choice] input:checked').count(), 0);
  assert.match(await page.locator('[data-testid=progress]').textContent(), /1\s*\/\s*3/);
  await page.reload();
  assert.equal(await qid(page), 'q-1.4-0001');
  assert.deepEqual(errors, []);
  await context.close();
});

test('A-0016 AC2 確認でキャンセルなら位置も選んだ物も変わらない', async () => {
  const { page, errors } = await openPage(browser, server.url, { data: DATA });
  await answerFirst(page);
  page.once('dialog', (d) => d.dismiss());
  await page.locator('[data-testid=restart]').click();
  assert.equal(await qid(page), 'q-1.4-0002');
  assert.equal(await page.locator('[data-testid=choice] input').nth(0).isChecked(), true);
  assert.deepEqual(errors, []);
  await page.close();
});

test('A-0016 AC3 最初に戻しても記録は変わらない', async () => {
  const { page, errors } = await openPage(browser, server.url, { data: DATA });
  await answerFirst(page);
  const before = await records(page);
  assert.ok(before && JSON.parse(before).answers.length === 1);
  page.once('dialog', (d) => d.accept());
  await page.locator('[data-testid=restart]').click();
  assert.equal(await records(page), before);
  assert.deepEqual(errors, []);
  await page.close();
});

test('A-0016 AC4 解き直しの最中は、解き直しのままその 1 問目に戻る', async () => {
  const init = () => localStorage.setItem('dop:v1:retry', JSON.stringify({ ids: ['q-1.4-0002', 'q-1.4-0003'] }));
  const { page, errors } = await openPage(browser, server.url, { data: DATA, init });
  assert.equal(await qid(page), 'q-1.4-0002');
  await page.getByRole('button', { name: '分からない' }).click();
  await page.getByRole('button', { name: '次へ' }).click();
  assert.equal(await qid(page), 'q-1.4-0003');
  page.once('dialog', (d) => d.accept());
  await page.locator('[data-testid=restart]').click();
  assert.equal(await qid(page), 'q-1.4-0002');
  assert.equal(await page.locator('[data-testid=retry-bar]').count(), 1);
  assert.match(await page.locator('[data-testid=progress]').textContent(), /1\s*\/\s*2/);
  assert.deepEqual(errors, []);
  await page.close();
});

test('A-0016 AC5 1 問目の答える前は押せず、幅 375px で横に溢れない', async () => {
  const { page, errors } = await openPage(browser, server.url, { data: DATA, width: 375, height: 800 });
  assert.equal(await page.locator('[data-testid=restart]').isDisabled(), true);
  await answerFirst(page);
  assert.equal(await page.locator('[data-testid=restart]').isDisabled(), false);
  assert.equal(await overflowX(page), false);
  await shot(page, 'A-0016-restart-375');
  assert.deepEqual(errors, []);
  await page.close();
});
