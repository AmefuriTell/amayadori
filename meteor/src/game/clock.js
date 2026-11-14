// 隕石当ての時計を進めるか（game.js の update）と、発射してよいか（pointerup）。
// game.js は css を読み込むので node から読めず、試験のために分けた。
// 狙っている間は止め、飛んでいる間と欄を出している間は進める。
export function clockRuns(flying, panelOpen) {
  return Boolean(flying) || panelOpen;
}

// 離したときに発射する引っ張りの最小の長さ（地球の半径で）。
export const MIN_PULL = 0.3;

// 発射してよいか。飛んでいる間と、欄が開いている間（時計が進んでいる）は発射しない。短すぎる引っ張りも取りやめ。
export function canLaunch({ flying, panelOpen, pulled }) {
  return !flying && !panelOpen && pulled > MIN_PULL;
}
