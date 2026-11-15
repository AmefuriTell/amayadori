// 結果の共有（Discord の外の単体のページ。web.js）と、𝕏（Twitter）への投稿の URL（地図の Activity でも使う）。
// 画面に頼らないので node --test で確かめる。
// 共有の文に付ける URL には ?daily を付け、開いた人を今日のお題に案内する（Discord の共有のリンクと同じ動き）。

// ゲームを公開している単体のページ（GitHub Pages「雨宿り」）。地図の Activity から 𝕏 に投稿するときは、この URL を付ける
// （Activity の URL は Discord の外からは開けないため）。
export const PUBLIC_GAME_URL = "https://amefuritell.github.io/amayadori/meteor/";
// 投稿に付けるハッシュタグ（# は付けない）。
export const HASHTAG = "隕石を当てろ";

// 共有に付けるこのページの URL（# 以降を落とし、?daily を付ける）。
export function shareUrl(href) {
  const url = new URL(href.split("#")[0]);
  url.search = "?daily";
  return url.href;
}

// ページの URL（? と # 以降を落とす）。今日のお題でない結果の投稿に付ける。
export function pageUrl(href) {
  const url = new URL(href.split("#")[0]);
  url.search = "";
  return url.href;
}

// 𝕏 の投稿の画面を開く URL（Web Intent。ログインしていれば文・URL・ハッシュタグが入った投稿の画面が開く。API の鍵は要らない）。
export function xIntentUrl(text, url) {
  const intent = new URL("https://twitter.com/intent/tweet");
  intent.searchParams.set("text", text);
  intent.searchParams.set("url", url);
  intent.searchParams.set("hashtags", HASHTAG);
  return intent.href;
}

// 端末の共有で 𝕏 に渡す文（Web Intent と同じ中身: 文・URL・ハッシュタグ）。共有だと URL の欄が落ちる 𝕏 のアプリがあるので、
// URL も文の中に入れる。
export function xShareText(text, url) {
  return `${text} ${url} #${HASHTAG}`;
}

// 投稿に付ける URL: 今日のお題の結果なら ?daily 付き（開いた人が同じお題に挑める）、ほかはページそのもの。
export function postUrl(base, daily) {
  return daily ? shareUrl(base) : pageUrl(base);
}

// 端末の共有の機能（スマートフォンなど）があればそれで、無ければ文と URL をクリップボードへ写す（copied: true を返す）。
// 共有の窓の取りやめや、クリップボードが使えないときは失敗（例外）として返し、ゲームが文を欄に出す。
export async function shareResult(message, nav = globalThis.navigator, href = globalThis.location.href) {
  const url = shareUrl(href);
  if (nav.share) {
    await nav.share({ text: message, url });
    return { success: true };
  }
  await nav.clipboard.writeText(`${message} ${url}`);
  return { success: true, copied: true };
}
