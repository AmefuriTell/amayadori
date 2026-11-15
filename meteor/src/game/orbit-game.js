// 「軌道に乗せろ」の画面と操作（docs/design/activity-map.md §4 の K）。計算は orbit.js（衛星）と physics.js（地球と月）。
// 隕石当て（game.js）の「ほかの遊び方」から開き、「今日のお題へ」で戻る。「🗺️ 地図へ」で地図に戻る（単体のページでは「🏠 トップへ」）。
// 開くとすぐ「置く・ふつう」で 1 機目を置ける。打ち上げ・引き合うは結果の画面の「設定を変える」から選ぶ。
// 点数は端末の中だけ。
import "./game.css";
import { element } from "../dom.js";
import { DEFAULT_WORLD, MAX_PULL, angleOfLongitude, launchVelocity, moonPositions } from "./physics.js";
import {
  BOOST,
  GAME_SECONDS,
  SATELLITES,
  SAT_RADIUS,
  addSatellite,
  aimClick,
  aimLineStyle,
  boost,
  boostTarget,
  canPlace,
  clampZoom,
  createOrbitGame,
  endSound,
  firstTurns,
  canLaunch,
  beforeFirstSatellite,
  elapsed,
  isOver,
  launchFromSite,
  launchSite,
  loadBest,
  predictOrbit,
  satellitesLeft,
  saveBest,
  scoreOf,
  step,
  targetSpeed,
  turnsOf,
} from "./orbit.js";
import { drawEarth, drawSpace, makeStars } from "./draw.js";
import { advanceExplosion, anchorPosition, createExplosion, drawExplosion, earthAnchor, moonAnchor, shakeOffset } from "./explosion.js";
import { orbitMessage, xButton } from "./posts.js";
import { openGame } from "./game.js";
import { loadMuted } from "./sound.js";
import { createAudio } from "./audio.js";
import { PULL_PX } from "./view.js";

// ズームが 1 のとき、月の軌道の外（半径 5.7）が画面の短い辺に収まる大きさにする（隕石当てと同じ）。
const VIEW_RADIUS = 5.7;
// 飛んだ跡の点の数（衛星ごと）。
const TRAIL_POINTS = 500;
const COLORS = ["#ffd166", "#06d6a0", "#ef476f"];
// 結果の画面で、いなくなった衛星の周の数の後ろに付ける短い終わり方（回り続けたら何も付けない）。
const END_SHORT = { earth: "落ちた", moon: "月", crash: "衝突", away: "飛んだ" };

export function openOrbitGame(onClose, options = {}) {
  const overlay = element("div", undefined, "game");
  const canvas = element("canvas", undefined, "game-canvas");
  const bar = element("div", undefined, "game-bar");
  // 閉じるボタンの文言（地図の Activity では地図へ戻る。Discord の外の単体のページではトップへ戻る）。
  const close = element("button", options.closeLabel || "🗺️ 地図へ", "game-button");
  const title = element("div", "", "game-title");
  // 1 機目を出す前だけ出す、隕石当ての今日のお題への戻り（文字だけのボタン）。
  const back = element("button", "今日のお題へ", "game-link");
  bar.append(close, title, back);
  const controls = element("div", undefined, "orbit-controls");
  const boostButton = element("button", "", "game-button orbit-boost");
  const zoomOut = element("button", "－", "game-button orbit-zoom");
  const zoomIn = element("button", "＋", "game-button orbit-zoom");
  const finish = element("button", "終了", "game-button");
  controls.append(boostButton, zoomOut, zoomIn, finish);
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
  // 時計の進む速さ（操作が無くなると、targetSpeed で自動に早送りする）と、最後に操作した時刻（game.t）。
  let speed = 1;
  let lastAction = 0;
  let style = "place";
  let mutual = false;
  let game = createOrbitGame(DEFAULT_WORLD, mutual);
  let earthStart = 0;
  let playing = false;
  let trails = new Map();
  let best = loadBest();
  // 引っ張り: 指を置いた所（画面の px）と、衛星の置き場（世界の位置）、今の指の位置から決めたゴムの先（世界）。
  let activePointer = null;
  let dragStart = null;
  // 置くときの位置（世界）と、引っ張った向きと長さ（世界。元からゴムの先まで）。
  let placeFrom = null;
  let dragPull = null;
  // 引っ張っている間の道筋（predictOrbit）の前の結果。時刻と引きの量（位置・速度）が同じなら計算し直さない。
  let predicted = null;
  // 前の道筋の終わり方と、最後に「カチッ」（aim）を鳴らした時刻（performance.now()。境目で鳴り続けないように 150 ms あける）。
  let aimEnd = null;
  let aimAt = -Infinity;
  // 2 本指のズーム: 指ごとの位置と、始めた時の指の間の距離とズーム。
  const touches = new Map();
  let pinch = null;
  let frame = 0;
  let last = performance.now();
  // 地球・月に落ちた衛星や、ぶつかった衛星の爆発（世界の位置。自動で早送りしていても、見える速さで進める）。
  let explosions = [];
  const reduceMotion = Boolean(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  // 効果音（隕石当てと同じ audio.js。消音は隕石当ての「ほかの遊び方」の「音: あり／なし」）。最初に触ったときに読み込み、
  // 閉じた後は鳴らさない。鳴らすのは出した時・引いて 1 周回る線になった時・最初の 1 周・いなくなった時だけ（DESIGN.md の「音」）。
  const muted = loadMuted();
  const audio = createAudio({ isMuted: () => muted, isOpen: () => overlay.isConnected });

  function scale() {
    return (Math.min(size.width, size.height) / 2 / VIEW_RADIUS) * zoom;
  }
  function toScreen(point) {
    return { x: size.width / 2 + point.x * scale(), y: size.height / 2 - point.y * scale() };
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
    panel.hidden = false;
    hint.hidden = true;
  }

  function showSetup() {
    // 遊び方を選ぶ画面（結果の画面の「設定を変える」から開く）: 置き方（置く・打ち上げ）と、衛星どうしが引き合うか。
    playing = false;
    const bestText = best[mutual ? "mutual" : "normal"];
    title.textContent = "🛰️ 軌道に乗せろ";
    openPanel(
      "🛰️ 軌道に乗せろ",
      `衛星を${SATELLITES}機、地球の周りに回らせる。1 周ごとに、その周でいちばん遠くまで行った距離（地球の半径の何倍か）の 2 乗が点になる（大きく回るほど多い）${bestText === undefined ? "" : `（いちばん良かったのは ${bestText}）`}`,
      [
        button("📍 置く", () => ((style = "place"), showSetup()), style === "place"),
        button("🚀 打ち上げ", () => ((style = "launch"), showSetup()), style === "launch"),
        button("ふつう", () => ((mutual = false), showSetup()), !mutual),
        button("🧲 引き合う", () => ((mutual = true), showSetup()), mutual),
        button("はじめる", start),
        button("今日のお題へ", () => switchTo(openGame)),
      ],
    );
  }

  function start() {
    game = createOrbitGame(DEFAULT_WORLD, mutual);
    earthStart = Math.random() * Math.PI * 2;
    trails = new Map();
    explosions = [];
    // 毎回 ×1 から（早送りのまま始まると、打ち上げてすぐ落ちて加速が間に合わないため）。
    speed = 1;
    lastAction = 0;
    cancelDrag();
    playing = true;
    panel.hidden = true;
    showStartHint();
  }

  // 始めたときの案内（1 機目を出す前に、衛星を出さずに引っ張りが終わったときにも出し直す）。
  function showStartHint() {
    hint.hidden = false;
    hint.textContent = style === "place" ? "地球のそばを触って引き、離すと反対へ飛ぶ" : "引っ張って離すと射場から打ち上げ";
  }

  function finishGame() {
    // 終わったコマの点・周を上の表示にも出してから止める（結果の画面の数字とそろえる）。
    updateHud();
    playing = false;
    cancelDrag();
    const score = scoreOf(game);
    const key = mutual ? "mutual" : "normal";
    // 0 点（何も回らなかった）は記録にしない。
    const record = score.points > 0 && (best[key] === undefined || score.points > best[key]);
    if (record) {
      best = { ...best, [key]: score.points };
      saveBest(best);
    }
    openPanel(
      `${record ? "新記録！ " : ""}軌道ポイント ${score.points}`,
      satelliteLine(),
      [
        button("もう一度", start),
        ...(options.post && score.points > 0 ? [xButton(button("𝕏 にポスト", () => options.post(orbitMessage(score, game.mutual, record), false)))] : []),
        resultLinks(),
      ],
    );
  }

  // 結果の説明の 1 行: 衛星ごとの周の数（いなくなった衛星は短い終わり方も）を衛星の色で並べる。衛星が無ければ出さない。
  function satelliteLine() {
    if (!game.satellites.length) return undefined;
    const row = element("div", undefined, "game-detail orbit-result-line");
    game.satellites.forEach((satellite, index) => {
      const item = element("span", `${satellite.turns}周${satellite.end ? ` ${END_SHORT[satellite.end]}` : ""}`);
      item.style.color = COLORS[index % COLORS.length];
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
    return { x: (point.x - size.width / 2) / scale(), y: (size.height / 2 - point.y) / scale() };
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
  }

  // 引っ張りの元。打ち上げのときは今の射場（引っ張っている間も地球と一緒に回る。指を置いた時の位置のままにすると、
  // 道筋と実際の打ち上げがずれる）。置くときは触った所。
  function dragOrigin() {
    return style === "launch" ? launchSite(game, earthStart).position : placeFrom;
  }

  function startPinch() {
    const [a, b] = [...touches.values()];
    pinch = { distance: Math.hypot(a.x - b.x, a.y - b.y), zoom };
  }

  canvas.addEventListener("pointerdown", (event) => {
    audio.load();
    touches.set(event.pointerId, pointerPosition(event));
    // 引っ張りを始めない時も指（マウス）を捕まえる。canvas の外で離しても pointerup が届き、touches に残らないように
    // （残ると「触れている」ままになり、早送りが始まらない）。
    try {
      canvas.setPointerCapture(event.pointerId);
    } catch {
      // 捕まえられない環境でも続ける。
    }
    // 遊んでいる間に画面を触ったら、すぐ ×1 に戻す（狙って加速したい時や、次の衛星を出す時に間に合うように）。
    // 早送り中に触った時は ×1 に戻すだけで、引っ張りも説明も出さない（2 本目の指のズームは下で今までどおり）。
    const wasCruising = playing && panel.hidden && speed > 1;
    if (playing && panel.hidden) {
      speed = 1;
      lastAction = game.t;
    }
    if (touches.size >= 2) {
      // 2 本目の指: 引っ張りをやめて、2 本指のズームにする。3 本目以降はズームを止める（指の組が変わってズームが跳ねないように）。
      cancelDrag();
      if (touches.size === 2) startPinch();
      else pinch = null;
      return;
    }
    if (wasCruising) return;
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
      const [a, b] = [...touches.values()];
      zoom = clampZoom((pinch.zoom * Math.hypot(a.x - b.x, a.y - b.y)) / Math.max(1, pinch.distance));
      return;
    }
    if (event.pointerId !== activePointer) return;
    const at = pointerPosition(event);
    // 引きの強さは画面の大きさ・ズームによらず PULL_PX（60 px）で 1.0（隕石当てと同じ。スマホと PC で同じ手応えにする）。
    let dx = (at.x - dragStart.x) / PULL_PX;
    let dy = -(at.y - dragStart.y) / PULL_PX;
    const length = Math.hypot(dx, dy);
    if (length > MAX_PULL) {
      dx *= MAX_PULL / length;
      dy *= MAX_PULL / length;
    }
    dragPull = { x: dx, y: dy };
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
      const velocity = launchVelocity(from, { x: from.x + dragPull.x, y: from.y + dragPull.y });
      const satellite = style === "place" ? addSatellite(game, from, velocity) : launchFromSite(game, velocity, earthStart);
      if (satellite) {
        trails.set(satellite.id, []);
        lastAction = game.t;
        audio.play("launch");
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
      // 行（deltaMode 1）やページ（2）単位で来るホイール（Firefox など）は、px に直す。
      const pixels = event.deltaY * (event.deltaMode === 1 ? 33 : event.deltaMode === 2 ? size.height : 1);
      zoom = clampZoom(zoom * Math.exp(-pixels * 0.0015));
    },
    { passive: false },
  );
  zoomIn.addEventListener("click", () => (zoom = clampZoom(zoom * 1.25)));
  zoomOut.addEventListener("click", () => (zoom = clampZoom(zoom / 1.25)));
  boostButton.addEventListener("click", () => {
    if (playing && boost(boostTarget(game))) lastAction = game.t;
  });
  finish.addEventListener("click", () => {
    if (playing) finishGame();
  });
  back.addEventListener("click", () => switchTo(openGame));

  function setText(node, text) {
    if (node.textContent !== text) node.textContent = text;
  }

  // 1 機目を出す前は、遊ぶときのボタン（時間も加速もまだ役目が無い）と点の表示を隠し、今日のお題への戻りを出す。
  function updateHud() {
    const waiting = playing && beforeFirstSatellite(game);
    back.hidden = !waiting;
    // 狭い画面でも、1 機目の前の題は 1 行に収める（右に「今日のお題へ」があるため）。
    title.classList.toggle("orbit-title-waiting", waiting);
    if (waiting) {
      setText(title, "🛰️ 軌道に乗せろ");
      controls.hidden = true;
      return;
    }
    const score = scoreOf(game);
    const left = Math.max(0, Math.ceil(GAME_SECONDS - elapsed(game)));
    if (playing) setText(title, `🛰️ ${score.points} 点・${score.turns} 周・残り衛星 ${satellitesLeft(game)}・残り ${Math.floor(left / 60)}:${String(left % 60).padStart(2, "0")}`);
    const target = boostTarget(game);
    const shots = target ? Math.floor((target.fuel + 1e-9) / BOOST) : 0;
    setText(boostButton, `🔥 加速（${shots}）`);
    boostButton.disabled = !playing || shots === 0;
    controls.hidden = !playing;
  }

  function update(seconds) {
    explosions = explosions.filter((explosion) => advanceExplosion(explosion, seconds));
    if (!playing) return;
    // 速さを目標へ滑らかに寄せる。目標が ×1 に戻ったら（加速した時など）すぐ ×1 にする。
    // 指が触れている間（引っ張り・ズーム）は早送りせず、待ち時間も数え直す（置かずに離した直後に早送りしないように）。
    const touching = activePointer !== null || touches.size > 0;
    if (touching) lastAction = game.t;
    const target = targetSpeed(game, lastAction, touching);
    speed = target === 1 ? 1 : speed + (target - speed) * Math.min(1, seconds * 3);
    const alive = game.satellites.filter((satellite) => satellite.alive);
    const turnsBefore = turnsOf(game);
    // 早送りでも跡の線が角張らないよう、0.25 ゲーム秒以下に区切って進め、区切りごとに跡へ点を足す。
    // いなくなった衛星の爆発の場所は、いなくなった区切りの時刻で決める（音と爆発はフレームの後でまとめて 1 回）。
    const total = seconds * speed;
    const parts = Math.max(1, Math.ceil(total / 0.25));
    const anchors = new Map();
    for (let part = 0; part < parts; part += 1) {
      step(game, total / parts);
      const over = isOver(game);
      for (const satellite of alive) {
        // 遠くへ飛んでいったものは爆発させない。
        if (satellite.alive || satellite.end === "away" || anchors.has(satellite.id)) continue;
        // 月に落ちたら月に、地球に落ちたら自転に付いていく（早送りでも爆発が置き去りにならないように）。ぶつかり合いはその場。
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
      // 時間切れ（または全機いなくなった）なら、残りの区切りで同じ位置の点を積まない。
      if (over) break;
    }
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

  function draw() {
    const c = context;
    const { width, height, ratio } = size;
    const s = scale();
    c.setTransform(ratio, 0, 0, ratio, 0, 0);
    drawSpace(c, width, height, stars);
    const shake = shakeOffset(explosions[explosions.length - 1], reduceMotion);
    c.setTransform(ratio, 0, 0, ratio, shake.x * ratio, shake.y * ratio);
    const center = toScreen({ x: 0, y: 0 });
    c.strokeStyle = "rgba(255,255,255,0.12)";
    c.setLineDash([4, 6]);
    for (const moon of game.world.moons) {
      c.beginPath();
      c.arc(center.x, center.y, moon.distance * s, 0, Math.PI * 2);
      c.stroke();
    }
    c.setLineDash([]);
    drawEarth(c, center, s, angleOfLongitude(0, game.t, earthStart, game.world.earthPeriod));
    for (const moon of moonPositions(game.world, game.t)) {
      const at = toScreen(moon);
      c.fillStyle = "#c9c9c9";
      c.beginPath();
      c.arc(at.x, at.y, moon.radius * s, 0, Math.PI * 2);
      c.fill();
    }
    if (style === "launch") {
      // 射場（地球と一緒に回る）。
      const site = toScreen(launchSite(game, earthStart).position);
      c.fillStyle = "#ff5a5f";
      c.beginPath();
      c.arc(site.x, site.y, 4, 0, Math.PI * 2);
      c.fill();
    }
    game.satellites.forEach((satellite, index) => {
      const color = COLORS[index % COLORS.length];
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
        c.fillStyle = color;
        c.beginPath();
        c.arc(at.x, at.y, Math.max(3, SAT_RADIUS * s), 0, Math.PI * 2);
        c.fill();
      }
    });
    const rotation = angleOfLongitude(0, game.t, earthStart, game.world.earthPeriod);
    for (const explosion of explosions) drawExplosion(c, explosion, toScreen(anchorPosition(explosion.at, game.world, game.t, rotation)));
    if (dragPull) {
      const origin = dragOrigin();
      const end = { x: origin.x + dragPull.x, y: origin.y + dragPull.y };
      const from = toScreen(origin);
      const to = toScreen(end);
      c.strokeStyle = "rgba(255,255,255,0.6)";
      c.lineWidth = 1.5;
      c.beginPath();
      c.moveTo(from.x, from.y);
      c.lineTo(to.x, to.y);
      c.stroke();
      let velocity = launchVelocity(origin, end);
      if (style === "launch") {
        const { spin } = launchSite(game, earthStart);
        velocity = { x: velocity.x + spin.x, y: velocity.y + spin.y };
      }
      // 1 周回るか、落ちる・飛んでいくまで（最長 240 秒）の道筋を線 1 本で見せ、落ちる所に赤い点を描く。
      // 印に時刻を入れる（指を止めていても月は動くので、時計が進めば計算し直す。使い回せるのは時計が止まっている間だけ）。
      const key = `${game.t},${origin.x},${origin.y},${velocity.x},${velocity.y}`;
      if (!predicted || predicted.key !== key) {
        predicted = { key, ...predictOrbit(game, origin, velocity) };
        const now = performance.now();
        if (aimClick(aimEnd, predicted.end) && now - aimAt >= 150) {
          audio.play("aim");
          aimAt = now;
        }
        aimEnd = predicted.end;
      }
      // 線の見た目: 1 周回るなら次に出す衛星の色の実線、落ちる・ぶつかる・飛んでいくなら薄い白の破線、時間切れ（long）は白。
      const lineStyle = aimLineStyle(predicted.end, COLORS[game.satellites.length % COLORS.length]);
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
    }
  }

  function tick(now) {
    const seconds = Math.min(0.05, (now - last) / 1000);
    last = now;
    update(seconds);
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
  start();
  frame = window.requestAnimationFrame(tick);
}
