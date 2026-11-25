import test from 'node:test';
import assert from 'node:assert/strict';
import { sandbox, question, SOURCES } from './helpers.js';

const page = (over = {}) => ({
  id: 'codedeploy', name: 'AWS CodeDeploy', aliases: ['AWS CodeDeploy'], reading: 'コードデプロイ',
  summary: 'アプリケーションの新しい版を、サーバーやコンテナへ自動で配るサービス。',
  features: [
    { title: 'Blue/Green', text: '新しい版を古い版の横に用意してから、本番の通信を切り替える。', source_id: 'S1' },
    { title: '線形の切り替え', text: '通信を同じ割合ずつ、決まった分ごとに移す。', source_id: 'S2' },
  ],
  exam_points: [{ text: '止まる時間を減らすデプロイの方法を選ぶ問題で使う。', source_id: 'S1' }],
  references: [
    { url: 'https://docs.aws.amazon.com/codedeploy/latest/userguide/welcome.html', source_id: 'S1', quote: 'provisions your new application version alongside the old version' },
    { url: 'https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-configurations.html', source_id: 'S2', quote: 'Linear configurations shift traffic in equal increments' },
  ],
  status: 'draft', created: '2026-11-26',
  ...over,
});

function toGlossaryAuthor(sb) {
  sb.write('bank/1.1/q-1.1-0001.json', question({ status: 'verified', services: ['AWS CodeDeploy'] }));
  const seeded = sb.run('loop', 'seed', '--glossary');
  assert.match(seeded.summary, /1 個、1 サービス/);
  sb.run('loop', 'start');
  const next = sb.run('loop', 'next');
  assert.equal(next.state, 'C1_research');
  const id = next.item.id;
  assert.match(id, /^G-/);
  sb.write(`work/${id}/sources.md`, SOURCES);
  sb.write(`work/${id}/raw/page.md`, SOURCES);
  assert.equal(sb.run('docs', 'check', id).ok, true);
  sb.run('loop', 'advance', '--result', 'ok');
  return id;
}

test('P-014 事典: seed → C1 → g validate が形・根拠・項目のサービスを見る', () => {
  const sb = sandbox();
  const id = toGlossaryAuthor(sb);
  sb.write(`work/${id}/glossary.json`, { item: id, entries: [page({ aliases: ['CodeDeploy'], summary: 'English only summary here.', features: [{ title: 'x', text: 'y', source_id: 'S9' }, page().features[1]], references: [{ ...page().references[0], quote: 'not in source' }] })] });
  const bad = sb.run('g', 'validate', id);
  assert.equal(bad.ok, false);
  const all = bad.items.join('\n');
  assert.match(all, /aliases に name/);
  assert.match(all, /summary は日本語/);
  assert.match(all, /S9 を根拠に使っているが references に無い/);
  assert.match(all, /原文に無い/);
  assert.match(all, /項目のサービスにページが無い: AWS CodeDeploy/);

  sb.write(`work/${id}/glossary.json`, { item: id, entries: [page()] });
  assert.equal(sb.run('g', 'validate', id).ok, true);
  assert.equal(sb.read(`work/${id}/result.json`).result, 'ok');
});

test('P-014 事典: verdict で fix → 直して pass → gate → publish で glossary/ に入る', () => {
  const sb = sandbox();
  const id = toGlossaryAuthor(sb);
  sb.write(`work/${id}/glossary.json`, { item: id, entries: [page()] });
  sb.run('g', 'validate', id);
  sb.run('loop', 'advance', '--result', 'ok');
  sb.write(`work/${id}/verify.json`, { item: id, entries: [{ id: 'codedeploy', issues: [{ kind: 'fact', where: 'features[1]', detail: 'x' }], verdict: 'fix' }] });
  assert.equal(sb.run('g', 'verdict', id).result, 'fix');
  assert.equal(sb.read(`work/${id}/feedback.json`).entries.codedeploy[0].kind, 'fact');
  sb.run('loop', 'advance', '--result', 'fix');
  sb.run('g', 'validate', id);
  sb.run('loop', 'advance', '--result', 'ok');
  sb.write(`work/${id}/verify.json`, { item: id, entries: [{ id: 'codedeploy', issues: [{ kind: 'style', detail: 'x' }], verdict: 'ok' }] });
  assert.equal(sb.run('g', 'verdict', id).result, 'pass');
  sb.run('loop', 'advance', '--result', 'pass');
  assert.equal(sb.run('g', 'gate', id).ok, true);
  const pub = sb.run('g', 'publish', id);
  assert.equal(pub.ok, true, JSON.stringify(pub));
  const out = sb.read('glossary/services/codedeploy.json');
  assert.equal(out.status, 'verified');
  assert.equal(sb.run('g', 'list').summary, '事典 1 ページ');
  // 事典に入ったサービスは seed で足さない
  assert.match(sb.run('loop', 'seed', '--glossary', '--dry').summary, /0 個/);
});

test('P-014 事典: 2 回の fact で drop、全部 drop なら drop', () => {
  const sb = sandbox();
  const id = toGlossaryAuthor(sb);
  sb.write(`work/${id}/glossary.json`, { item: id, entries: [page()] });
  sb.run('g', 'validate', id);
  sb.run('loop', 'advance', '--result', 'ok');
  const bad = { item: id, entries: [{ id: 'codedeploy', issues: [{ kind: 'unsupported', detail: 'x' }], verdict: 'fix' }] };
  sb.write(`work/${id}/verify.json`, bad);
  assert.equal(sb.run('g', 'verdict', id).result, 'fix');
  sb.run('loop', 'advance', '--result', 'fix');
  sb.run('g', 'validate', id);
  sb.run('loop', 'advance', '--result', 'ok');
  sb.write(`work/${id}/verify.json`, bad);
  assert.equal(sb.run('g', 'verdict', id).result, 'drop');
});
