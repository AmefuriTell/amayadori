// 作業の一覧（backlog）の読み書きと、項目 ID の振り方（F-0001 で loop.mjs から切り出した）。
import { paths, readJSON, writeJSON, ToolError } from './io.mjs';

export const KIND_PREFIX = { content: 'C', app: 'A', learn: 'L', recheck: 'R', translate: 'T', glossary: 'G', diagram: 'D', refactor: 'F' };
export const loadBacklog = () => readJSON(paths.backlog(), []);
export const saveBacklog = (b) => writeJSON(paths.backlog(), b);

export function nextId(backlog, kind) {
  const prefix = KIND_PREFIX[kind];
  if (!prefix) throw new ToolError(`kind が違う: ${kind}`);
  const n = Math.max(0, ...backlog.filter((b) => b.id.startsWith(prefix + '-')).map((b) => Number(b.id.slice(2))));
  return `${prefix}-${String(n + 1).padStart(4, '0')}`;
}
