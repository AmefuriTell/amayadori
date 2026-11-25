import test from 'node:test';
import assert from 'node:assert/strict';
import { startServer, launch, openPage, shot, overflowX } from './helpers.js';
import { DATA } from './fixtures.js';

let server;
let browser;
test.before(async () => { server = await startServer(); browser = await launch(); });
test.after(async () => { await browser?.close(); await server?.close(); });

// 本物の声は出さず、読んだ物を window.__spoken に記録する
const FAKE = () => {
  window.__spoken = [];
  window.SpeechSynthesisUtterance = class { constructor(text) { this.text = text; } };
  Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: {
    cancel() { window.__spoken.push({ cancel: true }); },
    speak(u) { window.__spoken.push({ text: u.text, lang: u.lang, rate: u.rate }); },
    getVoices() { return []; },
  } });
};
const NONE = () => { Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: undefined }); };
const spoken = (page) => page.evaluate(() => window.__spoken);
const texts = async (page) => (await spoken(page)).filter((s) => s.text).map((s) => s.text);
const clear = (page) => page.evaluate(() => { window.__spoken.length = 0; });

test('A-0009 AC2 オンにするとすぐ読み、次へ・答えで読み、選ぶだけでは読まない', async () => {
  const { page, errors } = await openPage(browser, server.url, { data: DATA, init: FAKE });
  await page.locator('[data-testid=stem]').waitFor();
  assert.deepEqual(await texts(page), []);
  await page.getByRole('button', { name: '読み上げ' }).click();
  const first = await texts(page);
  assert.match(first[0], /1 問目の問題文/);
  assert.match(first[1], /^選択肢 A。/);
  assert.equal(first.length, 5);

  await clear(page);
  await page.locator('[data-testid=choice] input').nth(1).check();
  assert.deepEqual(await texts(page), []); // 選ぶだけでは読まない
  await page.getByRole('button', { name: '答える' }).click();
  assert.match((await texts(page))[0], /^正解。正解は B。要約 1/);

  await clear(page);
  await page.getByRole('button', { name: 'もう一度' }).click();
  assert.match((await texts(page))[0], /^正解。/);

  await clear(page);
  await page.getByRole('button', { name: '次へ' }).click();
  const log = await spoken(page);
  assert.equal(log[0].cancel, true); // 前の読み上げを止めてから
  assert.match(log[1].text, /2 問目の問題文/);
  assert.deepEqual(errors, []);
  await page.close();
});

test('A-0009 AC3 オフでは読まず、設定は残り、速さと言葉が使われる', async () => {
  const context = await browser.newContext();
  const { page } = await openPage(browser, server.url, { data: DATA, init: FAKE, context });
  await page.locator('[data-testid=stem]').waitFor();
  await page.locator('[data-testid=choice] input').nth(0).check();
  await page.getByRole('button', { name: '答える' }).click();
  assert.deepEqual(await texts(page), []); // オフ

  await page.getByRole('button', { name: '読み上げ' }).click();
  await page.getByLabel('読み上げの速さ').selectOption('1.5');
  await page.getByRole('button', { name: 'English' }).click();
  await page.reload();
  await page.locator('[data-testid=stem]').waitFor();
  assert.equal(await page.getByRole('button', { name: '読み上げ オン' }).getAttribute('aria-pressed'), 'true');
  // 読み込み直した直後も、続きの段（答えた後なので解説、日本語）を読もうとする（iPhone はタップ前の読み上げを黙って捨てるので、その時は「もう一度」で読む）
  const resumed = (await spoken(page)).filter((s) => s.text);
  assert.match(resumed[0].text, /^(正解|不正解)。/);
  assert.equal(resumed[0].lang, 'ja-JP');
  await clear(page);
  await page.getByRole('button', { name: '次へ' }).click();
  const after = (await spoken(page)).filter((s) => s.text);
  assert.match(after[0].text, /Second question stem/);
  assert.equal(after[0].lang, 'en-US');
  assert.equal(after[0].rate, 1.5);
  await page.getByRole('button', { name: '読み上げ オン' }).click(); // オフ
  await clear(page);
  await page.locator('[data-testid=choice] input').nth(0).check();
  await page.locator('[data-testid=choice] input').nth(3).check();
  await page.getByRole('button', { name: '答える' }).click();
  assert.deepEqual(await texts(page), []);
  await context.close();
});

test('A-0009 AC4 読み上げの無いブラウザでは押せず、理由を出す', async () => {
  const { page, errors } = await openPage(browser, server.url, { data: DATA, init: NONE });
  await page.locator('[data-testid=stem]').waitFor();
  assert.equal(await page.getByRole('button', { name: '読み上げ' }).isDisabled(), true);
  assert.match(await page.locator('[data-testid=speech-hint]').textContent(), /対応していません/);
  assert.deepEqual(errors, []);
  await page.close();
});

for (const width of [375, 1280]) {
  test(`A-0009 AC4 読み上げの欄があっても幅 ${width} で横に溢れない`, async () => {
    const { page } = await openPage(browser, server.url, { width, data: DATA, init: FAKE });
    await page.getByRole('button', { name: '読み上げ' }).click();
    assert.equal(await overflowX(page), false);
    await shot(page, `A-0009-speech-${width}`);
    await page.close();
  });
}
