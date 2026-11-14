// 画面の部品を作る小さな関数（元は weatherDiscordBot の activity/src/dom.js。ゲームが使う element だけを持ってきた）。
export function element(tag, text, className) {
  // 外から来た文字は、HTML として解釈させないよう textContent で入れる。
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}
