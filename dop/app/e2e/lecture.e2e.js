import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { startServer, launch, openPage, shot, overflowX } from './helpers.js';
import { DATA } from './fixtures.js';

// 試験用の講義: 1.4 は音声付き（無音 1 秒の mp3・3 枚）、6.1 は音声なし（2 枚）
const LECTURES = path.join(path.dirname(fileURLToPath(import.meta.url)), 'lectures');
// 3 問目を task 6.1 にした問題集（6.1 の講義から、その task の最初の問題へ進む試験のため）
const DATA_61 = { ...DATA, questions: DATA.questions.map((q, i) => (i === 2 ? { ...q, id: 'q-6.1-0001', task: '6.1', domain: 6 } : q)) };

let server;
let browser;
test.before(async () => { server = await startServer(); browser = await launch(); });
test.after(async () => { await browser?.close(); await server?.close(); });

const tid = (page, id) => page.locator(`[data-testid=${id}]`);
const num = (page) => tid(page, 'lecture-num').textContent();
const toLectures = (page) => page.locator('.tab[data-view=lecture]').click();
async function openLecture(page, task) {
  await toLectures(page);
  await page.locator(`[data-testid=lecture-row][data-task="${task}"]`).click();
  await tid(page, 'lecture-slide').waitFor();
}
const audioState = (page) => page.locator('[data-testid=lecture-audio]').evaluate((a) => ({ src: a.currentSrc || a.src, paused: a.paused }));

test('A-0017 AC1 上の「講義」で一覧（task・題・分）が出て、見終えた講義に「見た」の印。無い・空なら「講義はまだありません」', async () => {
  const { page, errors } = await openPage(browser, server.url, { data: DATA, lectures: LECTURES, init: () => localStorage.setItem('dop:v1:lecture', JSON.stringify({ last: {}, seen: ['6.1'] })) });
  await toLectures(page);
  const rows = tid(page, 'lecture-row');
  await rows.first().waitFor();
  assert.equal(await rows.count(), 2);
  const first = await rows.nth(0).textContent();
  assert.match(first, /タスク 1\.4/);
  assert.match(first, /デプロイの方法を選ぶ/);
  assert.match(first, /約 0\.1 分/);
  assert.match(await rows.nth(1).textContent(), /タスク 6\.1.*権限の管理.*約 1\.2 分/);
  assert.equal(await rows.nth(0).locator('[data-testid=lecture-seen]').count(), 0);
  assert.equal(await rows.nth(1).locator('[data-testid=lecture-seen]').textContent(), '見た');
  await shot(page, 'A-0017-list-1280');

  const none = await openPage(browser, server.url, { data: DATA, lectures: null });
  await toLectures(none.page);
  assert.equal(await tid(none.page, 'lecture-empty').textContent(), '講義はまだありません。');
  const blank = await openPage(browser, server.url, { data: DATA, lectures: [] });
  await toLectures(blank.page);
  assert.equal(await tid(blank.page, 'lecture-empty').textContent(), '講義はまだありません。');
  // 404 はブラウザが読み込みの失敗として出す。画面の例外が無いことだけ確かめる
  assert.deepEqual([...errors, ...blank.errors, ...none.errors.filter((e) => !/404|Failed to load resource/.test(e))], []);
  await Promise.all([page.close(), none.page.close(), blank.page.close()]);
});

test('A-0017 AC2 選ぶと 1 枚目。見出し・図（SVG・表・番号付きの並び）・要点・「i / n」', async () => {
  const { page, errors } = await openPage(browser, server.url, { data: DATA, lectures: LECTURES });
  await openLecture(page, '1.4');
  assert.equal((await num(page)).trim(), '1 / 3');
  assert.equal(await tid(page, 'lecture-title').textContent(), '配る流れの全体');
  const img = tid(page, 'lecture-visual').locator('img');
  assert.match(await img.getAttribute('src'), /public\/lectures\/1\.4\/visuals\/s01\.svg$/);
  assert.match(await img.getAttribute('alt'), /コードの置き場/);
  await page.waitForFunction(() => document.querySelector('[data-testid=lecture-visual] img')?.naturalWidth > 0);
  assert.deepEqual(await tid(page, 'lecture-bullets').locator('li').allTextContents(), ['置き場から作って配る', '流れは三つの段', '止まる時間を減らす']);
  await shot(page, 'A-0017-slide-1280');

  await tid(page, 'lecture-next').click();
  assert.equal(await tid(page, 'lecture-visual').getAttribute('data-type'), 'compare');
  assert.deepEqual(await tid(page, 'lecture-visual').locator('thead th').allTextContents(), ['観点', 'その場', '横に用意']);
  assert.equal(await tid(page, 'lecture-visual').locator('tbody tr').count(), 3);
  await tid(page, 'lecture-next').click();
  const steps = tid(page, 'lecture-visual');
  assert.equal(await steps.evaluate((n) => n.tagName), 'OL');
  assert.equal(await steps.locator('li').count(), 3);
  assert.match(await steps.locator('li').nth(0).textContent(), /^1新しい組を作る/);
  assert.match(await steps.locator('li').nth(2).textContent(), /^3流れを切り替える/);
  assert.deepEqual(errors, []);
  await page.close();
});

test('A-0017 AC3 「再生」で音声が流れ、終わると自動で次へ進んで続ける。「一時停止」で止まる。音声の無い講義には再生が無い', async () => {
  const { page, errors } = await openPage(browser, server.url, { data: DATA, lectures: LECTURES });
  await openLecture(page, '1.4');
  assert.equal(await tid(page, 'lecture-auto').isChecked(), true);
  await tid(page, 'lecture-play').click();
  assert.equal(await tid(page, 'lecture-play').textContent(), '一時停止');
  let a = await audioState(page);
  assert.match(a.src, /public\/lectures\/1\.4\/audio\/s01\.mp3$/);
  assert.equal(a.paused, false);
  // 1 秒の音声が終わると 2 枚目へ進み、続けて 2 枚目の音声が流れる
  await page.waitForFunction(() => document.querySelector('[data-testid=lecture-num]')?.textContent.trim() === '2 / 3', null, { timeout: 8000 });
  a = await audioState(page);
  assert.match(a.src, /audio\/s02\.mp3$/);
  assert.equal(a.paused, false);
  assert.equal(await tid(page, 'lecture-play').textContent(), '一時停止');
  await tid(page, 'lecture-play').click();
  assert.equal(await tid(page, 'lecture-play').textContent(), '再生');
  assert.equal((await audioState(page)).paused, true);
  await page.waitForTimeout(1500);
  assert.equal((await num(page)).trim(), '2 / 3', '止めている間は進まない');

  // 自動で次へを外すと、終わってもそのスライドに留まる
  await tid(page, 'lecture-auto').uncheck();
  await tid(page, 'lecture-play').click();
  await page.waitForFunction(() => document.querySelector('[data-testid=lecture-play]')?.textContent === '再生', null, { timeout: 8000 });
  assert.equal((await num(page)).trim(), '2 / 3');

  await toLectures(page);
  await page.locator('[data-testid=lecture-row][data-task="6.1"]').click();
  await tid(page, 'lecture-slide').waitFor();
  assert.equal(await tid(page, 'lecture-play').count(), 0);
  assert.equal(await tid(page, 'lecture-auto').count(), 0);
  assert.deepEqual(errors, []);
  await page.close();
});

test('A-0017 AC4 「前へ」「次へ」と番号のボタン、←→ のキーで動ける。端では押せない', async () => {
  const { page, errors } = await openPage(browser, server.url, { data: DATA, lectures: LECTURES });
  await openLecture(page, '1.4');
  assert.equal(await tid(page, 'lecture-prev').isDisabled(), true);
  assert.equal(await tid(page, 'lecture-next').isDisabled(), false);
  await tid(page, 'lecture-next').click();
  assert.equal((await num(page)).trim(), '2 / 3');
  await tid(page, 'lecture-prev').click();
  assert.equal((await num(page)).trim(), '1 / 3');
  await tid(page, 'lecture-dot').nth(2).click();
  assert.equal((await num(page)).trim(), '3 / 3');
  assert.equal(await tid(page, 'lecture-dot').nth(2).getAttribute('aria-current'), 'true');
  assert.equal(await tid(page, 'lecture-next').isDisabled(), true);
  assert.equal(await tid(page, 'lecture-prev').isDisabled(), false);
  await page.keyboard.press('ArrowRight');
  assert.equal((await num(page)).trim(), '3 / 3');
  await page.keyboard.press('ArrowLeft');
  assert.equal((await num(page)).trim(), '2 / 3');
  await page.keyboard.press('ArrowLeft');
  assert.equal((await num(page)).trim(), '1 / 3');
  await page.keyboard.press('ArrowLeft');
  assert.equal((await num(page)).trim(), '1 / 3');
  await page.keyboard.press('ArrowRight');
  assert.equal((await num(page)).trim(), '2 / 3');
  assert.deepEqual(errors, []);
  await page.close();
});

test('A-0017 AC5 「台本を読む」で台本、「根拠」で原文とリンク。下に音声のクレジット', async () => {
  const { page, errors } = await openPage(browser, server.url, { data: DATA, lectures: LECTURES });
  await openLecture(page, '1.4');
  const script = tid(page, 'lecture-script');
  assert.equal(await script.locator('.lec-script').isVisible(), false);
  await script.locator('summary', { hasText: '台本を読む' }).click();
  assert.equal(await script.locator('.lec-script').isVisible(), true);
  assert.match(await script.locator('.lec-script').textContent(), /一枚目の台本です/);
  const refs = tid(page, 'lecture-refs');
  await refs.locator('summary', { hasText: '根拠' }).click();
  const ref = refs.locator('[data-testid=lecture-ref]');
  assert.equal(await ref.count(), 1);
  assert.match(await ref.locator('blockquote').textContent(), /CodeDeploy is a deployment service/);
  assert.equal(await ref.locator('a').getAttribute('href'), 'https://docs.aws.amazon.com/codedeploy/latest/userguide/welcome.html');
  assert.equal(await ref.locator('a').isVisible(), true);
  assert.equal(await tid(page, 'lecture-credit').textContent(), '音声: VOICEVOX:四国めたん');
  const below = await page.evaluate(() => document.querySelector('[data-testid=lecture-credit]').getBoundingClientRect().top > document.querySelector('[data-testid=lecture-slide]').getBoundingClientRect().bottom);
  assert.equal(below, true);
  await shot(page, 'A-0017-open-1280');
  assert.deepEqual(errors, []);
  await page.close();
});

test('A-0017 AC6 最後のスライドで「この task の問題を解く」→ その task の最初の問題が答える前の状態。講義は「見た」', async () => {
  const context = await browser.newContext();
  const { page, errors } = await openPage(browser, server.url, { data: DATA_61, lectures: LECTURES, context });
  // 1 問目を答えてから 2 問目へ進んでおく
  await page.locator('[data-testid=choice] input').nth(1).check();
  await page.getByRole('button', { name: '答える' }).click();
  await page.getByRole('button', { name: '次へ' }).click();
  assert.equal(await tid(page, 'qid').textContent(), 'q-1.4-0002');

  await openLecture(page, '6.1');
  assert.equal(await tid(page, 'lecture-solve').count(), 0, '最後のスライドでだけ出す');
  await tid(page, 'lecture-next').click();
  await tid(page, 'lecture-solve').click();
  assert.equal(await tid(page, 'qid').textContent(), 'q-6.1-0001');
  assert.equal(await page.locator('.tab[data-view=solve]').getAttribute('aria-current'), 'page');
  assert.equal(await tid(page, 'verdict').count(), 0);
  assert.equal(await page.locator('[data-testid=choice] input:checked').count(), 0);
  assert.match(await tid(page, 'progress').textContent(), /3\s*\/\s*3/);

  await openLecture(page, '1.4');
  await tid(page, 'lecture-dot').nth(2).click();
  await tid(page, 'lecture-solve').click();
  assert.equal(await tid(page, 'qid').textContent(), 'q-1.4-0001');
  assert.equal(await tid(page, 'verdict').count(), 0, '答えた問題でも答える前の状態で出す');
  assert.equal(await page.locator('[data-testid=choice] input:checked').count(), 0);

  await page.reload();
  assert.equal(await tid(page, 'qid').textContent(), 'q-1.4-0001');
  await toLectures(page);
  await tid(page, 'lecture-row').first().waitFor();
  assert.equal(await tid(page, 'lecture-seen').count(), 2);
  const saved = JSON.parse(await page.evaluate(() => localStorage.getItem('dop:v1:lecture')));
  assert.deepEqual(saved.seen.sort(), ['1.4', '6.1']);
  assert.deepEqual(errors, []);
  await context.close();
});

test('A-0017 AC7 途中で閉じて開き直すと、最後に見ていたスライドから続く', async () => {
  const context = await browser.newContext();
  const { page, errors } = await openPage(browser, server.url, { data: DATA, lectures: LECTURES, context });
  await openLecture(page, '1.4');
  await tid(page, 'lecture-next').click();
  assert.equal((await num(page)).trim(), '2 / 3');
  await page.close();

  // 閉じて開き直す: 講義の画面の 2 枚目から
  const again = await openPage(browser, server.url, { data: DATA, lectures: LECTURES, context });
  await tid(again.page, 'lecture-slide').waitFor();
  assert.equal((await num(again.page)).trim(), '2 / 3');
  assert.equal(await again.page.locator('.tab[data-view=lecture]').getAttribute('aria-current'), 'page');
  // 一覧へ戻って同じ講義を選び直しても 2 枚目。ほかの講義は 1 枚目から
  await tid(again.page, 'lecture-dot').nth(2).click();
  await tid(again.page, 'lecture-back').click();
  await again.page.locator('[data-testid=lecture-row][data-task="6.1"]').click();
  await tid(again.page, 'lecture-slide').waitFor();
  assert.equal((await num(again.page)).trim(), '1 / 2');
  await openLecture(again.page, '1.4');
  assert.equal((await num(again.page)).trim(), '3 / 3');
  // 解く画面へ移ってから読み込み直すと解く画面のまま
  await again.page.locator('.tab[data-view=solve]').click();
  await again.page.reload();
  await tid(again.page, 'qid').waitFor();
  assert.equal(await tid(again.page, 'lecture-slide').count(), 0);
  assert.deepEqual([...errors, ...again.errors], []);
  await context.close();
});

test('A-0017 AC8 幅 375px で横に溢れず、図は画面の幅に収まる', async () => {
  const { page, errors } = await openPage(browser, server.url, { data: DATA, lectures: LECTURES, width: 375, height: 800 });
  await toLectures(page);
  await tid(page, 'lecture-row').first().waitFor();
  assert.equal(await overflowX(page), false);
  await shot(page, 'A-0017-list-375');
  await page.locator('[data-testid=lecture-row][data-task="1.4"]').click();
  await tid(page, 'lecture-slide').waitFor();
  await page.waitForFunction(() => document.querySelector('[data-testid=lecture-visual] img')?.naturalWidth > 0);
  const fits = async () => page.locator('[data-testid=lecture-visual]').evaluate((n) => {
    const r = n.getBoundingClientRect();
    return r.left >= 0 && r.right <= document.documentElement.clientWidth && n.scrollWidth <= n.clientWidth + 1;
  });
  assert.equal(await fits(), true);
  for (const d of await page.locator('details').all()) await d.locator('summary').click();
  assert.equal(await overflowX(page), false);
  await shot(page, 'A-0017-slide-375');
  for (const k of [1, 2]) {
    await tid(page, 'lecture-dot').nth(k).click();
    assert.equal(await fits(), true);
    assert.equal(await overflowX(page), false);
  }
  await shot(page, 'A-0017-last-375');
  assert.deepEqual(errors, []);
  await page.close();
});
