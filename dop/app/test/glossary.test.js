import test from 'node:test';
import assert from 'node:assert/strict';
import { lookup, pageList } from '../src/logic/glossary.js';
import { toAppGlossary } from '../../tools/app.mjs';

test('A-0013 AC1 配信用の事典と、名前からページを引く', () => {
  const page = {
    id: 'codedeploy', name: 'AWS CodeDeploy', aliases: ['AWS CodeDeploy', 'CodeDeploy'], reading: 'コードデプロイ', summary: '配るサービス。',
    features: [{ title: 'a', text: 'b', source_id: 'S1' }], exam_points: [{ text: 'c', source_id: 'S1' }],
    references: [{ url: 'https://docs.aws.amazon.com/x', source_id: 'S1', quote: 'q' }], status: 'verified', created: '2026-11-26', last_checked: '2026-11-26',
  };
  const g = toAppGlossary([page, { ...page, id: 'amplify', name: 'AWS Amplify', aliases: ['AWS Amplify'] }]);
  assert.deepEqual(g.names, { 'AWS CodeDeploy': 'codedeploy', CodeDeploy: 'codedeploy', 'AWS Amplify': 'amplify' });
  assert.deepEqual(g.pages.codedeploy, {
    id: 'codedeploy', name: 'AWS CodeDeploy', reading: 'コードデプロイ', summary: '配るサービス。',
    features: [{ title: 'a', text: 'b' }], exam_points: ['c'], compare: [], references: [{ url: 'https://docs.aws.amazon.com/x', quote: 'q' }],
  });
  assert.equal(lookup(g, 'CodeDeploy').id, 'codedeploy');
  assert.equal(lookup(g, 'Amazon S3'), null);
  assert.equal(lookup(null, 'CodeDeploy'), null);
  assert.deepEqual(pageList(g).map((p) => p.id), ['amplify', 'codedeploy']);
});
