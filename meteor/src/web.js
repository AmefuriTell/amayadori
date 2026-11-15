// 隕石当て・軌道に乗せろを、GitHub Pages の単体のページで遊ぶための入口（DESIGN.md）。
// 地図・Discord の SDK・サーバーの API は使わない。`npm run build` で meteor.js・meteor.css にまとめる。
// 閉じるボタンはトップのページ（このページの 1 つ上）へ戻る。結果の共有は、端末の共有の機能、無ければクリップボードへの写し。
// 𝕏 への投稿は、投稿の画面を新しいタブで開く。軌道に乗せろは GIF も付ける（端末の共有で渡すか、保存してから投稿の画面）。
import { openGame } from "./game/game.js";
import { postUrl, shareResult, xIntentUrl, xShareText } from "./share.js";

// 「🏠 トップへ」で離れたか。bfcache で戻ったときも、ページの中の値はそのまま残る。
let leftForTop = false;

function backToTop() {
  leftForTop = true;
  window.location.href = new URL("../", window.location.href).href;
}

// GIF を orbit.gif として保存させる（a[download]）。
function saveGif(blob) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "orbit.gif";
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(link.href), 60000);
}

if (typeof document !== "undefined") {
  // 「🏠 トップへ」の後にブラウザの「戻る」で戻ると、ブラウザが覚えていた、ゲームを片付けた後の空のページが出る。
  // そのときだけ読み込み直して、ゲームを開き直す（外のリンクから戻ったときは、遊んでいたゲームをそのまま続ける）。
  window.addEventListener("pageshow", (event) => {
    if (event.persisted && leftForTop) window.location.reload();
  });
  // 𝕏 への投稿は、投稿の画面（Web Intent）を新しいタブで開く（スマートフォンでは 𝕏 のアプリが開くこともある）。
  // gif（軌道に乗せろの軌跡。省略できる。{ blob: できていれば Blob, ready: できたら Blob になる Promise }）があれば付ける:
  // Web Intent では画像を付けられないので、端末の共有でファイルを渡せればそれで（文に URL とハッシュタグを入れる）、
  // 渡せなければ投稿の画面を先に開いて（ポップアップを止められないように同期で）、GIF を保存させる（添付は利用者が手で）。
  const post = (message, daily, gif) => {
    const url = postUrl(window.location.href, daily);
    const file = gif?.blob ? new File([gif.blob], "orbit.gif", { type: "image/gif" }) : null;
    if (file && navigator.canShare?.({ files: [file] })) {
      navigator.share({ files: [file], text: xShareText(message, url) }).catch((error) => {
        // 取りやめは何もしない。ほかの失敗は、共有できない時と同じく保存してから投稿の画面へ。
        if (error?.name === "AbortError") return;
        window.open(xIntentUrl(message, url), "_blank", "noopener");
        saveGif(gif.blob);
      });
      return;
    }
    window.open(xIntentUrl(message, url), "_blank", "noopener");
    if (gif) (gif.blob ? Promise.resolve(gif.blob) : gif.ready).then((blob) => blob && saveGif(blob));
  };
  openGame(backToTop, { closeLabel: "🏠 トップへ", share: (message) => shareResult(message), post });
}
