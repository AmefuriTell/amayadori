import test from 'node:test';
import assert from 'node:assert/strict';
import { startServer, launch, openPage, shot, overflowX } from './helpers.js';
import { DATA } from './fixtures.js';

let server;
let browser;
test.before(async () => { server = await startServer(); browser = await launch(); });
test.after(async () => { await browser?.close(); await server?.close(); });

const stem = (page) => page.locator('[data-testid=stem]').textContent();
const qid = (page) => page.locator('[data-testid=qid]').textContent();

test('A-0015 AC1 カードの上の行に今の問題の ID が出る', async () => {
  const { page, errors } = await openPage(browser, server.url, { data: DATA });
  assert.equal(await qid(page), 'q-1.4-0001');
  await page.locator('[data-testid=choice] input').nth(1).check();
  await page.getByRole('button', { name: '答える' }).click();
  await page.getByRole('button', { name: '次へ' }).click();
  assert.equal(await qid(page), 'q-1.4-0002');
  assert.deepEqual(errors, []);
  await page.close();
});

test('A-0015 AC2 ?q= で開くと続きより優先してその問題が答える前の状態で出て、URL から q が消える', async () => {
  const context = await browser.newContext();
  const { page, errors } = await openPage(browser, server.url, { data: DATA, context });
  // 1 問目に答えておく（続きの記録は 1 問目の答えた画面）
  await page.locator('[data-testid=choice] input').nth(1).check();
  await page.getByRole('button', { name: '答える' }).click();
  await page.goto(`${server.url}?q=q-1.4-0003`);
  assert.equal(await qid(page), 'q-1.4-0003');
  assert.match(await stem(page), /Third question stem/);
  assert.equal(await page.locator('[data-testid=verdict]').count(), 0);
  assert.match(await page.locator('[data-testid=progress]').textContent(), /3\s*\/\s*3/);
  assert.equal(new URL(page.url()).searchParams.get('q'), null);
  await page.reload();
  assert.equal(await qid(page), 'q-1.4-0003');
  assert.deepEqual(errors, []);
  await context.close();
});

test('A-0015 AC3 解き直しの最中でも、対象に無い問題の ?q= なら解き直しをやめてその問題を出す', async () => {
  const init = () => localStorage.setItem('dop:v1:retry', JSON.stringify({ ids: ['q-1.4-0001'] }));
  const { page, errors } = await openPage(browser, server.url, { data: DATA, init });
  assert.equal(await page.locator('[data-testid=retry-bar]').count(), 1);
  await page.goto(`${server.url}?q=q-1.4-0002`);
  assert.equal(await qid(page), 'q-1.4-0002');
  assert.equal(await page.locator('[data-testid=retry-bar]').count(), 0);
  assert.match(await page.locator('[data-testid=progress]').textContent(), /2\s*\/\s*3/);
  assert.deepEqual(errors, []);
  await page.close();
});

test('A-0015 AC4 問題集に無い ID なら続きどおりに開き、見つからないと出る', async () => {
  const { page, errors } = await openPage(browser, `${server.url}?q=q-9.9-9999`, { data: DATA });
  assert.equal(await qid(page), 'q-1.4-0001');
  assert.match(await page.locator('[data-testid=qlink-missing]').textContent(), /指定の問題 q-9\.9-9999 は見つかりません/);
  assert.deepEqual(errors, []);
  await page.close();
});

test('A-0015 AC5 幅 375px で横に溢れない', async () => {
  const { page, errors } = await openPage(browser, `${server.url}?q=q-1.4-0002`, { data: DATA, width: 375, height: 800 });
  assert.equal(await qid(page), 'q-1.4-0002');
  assert.equal(await overflowX(page), false);
  await shot(page, 'A-0015-qlink-375');
  await page.close();
  const wide = await openPage(browser, `${server.url}?q=q-9.9-9999`, { data: DATA, width: 375, height: 800 });
  assert.equal(await overflowX(wide.page), false);
  await shot(wide.page, 'A-0015-missing-375');
  assert.deepEqual([...errors, ...wide.errors], []);
  await wide.page.close();
});
