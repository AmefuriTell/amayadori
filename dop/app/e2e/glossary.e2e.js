import test from 'node:test';
import assert from 'node:assert/strict';
import { startServer, launch, openPage, shot, overflowX } from './helpers.js';
import { DATA, GLOSSARY } from './fixtures.js';

let server;
let browser;
test.before(async () => { server = await startServer(); browser = await launch(); });
test.after(async () => { await browser?.close(); await server?.close(); });

const withMissing = { ...DATA, questions: DATA.questions.map((q, i) => (i === 0 ? { ...q, services: ['AWS CodeDeploy', 'AWS Unknown'] } : q)) };

test('A-0013 AC2 サービス名から事典のページを開き、閉じても選んだ物は変わらない', async () => {
  const { page, errors } = await openPage(browser, server.url, { data: withMissing, glossary: GLOSSARY });
  await page.locator('[data-testid=service]').first().waitFor();
  assert.equal(await page.locator('[data-testid=service]').count(), 1); // 事典に無い名前はボタンにしない
  assert.match(await page.locator('.meta').textContent(), /AWS Unknown/);
  await page.locator('[data-testid=choice] input').nth(2).check();
  await page.getByRole('button', { name: 'AWS CodeDeploy' }).click();
  const dlg = page.locator('[data-testid=glossary-dialog]');
  assert.equal(await dlg.isVisible(), true);
  const text = await dlg.textContent();
  for (const s of ['コードデプロイ', 'アプリの新しい版', '主な機能', 'Blue/Green', '試験のポイント', '似たサービスとの違い', 'AWS CodePipeline']) assert.ok(text.includes(s), s);
  assert.equal(await dlg.locator('a[href^="https://docs.aws.amazon.com/"]').count(), 1);
  await page.getByRole('button', { name: '閉じる' }).click();
  assert.equal(await dlg.isVisible(), false);
  assert.equal(await page.locator('[data-testid=choice] input').nth(2).isChecked(), true);
  await page.getByRole('button', { name: '答える' }).click();
  await page.getByRole('button', { name: 'AWS CodeDeploy' }).click(); // 答えた後も開ける
  assert.equal(await dlg.isVisible(), true);
  assert.deepEqual(errors, []);
  await page.close();
});

test('A-0013 AC3 「事典」で全ページを名前の順に出し、押すと開く', async () => {
  const { page, errors } = await openPage(browser, server.url, { data: DATA, glossary: GLOSSARY });
  await page.locator('[data-testid=stem]').waitFor();
  await page.getByRole('button', { name: '事典', exact: true }).click();
  const names = await page.locator('[data-testid=glossary] .svc').allTextContents();
  assert.deepEqual(names, ['Amazon S3', 'AWS CodeDeploy']);
  await page.getByRole('button', { name: 'Amazon S3' }).click();
  assert.match(await page.locator('[data-testid=glossary-dialog]').textContent(), /データを保存するサービス/);
  assert.deepEqual(errors, []);
  await page.close();
});

for (const width of [375, 1280]) {
  test(`A-0013 AC4 事典が無くても解け、開いた状態で幅 ${width} で溢れない`, async () => {
    const { page: none, errors } = await openPage(browser, server.url, { width, data: DATA, glossary: null });
    await none.locator('[data-testid=stem]').waitFor();
    assert.equal(await none.locator('[data-testid=service]').count(), 0);
    await none.getByRole('button', { name: '事典', exact: true }).click();
    assert.match(await none.locator('[data-testid=glossary-empty]').textContent(), /まだありません/);
    assert.deepEqual(errors.filter((e) => !/404|Failed to load resource/.test(e)), []);
    await none.close();

    const { page } = await openPage(browser, server.url, { width, data: DATA, glossary: GLOSSARY });
    await page.getByRole('button', { name: 'AWS CodeDeploy' }).click();
    assert.equal(await overflowX(page), false);
    await shot(page, `A-0013-glossary-${width}`);
    await page.close();
  });
}
