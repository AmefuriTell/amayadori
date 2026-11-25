#!/usr/bin/env node
// 資料のツール: fetch（公式ページを取り、見出しごとに切って work/<ID>/raw/ に置く）/ check（sources.md の検査）
// 進行役の文脈に Web の本文を入れないため、fetch の出力は見出しの一覧と語数だけ。
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { paths, emit, main, ToolError, ITEM_ID, rel, setResult, writeJSON, today } from './lib/io.mjs';
import { htmlSections, parseSources, ALLOWED_URL } from './lib/text.mjs';

const MIN_SOURCES = 2;
const MAX_WORDS = 300;
const MIN_BODY_WORDS = 50;

function slug(url) {
  return url.replace(/^https:\/\//, '').replace(/[#?].*$/, '').replace(/\.html?$/, '').replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '').slice(-80);
}

// 原文と照らすための緩い形: 英数字だけを残す（表の行を「名前: 説明」と写しても合うように）
const loose = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

/** 原文の控え（work/<ID>/raw/*.md）に無い文。5 語以上の文を 1 つずつ見る。行頭の「見出し: 」は除く */
export function notInRaw(quote, rawText) {
  const raw = loose(rawText);
  return quote
    .split('\n')
    .flatMap((l) => l.split(/(?<=[.!?])\s+/))
    .map((x) => x.replace(/^[A-Z][A-Za-z ()/-]{0,40}:\s+/, ''))
    .filter((x) => loose(x).split(' ').length >= 5 && !raw.includes(loose(x)));
}

/** sources.md の検査（C1 の終わり）。rawText を渡すと原文のままかも確かめる。[{ id, message }] */
export function checkSources(md, rawText) {
  const list = parseSources(md);
  const errors = [];
  const ids = new Set();
  for (const s of list) {
    const id = s.id ?? '(番号なし)';
    if (!s.id) errors.push({ id, message: '見出しは "## S<番号> <題> — <見出し>"' });
    else if (ids.has(s.id)) errors.push({ id, message: '同じ番号がある' });
    ids.add(s.id);
    if (!s.url) errors.push({ id, message: 'url: の行が無い' });
    else if (!ALLOWED_URL.test(s.url)) errors.push({ id, message: `許可していない URL: ${s.url}` });
    if (!s.fetched || !/^\d{4}-\d{2}-\d{2}$/.test(s.fetched)) errors.push({ id, message: 'fetched: YYYY-MM-DD の行が無い' });
    if (!s.quote) errors.push({ id, message: '原文（> で始まる行）が無い' });
    if (s.words > MAX_WORDS) errors.push({ id, message: `原文が ${MAX_WORDS} 語を超える（${s.words}）` });
    if (rawText !== undefined && s.quote) {
      for (const x of notInRaw(s.quote, rawText)) errors.push({ id, message: `原文の控えに無い文（写し間違い・言い換え・別の所の文をつないだ）: ${x.slice(0, 80)}` });
    }
  }
  if (rawText === undefined) errors.push({ id: '(全体)', message: '原文の控え（work/<ID>/raw/*.md）が無い。docs fetch で取るか、WebFetch で取った本文を raw/ に .md で置く' });
  // S0 は廃止などの告知の欄なので、根拠の数には入れない
  const n = list.filter((s) => s.id && s.id !== 'S0').length;
  if (n < MIN_SOURCES) errors.push({ id: '(全体)', message: `根拠が ${MIN_SOURCES} つ未満（${n}）。足りなければ loop advance --result no_source` });
  return { list, errors };
}

const commands = {
  fetch(args) {
    const url = args._[0];
    const id = args.item;
    if (typeof url !== 'string' || !ALLOWED_URL.test(url)) throw new ToolError(`許可した URL だけ取れる（docs.aws.amazon.com など）: ${url}`);
    if (typeof id !== 'string' || !ITEM_ID.test(id)) throw new ToolError('--item <項目 ID> が要る');
    let html;
    try {
      // curl を使う（プロキシの環境変数をそのまま使えるため）
      html = execFileSync('curl', ['-sS', '-L', '--max-time', '30', '-A', 'dop-loop/1.0', '-w', '\n__HTTP_CODE__%{http_code}', url], { encoding: 'utf8', maxBuffer: 20 * 1024 * 1024, stdio: ['ignore', 'pipe', 'pipe'] });
    } catch (e) {
      return emit({ ok: false, summary: `取れなかった: ${String(e.stderr ?? e.message).split('\n')[0]}`, repeatKey: `fetch:${url}` });
    }
    const code = html.match(/__HTTP_CODE__(\d+)$/)?.[1];
    html = html.replace(/\n__HTTP_CODE__\d+$/, '');
    if (code !== '200') {
      // 無いページ（404）を本文として保存しない。URL を推測せず、取れたページのリンクか検索で探す
      return emit({ ok: false, summary: `HTTP ${code}: ページが無い。URL を推測で作らず、取れたページの中のリンクから探す`, repeatKey: `fetch:${url}` });
    }
    // AWS のドキュメントは、無いページを meta refresh でサービスの先頭へ飛ばすことがある（HTTP は 200）
    const refresh = html.match(/http-equiv=["']refresh["'][^>]*content=["'][^"']*url=([^"'>]+)/i)?.[1];
    if (refresh) {
      const to = new URL(refresh.trim(), url).href;
      return emit({ ok: false, summary: `別のページへ飛ばされる（${to}）。このページは無い。URL を推測せず、取れたページの中のリンクから探す`, repeatKey: `fetch:${url}` });
    }
    const { title, sections } = htmlSections(html);
    const total = sections.reduce((n, s) => n + s.words, 0);
    if (total < MIN_BODY_WORDS) {
      return emit({ ok: false, summary: `本文がほとんど無い（${total} 語）。ページの形が違うか、無いページ`, repeatKey: `fetch:${url}` });
    }
    const name = slug(url);
    const file = paths.work(id, 'raw', `${name}.md`);
    const body = [`# ${title}`, `url: ${url}`, `fetched: ${today()}`, '']
      .concat(sections.map((s) => `## ${s.heading}${s.anchor ? ` {#${s.anchor}}` : ''}\n\n${s.text}\n`))
      .join('\n');
    fs.mkdirSync(paths.work(id, 'raw'), { recursive: true });
    fs.writeFileSync(file, body);
    // 次に取るページを推測で作らないため、本文の中のリンク（許可した URL だけ）を残す
    const main = html.slice(Math.max(0, html.search(/<div[^>]+id="main-col-body"/i)));
    const links = [...new Set([...main.matchAll(/<a[^>]+href="([^"#][^"]*)"[^>]*>([\s\S]*?)<\/a>/gi)]
      .map(([, href, text]) => { try { return `${new URL(href, url).href.split('#')[0]}\t${text.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()}`; } catch { return null; } })
      .filter((l) => l && ALLOWED_URL.test(l)))];
    fs.writeFileSync(paths.work(id, 'raw', `${name}.links.txt`), links.join('\n') + '\n');
    writeJSON(paths.work(id, 'raw', `${name}.json`), { url, title, fetched: today(), sections: sections.map(({ heading, anchor, words }) => ({ heading, anchor, words })) });
    emit({
      ok: true,
      summary: `${title}: ${sections.length} 見出し → ${rel(file)}`,
      items: sections.map((s) => `${s.heading}${s.anchor ? ` #${s.anchor}` : ''}（${s.words} 語）`),
      extra: { file: rel(file), links: rel(paths.work(id, 'raw', `${name}.links.txt`)) },
    });
  },

  check(args) {
    const id = args._[0];
    if (typeof id !== 'string' || !ITEM_ID.test(id)) throw new ToolError('項目 ID を渡す');
    const file = paths.work(id, 'sources.md');
    if (!fs.existsSync(file)) throw new ToolError(`work/${id}/sources.md が無い`);
    const rawDir = paths.work(id, 'raw');
    const rawFiles = fs.existsSync(rawDir) ? fs.readdirSync(rawDir).filter((f) => f.endsWith('.md')) : [];
    const rawText = rawFiles.length ? rawFiles.map((f) => fs.readFileSync(`${rawDir}/${f}`, 'utf8')).join('\n') : undefined;
    const { list, errors } = checkSources(fs.readFileSync(file, 'utf8'), rawText);
    if (!errors.length) setResult(id, 'C1_research', 'ok');
    emit({
      ok: !errors.length,
      summary: errors.length ? `${errors.length} 件の誤り` : `出典 ${list.length} 個、全部よい → loop advance --result ok`,
      items: errors.map((e) => `${e.id}: ${e.message}`),
      repeatKey: `sources:${id}`,
    });
  },
};

if (import.meta.url === `file://${process.argv[1]}`) main(commands);
export { commands };
