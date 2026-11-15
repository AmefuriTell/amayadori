// 隕石当て・軌道に乗せろを、GitHub Pages の単体のページで遊ぶための入口（DESIGN.md）。
// 地図・Discord の SDK・サーバーの API は使わない。`npm run build` で meteor.js・meteor.css にまとめる。
// 閉じるボタンはトップのページ（このページの 1 つ上）へ戻る。結果の共有は、端末の共有の機能、無ければクリップボードへの写し。
// 𝕏 への投稿は、投稿の画面を新しいタブで開く。軌道に乗せろは GIF も付ける（端末の共有で渡すか、保存してから投稿の画面）。
import { openGame } from "./game/game.js";
import { isMobileDevice, postUrl, shareResult, xIntentUrl, xShareText } from "./share.js";

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
  // gif（軌道に乗せろの軌跡。省略できる。{ blob: できていれば Blob, ready: できたら Blob になる Promise, note: 結果の欄に 1 行出す }）
  // があれば付ける: Web Intent では画像を付けられないので、スマホ・タブレットで端末の共有にファイルを渡せればそれで（文に URL と
  // ハッシュタグを入れる）、ほかは投稿の画面を先に開いて（ポップアップを止められないように同期で）、GIF を 1 回だけ保存させる
  // （添付は利用者が手で）。共有が取りやめ以外で失敗したら、その場では開かず（止められるため）、次に押した時に開いて保存する。
  // ?debug を付けた時だけ、案内の行に共有の状態を足す（実機で GIF が付かない原因を絞るため）。
  const debug = new URLSearchParams(window.location.search).has("debug");
  let lastError = "-";
  const say = (gif, text) => {
    if (!debug) return gif.note?.(text);
    const script = document.querySelector('script[src*="meteor.js"]');
    const version = script ? new URL(script.src).searchParams.get("v") : "?";
    const probe = navigator.canShare?.({ files: [new File([], "orbit.gif", { type: "image/gif" })] });
    const state = gif.blob ? gif.blob.size : gif.done ? "null" : "作成中";
    gif.note?.(`${text} [v=${version} mobile=${isMobileDevice(navigator)} share=${Boolean(navigator.share)} canShare=${probe} gif=${state} err=${lastError}]`);
  };
  // 共有に渡す。waited は、GIF ができるのを待った後か（待つと押した操作の有効な時間を過ぎ、NotAllowedError になることがある）。
  // 共有の途中（sharing）は押しても何もしない。取りやめ・前の共有がまだ開いている（InvalidStateError）は何も出さない。
  const shareGif = (blob, message, url, gif, waited) => {
    const file = new File([blob], "orbit.gif", { type: "image/gif" });
    if (!navigator.canShare?.({ files: [file] })) return false;
    gif.sharing = true;
    navigator
      .share({ files: [file], text: xShareText(message, url) })
      .then(
        () => say(gif, ""),
        (error) => {
          lastError = error?.name || "Error";
          if (lastError === "AbortError" || lastError === "InvalidStateError") return say(gif, "");
          if (lastError === "NotAllowedError" && waited) return say(gif, "GIF ができました。もう一度押してください");
          gif.noShare = true;
          say(gif, "共有できませんでした。もう一度押してください");
        },
      )
      .finally(() => (gif.sharing = false));
    return true;
  };
  const post = (message, daily, gif) => {
    const url = postUrl(window.location.href, daily);
    if (gif?.sharing) return;
    // スマホで、GIF の型のファイルを共有に渡せる時だけ共有を使う（渡せなければ、待たずに投稿の画面と保存へ）。
    const mobileShare =
      gif && !gif.noShare && isMobileDevice(navigator) && navigator.share && navigator.canShare?.({ files: [new File([], "orbit.gif", { type: "image/gif" })] });
    if (mobileShare && gif.blob && shareGif(gif.blob, message, url, gif, false)) return;
    // スマホでまだ GIF ができていない時は、できるのを待って共有する（前は待たずに投稿の画面を開き、Android の Chrome で GIF が付かなかった）。
    if (mobileShare && !gif.blob && !gif.done) {
      gif.sharing = true;
      say(gif, "GIF を作っています…");
      gif.ready.then((blob) => {
        gif.sharing = false;
        if (blob && shareGif(blob, message, url, gif, true)) return;
        gif.noShare = true;
        say(gif, "共有できませんでした。もう一度押してください");
      });
      return;
    }
    if (debug && gif) say(gif, "投稿の画面を開きます");
    window.open(xIntentUrl(message, url), "_blank", "noopener");
    if (!gif || gif.saved) return;
    gif.saved = true;
    (gif.blob ? Promise.resolve(gif.blob) : gif.ready).then((blob) => {
      if (!blob) {
        gif.saved = false;
        return;
      }
      saveGif(blob);
      gif.note?.("orbit.gif を保存しました。投稿に添付してください");
    });
  };
  openGame(backToTop, { closeLabel: "🏠 トップへ", share: (message) => shareResult(message), post });
}
