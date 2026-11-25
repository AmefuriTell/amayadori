import test from 'node:test';
import assert from 'node:assert/strict';
import { sandbox, question, toVerify, verify } from './helpers.js';
import { jaErrors } from '../tools/lib/ja.mjs';

const enOnly = (over = {}) => {
  const q = question({ status: 'verified', ...over });
  delete q.stem_ja;
  q.choices = q.choices.map(({ text_ja, ...c }) => c);
  return q;
};

test('P-012 日本語版の検査: 無い・条件の語・数字・名前', () => {
  assert.match(jaErrors(enOnly()).join('\n'), /stem_ja.*無い/);
  const q = question({
    stem: question().stem + ' The rollout must finish within 30 minutes and use CodeDeployDefault.ECSLinear10PercentEvery1Minutes.',
    stem_ja: 'ある企業は Amazon ECS で動かしている。どの方法を使うべきですか。',
  });
  const all = jaErrors(q).join('\n');
  assert.match(all, /LEAST/);
  assert.match(all, /数字 30/);
  assert.match(all, /CodeDeployDefault\.ECSLinear10PercentEvery1Minutes/);
  assert.doesNotMatch(all, /数字 (10|1)\b/); // 名前の中の数字は数えない
  assert.deepEqual(jaErrors(question()), []);
});

test('P-012 訳の項目: seed で作り、C2 から始め、日本語以外は変えさせず、答えの位置も変えない', () => {
  const sb = sandbox();
  sb.write('bank/1.1/q-1.1-0001.json', enOnly({ answer: ['A'] }));
  sb.write('bank/2.1/q-2.1-0001.json', question({ id: 'q-2.1-0001', task: '2.1', status: 'verified', stem: 'Totally different scenario about AWS Config rules and conformance packs across many accounts. Which approach is MOST efficient?' })); // 訳済み
  const seeded = sb.run('loop', 'seed', '--translate');
  assert.match(seeded.summary, /1 個、1 問/);
  sb.run('loop', 'start');
  const next = sb.run('loop', 'next');
  assert.equal(next.state, 'C2_author');
  const id = next.item.id;
  assert.match(id, /^T-/);
  const batch = sb.read(`work/${id}/questions.json`);
  assert.equal(batch.translate, true);
  assert.equal(sb.run('q', 'validate', id).ok, false); // 日本語がまだ無い

  const translated = question({ status: 'verified' });
  sb.write(`work/${id}/questions.json`, { ...batch, questions: [{ ...translated, stem: translated.stem.replace('ECS', 'EKS') }] });
  assert.match(sb.run('q', 'validate', id).items.join('\n'), /以外を変えない/);

  sb.write(`work/${id}/questions.json`, { ...batch, questions: [translated] });
  assert.equal(sb.run('q', 'validate', id).ok, true);
  sb.run('loop', 'advance', '--result', 'ok');
  sb.run('q', 'blind', id);
  const blind = sb.read(`work/${id}/blind.json`).questions[0];
  assert.match(blind.stem, /最も運用の手間/); // 日本語で解く
  assert.match(blind.choices[0].text, /線形/);
  verify(sb, id, [{ qid: 'q-1.1-0001', blind: { answer: ['A'], confidence: 'high' }, issues: [], verdict: 'ok' }]);
  sb.run('q', 'reveal', id);
  assert.match(sb.read(`work/${id}/reveal.json`).questions[0].stem_en, /LEAST/);
  assert.equal(sb.run('q', 'verdict', id).result, 'pass');
  sb.run('loop', 'advance', '--result', 'pass');
  const pub = sb.run('q', 'publish', id);
  assert.equal(pub.ok, true, JSON.stringify(pub));
  const out = sb.read('bank/1.1/q-1.1-0001.json');
  assert.deepEqual(out.answer, ['A']);
  assert.match(out.stem_ja, /最も/);
  assert.equal(out.choices[0].text_ja, translated.choices[0].text_ja);
});

test('P-012 訳で捨てても、英語の問題は retired にしない', () => {
  const sb = sandbox();
  sb.write('bank/1.1/q-1.1-0001.json', enOnly());
  sb.run('loop', 'seed', '--translate');
  sb.run('loop', 'start');
  const id = sb.run('loop', 'next').item.id;
  sb.write(`work/${id}/questions.json`, { item: id, recheck: true, translate: true, questions: [question({ status: 'verified' })] });
  sb.run('q', 'validate', id);
  sb.run('loop', 'advance', '--result', 'ok');
  sb.run('q', 'blind', id);
  verify(sb, id, [{ qid: 'q-1.1-0001', blind: { answer: ['B'], confidence: 'high' }, issues: [{ kind: 'translation', detail: 'x' }], verdict: 'drop' }]);
  sb.run('q', 'reveal', id);
  assert.equal(sb.run('q', 'verdict', id).result, 'drop');
  assert.equal(sb.read('bank/1.1/q-1.1-0001.json').status, 'verified');
});
