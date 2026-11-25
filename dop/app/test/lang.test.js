import test from 'node:test';
import assert from 'node:assert/strict';
import { display, parseLang } from '../src/logic/lang.js';
import { toAppQuestion } from '../../tools/app.mjs';

const base = {
  id: 'q-1.4-0001', task: '1.4', services: ['AWS CodeDeploy'], type: 'single', select_count: 1, stem: 'English stem',
  choices: [{ key: 'A', text: 'one', text_ja: '一' }, { key: 'B', text: 'two', text_ja: '二' }], answer: ['A'],
  explanation: { summary: 'x', per_choice: {} }, references: [], status: 'verified',
};

test('A-0008 AC1 配信用の問題に日本語版が入り、出す文を言葉で選ぶ', () => {
  const app = toAppQuestion({ ...base, stem_ja: '日本語の問題文' });
  assert.equal(app.stem_ja, '日本語の問題文');
  assert.equal(app.choices[1].text_ja, '二');
  assert.deepEqual(display(app, 'ja'), { ja: true, lang: 'ja', stem: '日本語の問題文', choices: [{ key: 'A', text: '一' }, { key: 'B', text: '二' }] });
  assert.equal(display(app, 'en').stem, 'English stem');
  const noJa = toAppQuestion({ ...base, choices: base.choices.map(({ text_ja, ...c }) => c) });
  assert.equal('stem_ja' in noJa, false);
  assert.deepEqual(display(noJa, 'ja'), { ja: false, lang: 'en', stem: 'English stem', choices: [{ key: 'A', text: 'one' }, { key: 'B', text: 'two' }] });
  assert.equal(parseLang(null), 'ja');
  assert.equal(parseLang('en'), 'en');
});
