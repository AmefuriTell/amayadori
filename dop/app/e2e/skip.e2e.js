import test from 'node:test';
import assert from 'node:assert/strict';
import { startServer, launch, openPage, shot, overflowX } from './helpers.js';
import { DATA } from './fixtures.js';

let server;
let browser;
test.before(async () => { server = await startServer(); browser = await launch(); });
test.after(async () => { await browser?.close(); await server?.close(); });

const records = (page) => page.evaluate(() => JSON.parse(localStorage.getItem('dop:v1:answers') ?? '{"answers":[]}').answers);
const FAKE = () => {
  window.__spoken = [];
  window.SpeechSynthesisUtterance = class { constructor(text) { this.text = text; } };
  Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: {
    cancel() {}, speak(u) { window.__spoken.push(u.text); }, getVoices() { return []; },
  } });
};

test('A-0012 AC2 選ばずに「分からない」で、正解と解説が出て記録が 1 件増える', async () => {
  const { page, errors } = await openPage(browser, server.url, { data: DATA });
  await page.locator('[data-testid=stem]').waitFor();
  assert.equal(await page.getByRole('button', { name: '答える' }).isDisabled(), true);
  await page.getByRole('button', { name: '分からない' }).click();
  assert.match(await page.locator('[data-testid=verdict]').textContent(), /^分からない（正解は B）/);
  assert.equal(await page.locator('[data-testid=explain-item]').count(), 4);
  assert.equal(await page.locator('[data-testid=reference]').count(), 1);
  assert.equal(await page.locator('[data-testid=choice] input').nth(0).isDisabled(), true);
  const rec = await records(page);
  assert.equal(rec.length, 1);
  assert.deepEqual({ ...rec[0], at: 0 }, { id: 'q-1.4-0001', task: '1.4', domain: 1, selected: [], correct: false, skipped: true, at: 0 });
  assert.deepEqual(errors, []);
  await page.close();
});

test('A-0012 AC3 選んだ後でも無回答として扱い、読み上げは「分からない」と読む', async () => {
  const { page } = await openPage(browser, server.url, { data: DATA, init: FAKE });
  await page.getByRole('button', { name: '読み上げ' }).click();
  await page.locator('[data-testid=choice] input').nth(1).check();
  await page.getByRole('button', { name: '分からない' }).click();
  const rec = await records(page);
  assert.deepEqual(rec[0].selected, []);
  assert.equal(rec[0].correct, false);
  const spoken = await page.evaluate(() => window.__spoken);
  assert.match(spoken.at(-1), /^分からない。正解は B。/);
  await page.close();
});

for (const width of [375, 1280]) {
  test(`A-0012 AC4 「答える」と「分からない」が幅 ${width} で溢れない`, async () => {
    const { page } = await openPage(browser, server.url, { width, data: DATA });
    await page.locator('[data-testid=skip]').waitFor();
    assert.equal(await overflowX(page), false);
    await page.locator('[data-testid=skip]').scrollIntoViewIfNeeded();
    await shot(page, `A-0012-skip-${width}`);
    await page.close();
  });
}
