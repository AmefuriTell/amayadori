// 日本語版（stem_ja・choices[].text_ja）の機械で見られる検査（P-012）。訳の意味のずれは C3 の検証役が見る。
const JA = /[぀-ヿ一-鿿]/;
// 英語の条件の語 → 日本語に要る語
const QUAL = [
  [/\bLEAST\b/, /最も.{0,15}(少な|低|短|小さ)|最小|最少|最低|最短/, 'LEAST → 「最も少ない」「最小」など'],
  [/\bMOST\b/, /最も|最大/, 'MOST → 「最も」'],
  [/\bBEST\b/, /最も|最適|最善/, 'BEST → 「最も」「最適」'],
  [/\(Choose TWO\.?\)/, /[2２二]\s*つ/, '(Choose TWO.) → 「2 つ選択」'],
  [/\(Choose THREE\.?\)/, /[3３三]\s*つ/, '(Choose THREE.) → 「3 つ選択」'],
];
const nums = (s) => (String(s).replace(/(\d),(\d{3})/g, '$1$2').match(/(?<![A-Za-z\d.])\d+(?:\.\d+)?(?![A-Za-z\d])/g) ?? []);
// 訳さずに残す語: CodeDeploy のような途中に大文字がある語、s3:GetObject・AWS::S3::Bucket・a_b のような記号の入った語
const codeTokens = (s) => [...new Set(String(s).match(/[A-Za-z0-9][\w.:/-]*(?:[a-z][A-Z]|::|[a-z0-9]:[A-Za-z*]|_)[\w.:/*-]*/g) ?? [])]
  .map((t) => t.replace(/[.:/-]+$/, ''));

/** 1 問の日本語版の誤り（文の配列） */
export function jaErrors(q) {
  const out = [];
  const pairs = [['問題文', q.stem, q.stem_ja], ...(q.choices ?? []).map((c) => [`選択肢 ${c.key}`, c.text, c.text_ja])];
  for (const [where, en, ja] of pairs) {
    if (typeof ja !== 'string' || !ja.trim()) { out.push(`${where} の日本語（${where === '問題文' ? 'stem_ja' : 'text_ja'}）が無い`); continue; }
    if (!JA.test(ja)) { out.push(`${where} の日本語に日本語の文字が無い`); continue; }
    const jaN = new Set(nums(ja));
    const miss = nums(en).filter((n) => !jaN.has(n));
    if (miss.length) out.push(`${where}: 英語の数字 ${[...new Set(miss)].join(', ')} が日本語に無い`);
    const lost = codeTokens(en).filter((t) => !ja.includes(t));
    if (lost.length) out.push(`${where}: 英語の名前 ${lost.slice(0, 5).join(', ')} を日本語でもそのまま書く`);
  }
  if (typeof q.stem_ja === 'string') {
    for (const [en, ja, msg] of QUAL) if (en.test(q.stem ?? '') && !ja.test(q.stem_ja)) out.push(`問題文の条件の語が日本語に無い（${msg}）`);
  }
  // 正解だけ長い（日本語の文字数で）
  const len = (c) => String(c.text_ja ?? '').length;
  const right = (q.choices ?? []).filter((c) => q.answer?.includes(c.key));
  const wrong = (q.choices ?? []).filter((c) => !q.answer?.includes(c.key));
  const avg = wrong.reduce((n, c) => n + len(c), 0) / Math.max(1, wrong.length);
  for (const c of right) if (avg && len(c) > avg * 1.5) out.push(`日本語の正解 ${c.key} が長すぎる（${len(c)} 字、他の平均 ${avg.toFixed(0)} 字）`);
  return out;
}

/** 訳の束（translate）で、日本語以外を変えていないか。bank の元と比べる */
export function changedBesidesJa(q, orig) {
  const strip = (x) => JSON.stringify({ ...x, stem_ja: undefined, low_confidence: undefined, last_checked: undefined, status: undefined, choices: (x.choices ?? []).map(({ text_ja, ...c }) => c) });
  return strip(q) !== strip(orig);
}
