import test from 'node:test';
import assert from 'node:assert/strict';
import { htmlSections, parseSources, jaccard, ngrams } from '../tools/lib/text.mjs';
import { checkSources } from '../tools/docs.mjs';
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

test('sources.md: 読める・数と URL と語数を確かめる', () => {
  const list = parseSources(SOURCES);
  assert.equal(list.length, 2);
  assert.equal(list[0].id, 'S1');
  assert.equal(checkSources(SOURCES).errors.length, 0);
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
