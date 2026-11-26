import { createRequire } from 'node:module';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { sandbox, SOURCES } from './helpers.js';

process.env.DOP_TTS = 'skip';
// 図を描くにはブラウザ（playwright）が要る。無い所（CI）では描かずに形だけを確かめる
const canRender = (() => { try { createRequire(import.meta.url).resolve('playwright'); return true; } catch { return false; } })();
if (!canRender) process.env.DOP_RENDER = 'skip';
const ID = 'K-0001';
const SENTENCE = 'この講義では、新しい版を少しずつ入れ替える方法を、例を見ながら順に学びます。';

function slide(i, over = {}) {
  const id = `s${String(i).padStart(2, '0')}`;
  return {
    id,
    title: `入れ替えの考え方 ${i}`,
    bullets: ['in-place: 今の環境を更新', 'blue/green: 横に新しい一式'],
    visual: i === 1
      ? { type: 'mermaid', source: 'flowchart TB\n  CD@{ svc: "AWS CodeDeploy", label: "CodeDeploy" }\n  L@{ svc: "AWS Lambda", label: "Lambda: 関数" }\n  CD --> L', alt: 'コードデプロイがラムダの関数に新しい版を届ける図' }
      : i % 2 ? { type: 'compare', columns: ['方法', '止まる時間'], rows: [['in-place', 'ある'], ['blue/green', 'ほぼ無い']] }
        : { type: 'steps', items: [{ label: '新しい一式を起動' }, { label: '一部を移す', note: '割合で' }] },
    narration: SENTENCE.repeat(9),
    refs: [{ source_id: 'S1', quote: 'provisions your new application version alongside the old version', url: 'https://docs.aws.amazon.com/codedeploy/latest/userguide/welcome.html' }],
    ...over,
  };
}
const lecture = (slides = Array.from({ length: 12 }, (_, i) => slide(i + 1))) => ({ task: '1.4', title: 'デプロイ戦略', slides });

function setup(state = 'C2_author') {
  const sb = sandbox();
  process.env.DOP_APP = path.join(sb.dir, 'app');
  sb.write('.loop/backlog.json', [{ id: ID, kind: 'lecture', task: '1.4', status: 'doing', attempts: 0, priority: 2 }]);
  sb.write('.loop/state.json', { state, item: ID, prev: null, session: { active: true, started: null, closed: 0 } });
  sb.write(`work/${ID}/sources.md`, SOURCES);
  sb.write(`work/${ID}/lecture.json`, lecture());
  return sb;
}
const at = (sb, state) => sb.write('.loop/state.json', { state, item: ID, prev: null, session: { active: true, started: null, closed: 0 } });
const review = (issues = [], global = []) => ({ slides: [{ id: 's01', issues }], global });

test('lec validate: 台本の英字・bullets の数・sources.md に無い refs・visual が無い、を返す', () => {
  const sb = setup();
  const slides = lecture().slides;
  slides[1] = slide(2, { narration: SENTENCE.repeat(8) + 'CodeDeploy を使います。' });
  slides[2] = slide(3, { bullets: ['一', '二', '三', '四'] });
  slides[3] = slide(4, { refs: [{ source_id: 'S9', quote: 'x', url: 'https://docs.aws.amazon.com/x' }] });
  slides[4] = slide(5, { visual: undefined });
  sb.write(`work/${ID}/lecture.json`, lecture(slides));
  const r = sb.run('lec', 'validate', ID);
  assert.equal(r.ok, false);
  const all = r.items.join('\n');
  assert.match(all, /s02: 台本に読み上げで崩れる字/);
  assert.match(all, /s03: bullets が 4 個/);
  assert.match(all, /s04: refs.*S9 が sources\.md に無い/);
  assert.match(all, /s05: visual が無い/);
  assert.equal(sb.exists(`work/${ID}/result.json`), false);
});

test('lec validate: 正しい lecture.json なら ok で、図の絵を preview に置く', () => {
  const sb = setup();
  const r = sb.run('lec', 'validate', ID);
  assert.equal(r.ok, true, JSON.stringify(r));
  assert.deepEqual([sb.read(`work/${ID}/result.json`).state, sb.read(`work/${ID}/result.json`).result], ['C2_author', 'ok']);
  if (canRender) assert.ok(sb.exists(`work/${ID}/preview/s01.png`));
});

test('lec verdict: 重・中があれば fix、同じファイルへの 2 回目は数え直さない、軽だけなら pass', () => {
  const sb = setup('C3_verify');
  sb.write(`work/${ID}/review-consistency.json`, review([{ kind: 'mismatch', severity: '中', detail: '図と台本が違う', suggest: '図を直す' }]));
  sb.write(`work/${ID}/review-clarity.json`, review([], [{ severity: '重', detail: '前提の説明が無い', suggest: '足す' }]));
  const r = sb.run('lec', 'verdict', ID);
  assert.equal(r.result, 'fix');
  const fb = sb.read(`work/${ID}/feedback.json`);
  assert.equal(fb.slides.s01[0].severity, '中');
  assert.equal(fb.global[0].severity, '重');
  assert.equal(sb.read(`work/${ID}/result.json`).count, true);

  const again = sb.run('lec', 'verdict', ID);
  assert.equal(again.result, 'fix');
  assert.match(again.summary, /数え直さない/);
  assert.equal(fs.readFileSync(path.join(sb.dir, `work/${ID}/history.jsonl`), 'utf8').trim().split('\n').length, 1);
  assert.equal(sb.read(`work/${ID}/result.json`).count, true); // 1 回目の札は残す

  sb.write(`work/${ID}/review-consistency.json`, review([{ kind: 'style', severity: '軽', detail: '言い回し', suggest: '' }]));
  sb.write(`work/${ID}/review-clarity.json`, review());
  const ok = sb.run('lec', 'verdict', ID);
  assert.equal(ok.result, 'pass');
  assert.equal(sb.read(`work/${ID}/verdict.json`).mild.length, 1);
  assert.equal(sb.read(`work/${ID}/result.json`).result, 'pass');

  at(sb, 'C2_author');
  assert.equal(sb.run('lec', 'verdict', ID).code, 2); // C3 の時だけ
});

test('lec gate と publish: verdict の後の書き換えを落とし、通れば lectures/ と app/public/lectures/ に書く', () => {
  const sb = setup('C3_verify');
  sb.write(`work/${ID}/review-consistency.json`, review());
  sb.write(`work/${ID}/review-clarity.json`, review());
  assert.equal(sb.run('lec', 'verdict', ID).result, 'pass');
  assert.equal(sb.run('lec', 'gate', ID).ok, true);

  at(sb, 'C4_gate');
  const p = sb.run('lec', 'publish', ID);
  assert.equal(p.ok, true, JSON.stringify(p));
  const src = sb.read('lectures/1.4.json');
  assert.deepEqual([src.status, src.audio, src.credit, src.slides.length], ['verified', false, 'VOICEVOX:四国めたん', 12]);
  const app = sb.read('app/public/lectures/1.4/lecture.json');
  assert.equal(app.audio, false);
  assert.deepEqual(app.slides[0].visual, { type: 'mermaid', alt: 'コードデプロイがラムダの関数に新しい版を届ける図', svg: 'visuals/s01.svg' });
  assert.deepEqual(Object.keys(app.slides[1].refs[0]), ['quote', 'url']);
  assert.match(fs.readFileSync(path.join(sb.dir, 'app/public/lectures/1.4/visuals/s01.svg'), 'utf8'), /^<svg/);
  assert.equal(sb.exists('app/public/lectures/1.4/audio'), false);
  const index = sb.read('app/public/lectures/index.json');
  assert.deepEqual(index.map((x) => [x.task, x.slides]), [['1.4', 12]]);
  assert.equal(sb.read(`work/${ID}/result.json`).result, 'pass');

  // verdict の後に lecture.json を書き換えると落ちる
  const later = new Date(Date.now() + 5000);
  sb.write(`work/${ID}/lecture.json`, lecture());
  fs.utimesSync(path.join(sb.dir, `work/${ID}/lecture.json`), later, later);
  const g = sb.run('lec', 'gate', ID);
  assert.equal(g.ok, false);
  assert.match(g.items.join('\n'), /verdict）の後に lecture\.json を書き換えた/);
  assert.deepEqual([sb.read(`work/${ID}/result.json`).state, sb.read(`work/${ID}/result.json`).result], ['C4_gate', 'fail']);
  assert.ok(sb.read(`work/${ID}/feedback.json`).slides);
});

const LINE_T = 'この方法では、新しい版を少しずつ入れ替えます。';
const LINE_S = 'それって、全部を一度に替えるのとは違うのだ？';
const talk = (n = 6) => Array.from({ length: n }, (_, k) => (k % 2 ? { who: 'student', text: LINE_S } : { who: 'teacher', text: LINE_T }));

test('lec validate: 掛け合い（dialogue）を受け、話す人・行の長さ・読めない字・混在を返す', () => {
  const sb = setup();
  const ok = lecture(Array.from({ length: 12 }, (_, i) => { const s = slide(i + 1, { dialogue: talk(16) }); delete s.narration; return s; }));
  sb.write(`work/${ID}/lecture.json`, ok);
  const good = sb.run('lec', 'validate', ID);
  assert.equal(good.ok, true, JSON.stringify(good));

  const bad = structuredClone(ok);
  bad.slides[1].dialogue[1] = { who: 'narrator', text: LINE_S };
  bad.slides[2].dialogue[0] = { who: 'teacher', text: 'あ'.repeat(161) };
  bad.slides[3].dialogue[0] = { who: 'teacher', text: 'CodeDeploy で入れ替えます。' };
  bad.slides[4].dialogue = [{ who: 'student', text: LINE_S }, { who: 'student', text: LINE_S }];
  bad.slides[5] = slide(6);
  sb.write(`work/${ID}/lecture.json`, bad);
  const r = sb.run('lec', 'validate', ID);
  assert.equal(r.ok, false);
  const all = r.items.join('\n');
  assert.match(all, /s02: dialogue の 2 行目: who は teacher か student/);
  assert.match(all, /s03: dialogue の 1 行目が 161 字/);
  assert.match(all, /s04: dialogue の 1 行目に読み上げで崩れる字/);
  assert.match(all, /s05: dialogue に先生（teacher）の行が要る/);
  assert.match(all, /全部のスライドを dialogue にする/);
});

test('lec publish: 掛け合いなら 2 人の声のクレジットを付け、アプリへ dialogue を渡す', () => {
  const sb = setup('C3_verify');
  sb.write(`work/${ID}/lecture.json`, lecture(Array.from({ length: 12 }, (_, i) => { const s = slide(i + 1, { dialogue: talk(16) }); delete s.narration; return s; })));
  sb.write(`work/${ID}/review-consistency.json`, review());
  sb.write(`work/${ID}/review-clarity.json`, review());
  assert.equal(sb.run('lec', 'verdict', ID).result, 'pass');
  assert.equal(sb.run('lec', 'gate', ID).ok, true);
  at(sb, 'C4_gate');
  assert.equal(sb.run('lec', 'publish', ID).ok, true);
  const app = sb.read('app/public/lectures/1.4/lecture.json');
  assert.equal(app.credit, 'VOICEVOX:四国めたん、VOICEVOX:ずんだもん');
  assert.deepEqual(app.slides[0].dialogue.slice(0, 2), talk(2));
  assert.equal('narration' in app.slides[0], false);
});
