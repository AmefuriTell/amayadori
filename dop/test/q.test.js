import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { sandbox, toAuthor, question, verify, toVerify, toGate, SOURCES } from './helpers.js';
import { placeAnswer } from '../tools/q.mjs';

function authored(sb, qs) {
  const id = toAuthor(sb);
  sb.write(`work/${id}/questions.json`, { item: id, questions: qs });
  return id;
}

test('validate: 正しい束は ok で札を書く。誤りは場所を返す', () => {
  const sb = sandbox();
  const id = authored(sb, [question()]);
  const ok = sb.run('q', 'validate', id);
  assert.equal(ok.ok, true);
  assert.equal(sb.read(`work/${id}/result.json`).result, 'ok');

  sb.write(`work/${id}/questions.json`, { item: id, questions: [question({
    stem: 'Which solution should the company use for the deployment of the new version of the app on ECS today?',
    explanation: { summary: 'x', per_choice: { A: 'x' } },
    references: [{ url: 'https://example.com/x', source_id: 'S9', quote: 'nope' }],
  })] });
  const bad = sb.run('q', 'validate', id);
  assert.equal(bad.ok, false);
  const all = bad.items.join('\n');
  assert.match(all, /条件の語/);
  assert.match(all, /per_choice/);
  assert.match(all, /references\/0\/url/);
  assert.match(all, /S9 が sources.md に無い/);
});

test('validate: quote は原文のまま', () => {
  const sb = sandbox();
  const id = authored(sb, [question({ references: [{ url: 'https://docs.aws.amazon.com/codedeploy/latest/userguide/welcome.html', source_id: 'S1', quote: 'CodeDeploy creates a new version' }] })]);
  assert.match(sb.run('q', 'validate', id).items[0], /原文に無い/);
});

test('validate: multi の決まり', () => {
  const sb = sandbox();
  const q = question({ type: 'multi', select_count: 2, answer: ['A'] });
  const id = authored(sb, [q]);
  const all = sb.run('q', 'validate', id).items.join('\n');
  assert.match(all, /答えの数 1 が select_count 2/);
  assert.match(all, /選択肢 5〜6/);
  assert.match(all, /Choose TWO/);
});

test('reveal は答えを見ずに解いた後だけ。verdict は答えが割れたら fix、2 回目で drop', () => {
  const sb = sandbox();
  const id = authored(sb, [question(), question({ id: 'q-1.1-0002', stem: question().stem.replace('ECS', 'EC2 instances') })]);
  toVerify(sb, id);
  sb.run('q', 'blind', id);
  const blind = sb.read(`work/${id}/blind.json`).questions[0];
  assert.equal(blind.answer, undefined);
  assert.equal(blind.explanation, undefined);
  assert.equal(sb.run('q', 'reveal', id).code, 2);

  verify(sb, id, [
    { qid: 'q-1.1-0001', blind: { answer: ['A'], confidence: 'low' }, issues: [], verdict: 'ok' },
    { qid: 'q-1.1-0002', blind: { answer: ['B'], confidence: 'high' }, issues: [{ kind: 'ambiguous', detail: 'B も成り立つ' }], verdict: 'fix' },
  ]);
  assert.equal(sb.run('q', 'reveal', id).ok, true);
  const v1 = sb.run('q', 'verdict', id);
  assert.equal(v1.result, 'fix');
  assert.equal(sb.read(`work/${id}/result.json`).count, true);
  assert.ok(sb.read(`work/${id}/feedback.json`).questions['q-1.1-0002']);
  assert.equal(sb.read(`work/${id}/questions.json`).questions[0].low_confidence, true);

  const v2 = sb.run('q', 'verdict', id);
  assert.equal(v2.result, 'pass');
  assert.equal(sb.read(`work/${id}/questions.json`).questions.length, 1);
  assert.equal(sb.read(`work/${id}/dropped.json`).length, 1);
});

test('verdict: 言い回しだけの直しは attempts を数えない', () => {
  const sb = sandbox();
  const id = authored(sb, [question()]);
  toVerify(sb, id);
  verify(sb, id, [{ qid: 'q-1.1-0001', blind: { answer: ['A'], confidence: 'high' }, issues: [{ kind: 'style', detail: 'x' }], verdict: 'fix' }]);
  assert.equal(sb.run('q', 'verdict', id).result, 'fix');
  assert.equal(sb.read(`work/${id}/result.json`).count, false);
});

test('gate: 検証の後に書き換えたら落ちる。正解だけ長いと落ちる', () => {
  const sb = sandbox();
  const id = authored(sb, [question()]);
  toVerify(sb, id);
  verify(sb, id, [{ qid: 'q-1.1-0001', blind: { answer: ['A'], confidence: 'high' }, issues: [], verdict: 'ok' }]);
  toGate(sb, id);
  assert.equal(sb.run('q', 'gate', id).ok, true);

  const long = question();
  long.choices[0].text = 'Use CodeDeploy blue/green deployments with a linear configuration that shifts traffic in equal increments and rolls back automatically when alarms fire.';
  const later = Date.now() / 1000 + 5;
  sb.write(`work/${id}/questions.json`, { item: id, questions: [long] });
  (await_utimes(sb, `work/${id}/questions.json`, later));
  const g = sb.run('q', 'gate', id);
  assert.equal(g.ok, false);
  const all = g.items.join('\n');
  assert.match(all, /verified/);
  assert.match(all, /len_bias/);
  assert.equal(sb.read(`work/${id}/result.json`).result, 'fail');
  assert.ok(sb.read(`work/${id}/feedback.json`).questions['q-1.1-0001']);
});

function await_utimes(sb, rel, t) { fs.utimesSync(path.join(sb.dir, rel), t, t); }

test('publish: 番号を振り直し、正解の位置を散らす。bank と似すぎは落ちる', () => {
  const sb = sandbox();
  const id = authored(sb, [question()]);
  assert.equal(sb.run('q', 'publish', id).code, 2); // C4 でない時は入れない
  toVerify(sb, id);
  verify(sb, id, [{ qid: 'q-1.1-0001', blind: { answer: ['A'], confidence: 'high' }, issues: [], verdict: 'ok' }]);
  toGate(sb, id);
  const p = sb.run('q', 'publish', id);
  assert.deepEqual(p.items, ['q-1.1-0001']);
  const saved = sb.read('bank/1.1/q-1.1-0001.json');
  assert.equal(saved.status, 'verified');
  const right = saved.choices.find((c) => c.key === saved.answer[0]);
  assert.match(right.text, /blue\/green/);
  assert.equal(saved.explanation.per_choice[saved.answer[0]], '正しい');

  // 同じ問題をもう一度入れようとすると dedupe で落ちる
  sb.run('loop', 'advance', '--result', 'pass');
  sb.run('loop', 'close');
  const id2 = authored(sb, [question()]);
  toVerify(sb, id2);
  verify(sb, id2, [{ qid: 'q-1.1-0001', blind: { answer: ['A'], confidence: 'high' }, issues: [], verdict: 'ok' }]);
  toGate(sb, id2);
  const p2 = sb.run('q', 'publish', id2);
  assert.equal(p2.ok, false);
  assert.match(p2.items.join('\n'), /dedupe.*似すぎ/);
  assert.equal(sb.run('q', 'find', '--service', 'codedeploy').items.length, 1);
  assert.match(sb.run('q', 'coverage').summary, /^1 \/ 300/);
});

test('placeAnswer: 正解と解説の鍵が一緒に動く', () => {
  const q = placeAnswer(question(), 2);
  assert.deepEqual(q.answer, ['C']);
  assert.match(q.choices[2].text, /blue\/green/);
  assert.equal(q.explanation.per_choice.C, '正しい');
  assert.equal(q.explanation.per_choice.A, '止まる');
  assert.deepEqual(q.choices.map((c) => c.key), ['A', 'B', 'C', 'D']);
});

test('verdict: 3 問以上を全部 high で正解したら too_easy', () => {
  const sb = sandbox();
  const qs = [1, 2, 3].map((n) => question({ id: `q-1.1-000${n}`, stem: question().stem + ` Case ${n} uses a different team and region setup.` }));
  const id = authored(sb, qs);
  toVerify(sb, id);
  verify(sb, id, qs.map((q) => ({ qid: q.id, blind: { answer: ['A'], confidence: 'high' }, issues: [], verdict: 'ok' })));
  const r = sb.run('q', 'verdict', id);
  assert.equal(r.result, 'pass');
  assert.equal(r.too_easy, true);
});

test('verdict: 検証役が ok にした言い回しの指摘は戻さない（P-005）', () => {
  const sb = sandbox();
  const id = authored(sb, [question()]);
  toVerify(sb, id);
  verify(sb, id, [{ qid: 'q-1.1-0001', blind: { answer: ['A'], confidence: 'mid' }, issues: [{ kind: 'style', detail: '補足は根拠に無いが正しい' }], verdict: 'ok' }]);
  assert.equal(sb.run('q', 'verdict', id).result, 'pass');
});

test('validate: 正解だけ長いと書く時点で落とす（P-010）', () => {
  const sb = sandbox();
  const long = question();
  long.choices[0].text = 'Use CodeDeploy blue/green deployments with a linear configuration that shifts traffic in equal increments and rolls back automatically when alarms fire.';
  const id = authored(sb, [long]);
  assert.match(sb.run('q', 'validate', id).items.join('\n'), /正解 A が長すぎる/);
});

test('verdict: 外れても検証役が根拠で確かめて ok なら通し、印を付ける（P-011）', () => {
  const sb = sandbox();
  const id = authored(sb, [question()]);
  toVerify(sb, id);
  verify(sb, id, [{ qid: 'q-1.1-0001', blind: { answer: ['C'], confidence: 'mid' }, issues: [{ kind: 'style', detail: '知識の穴' }], verdict: 'ok' }]);
  assert.equal(sb.run('q', 'verdict', id).result, 'pass');
  assert.equal(sb.read(`work/${id}/questions.json`).questions[0].low_confidence, true);
  // 外れて検証役も fix にした時は今までどおり fix
  verify(sb, id, [{ qid: 'q-1.1-0001', blind: { answer: ['C'], confidence: 'mid' }, issues: [], verdict: 'fix' }]);
  assert.equal(sb.run('q', 'verdict', id).result, 'fix');
});

test('見直し（recheck）で捨てた問題は bank で retired になる', () => {
  const sb = sandbox();
  sb.write('bank/1.1/q-1.1-0001.json', question({ status: 'verified' }));
  sb.run('loop', 'add', '--json', '{"kind":"recheck","task":"1.1","question_ids":["q-1.1-0001"],"priority":1}');
  sb.run('loop', 'start');
  const id = sb.run('loop', 'next').item.id;
  sb.write(`work/${id}/sources.md`, SOURCES);
  sb.write(`work/${id}/raw/page.md`, SOURCES);
  sb.run('docs', 'check', id);
  sb.run('loop', 'advance', '--result', 'ok');
  toVerify(sb, id);
  verify(sb, id, [{ qid: 'q-1.1-0001', blind: { answer: ['A'], confidence: 'high' }, issues: [{ kind: 'fact', detail: 'x' }], verdict: 'drop' }]);
  assert.equal(sb.run('q', 'verdict', id).result, 'drop');
  assert.equal(sb.read('bank/1.1/q-1.1-0001.json').status, 'retired');
});
