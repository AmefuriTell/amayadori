// 試験の手伝い: 作業の置き場を一時フォルダにしてツールを動かす。
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export function sandbox() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'dop-test-'));
  const run = (tool, ...args) => {
    try {
      const out = execFileSync('node', [path.join(ROOT, 'tools', `${tool}.mjs`), ...args], { env: { ...process.env, DOP_DATA: dir }, encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
      return { code: 0, ...JSON.parse(out) };
    } catch (e) {
      if (e.stdout) return { code: e.status, ...JSON.parse(e.stdout) };
      throw e;
    }
  };
  const write = (rel, content) => {
    const file = path.join(dir, rel);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, typeof content === 'string' ? content : JSON.stringify(content, null, 2));
  };
  const read = (rel) => JSON.parse(fs.readFileSync(path.join(dir, rel), 'utf8'));
  const exists = (rel) => fs.existsSync(path.join(dir, rel));
  const hook = (mode, input) => {
    try {
      execFileSync('node', [path.join(ROOT, 'tools', 'hooks.mjs'), mode], { env: { ...process.env, DOP_DATA: dir }, input: JSON.stringify(input), encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
      return { code: 0, stderr: '' };
    } catch (e) {
      return { code: e.status, stderr: e.stderr };
    }
  };
  return { dir, run, write, read, exists, hook };
}

export const SOURCES = `## S1 What is CodeDeploy — Blue/green
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/welcome.html
fetched: 2026-11-25
> CodeDeploy provisions your new application version alongside the old version before rerouting your production traffic.

## S2 Deployment configurations
url: https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-configurations.html
fetched: 2026-11-25
> Linear configurations shift traffic in equal increments with an equal number of minutes between each increment.
`;

export function question(over = {}) {
  return {
    id: 'q-1.1-0001',
    task: '1.1',
    services: ['CodeDeploy'],
    type: 'single',
    select_count: 1,
    stem: 'A company runs an application on Amazon ECS and wants to release new versions gradually with minimal interruption. Which solution meets these requirements with the LEAST operational effort?',
    choices: [
      { key: 'A', text: 'Use CodeDeploy blue/green deployments with a linear configuration.' },
      { key: 'B', text: 'Update the ECS service by hand during a maintenance window.' },
      { key: 'C', text: 'Write a Lambda function that changes the desired count every minute.' },
      { key: 'D', text: 'Create a second cluster and switch the DNS record with a manual script.' },
    ],
    answer: ['A'],
    explanation: { summary: '説明', per_choice: { A: '正しい', B: '止まる', C: '手間', D: '手作業' } },
    references: [{ url: 'https://docs.aws.amazon.com/codedeploy/latest/userguide/welcome.html', source_id: 'S1', quote: 'provisions your new application version alongside the old version' }],
    difficulty: 2,
    status: 'draft',
    created: '2026-11-25',
    ...over,
  };
}

/** content の項目を 1 つ足して C2_author まで進める */
export function toAuthor(sb, item = {}) {
  sb.run('loop', 'add', '--json', JSON.stringify({ kind: 'content', task: '1.1', topic: 't', count: 5, priority: 2, ...item }));
  sb.run('loop', 'start');
  const n = sb.run('loop', 'next');
  const id = n.item.id;
  sb.write(`work/${id}/sources.md`, SOURCES);
  sb.run('docs', 'check', id);
  sb.run('loop', 'advance', '--result', 'ok');
  return id;
}

export function verify(sb, id, entries) {
  sb.write(`work/${id}/verify.json`, { item: id, questions: entries });
}

/** C2 → C3（validate が通る束を置いた後） */
export function toVerify(sb, id) {
  const v = sb.run('q', 'validate', id);
  if (!v.ok) throw new Error(JSON.stringify(v));
  sb.run('loop', 'advance', '--result', 'ok');
}

/** C3 で全部 ok にして C4 へ */
export function toGate(sb, id) {
  const r = sb.run('q', 'verdict', id);
  if (r.result !== 'pass') throw new Error(JSON.stringify(r));
  sb.run('loop', 'advance', '--result', 'pass');
}
