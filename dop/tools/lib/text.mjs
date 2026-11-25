// 文字の処理: 似ている度合い・HTML を見出しで切る・sources.md を読む。

export function normalize(s) {
  return s.toLowerCase().replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, ' ').trim();
}

export function words(s) {
  return normalize(s).match(/[a-z0-9][a-z0-9'._-]*/g) ?? [];
}

export function ngrams(s, n = 3) {
  const w = words(s);
  const set = new Set();
  for (let i = 0; i + n <= w.length; i++) set.add(w.slice(i, i + n).join(' '));
  return set;
}

export function jaccard(a, b) {
  if (!a.size && !b.size) return 0;
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  return inter / (a.size + b.size - inter);
}

/** 問題の「問題文＋正解」の文。似ている問題を探す時に使う。 */
export function questionText(q) {
  const correct = q.choices.filter((c) => q.answer.includes(c.key)).map((c) => c.text);
  return [q.stem, ...correct].join(' ');
}

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
function decode(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n.toLowerCase()] ?? m);
}

function inlineText(html) {
  return decode(
    html
      .replace(/<(br|\/p|\/li|\/tr|\/h[1-6]|\/pre|\/div)[^>]*>/gi, '\n')
      .replace(/<li[^>]*>/gi, '- ')
      .replace(/<[^>]+>/g, ''),
  )
    .split('\n').map((l) => l.replace(/[ \t]+/g, ' ').trim()).filter(Boolean).join('\n');
}

/**
 * HTML の本文を見出し（h1〜h4）ごとに切る。AWS のドキュメントは #main-col-body が本文。
 * @returns {{title: string, sections: {heading: string, anchor: string|null, text: string, words: number}[]}}
 */
export function htmlSections(html) {
  const title = decode((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? '').trim());
  let body = html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(script|style|noscript|svg|nav|header|footer|awsdocs-[a-z-]+)[\s\S]*?<\/\1>/gi, '');
  const main = body.search(/<div[^>]+id="main-col-body"/i);
  if (main >= 0) body = body.slice(main);
  else {
    const m = body.search(/<main[\s>]/i);
    if (m >= 0) body = body.slice(m);
  }
  const parts = body.split(/(?=<h[1-4][\s>])/i);
  const sections = [];
  for (const part of parts) {
    const h = part.match(/^<h[1-4]([^>]*)>([\s\S]*?)<\/h[1-4]>/i);
    const heading = h ? inlineText(h[2]).replace(/\n/g, ' ') : '(はじめ)';
    const anchor = h ? (h[1].match(/id="([^"]+)"/)?.[1] ?? null) : null;
    const text = inlineText(h ? part.slice(h[0].length) : part);
    if (!text && !h) continue;
    sections.push({ heading, anchor, text, words: words(text).length });
  }
  return { title, sections };
}

/**
 * sources.md を読む。形は loop/steps/C1-research.md の researcher_prompt。
 * @returns {{id: string, heading: string, url: string|null, fetched: string|null, quote: string, words: number}[]}
 */
export function parseSources(md) {
  const out = [];
  const blocks = md.split(/^## /m).slice(1);
  for (const b of blocks) {
    const [head, ...lines] = b.split('\n');
    const id = head.match(/^(S\d+)\b/)?.[1] ?? null;
    const url = lines.find((l) => /^url:\s*/.test(l))?.replace(/^url:\s*/, '').trim() ?? null;
    const fetched = lines.find((l) => /^fetched:\s*/.test(l))?.replace(/^fetched:\s*/, '').trim() ?? null;
    const quote = lines.filter((l) => l.startsWith('>')).map((l) => l.replace(/^>\s?/, '')).join('\n').trim();
    out.push({ id, heading: head.replace(/^S\d+\s*/, '').trim(), url, fetched, quote, words: words(quote).length });
  }
  return out;
}

// 根拠に使ってよい URL（loop/steps/C1-research.md の allowed_domains と schemas/question.schema.json の pattern と同じ）
export const ALLOWED_URL = /^https:\/\/(docs\.aws\.amazon\.com\/|aws\.amazon\.com\/(blogs|about-aws\/whats-new|certification)\/|d1\.awsstatic\.com\/)/;
