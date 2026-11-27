import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { startServer, launch, openPage, shot, overflowX } from './helpers.js';
import { DATA } from './fixtures.js';

// 講義のスライドの舞台（A-0018）。試験用の講義 1.4 は 3 枚（SVG・表・番号付きの並び）、6.1 は 2 枚
const HERE = path.dirname(fileURLToPath(import.meta.url));
const LECTURES = path.join(HERE, 'lectures');
// 入りきるかは、公開している本物の講義の全スライドで確かめる
const REAL = path.join(HERE, '..', 'public', 'lectures');

let server;
let browser;
test.before(async () => { server = await startServer(); browser = await launch(); });
test.after(async () => { await browser?.close(); await server?.close(); });

const tid = (page, id) => page.locator(`[data-testid=${id}]`);
async function openLecture(page, task) {
  await page.locator('.tab[data-view=lecture]').click();
  await page.locator(`[data-testid=lecture-row][data-task="${task}"]`).click();
  await tid(page, 'lecture-stage').waitFor();
}
// 位置はページの上からの距離（押した時に画面が動いても比べられるように）
const box = (page, id) => tid(page, id).evaluate((e) => { const b = e.getBoundingClientRect(); return { w: Math.round(b.width), h: Math.round(b.height), y: Math.round(b.top + window.scrollY) }; });
/** 絵を読み終えて字を合わせ終えるのを待つ */
async function settle(page) {
  await page.waitForFunction(() => [...document.querySelectorAll('.lec-stage img')].every((i) => i.complete));
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
}
/** 舞台からはみ出しているか（舞台・図の枠・表） */
const overflowing = (page) => page.evaluate(() => {
  const s = document.querySelector('.lec-stage-in');
  const parts = [s, ...s.querySelectorAll('.lec-stage-visual, .lec-table')];
  return parts.filter((x) => x.scrollHeight > x.clientHeight + 1 || x.scrollWidth > x.clientWidth + 1).map((x) => x.className);
});

async function sameAcrossSlides(page, n) {
  const seen = [];
  for (let k = 0; k < n; k += 1) {
    await settle(page);
    seen.push({ stage: await box(page, 'lecture-stage'), next: (await box(page, 'lecture-next')).y });
    if (k < n - 1) await tid(page, 'lecture-next').click();
  }
  return seen;
}

test('A-0018 AC1 幅 1280 でスライドを移っても舞台の大きさと「前へ」「次へ」の位置が変わらない（16:9）', async () => {
  const { page, errors } = await openPage(browser, server.url, { data: DATA, lectures: LECTURES });
  await openLecture(page, '1.4');
  const seen = await sameAcrossSlides(page, 3);
  for (const s of seen) assert.deepEqual(s, seen[0]);
  assert.ok(Math.abs(seen[0].stage.w / seen[0].stage.h - 16 / 9) < 0.03, `16:9 でない: ${JSON.stringify(seen[0].stage)}`);
  await shot(page, 'A-0018-stage-1280');
  assert.deepEqual(errors, []);
  await page.close();
});

test('A-0018 AC2 幅 375 でもスライドを移って舞台の高さと「次へ」の位置が変わらず、横に溢れない', async () => {
  const { page, errors } = await openPage(browser, server.url, { width: 375, height: 760, data: DATA, lectures: LECTURES });
  await openLecture(page, '1.4');
  const seen = await sameAcrossSlides(page, 3);
  for (const s of seen) assert.deepEqual(s, seen[0]);
  assert.equal(await overflowX(page), false);
  await shot(page, 'A-0018-stage-375');
  assert.deepEqual(errors, []);
  await page.close();
});

test('A-0018 AC3 公開している講義の全スライドで、見出し・図・要点が舞台からはみ出さない（幅 1280 と 375）', async () => {
  const tasks = JSON.parse(fs.readFileSync(path.join(REAL, 'index.json'), 'utf8')).map((l) => l.task);
  for (const width of [1280, 375]) {
    const { page, errors } = await openPage(browser, server.url, { width, height: 800, data: DATA, lectures: REAL });
    const bad = [];
    for (const task of tasks) {
      await openLecture(page, task);
      const n = JSON.parse(fs.readFileSync(path.join(REAL, task, 'lecture.json'), 'utf8')).slides.length;
      for (let k = 0; k < n; k += 1) {
        await settle(page);
        const over = await overflowing(page);
        if (over.length) bad.push(`${width} ${task} ${k + 1}: ${over.join(',')}`);
        if (k < n - 1) await page.keyboard.press('ArrowRight');
      }
      await tid(page, 'lecture-back').click();
    }
    assert.deepEqual(bad, []);
    assert.deepEqual(errors, []);
    await page.close();
  }
});

test('A-0018 AC4 「全画面」で舞台と操作が画面いっぱいに出て、移れ、押し直し・Esc・F で切り替わり、一覧へ戻ると終わる', async () => {
  const { page, errors } = await openPage(browser, server.url, { data: DATA, lectures: LECTURES });
  await openLecture(page, '1.4');
  await tid(page, 'lecture-full').click();
  assert.equal(await tid(page, 'lecture-full').textContent(), '全画面を終える');
  const vp = page.viewportSize();
  const p = await box(page, 'lecture-player');
  assert.deepEqual({ w: p.w, h: p.h }, { w: vp.width, h: vp.height });
  await settle(page);
  await shot(page, 'A-0018-full-1280');
  await tid(page, 'lecture-next').click();
  assert.equal((await tid(page, 'lecture-num').textContent()).trim(), '2 / 3');
  assert.equal(await tid(page, 'lecture-full').textContent(), '全画面を終える');
  await tid(page, 'lecture-full').click();
  assert.equal(await tid(page, 'lecture-full').textContent(), '全画面');
  assert.ok((await box(page, 'lecture-player')).h < vp.height);

  await page.keyboard.press('f');
  assert.equal(await tid(page, 'lecture-full').textContent(), '全画面を終える');
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => document.querySelector('[data-testid=lecture-full]').textContent === '全画面');
  await page.keyboard.press('F');
  assert.equal(await tid(page, 'lecture-full').textContent(), '全画面を終える');
  await tid(page, 'lecture-back').click();
  assert.equal(await page.evaluate(() => document.body.classList.contains('lec-full')), false);
  assert.deepEqual(errors, []);
  await page.close();
});

test('A-0018 AC5 「台本を読む」「根拠」は操作の下に出て、開いても舞台の高さと「次へ」の位置が変わらない', async () => {
  const { page, errors } = await openPage(browser, server.url, { data: DATA, lectures: LECTURES });
  await openLecture(page, '1.4');
  await settle(page);
  const before = { stage: await box(page, 'lecture-stage'), next: (await box(page, 'lecture-next')).y };
  const script = await box(page, 'lecture-script');
  assert.ok(script.y > before.next, '台本が操作より上にある');
  assert.ok((await box(page, 'lecture-refs')).y > before.next, '根拠が操作より上にある');
  await tid(page, 'lecture-script').locator('summary').click();
  assert.deepEqual({ stage: await box(page, 'lecture-stage'), next: (await box(page, 'lecture-next')).y }, before);
  assert.deepEqual(errors, []);
  await page.close();
});

test('A-0018 AC6 ブラウザのエラーが 0 件で、幅 375 の全画面の写真を撮る', async () => {
  const { page, errors } = await openPage(browser, server.url, { width: 375, height: 760, data: DATA, lectures: LECTURES });
  await openLecture(page, '1.4');
  await tid(page, 'lecture-full').click();
  await settle(page);
  await shot(page, 'A-0018-full-375');
  assert.equal(await overflowX(page), false);
  assert.deepEqual(errors, []);
  await page.close();
});
