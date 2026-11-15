// 効果音の中身（ZzFX に渡す引数）と、消音の設定（DESIGN.md の「音」）。画面にも zzfx にも頼らない（node の試験から読める）。
// ZzFX の引数の並び: [volume, randomness, frequency, attack, sustain, release, shape, shapeCurve, slide, deltaSlide,
//   pitchJump, pitchJumpTime, repeatTime, noise, modulation, bitCrush, delay, sustainVolume, decay, tremolo, filter]。
// shape は 0 正弦波・1 三角波・2 のこぎり波・4 ノイズ。slide は 1 につき毎秒 500 Hz 動く。filter は負で低域だけ通す。
// ZzFX は全体の音量 ZZFX.volume を 2 回（サンプルを作るときと、鳴らすときの gain）掛け、真ん中に置く StereoPanner で
// さらに約 0.71 倍になる。audio.js は読み込んだ後に ZZFX.volume を ZZFX_VOLUME（1）にするので、
// 出る音の大きさはおよそ「引数の volume × 波形の振れ × 0.71」。
import { impactPower } from "./physics.js";

export const ZZFX_VOLUME = 1;
const STORAGE_KEY = "meteor.sound";

// event: "launch"（投げた・衛星を出した）・"earth"（地球に当たった。km は的からのずれ）・"moon"（月に当たった）・"away"（外れ・飛んでいった）・
// "orbit"（軌道に乗せろで、衛星が最初の 1 周を回り切った）・"aim"（軌道に乗せろで、引いている線が 1 周回る線になった）。
// 鳴らす音（ZzFX の引数）の一覧を返す。知らない event は null。
export function soundFor(event, km) {
  if (event === "launch") {
    // 「ヒュッ」: 短いノイズを上へ滑らせる。
    return [[0.3, 0.05, 900, 0.01, 0.02, 0.1, 4, 1, 4]];
  }
  if (event === "earth") {
    // 爆発: 近いほど大きく・低く・長く（強さは physics.js の impactPower。爆発の大きさと同じ区切り）。
    const p = impactPower(km);
    const boom = [0.25 + 0.4 * p, 0.05, 150 - 90 * p, 0.01, 0.05 * p, 0.3 + 0.6 * p, 4, 1.5, -0.2, 0, 0, 0, 0, 0.5, 0, 0.3];
    // いちばん近い段（300 km 未満）だけ、高い「キン」を小さめに重ねる。
    return p === 1 ? [boom, [0.2, 0, 1760, 0, 0.02, 0.4]] : [boom];
  }
  if (event === "moon") {
    // 「ゴン」: 110 Hz ののこぎり波（300 Hz 以上の倍音を持つ。小さいスピーカーでも聞こえる）を、低域通過で丸めて短く。
    return [[0.25, 0.05, 110, 0.005, 0.02, 0.35, 2, 1, -0.2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, -600]];
  }
  if (event === "away") {
    // 外れ: のこぎり波を 300 Hz から 0.45 秒で約 165 Hz まで下げる（倍音で小さいスピーカーでも聞こえる。低域通過で丸める）。
    return [[0.26, 0.05, 300, 0.02, 0.1, 0.33, 2, 1, -0.6, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, -800]];
  }
  if (event === "orbit") {
    // 最初の 1 周（軌道に乗せろ）: 短い上がり調子の「ピロン」。正弦波 880 Hz を 0.06 秒で 1320 Hz へ跳ね上げ、0.3 秒で消す。
    return [[0.35, 0, 880, 0, 0.04, 0.25, 0, 1, 0, 0, 440, 0.06]];
  }
  if (event === "aim") {
    // 引いている線が 1 周回る線になった（軌道に乗せろ）: ごく小さく短い「カチッ」。正弦波 1400 Hz を約 0.03 秒。
    return [[0.12, 0, 1400, 0, 0.005, 0.025, 0]];
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
