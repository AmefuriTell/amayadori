// 効果音の中身（ZzFX に渡す引数）と、消音の設定（DESIGN.md の「音」）。画面にも zzfx にも頼らない（node の試験から読める）。
// ZzFX の引数の並び: [volume, randomness, frequency, attack, sustain, release, shape, shapeCurve, slide, deltaSlide,
//   pitchJump, pitchJumpTime, repeatTime, noise, modulation, bitCrush, delay, sustainVolume, decay, tremolo, filter]。
// shape は 0 正弦波・1 三角波・4 ノイズ。slide は 1 につき毎秒 500 Hz 動く。ZzFX 自体の全体の音量（0.3）にさらに掛かる。
const STORAGE_KEY = "meteor.sound";

// 地球に当たったときの爆発の強さ（game.js の createExplosion と、rating の区切り 300/1000/3000 km にそろえる）。
function power(km) {
  return km < 300 ? 1 : km < 1000 ? 0.75 : km < 3000 ? 0.5 : 0.3;
}

// event: "launch"（投げた）・"earth"（地球に当たった。km は的からのずれ）・"moon"（月に当たった）・"away"（外れ）。
// 鳴らす音（ZzFX の引数）の一覧を返す。知らない event は null。
export function soundFor(event, km) {
  if (event === "launch") {
    // 「ヒュッ」: 短いノイズを上へ滑らせる。
    return [[0.25, 0.05, 900, 0.01, 0.02, 0.1, 4, 1, 4]];
  }
  if (event === "earth") {
    // 爆発: 近いほど大きく・低く・長く。
    const p = power(km);
    const boom = [0.2 + 0.4 * p, 0.05, 150 - 90 * p, 0.01, 0.05 * p, 0.3 + 0.6 * p, 4, 1.5, -0.2, 0, 0, 0, 0, 0.5, 0, 0.3];
    // 300 km 未満だけ、高い「キン」を重ねる。
    return p === 1 ? [boom, [0.15, 0, 1760, 0, 0.02, 0.4]] : [boom];
  }
  if (event === "moon") {
    // 「ゴン」: 低い三角波を短く、少し下げる。
    return [[0.35, 0.05, 110, 0.005, 0.02, 0.35, 1, 1.5, -0.2]];
  }
  if (event === "away") {
    // 外れ: 低い音を下げる（300 Hz から 0.45 秒で約 165 Hz）。
    return [[0.25, 0.05, 300, 0.02, 0.1, 0.33, 0, 1, -0.6]];
  }
  return null;
}

// 消音か。"off" と覚えているときだけ消音。読めなければ（iframe で使えないなど）音ありとする。
export function loadMuted(storage = globalThis.localStorage) {
  try {
    return storage.getItem(STORAGE_KEY) === "off";
  } catch {
    return false;
  }
}

export function saveMuted(muted, storage = globalThis.localStorage) {
  try {
    storage.setItem(STORAGE_KEY, muted ? "off" : "on");
  } catch {
    // 覚えられなくても遊べる（開き直すと音ありに戻るだけ）。
  }
}
