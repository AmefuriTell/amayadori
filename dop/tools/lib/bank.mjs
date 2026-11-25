// bank（公開済みの問題）と設定を読む。AI は bank を直接読まず、ここを通したツールの要約だけを見る。
import fs from 'node:fs';
import path from 'node:path';
import { paths, readJSON } from './io.mjs';

export function loadBank() {
  const root = paths.bank();
  if (!fs.existsSync(root)) return [];
  const out = [];
  for (const dir of fs.readdirSync(root, { withFileTypes: true })) {
    if (!dir.isDirectory()) continue;
    for (const f of fs.readdirSync(path.join(root, dir.name))) {
      if (f.endsWith('.json')) out.push(readJSON(path.join(root, dir.name, f)));
    }
  }
  return out.sort((a, b) => a.id.localeCompare(b.id));
}

export const exam = () => readJSON(paths.config('exam.json'));
export const serviceStatus = () => readJSON(paths.config('service-status.json'));

/** タスク番号の一覧。試験ガイドから足すまでは空。 */
export function taskIds(ex = exam()) {
  return ex.domains.flatMap((d) => (d.tasks ?? []).map((t) => (typeof t === 'string' ? t : t.id)));
}

/**
 * タスク番号（無ければドメイン）ごとの、今の数・目標・不足。
 * 目標 = ドメインの割合 × 目標の総数 ÷ そのドメインのタスク数。
 */
export function coverage(bank = loadBank().filter((q) => q.status === 'verified'), ex = exam()) {
  const total = ex.target_total_questions;
  const rows = [];
  for (const d of ex.domains) {
    const tasks = (d.tasks ?? []).map((t) => (typeof t === 'string' ? t : t.id));
    const keys = tasks.length ? tasks : [String(d.id)];
    for (const key of keys) {
      const target = Math.round((d.weight * total) / keys.length);
      const have = bank.filter((q) => (tasks.length ? q.task === key : q.task.split('.')[0] === key)).length;
      rows.push({ key, domain: d.id, have, target, deficit: Math.max(0, target - have) });
    }
  }
  return { total: bank.length, target: total, rows };
}
