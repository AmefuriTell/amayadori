import test from 'node:test';
import assert from 'node:assert/strict';
import { parseSpeech, toSpoken, questionScript, answerScript } from '../src/logic/speech.js';

test('A-0009 AC1 読む文と設定', () => {
  const view = { lang: 'ja', stem: 'us-east-1 の CodeDeploy と StackSets はどれですか。', choices: [{ key: 'A', text: 'CloudWatch を使う。' }, { key: 'B', text: 'MyCodeDeployApp を使う。' }] };
  assert.deepEqual(questionScript(view), [
    { text: 'ユーエス イースト 1 の コードデプロイ と スタックセッツ はどれですか。', lang: 'ja' },
    { text: '選択肢 A。クラウドウォッチ を使う。', lang: 'ja' },
    { text: '選択肢 B。MyCodeDeployApp を使う。', lang: 'ja' }, // 名前の一部は置き換えない
  ]);
  assert.equal(toSpoken('Use CodeDeploy in us-east-1.', 'en'), 'Use CodeDeploy in us-east-1.');
  assert.deepEqual(questionScript({ lang: 'en', stem: 'Stem', choices: [{ key: 'A', text: 'One' }] })[1], { text: 'A. One', lang: 'en' });
  assert.deepEqual(answerScript({ answer: ['A', 'C'], explanation: { summary: 'Lambda を使うため。' } }, false),
    [{ text: '不正解。正解は A と C。ラムダ を使うため。', lang: 'ja' }]);
  assert.deepEqual(parseSpeech(null), { on: false, rate: 1 });
  assert.deepEqual(parseSpeech('{"on":true,"rate":1.2}'), { on: true, rate: 1.2 });
  assert.deepEqual(parseSpeech('{"on":"yes","rate":9}'), { on: false, rate: 1 });
});
