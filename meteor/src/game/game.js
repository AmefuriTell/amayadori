// 「重力で曲げて的に当てる」ゲームの画面と操作（docs/design/activity-map.md §4 の J）。計算は physics.js。
// 地図の Activity の「🎯」のボタンで開き、「🗺️ 地図へ」で閉じる（Discord の外の単体のページ（web.js）では「🏠 トップへ」）。
// 一人用。点数はどこにも送らない。
import "./game.css";
import { element } from "../dom.js";
import {
  DEFAULT_WORLD,
  MAX_PULL,
  advance,
  angleOfLongitude,
  launch,
  launchVelocity,
  longitudeAt,
  impactPower,
  missKm,
  moonPositions,
  preview,
  rating,
} from "./physics.js";
import { nextTarget, polarPoint } from "./targets.js";
import { landShapes } from "./draw.js";
import { openOrbitGame } from "./orbit-game.js";
import { afterThrow, dailyChallenge, loadDaily, saveDaily, shareMessage } from "./daily.js";
import { advanceExplosion, anchorPosition, createExplosion, drawExplosion, isExplosionOver, moonAnchor, shakeOffset } from "./explosion.js";
import { allClearedMessage, hitMessage, xButton } from "./posts.js";
import { CLEAR_KM, STAGES, afterStageThrow, isOpen, loadProgress, saveProgress } from "./stages.js";
import { canLaunch, clockRuns } from "./clock.js";
import { PAD_DISTANCE, padPosition, toScreen as viewToScreen, toWorld as viewToWorld, viewTurn } from "./view.js";
import { ZZFX_VOLUME, loadMuted, saveMuted, soundFor } from "./sound.js";

// 地球の半径（px）は、どの面のいちばん外の月の軌道（5.3）も画面の短い辺に収まるように決める（面で大きさを変えない）。
const VIEW_RADIUS = 5.7;
// 隕石は世界の中の 1 か所（view.js の padPosition。地球から PAD_DISTANCE、世界の上か下）に置く。横長の画面は見せ方だけを
// 90° 回し、置き場を長い辺の側に見せる。縦長では上下どちらに置いても入るように、横長では左右に入るように、地球ごと縮める
// （正方形に近い画面で、隕石が月の通り道の上に来て、投げた瞬間に月に当たらないように）。
// 隕石の外側に残す余白（地球の半径で）と、画面の縁・上の欄・下の安全域から離す長さ（px）。
const PAD_MARGIN = 0.5;
const EDGE_PX = 8;
// 当たった後、結果を出すまでの間（ミリ秒）。当たった所を見せるため。地球か月に当たったときは、爆発を見せる分だけ長く。
const RESULT_DELAY_MS = 600;
const EXPLOSION_DELAY_MS = 1300;
const STARS = 140;


// options.share(message): 結果を共有する（Discord の shareLink、単体のページでは share.js）。無ければ共有のボタンを出さない。
//   { success: true } なら「共有しました」、{ success: true, copied: true } なら「コピーしました」、失敗なら文を欄に出す。
// options.post(message, daily): 結果を 𝕏 に投稿する画面を開く（daily は今日のお題の結果か。付ける URL が変わる）。
//   無ければ「𝕏 にポスト」のボタンを出さない。
// options.closeLabel: 閉じるボタンの文言（既定は「🗺️ 地図へ」）。
// 開くとすぐ今日のお題（残りが無ければ今日の結果）。ほかの遊び方は上の欄の「ほかの遊び方」から。
export function openGame(onClose, options = {}) {
  const overlay = element("div", undefined, "game");
  const canvas = element("canvas", undefined, "game-canvas");
  const bar = element("div", undefined, "game-bar");
  const title = element("div", "", "game-title");
  const hint = element("div", "画面のどこかを触って引っ張り、離すと隕石が反対へ飛びます", "game-hint");
  // 下の安全域（--saib）の高さを測るための、見えない目印。
  const probe = element("div", undefined, "game-probe");
  // 閉じるボタンの文言（地図の Activity では地図へ戻る。Discord の外の単体のページではトップへ戻る）。
  const close = element("button", options.closeLabel || "🗺️ 地図へ", "game-button");
  // ほかの遊び方（ステージ・フリー練習・軌道に乗せろ）への入口。文字だけのボタン。
  const others = element("button", "ほかの遊び方", "game-link");
  bar.append(close, title, others);
  const panel = element("div", undefined, "game-panel");
  panel.hidden = true;
  overlay.append(canvas, bar, hint, panel, probe);
  document.body.appendChild(overlay);
  const context = canvas.getContext("2d");
  const stars = Array.from({ length: STARS }, () => ({ x: Math.random(), y: Math.random(), size: Math.random() < 0.85 ? 1 : 2, level: 90 + Math.floor(Math.random() * 140) }));

  let size = { width: 0, height: 0, scale: 1, ratio: 1, turn: 0, cx: 0, cy: 0 };
  let clock = 0;
  let last = performance.now();
  let target = null;
  let earthStart = 0;
  let pad = { x: 0, y: 0 };
  // 隕石を置く側（+1・-1）と、横へのずらし（地球の半径で）。回ごとに決める。置き場は世界の中で決まり、画面の向きでは変わらない。
  let padSign = 1;
  let padSlide = 0;
  let flying = null;
  let trail = [];
  // 引っ張っている間の、ゴムの先（世界の位置）。指を置いた所からの動きを、隕石の位置に足したもの。
  let drag = null;
  // 引っ張っている指（2 本目の指を無視するため）と、置いた所（画面の px）。
  let activePointer = null;
  // 操作の説明は、最初に引っ張るまで、投げられる間だけ出す（ほかの遊び方や結果の欄と重ならないように）。
  let hinted = false;
  let dragStart = null;
  let impact = null;
  let best = null;
  // "daily"（今日のお題）・"free"（フリー練習）・"stage"（ステージ）。開いたときは今日のお題（startDaily で決める）。
  let mode = null;
  // 遊んでいる世界（地球の回る速さと月）。ステージだけ面ごとに変わり、ほかはふつうの世界。
  let world = DEFAULT_WORLD;
  let stageIndex = 0;
  let progress = loadProgress();
  const challenge = dailyChallenge(new Date());
  let dailyRecord = loadDaily(challenge.key);
  let frame = 0;
  let resultTimer = 0;
  // 当たったときの爆発（explosion.js）と、その場所（地球なら null で、当たった経度の今の位置に描く。月なら、その月に付いていく）。
  let explosion = null;
  let explosionAt = null;
  const reduceMotion = Boolean(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  // 効果音（sound.js）。消音は端末に覚える。ZzFX は最初に触ったときに読み込む（読み込むと AudioContext が作られるため）。
  // audio は読み込んだ ZZFX。読み込めなかったら（AudioContext が無いなど）audioFailed にして、二度と試さず無音で続ける。
  let muted = loadMuted();
  let audio = null;
  let audioLoading = false;
  let audioFailed = false;

  function reserved() {
    // 上の欄（ボタンと、折り返すこともある見出し）の下と、下の安全域の上（px）。Discord のメニューの分も含む。
    const top = bar.getBoundingClientRect().bottom - overlay.getBoundingClientRect().top + EDGE_PX;
    const bottom = probe.getBoundingClientRect().top - overlay.getBoundingClientRect().top - EDGE_PX;
    return { top, bottom };
  }

  function resize() {
    const width = overlay.clientWidth;
    const height = overlay.clientHeight;
    // 大きさが 0（隠れている途中など）のときは、前の大きさのまま（0 で割らないため）。
    if (!width || !height) return false;
    const ratio = window.devicePixelRatio || 1;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    let scale = Math.min(width, height) / 2 / VIEW_RADIUS;
    // 隕石が長い辺の向きの、どちらの側に置いても入るように縮める。縦長では地球の中心を、上の欄の下と下の安全域の上の
    // 真ん中にずらす（見出しが折り返す小さい画面でも、地球を小さくしすぎないように）。横長は画面の真ん中のまま。
    const { top, bottom } = reserved();
    const portrait = height >= width;
    const room = portrait ? (bottom - top) / 2 : width / 2 - EDGE_PX;
    scale = Math.min(scale, room / (PAD_DISTANCE + PAD_MARGIN));
    const cy = portrait ? (top + bottom) / 2 : height / 2;
    size = { width, height, ratio, scale, turn: viewTurn(width, height), cx: width / 2, cy };
    return true;
  }

  function toScreen(point) {
    return viewToScreen(point, size);
  }

  function toWorld(px, py) {
    return viewToWorld(px, py, size);
  }

  function placePad() {
    pad = padPosition(padSign, padSlide);
  }

  function newRound(sameTarget) {
    if (mode === "daily") {
      // 今日のお題: 誰でも同じ的・同じ地球の向き・同じ置き場。時計も 0 から（月の位置もそろう）。
      ({ target, earthStart, padSign, padSlide } = challenge);
    } else if (!sameTarget) {
      target = nextTarget(target);
      best = null;
      // 回り始めの向きと、隕石を置く側を変える（毎回同じにならないように）。
      earthStart = Math.random() * Math.PI * 2;
      padSign = Math.random() < 0.5 ? -1 : 1;
      padSlide = (Math.random() - 0.5) * 2;
    }
    clock = 0;
    flying = null;
    trail = [];
    impact = null;
    explosion = null;
    drag = null;
    activePointer = null;
    panel.hidden = true;
    hint.hidden = hinted;
    if (mode === "daily") {
      title.textContent = `📅 今日のお題 ${challenge.label}: ${target.name} に当てろ（残り${dailyRecord.left}回）`;
    } else if (mode === "stage") {
      title.textContent = `🪐 ${stageIndex + 1}. ${STAGES[stageIndex].name}: ${target.name} に当てろ（${CLEAR_KM.toLocaleString()} km 未満でクリア）`;
    } else {
      title.textContent = `🎯 ${target.name} に当てろ${best === null ? "" : `（いちばん近かったのは ${Math.round(best).toLocaleString()} km）`}`;
    }
    // 見出しの長さで上の欄の高さが変わるので、測り直す。置き場は padSign・padSlide だけで決まる。
    resize();
    placePad();
  }

  // 欄を出すときの見出し。上の欄の高さが変わるので測り直す。
  function setTitle(text) {
    title.textContent = text;
    resize();
  }

  function button(label, onClick) {
    const item = element("button", label, "game-button");
    item.addEventListener("click", onClick);
    return item;
  }

  function openPanel(heading, detail, buttons) {
    panel.replaceChildren(element("div", heading, "game-result"), ...(detail ? [element("div", detail, "game-detail")] : []), ...buttons);
    panel.hidden = false;
    hint.hidden = true;
  }


  function startDaily() {
    mode = "daily";
    world = DEFAULT_WORLD;
    dailyRecord = loadDaily(challenge.key);
    if (dailyRecord.left === 0) {
      // 今日の分は投げ終えている。結果と共有だけ出す（的は見せたまま）。
      ({ target, earthStart, padSign, padSlide } = challenge);
      // 前の回（フリー練習・ステージ）の跡（当たった印・飛んだ跡・爆発）を消す。
      flying = null;
      trail = [];
      impact = null;
      explosion = null;
      title.textContent = `📅 今日のお題 ${challenge.label}: ${target.name}`;
      // 開いてすぐここへ来ることもあるので、見出しに合わせて測り直し、隕石を置く（中心に描かないように）。
      resize();
      placePad();
      showDailySummary();
      return;
    }
    newRound(true);
  }

  function startFree() {
    mode = "free";
    world = DEFAULT_WORLD;
    newRound(false);
  }

  function showOthers() {
    // ほかの遊び方。この欄は startDaily・startFree・startStage（どれも newRound を通る）でしか閉じない（狙いは必ず 0 秒から）。
    const left = dailyRecord.left;
    // 上の見出しは空にする（欄の見出しと重ねない）。上の欄の高さが変わるので測り直す。
    setTitle("");
    const link = (label, onClick) => {
      const item = element("button", label, "game-other");
      item.addEventListener("click", onClick);
      return item;
    };
    // 音のあり・なし。押すとその場で切り替えて覚える。
    const soundLabel = () => (muted ? "音: なし" : "音: あり");
    const sound = link(soundLabel(), () => {
      muted = !muted;
      saveMuted(muted);
      sound.textContent = soundLabel();
    });
    // 行き先ではなく切り替えなので、移動の行と見た目を分ける（game.css）。
    sound.classList.add("game-toggle");
    openPanel("ほかの遊び方", "", [
      button(left > 0 ? `今日のお題へ（残り${left}回）` : "今日の結果", startDaily),
      link("ステージ", showStages),
      link("フリー練習", startFree),
      link("軌道に乗せろ", () => switchTo(openOrbitGame)),
      sound,
    ]);
  }

  // 別のゲーム（軌道に乗せろ）へ移る。この画面を片付けてから、同じ閉じ方と共有の仕方で開く（地図へ戻る道は 1 つのまま）。
  function switchTo(open) {
    window.cancelAnimationFrame(frame);
    window.clearTimeout(resultTimer);
    window.removeEventListener("resize", onResize);
    overlay.remove();
    open(onClose, options);
  }

  function startStage(index) {
    mode = "stage";
    stageIndex = index;
    world = STAGES[index].world;
    newRound(false);
  }

  function showStages() {
    // 面の一覧。クリアした面と、その次の面だけ選べる。いちばん近かった距離を添える。
    // 進み具合は手元の値を使う（端末に覚えられない環境でも、開いている間は進んだ分を失わないため）。
    const items = STAGES.map((stage, index) => {
      const km = progress.best[stage.id];
      const mark = index < progress.cleared ? "⭐" : "";
      const label = isOpen(progress, index)
        ? `${index + 1}. ${stage.name}${mark}${km === undefined ? "" : `（${Math.round(km).toLocaleString()} km）`}`
        : `🔒 ${index + 1}. ${stage.name}`;
      const item = button(label, () => startStage(index));
      item.disabled = !isOpen(progress, index);
      item.classList.add("game-stage");
      return item;
    });
    const done = progress.cleared >= STAGES.length ? "全部クリア！" : `${CLEAR_KM.toLocaleString()} km 未満に当てると次の面が開きます`;
    setTitle("");
    openPanel("🪐 ステージ", done, [...items, button("戻る", showOthers)]);
  }

  function shareButton() {
    if (!options.share) return [];
    return [
      button("📣 共有", async () => {
        const message = shareMessage(challenge, dailyRecord, rating);
        try {
          const result = await options.share(message);
          if (result && result.success) {
            panel.querySelector(".game-detail").textContent = result.copied ? "コピーしました（貼り付けて共有してください）" : "共有しました";
            return;
          }
        } catch {
          // 共有の窓が開けないとき（古い Discord など）は、下の文を見せて貼ってもらう。
        }
        panel.querySelector(".game-detail").textContent = message;
      }),
    ];
  }

  // 「𝕏 にポスト」。message は押したときに作る（daily は今日のお題の結果か）。
  function postButton(message, daily) {
    if (!options.post) return [];
    return [xButton(button("𝕏 にポスト", () => options.post(message(), daily)))];
  }
  function dailyPost() {
    return postButton(() => shareMessage(challenge, dailyRecord, rating), true);
  }

  function showDailySummary() {
    const result = dailyRecord.best === null ? "今日は当たりませんでした" : `いちばん近かったのは ${Math.round(dailyRecord.best).toLocaleString()} km（${rating(dailyRecord.best)}）`;
    openPanel("今日はおしまい", `${result}。また明日！`, [...dailyPost(), ...shareButton()]);
  }

  function showResult(kind, km) {
    let heading;
    let detail;
    if (kind === "earth") {
      heading = rating(km);
      detail = `${target.name} から ${Math.round(km).toLocaleString()} km（経度のずれ）`;
      best = best === null ? km : Math.min(best, km);
    } else if (kind === "moon") {
      heading = "月に当たった！";
      detail = "月の重力に引かれすぎたようです";
    } else {
      heading = "外れ…";
      detail = "地球に届きませんでした";
    }
    if (mode === "daily") {
      dailyRecord = afterThrow(dailyRecord, kind === "earth" ? km : null);
      saveDaily(challenge.key, dailyRecord);
      title.textContent = `📅 今日のお題 ${challenge.label}: ${target.name}（残り${dailyRecord.left}回）`;
      if (dailyRecord.left === 0) {
        openPanel(heading, `${detail}。今日はおしまい`, [...dailyPost(), ...shareButton()]);
        return;
      }
      openPanel(heading, `${detail}（残り${dailyRecord.left}回）`, [button("もう一度", () => newRound(true)), ...dailyPost(), ...shareButton()]);
      return;
    }
    if (mode === "stage") {
      const before = progress.cleared;
      progress = afterStageThrow(progress, stageIndex, kind === "earth" ? km : null);
      saveProgress(progress);
      const next = stageIndex + 1;
      // 「もう一度」は同じ的・同じ向き・同じ置き場でやり直す（狙いを詰められるように）。「別の的」で変える。
      // 次の面が開いていれば（前にクリアした面のやり直しでも）、次の面へ進める。
      const more = isOpen(progress, next) ? [button(`次の面へ（${STAGES[next].name}）`, () => startStage(next))] : [];
      const again = button("もう一度", () => newRound(true));
      const rest = [button("別の的", () => newRound(false))];
      const list = button("ステージ一覧", showStages);
      const cleared = progress.cleared > before;
      const stage = { number: stageIndex + 1, name: STAGES[stageIndex].name };
      const post =
        cleared && progress.cleared >= STAGES.length
          ? postButton(() => allClearedMessage(STAGES.length), false)
          : kind === "earth"
            ? postButton(() => hitMessage({ stage, cleared }, target.name, km, rating), false)
            : [];
      if (cleared) {
        openPanel(`クリア！ ${heading}`, next < STAGES.length ? `${detail}。次の面が開きました` : `${detail}。全部の面をクリアしました！`, [again, ...more, ...rest, ...post, list]);
        return;
      }
      openPanel(heading, detail, [again, ...more, ...rest, ...post, list]);
      return;
    }
    const post = kind === "earth" ? postButton(() => hitMessage({ stage: null, cleared: false }, target.name, km, rating), false) : [];
    openPanel(heading, detail, [button("もう一度", () => newRound(true)), button("次の的", () => newRound(false)), ...post]);
  }

  function loadAudio() {
    if (muted || audio || audioLoading || audioFailed) return;
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
    import("zzfx")
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
  function resumeAudio() {
    // iOS では電話などの後に "interrupted" になることもあるので、動いていなければ動かし直す。
    if (!audio || audio.audioContext.state === "running") return;
    try {
      audio.audioContext.resume().catch(() => {});
    } catch {
      // 動かせなければ鳴らないだけ。
    }
  }

  // 鳴らす。閉じた後（shut・switchTo）は鳴らさない。
  function play(event, km) {
    if (muted || !audio || !overlay.isConnected) return;
    const sounds = soundFor(event, km);
    if (!sounds) return;
    try {
      for (const sound of sounds) audio.play(...sound);
    } catch {
      // 鳴らせなくても遊べる。
    }
  }

  function pointerPosition(event) {
    const rect = canvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  // 画面のどこを触っても、そこから引っ張って狙える（隕石が画面の端に近くても、十分に引けるように）。
  canvas.addEventListener("pointerdown", (event) => {
    loadAudio();
    // 欄（ほかの遊び方・結果など）を出している間は投げられない。
    if (!panel.hidden || flying || impact || activePointer !== null) return;
    canvas.setPointerCapture(event.pointerId);
    activePointer = event.pointerId;
    dragStart = pointerPosition(event);
    drag = { ...pad };
    hinted = true;
    hint.hidden = true;
  });
  canvas.addEventListener("pointermove", (event) => {
    if (event.pointerId !== activePointer || !drag) return;
    // 指の動きを世界の長さに直す（回した画面でも、ゴムが指に付いていくように）。
    const at = pointerPosition(event);
    const now = toWorld(at.x, at.y);
    const start = toWorld(dragStart.x, dragStart.y);
    let dx = now.x - start.x;
    let dy = now.y - start.y;
    const length = Math.hypot(dx, dy);
    if (length > MAX_PULL) {
      dx *= MAX_PULL / length;
      dy *= MAX_PULL / length;
    }
    drag = { x: pad.x + dx, y: pad.y + dy };
  });
  canvas.addEventListener("pointerup", (event) => {
    resumeAudio();
    if (event.pointerId !== activePointer) return;
    activePointer = null;
    if (!drag) return;
    const pulled = Math.hypot(drag.x - pad.x, drag.y - pad.y);
    // 欄が開いていれば（引っ張っている間に開いたとき）発射せず、引っ張りを捨てる（狙いは必ず 0 秒から）。
    if (canLaunch({ flying, panelOpen: !panel.hidden, pulled })) {
      flying = launch(pad, launchVelocity(pad, drag), clock, 0, world);
      trail = [];
      play("launch");
    }
    drag = null;
  });
  // 保険: iOS Safari の版によっては pointerup が操作として扱われないので、touchend と click でも動かし直す（鳴らしはしない）。
  overlay.addEventListener("touchend", resumeAudio, { passive: true });
  overlay.addEventListener("click", resumeAudio);
  canvas.addEventListener("pointercancel", (event) => {
    if (event.pointerId !== activePointer) return;
    activePointer = null;
    drag = null;
  });

  function update(seconds) {
    // 投げるまでは時間を止める（いつ離すかで結果が変わらないように）。離した瞬間から地球も月も動く。
    // 当たった後・結果を出している間も flying は残るので、自転・印・爆発は動き続ける。
    // 欄（ほかの遊び方・ステージの一覧・今日の結果）を出している間も回しておく。欄は newRound でしか閉じず、
    // そこで時計を 0 に戻すので、狙いは必ず 0 秒から始まる。
    if (clockRuns(flying, !panel.hidden)) clock += seconds;
    if (explosion) advanceExplosion(explosion, seconds);
    if (!flying || flying.result) return;
    advance(flying, seconds);
    trail.push({ x: flying.x, y: flying.y });
    if (trail.length > 400) trail.shift();
    if (flying.result) {
      const result = flying.result;
      if (result.kind === "earth") {
        const longitude = longitudeAt(result.angle, flying.t, earthStart, world.earthPeriod);
        impact = { longitude, km: missKm(longitude, target.longitude) };
        // 近く当てたほど大きく爆発させる。
        explosion = createExplosion(impactPower(impact.km));
        explosionAt = null;
        play("earth", impact.km);
      } else {
        impact = { longitude: null, km: null };
        if (result.kind === "moon") {
          explosion = createExplosion(0.55);
          explosionAt = moonAnchor(world, clock, flying);
          play("moon");
        } else {
          play("away");
        }
      }
      resultTimer = window.setTimeout(() => showResult(result.kind, impact.km), explosion ? EXPLOSION_DELAY_MS : RESULT_DELAY_MS);
    }
  }

  function draw() {
    const c = context;
    const { width, height, scale, ratio } = size;
    c.setTransform(ratio, 0, 0, ratio, 0, 0);
    c.fillStyle = "#05070d";
    c.fillRect(0, 0, width, height);
    // 当たった直後は画面を揺らす（背景を塗った後に、描く物だけずらす）。
    const shake = shakeOffset(explosion, reduceMotion);
    c.setTransform(ratio, 0, 0, ratio, shake.x * ratio, shake.y * ratio);
    for (const star of stars) {
      c.fillStyle = `rgb(${star.level},${star.level},${Math.min(255, star.level + 20)})`;
      c.fillRect(star.x * width, star.y * height, star.size, star.size);
    }
    // 月の軌道の目安の円（月ごと）。
    const center = toScreen({ x: 0, y: 0 });
    c.strokeStyle = "rgba(255,255,255,0.12)";
    c.setLineDash([4, 6]);
    for (const moon of world.moons) {
      c.beginPath();
      c.arc(center.x, center.y, moon.distance * scale, 0, Math.PI * 2);
      c.stroke();
    }
    c.setLineDash([]);

    // 地球（北極の上から見た地図。自転で回す）。数学の向きで描くため、上下を返してから回す（横長なら画面の回し分も足す）。
    const rotation = angleOfLongitude(0, clock, earthStart, world.earthPeriod);
    c.save();
    c.translate(center.x, center.y);
    c.scale(scale, -scale);
    c.beginPath();
    c.arc(0, 0, 1.08, 0, Math.PI * 2);
    c.fillStyle = "rgba(143,195,255,0.25)";
    c.fill();
    c.beginPath();
    c.arc(0, 0, 1, 0, Math.PI * 2);
    c.fillStyle = "#4f86b8";
    c.fill();
    c.clip();
    c.rotate(rotation + size.turn);
    c.fillStyle = "#d9d2bd";
    c.fill(landShapes(), "evenodd");
    c.restore();

    // 的: 都市の点と、その経度の赤道（縁）の印。
    const targetAngle = angleOfLongitude(target.longitude, clock, earthStart, world.earthPeriod);
    const city = polarPoint(target.latitude, target.longitude);
    const cityScreen = toScreen({ x: city.x * Math.cos(rotation) - city.y * Math.sin(rotation), y: city.x * Math.sin(rotation) + city.y * Math.cos(rotation) });
    const rim = toScreen({ x: Math.cos(targetAngle), y: Math.sin(targetAngle) });
    const outer = toScreen({ x: 1.35 * Math.cos(targetAngle), y: 1.35 * Math.sin(targetAngle) });
    c.strokeStyle = "#ff5a5f";
    c.lineWidth = 2;
    c.beginPath();
    c.moveTo(cityScreen.x, cityScreen.y);
    c.lineTo(outer.x, outer.y);
    c.stroke();
    c.fillStyle = "#ff5a5f";
    for (const [point, radius] of [[cityScreen, 3.5], [rim, 5]]) {
      c.beginPath();
      c.arc(point.x, point.y, radius, 0, Math.PI * 2);
      c.fill();
    }
    c.font = "bold 13px system-ui, sans-serif";
    c.fillStyle = "#ffffff";
    c.textAlign = "center";
    c.fillText(target.name, outer.x, outer.y + (outer.y > center.y ? 14 : -6));

    // 当たった所。
    let hit = null;
    if (impact && impact.longitude !== null) {
      const hitAngle = angleOfLongitude(impact.longitude, clock, earthStart, world.earthPeriod);
      hit = toScreen({ x: Math.cos(hitAngle), y: Math.sin(hitAngle) });
      c.fillStyle = "#ffd166";
      c.beginPath();
      c.arc(hit.x, hit.y, 7, 0, Math.PI * 2);
      c.fill();
    }

    // 月（重い月ほど少し暗く）。
    for (const moon of moonPositions(world, clock)) {
      const at = toScreen(moon);
      c.fillStyle = moon.gm > 0.5 ? "#9a9a9a" : "#c9c9c9";
      c.beginPath();
      c.arc(at.x, at.y, moon.radius * scale, 0, Math.PI * 2);
      c.fill();
    }

    // 飛んだ跡と隕石。
    if (trail.length > 1) {
      c.strokeStyle = "rgba(255,159,28,0.7)";
      c.lineWidth = 2;
      c.beginPath();
      trail.forEach((point, index) => {
        const screen = toScreen(point);
        if (index === 0) c.moveTo(screen.x, screen.y);
        else c.lineTo(screen.x, screen.y);
      });
      c.stroke();
    }
    const meteorAt = flying ? toScreen(flying) : toScreen(pad);
    if (!impact) {
      c.fillStyle = "#ff9f1c";
      c.beginPath();
      c.arc(meteorAt.x, meteorAt.y, 7, 0, Math.PI * 2);
      c.fill();
    }

    // 引っ張っている間: ゴムの線と、少し先までの道筋。
    if (drag) {
      const padScreen = toScreen(pad);
      c.strokeStyle = "rgba(255,255,255,0.6)";
      c.lineWidth = 1.5;
      c.beginPath();
      const end = toScreen(drag);
      c.moveTo(padScreen.x, padScreen.y);
      c.lineTo(end.x, end.y);
      c.stroke();
      c.fillStyle = "rgba(255,255,255,0.8)";
      for (const point of preview(pad, launchVelocity(pad, drag), clock, 0, 1.2, 0.05, world)) {
        const screen = toScreen(point);
        c.fillRect(screen.x - 1.5, screen.y - 1.5, 3, 3);
      }
      const pulled = Math.min(1, Math.hypot(drag.x - pad.x, drag.y - pad.y) / MAX_PULL);
      c.fillStyle = "#ffffff";
      c.fillText(`${Math.round(pulled * 100)}%`, padScreen.x, padScreen.y - 14);
    }

    // 爆発（いちばん上に描く）。地球に当たったときは、自転で動く当たった所に付いていく。
    if (explosion && !isExplosionOver(explosion)) {
      const at = explosionAt ? toScreen(anchorPosition(explosionAt, world, clock)) : hit;
      if (at) drawExplosion(c, explosion, at);
    }
  }

  function tick(now) {
    const seconds = Math.min(0.05, (now - last) / 1000);
    last = now;
    update(seconds);
    draw();
    frame = window.requestAnimationFrame(tick);
  }

  function shut() {
    window.cancelAnimationFrame(frame);
    window.clearTimeout(resultTimer);
    window.removeEventListener("resize", onResize);
    overlay.remove();
    onClose();
  }
  const onResize = () => {
    // 引っ張っている途中なら取りやめる（大きさが変わると、指の動きと隕石の位置の対応がずれるため）。
    drag = null;
    activePointer = null;
    // 置き場は世界の中で決まっているので、測り直すだけでよい（置き直さない）。
    resize();
  };
  close.addEventListener("click", shut);
  others.addEventListener("click", () => {
    // 引っ張っている間と、投げてから結果の欄が出るまでは何もしない（飛んでいる回を欄で隠さないように）。
    if (activePointer !== null || (flying && panel.hidden)) return;
    showOthers();
  });
  window.addEventListener("resize", onResize);
  resize();
  startDaily();
  frame = window.requestAnimationFrame(tick);
}
