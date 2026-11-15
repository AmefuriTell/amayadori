// 効果音を鳴らす仕組み（DESIGN.md の「音」）。隕石当て（game.js）と軌道に乗せろ（orbit-game.js）で使い回す。
// 鳴らす音の中身は sound.js。ZzFX は最初に触ったときに読み込む（読み込むと AudioContext が作られるため）。
// isMuted() が真の間は読み込まず鳴らさない。isOpen() が偽（閉じた後）は鳴らさない。
// importer は zzfx を読み込む関数（試験で差し替える）。
import { ZZFX_VOLUME, soundFor } from "./sound.js";

export function createAudio({ isMuted, isOpen, importer = () => import("zzfx") }) {
  // audio は読み込んだ ZZFX。読み込めなかったら（AudioContext が無いなど）audioFailed にして、二度と試さず無音で続ける。
  let audio = null;
  let audioLoading = false;
  let audioFailed = false;

  function load() {
    if (isMuted() || audio || audioLoading || audioFailed) return;
    audioLoading = true;
    // iPhone の消音スイッチに従い、ほかのアプリの音楽を止めないように（AudioContext を作る前に決める）。
    try {
      if (navigator.audioSession) navigator.audioSession.type = "ambient";
    } catch {
      // 決められなくても鳴らせる。
    }
    /*! @license ZzFX v1.3.2 (c) 2019 Frank Force, MIT License
     *
     * MIT License
     *
     * Copyright (c) 2019 Frank Force
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    let loading;
    try {
      loading = Promise.resolve(importer());
    } catch (error) {
      loading = Promise.reject(error);
    }
    return loading
      .then((module) => {
        audio = module.ZZFX;
        // ZzFX は全体の音量を 2 回掛けるので 1 にし、大きさは sound.js の引数だけで決める。
        audio.volume = ZZFX_VOLUME;
      })
      .catch(() => {
        audioFailed = true;
      })
      .finally(() => {
        audioLoading = false;
      });
  }

  // iOS Safari は、操作の外で作った AudioContext を止めたままにするので、離したときにも同期的に動かし直す。
  function resume() {
    // iOS では電話などの後に "interrupted" になることもあるので、動いていなければ動かし直す。
    if (!audio || audio.audioContext.state === "running") return;
    try {
      audio.audioContext.resume().catch(() => {});
    } catch {
      // 動かせなければ鳴らないだけ。
    }
  }

  // 鳴らす。閉じた後は鳴らさない。
  function play(event, km) {
    if (isMuted() || !audio || !isOpen()) return;
    const sounds = soundFor(event, km);
    if (!sounds) return;
    try {
      for (const sound of sounds) audio.play(...sound);
    } catch {
      // 鳴らせなくても遊べる。
    }
  }

  return { load, resume, play };
}
