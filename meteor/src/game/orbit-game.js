// 「軌道に乗せろ」の画面と操作（docs/design/activity-map.md §4 の K）。計算は orbit.js（衛星）と physics.js（地球と月）。
// 隕石当て（game.js）の「ほかの遊び方」から開き、「今日のお題へ」で戻る。「🗺️ 地図へ」で地図に戻る（単体のページでは「🏠 トップへ」）。
// 開くと設定の欄（打ち上げ・置く、ふつう・引き合う）。「はじめる」を 1 回押せば打ち上げ・ふつう。選ぶと後ろの見本の動きが変わる。
// 結果の画面の「設定を変える」でも同じ欄に戻る。
// 点数は端末の中だけ。
import "./game.css";
import { element } from "../dom.js";
import { angleOfLongitude, launchVelocity, moonPositions } from "./physics.js";
import {
  BOOST,
  GAME_SECONDS,
  ORBIT_WORLD,
  COLORS,
  SATELLITES,
  SAT_RADIUS,
  addSatellite,
  autoSpeed,
  aimClick,
  aimLineStyle,
  PREVIEW_START,
  previewShot,
  boost,
  boostTarget,
  canPlace,
  boostCue,
  clampZoom,
  ZOOM_MIN,
  createOrbitGame,
  endSound,
  firstTurns,
  canLaunch,
  beforeFirstSatellite,
  elapsed,
  isOver,
  launchFromSite,
  launchShot,
  launchSite,
  loadBest,
  nextSlot,
  predictOrbit,
  satellitesLeft,
  saveBest,
  scoreOf,
  step,
  turnsOf,
} from "./orbit.js";
import { drawEarth, drawSatellite, drawSpace, makeStars } from "./draw.js";
import { advanceExplosion, anchorPosition, createExplosion, drawExplosion, earthAnchor, moonAnchor, shakeOffset } from "./explosion.js";
import { orbitMessage, xButton } from "./posts.js";
import { openGame } from "./game.js";
import { loadMuted } from "./sound.js";
import { createAudio } from "./audio.js";
import { easeView, followFrame, pullPx, screenPull } from "./view.js";
import { RECORD_EVERY } from "./orbit-record.js";
import { makeOrbitGif } from "./orbit-gif.js";

// ズームが 1 のとき、月の軌道の外（半径 5.7）が画面の短い辺に収まる大きさにする（隕石当てと同じ）。
const VIEW_RADIUS = 5.7;
// 飛んだ跡の点の数（衛星ごと）。
const TRAIL_POINTS = 500;

// 時計の速さの段（下の欄のボタンで順に切り替える）。
const SPEEDS = [1, 4, 16];
// 設定の欄の後ろの見本: くり返しの長さ（秒）・その間に進めるゲームの秒・置くの引きの線を出す割合・見本の不透明度・
// 2 機目（緑）の回る半径と、くり返しの終わりに 1 機目より先にいる角度（引き合うの線が終わりに近くで見えるように）。
const PREVIEW_LOOP = 4;
const PREVIEW_GAME = 6;
const PREVIEW_PULL = 0.3;
const PREVIEW_ALPHA = 0.5;
const PREVIEW_SECOND_RADIUS = 1.9;
const PREVIEW_SECOND_AHEAD = 0.3;
// 道筋を覚える刻み（ゲームの秒）と、見本の噴射の間（人が押す間隔）。
const PREVIEW_DT = 1 / 30;
const PREVIEW_BOOST_GAP = 0.4;

export function openOrbitGame(onClose, options = {}) {
  const overlay = element("div", undefined, "game");
  const canvas = element("canvas", undefined, "game-canvas");
  const bar = element("div", undefined, "game-bar");
  // 閉じるボタンの文言（地図の Activity では地図へ戻る。Discord の外の単体のページではトップへ戻る）。
  // 絵文字は外して出す（軌道に乗せろの画面には絵文字を置かない。DESIGN.md）。
  const close = element("button", (options.closeLabel || "地図へ").replace(/^\p{Extended_Pictographic}\uFE0F?\s*/u, ""), "game-button");
  const title = element("div", "", "game-title");
  // 「はじめる」の後、1 機目を出す前だけ出す、隕石当ての今日のお題への戻り（文字だけのボタン。設定の欄の間は欄の中にあるので隠す）。
  const back = element("button", "今日のお題へ", "game-link");
  bar.append(close, title, back);
  const controls = element("div", undefined, "orbit-controls");
  const boostButton = element("button", "", "game-button orbit-boost");
  // 時計の速さのボタン（押すたびに ×1 → ×4 → ×16 → ×1。文字は選んだ速さ）。
  // 主役は噴射だけなので、速さと終了は地を薄くして静かにする（同じ重さのボタンを 3 つ並べない）。
  const speedButton = element("button", "×1", "game-button orbit-quiet orbit-speed");
  const finish = element("button", "終了", "game-button orbit-quiet orbit-finish");
  controls.append(boostButton, speedButton, finish);
  const hint = element("div", "", "game-hint orbit-hint");
  // 説明と操作のボタンを下に縦に積む（ボタンが 2 段に折れても、説明が重ならないように）。
  const bottom = element("div", undefined, "orbit-bottom");
  bottom.append(hint, controls);
  const panel = element("div", undefined, "game-panel");
  panel.hidden = true;
  overlay.append(canvas, bar, bottom, panel);
  document.body.appendChild(overlay);
  const context = canvas.getContext("2d");
  const stars = makeStars(140);

  let size = { width: 0, height: 0, ratio: 1 };
  let zoom = 1;
  // 選んだ時計の速さ（下の欄のボタンで選ぶ。衛星を出した時だけ ×1 に戻す）と、実際に進めている速さ
  // （max(選んだ速さ, autoSpeed)。3 機とも 1 周して待つだけの間は ×16。上の欄の「»」はこちらで出す）。
  let speed = 1;
  let rate = 1;
  // 置き方（"launch"・"place"）。開くたびに打ち上げから（設定で「置く」に変えたら、閉じるまでそのまま）。
  let style = "launch";
  let mutual = false;
  let game = createOrbitGame(ORBIT_WORLD, mutual);
  let earthStart = 0;
  let playing = false;
  let trails = new Map();
  // 投稿の GIF のための跡の記録（trails は古い点を捨てるので別に持つ）。ゲームの時間で RECORD_EVERY ごとに、生きている衛星ごとの
  // 位置と衛星の id と色の番号（{ t, x, y, s, c }）。出した時にもその衛星の位置を入れる（跡が射場・置いた所から始まるように）。
  let gifRecord = [];
  let nextRecord = 0;
  // 結果の画面で裏で作る GIF（{ blob: できたら Blob, ready: Promise }）。作り直しを見分ける番号。
  let gif = null;
  let gifRun = 0;
  const headings = new Map();
  let best = loadBest();
  // 引っ張り: 指を置いた所（画面の px）。
  let activePointer = null;
  let dragStart = null;
  // 置くときの位置（世界）と、引き（指の動き ÷ 60 px。地球の半径を 1 とする長さ。元からゴムの先まで）。
  let placeFrom = null;
  let dragPull = null;
  // 引っ張っている間の道筋（predictOrbit）の前の結果。時刻と引きの量（位置・速度）が同じなら計算し直さない。
  let predicted = null;
  // 前の道筋の終わり方と、最後に「カチッ」（aim）を鳴らした時刻（performance.now()。境目で鳴り続けないように 150 ms あける）。
  let aimEnd = null;
  let aimAt = -Infinity;
  // 離した後の道筋（いちばん新しい衛星が 1 周回るまで）の前の終わり方。離した時に、引いていた時の最後の終わり方から始める
  // （離した直後に続けてカチッが鳴らないように）。
  let followEnd = null;
  // 離した後の道筋のいちばん低い所（predictOrbit の low。噴射の合図 boostCue に渡す）と、引いていた時の最後の道筋の low。
  let followLow = null;
  let aimLow = null;
  // 2 本指のズーム: 指ごとの位置と、始めた時の指の間の距離とズーム。
  const touches = new Map();
  let pinch = null;
  let frame = 0;
  let last = performance.now();
  // 地球・月に落ちた衛星や、ぶつかった衛星の爆発（世界の位置。速めていても、見える速さで進める）。
  let explosions = [];
  // 設定の欄が出ている間の見本（buildPreview の結果。欄が無い間は null）と、くり返しを始めた時刻。
  let preview = null;
  let previewAt = 0;
  const reduceMotion = Boolean(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  // 効果音（隕石当てと同じ audio.js。消音は隕石当ての「ほかの遊び方」の「音: あり／なし」）。最初に触ったときに読み込み、
  // 閉じた後は鳴らさない。鳴らすのは出した時・道筋の線が 1 周回る線になった時（離した後。置くモードは引いている時も）・最初の 1 周・いなくなった時だけ（DESIGN.md の「音」）。
  const muted = loadMuted();
  const audio = createAudio({ isMuted: () => muted, isOpen: () => overlay.isConnected });

  // カメラ（見ている世界の中心と、地球の半径の px）。出したばかりの衛星（boostTarget）を最初の 1 周まで追い、
  // 地球・衛星・道筋が 1 枚に収まるように寄せる（DESIGN.md）。追い終わると地球中心・利用者の zoom へ戻る。
  // followPath は追っている衛星の道筋（引いている間に predicted が次の狙いの線に変わるので別に残す）。
  // followOff は手でズームして追いかけをやめた衛星の id。
  let camera = null;
  let followPath = null;
  let followOff = null;
  function baseScale() {
    return Math.min(size.width, size.height) / 2 / VIEW_RADIUS;
  }
  function homeView() {
    return { x: 0, y: 0, scale: baseScale() * zoom };
  }
  function scale() {
    return camera ? camera.scale : baseScale() * zoom;
  }
  function toScreen(point) {
    const cx = camera ? camera.x : 0;
    const cy = camera ? camera.y : 0;
    return { x: size.width / 2 + (point.x - cx) * scale(), y: size.height / 2 - (point.y - cy) * scale() };
  }
  // 今追っている衛星（追っていなければ null）。動きを減らす設定では追わない。
  function followed() {
    const target = playing && !reduceMotion ? boostTarget(game) : null;
    return target && target.turns === 0 && target.id !== followOff ? target : null;
  }
  function stepCamera(seconds) {
    if (!size.width) return;
    if (!camera) camera = homeView();
    // 引いている間はカメラも止める（指を置いた所と世界の対応がずれないように）。
    if (activePointer !== null && dragPull) return;
    const target = followed();
    const goal = target && followPath
      ? followFrame([{ x: target.x, y: target.y }, ...(followPath || [])], size.width, size.height, {
          side: 16,
          edge: 120,
          min: baseScale() * ZOOM_MIN,
          max: baseScale() * 2.5,
        })
      : homeView();
    // 引く（縮尺が小さくなる）時はゆっくり（0.9 秒）、寄る時は 0.4 秒。
    camera = easeView(camera, goal, seconds, goal.scale < camera.scale ? 0.9 : 0.4);
  }
  // 手でズームしたら、その衛星の追いかけをやめる。今の寄りを zoom に移す（見え方が跳ばないように）。追っていたら true。
  function stopFollow() {
    const target = followed();
    if (!target || !camera) return false;
    followOff = target.id;
    zoom = clampZoom(camera.scale / baseScale());
    return true;
  }
  // 追っていない時のズームは、すぐ効かせる（寄せる処理を通さない）。戻る途中なら、その比のまま掛ける。
  function applyZoom(before) {
    if (camera && zoom !== before) camera.scale *= zoom / before;
  }
  function resize() {
    const width = overlay.clientWidth;
    const height = overlay.clientHeight;
    if (!width || !height) return;
    const ratio = window.devicePixelRatio || 1;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    size = { width, height, ratio };
  }

  function button(label, onClick, pressed) {
    const item = element("button", label, "game-button");
    if (pressed !== undefined) item.setAttribute("aria-pressed", String(pressed));
    item.addEventListener("click", onClick);
    return item;
  }
  // detail は文字列か要素（要素ならそのまま説明の行にする。無ければ説明の行を出さない）。
  function openPanel(heading, detail, buttons) {
    const detailRow = typeof detail === "string" ? element("div", detail, "game-detail") : detail;
    panel.replaceChildren(element("div", heading, "game-result"), ...(detailRow ? [detailRow] : []), ...buttons);
    panel.classList.remove("orbit-setup");
    panel.hidden = false;
    hint.hidden = true;
    preview = null;
  }

  function showSetup() {
    // 設定の欄（開いた時と、結果の画面の「設定を変える」）: 置き方（打ち上げ・置く）と、衛星どうしが引き合うか。
    // 選んでも欄は作り直さない（focus が飛ばないように）。aria-pressed と説明の最高と後ろの見本だけを変える。
    playing = false;
    cancelDrag();
    setSpeed(1);
    // 見本は決まった大きさで見せる（前のゲームのズームを持ち込まない）。
    zoom = 1;
    explosions = [];
    title.textContent = "軌道に乗せろ";
    const detail = element("div", "", "game-detail orbit-result-line");
    const toggle = (labels, isPressed, onPick) => {
      const row = element("div", undefined, "orbit-seg");
      const items = labels.map(([label, value]) => {
        const item = element("button", label, "orbit-seg-button");
        item.type = "button";
        item.addEventListener("click", () => {
          onPick(value);
          refresh();
        });
        row.append(item);
        return [item, value];
      });
      row.update = () => items.forEach(([item, value]) => item.setAttribute("aria-pressed", String(isPressed(value))));
      return row;
    };
    const styles = toggle([["打ち上げ", "launch"], ["置く", "place"]], (value) => style === value, (value) => (style = value));
    const modes = toggle([["ふつう", false], ["引き合う", true]], (value) => mutual === value, (value) => (mutual = value));
    const go = element("button", "はじめる", "game-start");
    go.type = "button";
    go.addEventListener("click", start);
    const daily = element("button", "今日のお題へ", "game-link");
    daily.addEventListener("click", () => switchTo(openGame));
    function refresh() {
      const bestText = best[mutual ? "mutual" : "normal"];
      // 最高は打ち上げを選んでいる時だけ（置くは記録にしない）。
      setText(detail, `衛星を${SATELLITES}機、地球の周りに回す${style !== "launch" || bestText === undefined ? "" : `（最高 ${bestText} 周）`}`);
      styles.update();
      modes.update();
      preview = buildPreview();
      previewAt = performance.now();
    }
    openPanel("軌道に乗せろ", detail, [styles, modes, go, daily]);
    panel.classList.add("orbit-setup");
    refresh();
    go.focus();
  }

  // 見本の道筋を 1 回だけ計算する（選び直した時だけ）。遊ぶ時と同じ計算: 1 機目（黄）は previewShot から打ち上げるか置き、
  // 打ち上げはてっぺんの噴射の合図（boostCue）で、合図が消えるまで PREVIEW_BOOST_GAP ごとに噴射する。
  // 2 機目（緑）は円軌道でただ回る（終わりに 1 機目の少し先にいるように始めの向きを決める）。どちらも引き合わせずに計算する
  // （引き合うは、近い時に 2 機を結ぶ線で見せる）。
  function buildPreview() {
    const demo = createOrbitGame(ORBIT_WORLD, false);
    const shot = previewShot(demo, style);
    const first = style === "place" ? addSatellite(demo, shot.position, shot.velocity) : launchFromSite(demo, shot.velocity, PREVIEW_START);
    const firstPath = [{ x: first.x, y: first.y }];
    let boostedAt = -Infinity;
    const steps = Math.round(PREVIEW_GAME / PREVIEW_DT);
    for (let index = 0; index < steps; index += 1) {
      step(demo, PREVIEW_DT);
      if (first.alive && demo.t - boostedAt >= PREVIEW_BOOST_GAP - 1e-9 && boostCue(first, null, null)) {
        const line = predictOrbit(demo, first, { x: first.vx, y: first.vy });
        if (boostCue(first, line.end, line.low) && boost(first)) boostedAt = demo.t;
      }
      firstPath.push({ x: first.x, y: first.y });
    }
    const end = firstPath[firstPath.length - 1];
    const radius = PREVIEW_SECOND_RADIUS;
    const speed = Math.sqrt(ORBIT_WORLD.earthGM / radius);
    const angle = Math.atan2(end.y, end.x) + PREVIEW_SECOND_AHEAD - (speed / radius) * PREVIEW_GAME;
    const position = { x: radius * Math.cos(angle), y: radius * Math.sin(angle) };
    // predictOrbit は渡したゲームの時刻から月を動かすので、始めの時刻（0）のゲームで計算する。
    const secondPath = predictOrbit(createOrbitGame(ORBIT_WORLD, false), position, { x: -Math.sin(angle) * speed, y: Math.cos(angle) * speed }, {
      dt: PREVIEW_DT,
      limit: PREVIEW_GAME,
      every: PREVIEW_DT,
    }).points;
    return { style, mutual, firstPath, secondPath, pull: shot.velocity };
  }

  function start() {
    game = createOrbitGame(ORBIT_WORLD, mutual);
    earthStart = Math.random() * Math.PI * 2;
    trails = new Map();
    gifRecord = [];
    nextRecord = RECORD_EVERY;
    gif = null;
    gifRun += 1;
    explosions = [];
    // 毎回 ×1 から（速めたまま始まると、打ち上げてすぐ落ちて加速が間に合わないため）。
    setSpeed(1);
    cancelDrag();
    followEnd = null;
    followLow = null;
    followPath = null;
    followOff = null;
    camera = homeView();
    playing = true;
    panel.hidden = true;
    panel.classList.remove("orbit-setup");
    preview = null;
    showStartHint();
  }

  // 始めたときの案内（1 機目を出す前に、衛星を出さずに引っ張りが終わったときにも出し直す）。
  function showStartHint() {
    hint.hidden = false;
    hint.textContent = style === "place" ? "地球のそばを触って引き、離すと反対へ飛ぶ" : "引いて離すと赤い点から打ち上げ。てっぺんで噴射";
  }

  function finishGame() {
    // 終わったコマの周を上の表示にも出してから止める（結果の画面の数字とそろえる。速さの印は残さない）。
    setSpeed(1);
    rate = 1;
    updateHud();
    playing = false;
    cancelDrag();
    const score = scoreOf(game);
    const key = mutual ? "mutual" : "normal";
    // 0 周（何も回らなかった）と置くモードは記録にしない。
    const record = style === "launch" && score.turns > 0 && (best[key] === undefined || score.turns > best[key]);
    if (record) {
      best = { ...best, [key]: score.turns };
      saveBest(best);
    }
    const canPost = Boolean(options.post) && score.turns > 0;
    // 終わった時の位置を、生きている全機について 1 回記録する（最後の記録の後に終えても、ほかの衛星がいなくなった扱いにならないように）。
    if (!gifRecord.length || gifRecord[gifRecord.length - 1].t < game.t - 1e-9) {
      for (const satellite of game.satellites) if (satellite.alive) recordSatellite(satellite);
    }
    // 投稿の案内の 1 行（共有に失敗した・GIF を保存した。web.js が gif.note で出す）。
    const note = element("div", "", "game-detail");
    note.hidden = true;
    // 投稿の GIF は結果の画面が出た時に裏で作り始める（押してから作ると、端末の共有に要る直前の操作が切れることがあるため）。
    if (canPost) makeGif(note);
    openPanel(
      `${game.mutual ? "🧲 " : ""}${record ? "新記録！ " : ""}${score.turns} 周`,
      satelliteLine(),
      [
        button("もう一度", start),
        ...(canPost ? [xButton(button("𝕏 にポスト", () => options.post(orbitMessage(score, game.mutual, record), false, gif))), note] : []),
        resultLinks(),
      ],
    );
  }

  // 投稿の GIF を作る（gif.blob はできたら入る。新しく始めた・閉じたらやめる。作れなければ null のまま）。
  // gif.note は結果の欄に案内を 1 行出す。gif.noShare・gif.saved は web.js が付ける印。
  function makeGif(note) {
    const run = gifRun;
    const made = {
      blob: null,
      ready: null,
      note: (text) => {
        note.textContent = text;
        note.hidden = !text;
      },
    };
    made.ready = makeOrbitGif(gifRecord, {
      colors: COLORS,
      stars,
      // 縮尺は月の軌道の内側の点で決める（飛んでいった衛星の跡は画面の外へ出ていく線のまま）。
      limit: Math.max(0, ...game.world.moons.map((moon) => moon.distance)),
      isCancelled: () => run !== gifRun || !overlay.isConnected,
    })
      .catch(() => null)
      .then((blob) => {
        made.done = true;
        made.blob = blob;
        return blob;
      });
    gif = made;
  }

  // 結果の説明の 1 行: 枠（色）ごとの周の合計を、使った枠の色で並べる（3 つまで）。衛星が無ければ出さない。
  function satelliteLine() {
    if (!game.satellites.length) return undefined;
    const row = element("div", undefined, "game-detail orbit-result-line");
    const totals = new Map();
    for (const satellite of game.satellites) totals.set(satellite.slot, (totals.get(satellite.slot) || 0) + satellite.turns);
    [...totals.keys()].sort((a, b) => a - b).forEach((slot, index) => {
      const item = element("span", `${totals.get(slot)}周`);
      item.style.color = COLORS[slot % COLORS.length];
      row.append(...(index ? ["　"] : []), item);
    });
    return row;
  }

  // 結果の画面の下の、文字だけのリンクの 1 行（設定を変える・今日のお題へ）。
  function resultLinks() {
    const row = element("div", undefined, "orbit-result-links");
    const setup = element("button", "設定を変える", "game-link");
    setup.addEventListener("click", showSetup);
    const daily = element("button", "今日のお題へ", "game-link");
    daily.addEventListener("click", () => switchTo(openGame));
    row.append(setup, daily);
    return row;
  }

  function pointerPosition(event) {
    const rect = canvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }
  function toWorld(point) {
    const cx = camera ? camera.x : 0;
    const cy = camera ? camera.y : 0;
    return { x: cx + (point.x - size.width / 2) / scale(), y: cy + (size.height / 2 - point.y) / scale() };
  }
  function cancelDrag() {
    // 1 機目を出す前に、衛星を出さずに引っ張りが終わったら（短い引き・2 本目の指・取りやめ・大きさの変化）、消した案内を戻す。
    if (activePointer !== null && playing && beforeFirstSatellite(game)) showStartHint();
    activePointer = null;
    dragStart = null;
    placeFrom = null;
    dragPull = null;
    predicted = null;
    aimEnd = null;
    aimLow = null;
  }

  // 引っ張りの元。打ち上げのときは今の射場（引いている間は時間が止まるので、射場も止まっている）。置くときは触った所。
  function dragOrigin() {
    return style === "launch" ? launchSite(game, earthStart).position : placeFrom;
  }

  function startPinch() {
    if (!preview) stopFollow();
    const [a, b] = [...touches.values()];
    pinch = { distance: Math.hypot(a.x - b.x, a.y - b.y), zoom };
  }

  // 右クリックや Mac の Ctrl + クリックでメニューを出さない（出ると pointerup が届かず、時間が止まったままになるため）。
  canvas.addEventListener("contextmenu", (event) => event.preventDefault());
  canvas.addEventListener("pointerdown", (event) => {
    audio.load();
    // マウスの右ボタンなどでは引きを始めず、指としても数えない（コンテキストメニューが出ると pointerup が届かず、時間が止まったままになるため）。
    if (event.pointerType === "mouse" && event.button !== 0) return;
    touches.set(event.pointerId, pointerPosition(event));
    // 引っ張りを始めない時も指（マウス）を捕まえる。canvas の外で離しても pointerup が届き、touches に残らないように
    // （残ると 2 本指のズームの数え方がずれる）。
    try {
      canvas.setPointerCapture(event.pointerId);
    } catch {
      // 捕まえられない環境でも続ける。
    }
    if (touches.size >= 2) {
      // 2 本目の指: 引っ張りをやめて、2 本指のズームにする。3 本目以降はズームを止める（指の組が変わってズームが跳ねないように）。
      cancelDrag();
      if (touches.size === 2) startPinch();
      else pinch = null;
      return;
    }
    if (!playing || !panel.hidden || activePointer !== null || satellitesLeft(game) <= 0) return;
    const at = pointerPosition(event);
    if (style === "place") {
      const from = toWorld(at);
      if (!canPlace(game, from)) {
        hint.hidden = false;
        hint.textContent = "そこには置けません（地球・月・回っている衛星に近すぎるか、遠すぎます）";
        return;
      }
      placeFrom = from;
    } else if (!canLaunch(game, earthStart)) {
      hint.hidden = false;
      hint.textContent = "前の衛星が射場から離れるまで待ってください";
      return;
    }
    canvas.setPointerCapture(event.pointerId);
    activePointer = event.pointerId;
    dragStart = at;
    dragPull = { x: 0, y: 0 };
    hint.hidden = true;
  });
  canvas.addEventListener("pointermove", (event) => {
    if (touches.has(event.pointerId)) touches.set(event.pointerId, pointerPosition(event));
    if (pinch && touches.size === 2) {
      if (preview) return;
      const [a, b] = [...touches.values()];
      const before = zoom;
      const following = stopFollow();
      zoom = clampZoom((pinch.zoom * Math.hypot(a.x - b.x, a.y - b.y)) / Math.max(1, pinch.distance));
      if (!following) applyZoom(before);
      return;
    }
    if (event.pointerId !== activePointer) return;
    const at = pointerPosition(event);
    // 引きの強さは画面の大きさ・ズームによらず 60 px で 1.0（隕石当てと同じ。スマホと PC で同じ手応えにする）。
    dragPull = screenPull(dragStart, at);
  });
  const lift = (event) => {
    touches.delete(event.pointerId);
    // 指が 2 本に戻ったら、その組でズームをやり直す。それ以外ではズームしない。
    if (touches.size === 2) startPinch();
    else pinch = null;
  };
  canvas.addEventListener("pointerup", (event) => {
    audio.resume();
    lift(event);
    if (event.pointerId !== activePointer) return;
    // 終わったゲームには足さない（引っ張っている間に時間切れや「終了」になったとき）。
    if (playing && dragPull && Math.hypot(dragPull.x, dragPull.y) > 0.3) {
      const from = dragOrigin();
      // 打ち上げは向きを自動で決め、引きの長さで速さだけを変える（launchShot）。置くは引きの反対へ。
      const satellite =
        style === "place"
          ? addSatellite(game, from, launchVelocity(from, { x: from.x + dragPull.x, y: from.y + dragPull.y }))
          : launchFromSite(game, launchShot(launchSite(game, earthStart), Math.hypot(dragPull.x, dragPull.y)), earthStart);
      if (satellite) {
        // 枠を使い回す時は、その枠の前の衛星の跡を消す（画面の跡は枠の数まで）。
        for (const other of game.satellites) if (other !== satellite && other.slot === satellite.slot) trails.delete(other.id);
        trails.set(satellite.id, []);
        recordSatellite(satellite);
        // 衛星を出した時だけ ×1 に戻す（×16 のまま打ち上げると、てっぺんの噴射が間に合わないため）。
        setSpeed(1);
        audio.play("launch");
        followEnd = aimEnd;
        followLow = aimLow;
        // 追う先を出したばかりの衛星へ移す（道筋は次のフレームで描く時に覚える）。
        followPath = null;
      }
    }
    cancelDrag();
  });
  // 保険: iOS Safari の版によっては pointerup が操作として扱われないので、touchend と click でも動かし直す（鳴らしはしない）。
  overlay.addEventListener("touchend", audio.resume, { passive: true });
  overlay.addEventListener("click", audio.resume);
  canvas.addEventListener("pointercancel", (event) => {
    lift(event);
    if (event.pointerId === activePointer) cancelDrag();
  });
  canvas.addEventListener(
    "wheel",
    (event) => {
      event.preventDefault();
      // 設定の欄の間は見本の大きさを変えない。
      if (preview) return;
      // 行（deltaMode 1）やページ（2）単位で来るホイール（Firefox など）は、px に直す。
      const pixels = event.deltaY * (event.deltaMode === 1 ? 33 : event.deltaMode === 2 ? size.height : 1);
      // 追いかけ中なら外して今の寄りから（その瞬間は跳ばさず、新しい zoom へ寄せる）。追っていなければすぐ効かせる。
      const following = stopFollow();
      const before = zoom;
      zoom = clampZoom(zoom * Math.exp(-pixels * 0.0015));
      if (!following) applyZoom(before);
    },
    { passive: false },
  );
  speedButton.addEventListener("click", () => setSpeed(SPEEDS[(SPEEDS.indexOf(speed) + 1) % SPEEDS.length]));
  boostButton.addEventListener("click", () => {
    if (playing && activePointer === null) boost(boostTarget(game));
  });
  finish.addEventListener("click", () => {
    if (playing) finishGame();
  });
  back.addEventListener("click", () => switchTo(openGame));

  function setSpeed(value) {
    speed = value;
    rate = Math.max(value, autoSpeed(game));
    setText(speedButton, `×${value}`);
  }

  function setText(node, text) {
    if (node.textContent !== text) node.textContent = text;
  }

  // 「はじめる」の後、1 機目を出す前は、遊ぶときのボタン（時間も加速もまだ役目が無い）と点の表示を隠し、今日のお題への戻りを出す。
  // 設定の欄の間（playing でない）は、どちらも隠す（今日のお題へは欄の中にある）。
  function updateHud() {
    const waiting = playing && beforeFirstSatellite(game);
    back.hidden = !waiting;
    // 狭い画面でも、1 機目の前の題は 1 行に収める（右に「今日のお題へ」があるため）。
    title.classList.toggle("orbit-title-waiting", waiting);
    if (waiting) {
      setText(title, "軌道に乗せろ");
      controls.hidden = true;
      return;
    }
    const score = scoreOf(game);
    const left = Math.max(0, Math.ceil(GAME_SECONDS - elapsed(game)));
    if (playing) setText(title, `${score.turns} 周・残り衛星 ${satellitesLeft(game)}${rate > 1 ? "\u200a»\u200a" : "・"}残り ${Math.floor(left / 60)}:${String(left % 60).padStart(2, "0")}`);
    const target = boostTarget(game);
    const shots = target ? Math.floor((target.fuel + 1e-9) / BOOST) : 0;
    setText(boostButton, `噴射（${shots}）`);
    // 引いている間は噴射できない（時間が止まっているのに燃料だけ減らないように）。
    boostButton.disabled = !playing || shots === 0 || activePointer !== null;
    // 噴射の時（boostCue。離した後の道筋の終わり方といちばん低い所で決める）だけ、ボタンの地を黄色にする（記録や何機目かによらず毎回）。
    const cue = boostCue(target, followEnd, followLow);
    // 合図の色は衛星によらず 1 色（衛星ごとに変えると「黄色が押す時」と覚えた人が 2 機目以降を見逃したため）。
    boostButton.classList.toggle("orbit-boost-now", cue);
    controls.hidden = !playing;
  }

  function update(seconds) {
    explosions = explosions.filter((explosion) => advanceExplosion(explosion, seconds));
    if (!playing) return;
    // 引いている間はゲームの時間を止める（射場・月・衛星が動かず、狙ったとおりに打てる。2 本指のズームは cancelDrag で外れる）。
    if (activePointer !== null && dragPull) return;
    const alive = game.satellites.filter((satellite) => satellite.alive);
    const turnsBefore = turnsOf(game);
    // 速めても跡の線が角張らないよう、0.25 ゲーム秒以下に区切って進め、区切りごとに跡へ点を足す。
    // 速さは区切りごとに max(選んだ速さ, autoSpeed) で見直す（衛星がいなくなった区切りから先は選んだ速さ。×1 なら爆発が等速で見える）。
    // いなくなった衛星の爆発の場所は、いなくなった区切りの時刻で決める（音と爆発はフレームの後でまとめて 1 回）。
    const anchors = new Map();
    let left = seconds;
    while (left > 1e-9) {
      const now = Math.max(speed, autoSpeed(game));
      const part = Math.min(left * now, 0.25);
      step(game, part);
      left -= part / now;
      const over = isOver(game);
      for (const satellite of alive) {
        // 遠くへ飛んでいったものは爆発させない。
        if (satellite.alive || satellite.end === "away" || anchors.has(satellite.id)) continue;
        // 月に落ちたら月に、地球に落ちたら自転に付いていく（速めても爆発が置き去りにならないように）。ぶつかり合いはその場。
        anchors.set(
          satellite.id,
          satellite.end === "moon"
            ? moonAnchor(game.world, game.t, satellite)
            : satellite.end === "earth"
              ? earthAnchor(satellite, angleOfLongitude(0, game.t, earthStart, game.world.earthPeriod))
              : { x: satellite.x, y: satellite.y },
        );
      }
      for (const satellite of game.satellites) {
        const trail = trails.get(satellite.id);
        if (!trail || !satellite.alive) continue;
        trail.push({ x: satellite.x, y: satellite.y });
        if (trail.length > TRAIL_POINTS) trail.shift();
      }
      if (game.t >= nextRecord - 1e-9) {
        for (const satellite of game.satellites) if (satellite.alive) recordSatellite(satellite);
        nextRecord += RECORD_EVERY;
      }
      // 時間切れなら、残りの区切りで同じ位置の点を積まない。
      if (over) break;
    }
    // 上の欄の「»」は、次に進める実際の速さで出す（選んだのが ×1 なら、衛星がいなくなったフレームで消える）。
    rate = Math.max(speed, autoSpeed(game));
    // 最初の 1 周を回り切った衛星があれば 1 回だけ鳴らす。いなくなった衛星があれば、その理由で 1 回（衝突を優先）。
    if (firstTurns(turnsBefore, game)) audio.play("orbit");
    const gone = endSound(turnsBefore, game);
    if (gone) audio.play(gone.event, gone.km);
    for (const satellite of alive) {
      if (!anchors.has(satellite.id)) continue;
      const explosion = createExplosion(satellite.end === "crash" ? 0.7 : 0.45);
      explosion.at = anchors.get(satellite.id);
      explosions.push(explosion);
    }
    if (isOver(game)) finishGame();
  }

  function recordSatellite(satellite) {
    gifRecord.push({ t: game.t, x: satellite.x, y: satellite.y, s: satellite.id, c: satellite.slot });
  }

  function draw() {
    const c = context;
    const { width, height, ratio } = size;
    const s = scale();
    c.setTransform(ratio, 0, 0, ratio, 0, 0);
    drawSpace(c, width, height, stars);
    const shake = shakeOffset(explosions[explosions.length - 1], reduceMotion);
    // 設定の欄の間だけ、絵を上の欄と設定の欄の間の真ん中へ上げる（見本が欄の裏に隠れないように）。
    const lift = preview ? Math.max(0, height / 2 - (bar.offsetTop + bar.offsetHeight + panel.offsetTop) / 2) : 0;
    c.setTransform(ratio, 0, 0, ratio, shake.x * ratio, (shake.y - lift) * ratio);
    const center = toScreen({ x: 0, y: 0 });
    c.strokeStyle = "rgba(255,255,255,0.12)";
    c.setLineDash([4, 6]);
    for (const moon of game.world.moons) {
      c.beginPath();
      c.arc(center.x, center.y, moon.distance * s, 0, Math.PI * 2);
      c.stroke();
    }
    c.setLineDash([]);
    // 設定の欄の間は、前のゲームの跡を出さず、まっさらな地球（時刻 0）と見本だけを出す。
    const worldT = preview ? 0 : game.t;
    drawEarth(c, center, s, angleOfLongitude(0, worldT, preview ? PREVIEW_START : earthStart, game.world.earthPeriod));
    for (const moon of moonPositions(game.world, worldT)) {
      const at = toScreen(moon);
      c.fillStyle = "#c9c9c9";
      c.beginPath();
      c.arc(at.x, at.y, moon.radius * s, 0, Math.PI * 2);
      c.fill();
    }
    if (preview) {
      drawPreview();
      return;
    }
    if (style === "launch") {
      // 射場（地球と一緒に回る）。
      const site = toScreen(launchSite(game, earthStart).position);
      c.fillStyle = "#ff5a5f";
      c.beginPath();
      c.arc(site.x, site.y, 4, 0, Math.PI * 2);
      c.fill();
    }
    game.satellites.forEach((satellite) => {
      const color = COLORS[satellite.slot % COLORS.length];
      const trail = trails.get(satellite.id) || [];
      if (trail.length > 1) {
        c.strokeStyle = color;
        c.globalAlpha = satellite.alive ? 0.55 : 0.2;
        c.lineWidth = 1.5;
        c.beginPath();
        trail.forEach((point, pointIndex) => {
          const at = toScreen(point);
          if (pointIndex === 0) c.moveTo(at.x, at.y);
          else c.lineTo(at.x, at.y);
        });
        c.stroke();
        c.globalAlpha = 1;
      }
      if (satellite.alive) {
        const at = toScreen(satellite);
        drawSatellite(c, at.x, at.y, heading(satellite.id, satellite.vx, satellite.vy), color, Math.max(3, SAT_RADIUS * s));
      }
    });
    const rotation = angleOfLongitude(0, game.t, earthStart, game.world.earthPeriod);
    for (const explosion of explosions) drawExplosion(c, explosion, toScreen(anchorPosition(explosion.at, game.world, game.t, rotation)));
    if (dragPull) {
      const origin = dragOrigin();
      // 引きの線は、指を置いた所から指先まで（指の縮尺）。射場（置く点）からは道筋だけを出す。
      const tip = pullPx(dragStart, dragPull);
      c.strokeStyle = "rgba(255,255,255,0.6)";
      c.lineWidth = 1.5;
      c.beginPath();
      c.moveTo(dragStart.x, dragStart.y);
      c.lineTo(tip.x, tip.y);
      c.stroke();
      const color = COLORS[nextSlot(game) % COLORS.length];
      if (style === "launch") {
        // 打ち上げ: 射場からてっぺん（半径が最大の点）までを、次の衛星の色の実線で描く（落ちる所の赤い点・破線・カチッは出さない）。
        const site = launchSite(game, earthStart);
        const shot = launchShot(site, Math.hypot(dragPull.x, dragPull.y));
        const line = predict(origin, { x: shot.x + site.spin.x, y: shot.y + site.spin.y });
        drawApexLine(line.points, color);
        aimEnd = line.end;
        aimLow = line.low;
      } else {
        const end = { x: origin.x + dragPull.x, y: origin.y + dragPull.y };
        const lineEnd = drawAimLine(origin, launchVelocity(origin, end), color);
        clickOnTurn(aimEnd, lineEnd);
        aimEnd = lineEnd;
        aimLow = predicted.low;
      }
    } else if (playing) {
      // 離した後も、いちばん新しい衛星が 1 周回り切るまで、今の位置と速さからの道筋を出し続ける（噴射で線が変わるのが見えるように）。
      const target = boostTarget(game);
      if (target && target.turns === 0) {
        const lineEnd = drawAimLine(target, { x: target.vx, y: target.vy }, COLORS[target.slot % COLORS.length]);
        // 飛んでいく線（遠くまで伸びる）の間は追わずに地球中心へ戻す（噴射しすぎた時に画面が大きく振れたり、衛星が端に張り付いたりしないように）。
        followPath = predicted.end === "away" ? null : predicted.points;
        clickOnTurn(followEnd, lineEnd);
        followEnd = lineEnd;
        followLow = predicted.low;
      }
    }
  }

  // 設定の欄の後ろの見本（遊ぶ時と同じ図柄: 赤い射場の点・白い引きの線・衛星の色の跡）を、時刻でなぞって薄く描く。
  // 置くは、初めの PREVIEW_PULL の間は時間を止めて引きの線を出して縮め、その後に回す。動きを減らす設定では終わりの形だけを出す。
  // 衛星の向き（画面の上での進む向きの角度）。速さがほぼ 0 の時は前の向きのまま。
  function heading(key, vx, vy) {
    if (Math.hypot(vx, vy) > 1e-6) headings.set(key, Math.atan2(-vy, vx));
    return headings.get(key) || 0;
  }

  function drawPreview() {
    const c = context;
    const s = scale();
    const loop = reduceMotion ? 1 : (((performance.now() - previewAt) / 1000) % PREVIEW_LOOP) / PREVIEW_LOOP;
    const place = preview.style === "place";
    const moving = place ? Math.max(0, loop - PREVIEW_PULL) / (1 - PREVIEW_PULL) : loop;
    const index = Math.min(preview.firstPath.length - 1, Math.round((moving * PREVIEW_GAME) / PREVIEW_DT));
    const first = preview.firstPath[index];
    const second = preview.secondPath[Math.min(preview.secondPath.length - 1, index)];
    if (!place) {
      // 射場（遊ぶ時と同じ赤い点。見本の時刻 0 の位置）。
      const site = toScreen(preview.firstPath[0]);
      c.fillStyle = "#ff5a5f";
      c.beginPath();
      c.arc(site.x, site.y, 4, 0, Math.PI * 2);
      c.fill();
    } else if (loop < PREVIEW_PULL) {
      // 引きの白い線: 打ち出す向きの反対へ出て、半ばから縮む。
      const from = toScreen(preview.firstPath[0]);
      const speed = Math.hypot(preview.pull.x, preview.pull.y);
      const length = 60 * Math.min(1, 2 * (1 - loop / PREVIEW_PULL));
      c.strokeStyle = "rgba(255,255,255,0.6)";
      c.lineWidth = 1.5;
      c.beginPath();
      c.moveTo(from.x, from.y);
      c.lineTo(from.x - (preview.pull.x / speed) * length, from.y + (preview.pull.y / speed) * length);
      c.stroke();
    }
    if (preview.mutual) {
      // 引き合う: 2 機が近い（距離 2 未満）時だけ細い白線で結ぶ。近いほど濃く（最大 0.5）。
      const distance = Math.hypot(first.x - second.x, first.y - second.y);
      if (distance < 2) {
        const a = toScreen(first);
        const b = toScreen(second);
        c.strokeStyle = `rgba(255,255,255,${0.5 * (1 - distance / 2)})`;
        c.lineWidth = 1;
        c.beginPath();
        c.moveTo(a.x, a.y);
        c.lineTo(b.x, b.y);
        c.stroke();
      }
    }
    c.globalAlpha = PREVIEW_ALPHA;
    if (index > 0) {
      c.strokeStyle = COLORS[0];
      c.lineWidth = 1.5;
      c.beginPath();
      for (let pointIndex = 0; pointIndex <= index; pointIndex += 1) {
        const at = toScreen(preview.firstPath[pointIndex]);
        if (pointIndex === 0) c.moveTo(at.x, at.y);
        else c.lineTo(at.x, at.y);
      }
      c.stroke();
    }
    [preview.firstPath, preview.secondPath].forEach((path, colorIndex) => {
      // 見本の向きは、道筋の前後の点の差（速さの向き）から取る。
      const at = toScreen(colorIndex === 0 ? first : second);
      const i = Math.min(path.length - 1, index);
      const ahead = path[Math.min(path.length - 1, i + 1)];
      const behind = path[Math.max(0, i - 1)];
      const angle = heading(`preview${colorIndex}`, ahead.x - behind.x, ahead.y - behind.y);
      drawSatellite(c, at.x, at.y, angle, COLORS[colorIndex], Math.max(3, SAT_RADIUS * s));
    });
    c.globalAlpha = 1;
  }

  // 道筋の線: origin から velocity で出した 1 機が、1 周回るか、落ちる・飛んでいくまで（最長 240 秒）を線 1 本で見せ、
  // 地球・月に落ちる所に赤い点を描く。線の見た目は aimLineStyle（1 周回るなら color の実線）。終わり方（predictOrbit の end）を返す。
  // 印に時刻を入れる（時計が進めば月も動くので計算し直す。引いている間は時計が止まっているので使い回せる）。
  function drawAimLine(origin, velocity, color) {
    const c = context;
    predict(origin, velocity);
    // 線の見た目: 1 周回るなら衛星の色の実線、落ちる・ぶつかる・飛んでいくなら薄い白の破線、時間切れ（long）は白。
    const lineStyle = aimLineStyle(predicted.end, color);
    c.strokeStyle = lineStyle.color;
    c.globalAlpha = lineStyle.alpha;
    c.setLineDash(lineStyle.dash);
    c.lineWidth = 1.5;
    c.beginPath();
    predicted.points.forEach((point, pointIndex) => {
      const at = toScreen(point);
      if (pointIndex === 0) c.moveTo(at.x, at.y);
      else c.lineTo(at.x, at.y);
    });
    c.stroke();
    c.globalAlpha = 1;
    c.setLineDash([]);
    if (predicted.end === "earth" || predicted.end === "moon") {
      const at = toScreen(predicted.points[predicted.points.length - 1]);
      c.fillStyle = "#ff5a5f";
      c.beginPath();
      c.arc(at.x, at.y, 3, 0, Math.PI * 2);
      c.fill();
    }
    return predicted.end;
  }

  // origin から velocity で出した道筋（predictOrbit）。時刻・位置・速度が前と同じなら計算し直さない。
  function predict(origin, velocity) {
    const key = `${game.t},${origin.x},${origin.y},${velocity.x},${velocity.y}`;
    if (!predicted || predicted.key !== key) predicted = { key, ...predictOrbit(game, { x: origin.x, y: origin.y }, velocity) };
    return predicted;
  }

  // 打ち上げで引いている間の道筋: 初めの点からてっぺん（半径が最大の点）までを color の実線で描く。
  function drawApexLine(points, color) {
    const c = context;
    let top = 0;
    points.forEach((point, index) => {
      if (Math.hypot(point.x, point.y) > Math.hypot(points[top].x, points[top].y)) top = index;
    });
    c.strokeStyle = color;
    c.globalAlpha = 0.6;
    c.lineWidth = 1.5;
    c.beginPath();
    points.slice(0, top + 1).forEach((point, index) => {
      const at = toScreen(point);
      if (index === 0) c.moveTo(at.x, at.y);
      else c.lineTo(at.x, at.y);
    });
    c.stroke();
    c.globalAlpha = 1;
  }

  // 線が 1 周回らない線から 1 周回る線に変わった時に小さく鳴らす（境目で鳴り続けないように 150 ms あける）。
  function clickOnTurn(before, after) {
    const now = performance.now();
    if (aimClick(before, after) && now - aimAt >= 150) {
      audio.play("aim");
      aimAt = now;
    }
  }

  function tick(now) {
    const seconds = Math.min(0.05, (now - last) / 1000);
    last = now;
    update(seconds);
    // カメラは時間を止める判定（update の中）の後に動かす。設定の欄の間は地球中心・zoom 1 に固定する。
    if (preview) camera = homeView();
    else stepCamera(seconds);
    updateHud();
    draw();
    frame = window.requestAnimationFrame(tick);
  }

  function cleanup() {
    window.cancelAnimationFrame(frame);
    window.removeEventListener("resize", onResize);
    overlay.remove();
  }
  function switchTo(open) {
    cleanup();
    // 戻った先（隕石当て）は、開くとすぐ今日のお題（残りが無ければ今日の結果）。
    open(onClose, options);
  }
  close.addEventListener("click", () => {
    cleanup();
    onClose();
  });
  const onResize = () => {
    // 大きさが変わると指と世界の位置の対応がずれるので、引っ張りは取りやめる（隕石当てと同じ）。
    cancelDrag();
    resize();
  };
  window.addEventListener("resize", onResize);
  resize();
  showSetup();
  frame = window.requestAnimationFrame(tick);
}
