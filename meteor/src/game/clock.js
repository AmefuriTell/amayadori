// 隕石当ての時計を進めるか（game.js の update）。game.js は css を読み込むので node から読めず、試験のために分けた。
// 狙っている間は止め、飛んでいる間と欄を出している間は進める。
export function clockRuns(flying, panelOpen) {
  return Boolean(flying) || panelOpen;
}
