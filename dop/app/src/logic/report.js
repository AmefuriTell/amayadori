// 誤りの報告（画面にも localStorage にも頼らない部分）

export const REPORT_KEY = 'dop:v1:reports';
export const MAX_COMMENT = 1000;
export const ISSUE_NEW = 'https://github.com/AmefuriTell/amayadori/issues/new';
export const KINDS = { answer: '答えが違う', stem: '問題文がおかしい', explanation: '解説や出典がおかしい', other: 'その他' };

const valid = (x) => x && typeof x.id === 'string' && x.kind in KINDS && typeof x.comment === 'string' && typeof x.at === 'number';

export function parseReports(text) {
  if (typeof text !== 'string') return [];
  try {
    const data = JSON.parse(text);
    if (data?.v !== 1 || !Array.isArray(data.reports)) return [];
    return data.reports.filter(valid);
  } catch {
    return [];
  }
}

export function serializeReports(reports) {
  return JSON.stringify({ v: 1, reports });
}

export function clampComment(text) {
  return [...String(text ?? '')].slice(0, MAX_COMMENT).join('');
}

export function addReport(reports, entry) {
  return [...reports, { ...entry, comment: clampComment(entry.comment) }];
}

/** GitHub の issue の下書きの URL（ループが dop-report のラベルで拾う） */
export function issueUrl({ id, kind, comment, selected = [] }) {
  const body = [
    `- 問題: ${id}`,
    `- 種類: ${KINDS[kind] ?? kind}`,
    `- 選んだ答え: ${selected.length ? selected.join(', ') : '（なし）'}`,
    '',
    clampComment(comment) || '（コメントなし）',
    '',
    '<!-- dop-report: アプリの「誤りを報告」から作った下書き -->',
  ].join('\n');
  const u = new URL(ISSUE_NEW);
  u.searchParams.set('title', `[DOP] 誤りの報告 ${id}`);
  u.searchParams.set('body', body);
  u.searchParams.set('labels', 'dop-report');
  return u.href;
}
