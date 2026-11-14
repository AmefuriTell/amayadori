// 隕石当て・軌道に乗せろを、GitHub Pages の単体のページで遊ぶための入口（DESIGN.md）。
// 地図・Discord の SDK・サーバーの API は使わない。`npm run build` で meteor.js・meteor.css にまとめる。
// 閉じるボタンはトップのページ（このページの 1 つ上）へ戻る。結果の共有は、端末の共有の機能、無ければクリップボードへの写し。
// 𝕏 への投稿は、投稿の画面を新しいタブで開く。
// 共有したリンク（?daily）から開いた人は、そのまま今日のお題に入る。
import { openGame } from "./game/game.js";
import { postUrl, shareResult, wantsDaily, xIntentUrl } from "./share.js";

// 「🏠 トップへ」で離れたか。bfcache で戻ったときも、ページの中の値はそのまま残る。
let leftForTop = false;

function backToTop() {
  leftForTop = true;
  window.location.href = new URL("../", window.location.href).href;
}

if (typeof document !== "undefined") {
  // 「🏠 トップへ」の後にブラウザの「戻る」で戻ると、ブラウザが覚えていた、ゲームを片付けた後の空のページが出る。
  // そのときだけ読み込み直して、ゲームを開き直す（外のリンクから戻ったときは、遊んでいたゲームをそのまま続ける）。
  window.addEventListener("pageshow", (event) => {
    if (event.persisted && leftForTop) window.location.reload();
  });
  // 𝕏 への投稿は、投稿の画面（Web Intent）を新しいタブで開く（スマートフォンでは 𝕏 のアプリが開くこともある）。
  const post = (message, daily) => window.open(xIntentUrl(message, postUrl(window.location.href, daily)), "_blank", "noopener");
  openGame(backToTop, { closeLabel: "🏠 トップへ", share: (message) => shareResult(message), post, daily: wantsDaily(window.location.search) });
}
