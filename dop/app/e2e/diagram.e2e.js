import test from 'node:test';
import assert from 'node:assert/strict';
import { startServer, launch, openPage, shot, overflowX } from './helpers.js';
import { DATA, GLOSSARY, DIAGRAM_SVG, DATA_WITH_DIAGRAM } from './fixtures.js';

let server;
let browser;
test.before(async () => { server = await startServer(); browser = await launch(); });
test.after(async () => { await browser?.close(); await server?.close(); });

async function routeDiagram(page, body) {
  await page.route('**/public/diagrams/*.svg', (route) => (body === null
    ? route.fulfill({ status: 404, body: 'not found' })
    : route.fulfill({ status: 200, contentType: 'image/svg+xml', body })));
}

async function answerFirst(page) {
  await page.locator('[data-testid=choice] input').nth(1).check();
  await page.getByRole('button', { name: '答える' }).click();
}

test('A-0014 AC2 答えた後に構成図を出し、図の無い問題では出さない', async () => {
  const { page, errors } = await openPage(browser, server.url, { data: DATA_WITH_DIAGRAM, glossary: GLOSSARY });
  await routeDiagram(page, DIAGRAM_SVG);
  await page.reload();
  await page.locator('[data-testid=stem]').waitFor();
  assert.equal(await page.locator('[data-testid=diagram]').count(), 0);
  await answerFirst(page);
  await page.locator('[data-testid=diagram] [role=img] > svg').waitFor();
  assert.match(await page.locator('[data-testid=diagram]').textContent(), /構成図/);
  assert.equal(await page.locator('[data-testid=diagram] [role=img]').getAttribute('aria-label'), '1 問目の構成図の説明。CodeDeploy で配る。');
  await page.getByRole('button', { name: '次へ' }).click();
  await page.locator('[data-testid=choice] input').nth(0).check();
  await page.locator('[data-testid=choice] input').nth(3).check();
  await page.getByRole('button', { name: '答える' }).click();
  await page.locator('[data-testid=verdict]').waitFor();
  assert.equal(await page.locator('[data-testid=diagram]').count(), 0);
  assert.deepEqual(errors, []);
  await page.close();
});

test('A-0014 AC3 図の箱を押すと事典が開き、事典に無い箱では何も起きない', async () => {
  const { page, errors } = await openPage(browser, server.url, { data: DATA_WITH_DIAGRAM, glossary: GLOSSARY });
  await routeDiagram(page, DIAGRAM_SVG);
  await page.reload();
  await answerFirst(page);
  await page.locator('[data-testid=diagram] [role=img] > svg').waitFor();
  await page.locator('[data-service="AWS Unknown"]').click();
  assert.equal(await page.locator('[data-testid=glossary-dialog]').isVisible(), false);
  await page.locator('[data-service="AWS CodeDeploy"]').click();
  const dlg = page.locator('[data-testid=glossary-dialog]');
  assert.equal(await dlg.isVisible(), true);
  assert.match(await dlg.textContent(), /アプリの新しい版をサーバーへ自動で配る/);
  assert.deepEqual(errors, []);
  await page.close();
});

for (const width of [375, 1280]) {
  test(`A-0014 AC4 図が取れなくても解け、図があっても幅 ${width} で溢れない`, async () => {
    const { page: none, errors } = await openPage(browser, server.url, { width, data: DATA_WITH_DIAGRAM, glossary: GLOSSARY });
    await routeDiagram(none, null);
    await none.reload();
    await answerFirst(none);
    await none.waitForTimeout(300);
    assert.equal(await none.locator('[data-testid=diagram]').count(), 0);
    assert.deepEqual(errors.filter((e) => !/404|Failed to load resource/.test(e)), []);
    await none.close();

    const { page } = await openPage(browser, server.url, { width, data: DATA_WITH_DIAGRAM, glossary: GLOSSARY });
    await routeDiagram(page, DIAGRAM_SVG);
    await page.reload();
    await answerFirst(page);
    await page.locator('[data-testid=diagram] [role=img] > svg').waitFor();
    assert.equal(await overflowX(page), false);
    // 図の中のアイコン（入れ子の svg）は小さいまま（図全体の幅に広げない）
    const icon = (await page.locator('[data-testid=icon]').boundingBox()).width;
    const whole = (await page.locator('[data-testid=diagram] [role=img] > svg').boundingBox()).width;
    assert.ok(icon / whole < 0.2, `アイコン ${icon} / 図 ${whole}`);
    await page.locator('[data-testid=diagram]').scrollIntoViewIfNeeded();
    await shot(page, `A-0014-diagram-${width}`);
    await page.close();
  });
}
