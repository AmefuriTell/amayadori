import test from 'node:test';
import assert from 'node:assert/strict';
import { startServer, launch, openPage, shot, overflowX } from './helpers.js';
import { DATA } from './fixtures.js';

let server;
let browser;
test.before(async () => { server = await startServer(); browser = await launch(); });
test.after(async () => { await browser?.close(); await server?.close(); });

test('A-0001 AC1 1 問目と「1 / n」を出し、エラーが無い', async () => {
  const { page, errors } = await openPage(browser, server.url, { data: DATA });
  await page.getByText('1 問目の問題文', { exact: false }).waitFor();
  assert.match(await page.locator('[data-testid=progress]').textContent(), /1\s*\/\s*3/);
  assert.equal(await page.locator('[data-testid=choice]').count(), 4);
  assert.deepEqual(errors, []);
  await page.close();
});

test('A-0001 AC1 本物の questions.json でも開ける', async () => {
  const { page, errors } = await openPage(browser, server.url);
  await page.locator('[data-testid=stem]').waitFor();
  assert.deepEqual(errors, []);
  await page.close();
});

test('A-0001 AC2 答えると正誤・全選択肢の解説・出典が出る', async () => {
  const { page, errors } = await openPage(browser, server.url, { data: DATA });
  await page.locator('[data-testid=choice]').nth(0).click(); // A（不正解）
  await page.getByRole('button', { name: '答える' }).click();
  assert.match(await page.locator('[data-testid=verdict]').textContent(), /不正解/);
  assert.equal(await page.locator('[data-testid=explain-item]').count(), 4);
  assert.equal(await page.locator('[data-testid=explain-item].is-correct').count(), 1);
  assert.match(await page.locator('[data-testid=explain-item].is-correct').textContent(), /解説 B/);
  const link = page.locator('[data-testid=reference] a');
  assert.equal(await link.getAttribute('href'), DATA.questions[0].references[0].url);
  assert.equal(await link.getAttribute('target'), '_blank');
  assert.match(await link.getAttribute('rel'), /noopener/);
  assert.match(await page.locator('[data-testid=reference]').textContent(), /CodeDeploy is a deployment service\./);
  assert.deepEqual(errors, []);
  await page.close();
});

test('A-0001 AC2 正しく選ぶと「正解」', async () => {
  const { page } = await openPage(browser, server.url, { data: DATA });
  await page.locator('[data-testid=choice]').nth(1).click();
  await page.getByRole('button', { name: '答える' }).click();
  assert.match(await page.locator('[data-testid=verdict]').textContent(), /^\s*正解/);
  await page.close();
});

test('A-0001 AC4 複数選ぶ問題は「2 つ選ぶ」、そろうまで押せず、超えて選べない', async () => {
  const { page } = await openPage(browser, server.url, { data: DATA });
  await page.locator('[data-testid=choice]').nth(1).click();
  await page.getByRole('button', { name: '答える' }).click();
  await page.getByRole('button', { name: '次へ' }).click();
  assert.match(await page.locator('[data-testid=select-hint]').textContent(), /2 つ選ぶ/);
  const submit = page.getByRole('button', { name: '答える' });
  assert.equal(await submit.isDisabled(), true);
  const choices = page.locator('[data-testid=choice] input');
  await choices.nth(0).check();
  assert.equal(await submit.isDisabled(), true);
  await choices.nth(3).check();
  assert.equal(await submit.isDisabled(), false);
  assert.equal(await choices.nth(1).isDisabled(), true);
  await submit.click();
  assert.match(await page.locator('[data-testid=verdict]').textContent(), /^\s*正解/);
  await page.close();
});

test('A-0001 AC5 次へで進み、最後に正解の数、もう一度で 1 問目', async () => {
  const { page } = await openPage(browser, server.url, { data: DATA });
  const answer = async (idx) => {
    for (const i of idx) await page.locator('[data-testid=choice] input').nth(i).check();
    await page.getByRole('button', { name: '答える' }).click();
    await page.getByRole('button', { name: /次へ|結果を見る/ }).click();
  };
  await answer([1]);      // 正解
  assert.match(await page.locator('[data-testid=progress]').textContent(), /2\s*\/\s*3/);
  await answer([0, 1]);   // 不正解
  await answer([2]);      // 正解
  assert.match(await page.locator('[data-testid=result]').textContent(), /3 問中 2 問/);
  await page.getByRole('button', { name: 'もう一度' }).click();
  assert.match(await page.locator('[data-testid=progress]').textContent(), /1\s*\/\s*3/);
  await page.close();
});

test('A-0001 AC6 確信が低い問題に印', async () => {
  const { page } = await openPage(browser, server.url, { data: { ...DATA, questions: [DATA.questions[2], DATA.questions[0]] } });
  assert.match(await page.locator('[data-testid=low-confidence]').textContent(), /AI の確信が低い/);
  await page.locator('[data-testid=choice]').nth(2).click();
  await page.getByRole('button', { name: '答える' }).click();
  await page.getByRole('button', { name: '次へ' }).click();
  assert.equal(await page.locator('[data-testid=low-confidence]').count(), 0);
  await page.close();
});

for (const width of [375, 1280]) {
  test(`A-0001 AC7 幅 ${width} で横に溢れない`, async () => {
    const { page } = await openPage(browser, server.url, { width, data: DATA });
    await page.locator('[data-testid=stem]').waitFor();
    assert.equal(await overflowX(page), false);
    await shot(page, `A-0001-question-${width}`);
    await page.locator('[data-testid=choice]').nth(0).click();
    await page.getByRole('button', { name: '答える' }).click();
    assert.equal(await overflowX(page), false);
    await shot(page, `A-0001-answered-${width}`);
    await page.close();
  });
}

test('A-0001 AC8 読めない時は画面に出す', async () => {
  const { page } = await openPage(browser, server.url, { data: null });
  assert.match(await page.locator('[data-testid=load-error]').textContent(), /読み込めません/);
  await page.close();
});
