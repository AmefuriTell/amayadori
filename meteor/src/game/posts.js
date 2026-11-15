// 𝕏 への投稿の文（今日のお題のほかの結果）。今日のお題の文は daily.js の shareMessage。
// 画面に頼らないので node --test で確かめる。

function km(value) {
  return Math.round(value).toLocaleString("ja-JP");
}

// フリー練習・ステージで地球に当てたとき。cleared は、その投げでステージをクリアしたか。
export function hitMessage({ stage, cleared }, targetName, distanceKm, ratingOf) {
  const where = stage ? `ステージ${stage.number}「${stage.name}」` : "フリー練習";
  return `☄️ 隕石当て ${where}: ${targetName} まで ${km(distanceKm)} km（${ratingOf(distanceKm)}）${cleared ? " クリア！" : ""}`;
}

// ステージを全部クリアしたとき。
export function allClearedMessage(stageCount) {
  return `🪐 隕石当て 全${stageCount}ステージ クリア！`;
}

// 軌道に乗せろの結果。
export function orbitMessage(score, mutual, record) {
  const mode = mutual ? "🧲引き合うモード" : "ふつうモード";
  return `🛰️ 軌道に乗せろ（${mode}）: ${score.turns} 周${record ? " 新記録！" : ""}`;
}

// 「𝕏 にポスト」のボタンを、𝕏 の色（黒）にする。
export function xButton(item) {
  item.classList.add("game-button-x");
  return item;
}
