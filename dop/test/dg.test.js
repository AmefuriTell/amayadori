import test from 'node:test';
import assert from 'node:assert/strict';
import { sandbox, question } from './helpers.js';
import { preprocess, cleanIcon } from '../tools/lib/diagram.mjs';

test('P-015 図の元: サービスの箱はアイコン付きに、アイコンの無い物は四角に、名前を覚える', () => {
  const src = 'flowchart TB\n  P@{ svc: "AWS CodePipeline", label: "パイプライン" }\n  X@{ svc: "GitHub" }\n  P --> X';
  const r = preprocess(src, { 'AWS CodePipeline': 'AWS-CodePipeline' }, (f) => f === 'AWS-CodePipeline');
  assert.match(r.mermaid, /P@\{ icon: "aws:aws-codepipeline", form: "rounded", label: "パイプライン"/);
  assert.match(r.mermaid, /X\["GitHub"\]:::svcbox/);
  assert.match(r.mermaid, /classDef svcbox/);
  assert.deepEqual(r.nodes, { P: 'AWS CodePipeline', X: 'GitHub' });
  assert.deepEqual(r.unknown, ['GitHub']);
});

test('P-015 アイコンの掃除: title・id を外し、rect を path に直す', () => {
  const svg = '<?xml version="1.0"?><svg viewBox="0 0 64 64" xmlns:xlink="x"><title>t</title><g id="a" fill="#C925D1"><rect id="r" x="0" y="0" width="64" height="64"></rect></g><path d="M1"/></svg>';
  const out = cleanIcon(svg);
  assert.doesNotMatch(out, /<title>|id=|<rect|xmlns:xlink/);
  assert.match(out, /<path fill="#C925D1"|<g fill="#C925D1"><path d="M0,0 h64 v64 h-64 Z"\/>/);
});

test('P-015 図の項目: seed --ids で作り、C2 から始め、問題の中身を context に写す。形の誤りを返す', () => {
  const sb = sandbox();
  sb.write('bank/1.1/q-1.1-0001.json', question({ status: 'verified' }));
  assert.match(sb.run('loop', 'seed', '--diagram', '--ids', 'q-1.1-0001').summary, /1 個、1 問/);
  assert.equal(sb.run('loop', 'seed', '--diagram', '--ids', 'q-9.9-9999').ok, false);
  sb.run('loop', 'start');
  const next = sb.run('loop', 'next');
  assert.equal(next.state, 'C2_author');
  const id = next.item.id;
  assert.match(id, /^D-/);
  const ctx = sb.read(`work/${id}/context.json`).questions[0];
  assert.equal(ctx.id, 'q-1.1-0001');
  assert.match(ctx.stem, /最も運用の手間/); // 日本語版を写す
  assert.deepEqual(ctx.answer, ['A']);
  sb.write(`work/${id}/diagrams.json`, { item: id, diagrams: [{ id: 'q-1.1-0002', source: 'graph LR\n A-->B', alt: 'short' }] });
  const bad = sb.run('dg', 'validate', id);
  assert.equal(bad.ok, false);
  const all = bad.items.join('\n');
  assert.match(all, /項目の問題/);
  assert.match(all, /flowchart TB/);
  assert.match(all, /サービスの箱/);
  assert.match(all, /alt/);
  assert.match(all, /図の無い問題: q-1.1-0001/);
});

test('P-022 図の読みにくさ: 長い線のラベル・長い題・同じ 2 つの箱の間のラベル付きの線 2 本を返す', async () => {
  const { readability } = await import('../tools/dg.mjs');
  const ok = 'flowchart TB\n  subgraph R["us-east-1"]\n    A@{ svc: "AWS Lambda", label: "x" }\n  end\n  A -- "✔ B: 短い" --> B\n  B --> A';
  assert.deepEqual(readability(ok), []);
  const bad = 'flowchart TB\n  subgraph R["マネージャーのアカウント（監視）"]\n  end\n  A -- "とても長い線のラベルでラベルが重なってしまう例です" --> B\n  B -. "戻る" .-> A';
  const all = readability(bad).join('\n');
  assert.match(all, /線のラベルが長い/);
  assert.match(all, /subgraph の題が長い/);
  assert.match(all, /A と B の間にラベル付きの線が 2 本/);
});

test('見直し（recheck）を閉じると、付いている図の点検の項目が足され、今の図を束に写して C2 から始まる', () => {
  const sb = sandbox();
  sb.write('bank/1.1/q-1.1-0001.json', question({ status: 'verified' }));
  sb.write('bank/1.1/q-1.1-0002.json', question({ id: 'q-1.1-0002', status: 'retired' }));
  const current = { id: 'q-1.1-0001', source: 'flowchart TB\n  A@{ svc: "AWS CodeDeploy", label: "x" }', alt: '今の図の説明を二十文字以上の日本語で書いておく', status: 'verified' };
  sb.write('diagrams/q-1.1-0001.json', current);
  sb.write('diagrams/q-1.1-0002.json', { ...current, id: 'q-1.1-0002' });
  sb.write('.loop/backlog.json', [{ id: 'R-0001', kind: 'recheck', task: '1.1', question_ids: ['q-1.1-0001', 'q-1.1-0002'], status: 'doing', attempts: 0, priority: 1 }]);
  sb.write('.loop/state.json', { state: 'S9_close', item: 'R-0001', prev: null, session: { active: true, started: null, closed: 0 } });
  const c = sb.run('loop', 'close');
  assert.equal(c.diagrams_added.length, 1); // 捨てた q-1.1-0002 は点検しない
  const d = sb.read('.loop/backlog.json').find((b) => b.id === c.diagrams_added[0]);
  assert.deepEqual([d.kind, d.check, d.question_ids], ['diagram', true, ['q-1.1-0001']]);
  const next = sb.run('loop', 'next');
  assert.equal(next.state, 'C2_author');
  assert.equal(sb.read(`work/${d.id}/diagrams.json`).diagrams[0].source, current.source);
  assert.equal(sb.read(`work/${d.id}/context.json`).questions[0].id, 'q-1.1-0001');
});
