import test from 'node:test';
import assert from 'node:assert/strict';
import { htmlSections, parseSources, jaccard, ngrams } from '../tools/lib/text.mjs';
import { checkSources, notInRaw } from '../tools/docs.mjs';
import { validate } from '../tools/lib/schema.mjs';
import { SOURCES } from './helpers.js';

test('htmlSections: 本文だけを見出しで切る', () => {
  const html = `<html><head><title>Blue/green - CodeDeploy</title><script>x()</script></head><body>
    <nav>menu</nav><div id="main-col-body"><h1 id="top">Blue/green</h1><p>Intro &amp; more.</p>
    <h2 id="ecs">On ECS</h2><ul><li>Linear</li><li>Canary</li></ul></div><footer>foot</footer></body></html>`;
  const { title, sections } = htmlSections(html);
  assert.equal(title, 'Blue/green - CodeDeploy');
  assert.deepEqual(sections.map((s) => [s.heading, s.anchor]), [['Blue/green', 'top'], ['On ECS', 'ecs']]);
  assert.equal(sections[0].text, 'Intro & more.');
  assert.equal(sections[1].text, '- Linear\n- Canary');
});

test('htmlSections: awsdocs-view に包まれた本文も取れる', () => {
  const html = '<awsdocs-view><div id="main-col-body"><awsdocs-language-banner x="1"></awsdocs-language-banner><h1 id="a">Title</h1><p>Body text here.</p></div></awsdocs-view>';
  const { sections } = htmlSections(html);
  assert.deepEqual(sections.map((s) => s.text), ['Body text here.']);
});

test('sources.md: 読める・数と URL と語数を確かめる', () => {
  const list = parseSources(SOURCES);
  assert.equal(list.length, 2);
  assert.equal(list[0].id, 'S1');
  assert.equal(checkSources(SOURCES, SOURCES).errors.length, 0);
  assert.match(checkSources(SOURCES).errors[0].message, /原文の控え/);
  const bad = SOURCES.replace('https://docs.aws.amazon.com/codedeploy/latest/userguide/welcome.html', 'https://example.com/a').split('## S2')[0];
  const msgs = checkSources(bad).errors.map((e) => e.message).join('\n');
  assert.match(msgs, /許可していない URL/);
  assert.match(msgs, /根拠が 2 つ未満/);
});

test('jaccard', () => {
  assert.equal(jaccard(ngrams('a b c d'), ngrams('a b c d')), 1);
  assert.ok(jaccard(ngrams('a b c d e'), ngrams('x y z w')) === 0);
});

test('schema: 使っていない語は未対応として落とす', () => {
  assert.equal(validate({ type: 'string', oneOf: [] }, 'x')[0].message, 'スキーマの語 oneOf はこの検査では未対応');
  assert.equal(validate({ type: 'object', required: ['a'], additionalProperties: false, properties: { a: { enum: [1] } } }, { a: 2, b: 1 }).length, 2);
});

test('notInRaw: 表の行を「名前: 説明」と写すのは通し、言い換えは落とす', () => {
  const raw = 'Deployment configuration\nDescription\nCodeDeployDefault.LambdaCanary10Percent5Minutes\nShifts 10 percent of traffic in the first increment. The remaining 90 percent\nis deployed five minutes later.';
  assert.deepEqual(notInRaw('CodeDeployDefault.LambdaCanary10Percent5Minutes: Shifts 10 percent of traffic in the first increment. The remaining 90 percent is deployed five minutes later.', raw), []);
  assert.equal(notInRaw('Moves ten percent of the traffic first and the rest later on.', raw).length, 1);
});

test('P-020 docs check: 見出しの # の数と、引用の続きの行の「> 」の抜けを返す', async () => {
  const { formatErrors } = await import('../tools/docs.mjs');
  const good = '## S1 A — B\nurl: https://docs.aws.amazon.com/x\nfetched: 2026-01-01\n> line one\n> line two\n';
  assert.deepEqual(formatErrors(good), []);
  const bad = '# S0 Notice\nurl: https://docs.aws.amazon.com/y\n\n## S1 A — B\nurl: https://docs.aws.amazon.com/x\n> line one\nline two without marker\n';
  const msgs = formatErrors(bad).map((e) => `${e.id} ${e.message}`).join('\n');
  assert.match(msgs, /S0 .*見出しは「## S0/);
  assert.match(msgs, /S1 .*7 行目.*「> 」/);
});
