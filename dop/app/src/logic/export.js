// 記録の書き出し（画面に頼らない部分）。L1 の learn weak がこの形を読む。

/** 書き出す中身 */
export function buildExport(answers, reports, now = new Date()) {
  return { v: 1, exported_at: now.toISOString(), exam: 'DOP-C02', answers: [...answers], reports: [...reports] };
}

/** ファイル名: dop-record-YYYYMMDD-HHMM.json（UTC） */
export function exportFileName(now = new Date()) {
  const s = now.toISOString();
  return `dop-record-${s.slice(0, 10).replace(/-/g, '')}-${s.slice(11, 16).replace(':', '')}.json`;
}
