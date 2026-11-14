// 「軌道に乗せろ」の画面と操作（docs/design/activity-map.md §4 の K）。計算は orbit.js（衛星）と physics.js（地球と月）。
// 隕石当て（game.js）の「ほかの遊び方」から開き、「今日のお題へ」で戻る。「🗺️ 地図へ」で地図に戻る（単体のページでは「🏠 トップへ」）。
// 開くとすぐ「置く・ふつう」で 1 機目を置ける。打ち上げ・引き合うは結果の画面の「設定を変える」から選ぶ。
// 点数は端末の中だけ。
import "./game.css";
import { element } from "../dom.js";
import { DEFAULT_WORLD, MAX_PULL, angleOfLongitude, launchVelocity, moonPositions, preview } from "./physics.js";
import {
  BOOST,
  GAME_SECONDS,
  SATELLITES,
  SAT_RADIUS,
  SPEEDS,
  addSatellite,
  boost,
  boostTarget,
  canPlace,
  clampZoom,
  createOrbitGame,
  canLaunch,
  beforeFirstSatellite,
  elapsed,
  isOver,
  launchFromSite,
  launchSite,
  loadBest,
  satellitesLeft,
  saveBest,
  scoreOf,
  step,
} from "./orbit.js";
import { drawEarth, drawSpace, makeStars } from "./draw.js";
import { advanceExplosion, anchorPosition, createExplosion, drawExplosion, earthAnchor, moonAnchor, shakeOffset } from "./explosion.js";
import { orbitMessage, xButton } from "./posts.js";
import { openGame } from "./game.js";

// ズームが 1 のとき、月の軌道の外（半径 5.7）が画面の短い辺に収まる大きさにする（隕石当てと同じ）。
const VIEW_RADIUS = 5.7;
// 投げる前に見せる、少し先までの道筋（秒）。軌道を作る遊びなので、隕石当てより長めに見せる。
const PREVIEW_SECONDS = 4;
// 飛んだ跡の点の数（衛星ごと）。
const TRAIL_POINTS = 500;
const COLORS = ["#ffd166", "#06d6a0", "#ef476f"];
const END_TEXT = { earth: "地球に落ちた", moon: "月にぶつかった", crash: "衛星どうしでぶつかった", away: "遠くへ飛んでいった" };

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
  const speedButtons = SPEEDS.map((speed) => element("button", `×${speed}`, "game-button orbit-speed"));
  const zoomOut = element("button", "－", "game-button orbit-zoom");
  const zoomIn = element("button", "＋", "game-button orbit-zoom");
  const finish = element("button", "終了", "game-button");
  controls.append(boostButton, ...speedButtons, zoomOut, zoomIn, finish);
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
  let speed = 1;
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
  // 2 本指のズーム: 指ごとの位置と、始めた時の指の間の距離とズーム。
  const touches = new Map();
  let pinch = null;
  let frame = 0;
  let last = performance.now();
  // 地球・月に落ちた衛星や、ぶつかった衛星の爆発（世界の位置。早送りしていても、見える速さで進める）。
  let explosions = [];
  const reduceMotion = Boolean(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

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
  function openPanel(heading, detail, buttons) {
    panel.replaceChildren(element("div", heading, "game-result"), element("div", detail, "game-detail"), ...buttons);
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
    // 早送りは毎回 ×1 から（前のゲームの ×16 のまま始まると、打ち上げてすぐ落ちて加速が間に合わないため）。
    speed = 1;
    cancelDrag();
    playing = true;
    panel.hidden = true;
    hint.hidden = false;
    hint.textContent = style === "place" ? "地球のそばを触って引き、離すと反対へ飛ぶ" : "引っ張って離すと射場から打ち上げ";
  }

  function finishGame() {
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
    const lines = game.satellites.map((satellite, index) => `${index + 1}機目: ${satellite.turns}周${satellite.end ? `・${END_TEXT[satellite.end]}` : "・回り続けた"}`);
    openPanel(
      `${record ? "新記録！ " : ""}軌道ポイント ${score.points}`,
      `合計 ${score.turns} 周・いちばん大きな軌道は地球の半径の ${score.biggest.toFixed(1)} 倍（${lines.join("、") || "衛星なし"}）`,
      [
        button("もう一度", start),
        ...(options.post && score.points > 0 ? [xButton(button("𝕏 にポスト", () => options.post(orbitMessage(score, game.mutual, record), false)))] : []),
        button("設定を変える", showSetup),
        button("今日のお題へ", () => switchTo(openGame)),
      ],
    );
  }

  function pointerPosition(event) {
    const rect = canvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }
  function toWorld(point) {
    return { x: (point.x - size.width / 2) / scale(), y: (size.height / 2 - point.y) / scale() };
  }
  function cancelDrag() {
    activePointer = null;
    dragStart = null;
    placeFrom = null;
    dragPull = null;
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
    touches.set(event.pointerId, pointerPosition(event));
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
      const [a, b] = [...touches.values()];
      zoom = clampZoom((pinch.zoom * Math.hypot(a.x - b.x, a.y - b.y)) / Math.max(1, pinch.distance));
      return;
    }
    if (event.pointerId !== activePointer) return;
    const at = pointerPosition(event);
    let dx = (at.x - dragStart.x) / scale();
    let dy = -(at.y - dragStart.y) / scale();
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
    lift(event);
    if (event.pointerId !== activePointer) return;
    // 終わったゲームには足さない（引っ張っている間に時間切れや「終了」になったとき）。
    if (playing && dragPull && Math.hypot(dragPull.x, dragPull.y) > 0.3) {
      const from = dragOrigin();
      const velocity = launchVelocity(from, { x: from.x + dragPull.x, y: from.y + dragPull.y });
      const satellite = style === "place" ? addSatellite(game, from, velocity) : launchFromSite(game, velocity, earthStart);
      if (satellite) trails.set(satellite.id, []);
    }
    cancelDrag();
  });
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
  speedButtons.forEach((item, index) =>
    item.addEventListener("click", () => {
      speed = SPEEDS[index];
    }),
  );
  boostButton.addEventListener("click", () => {
    if (playing) boost(boostTarget(game));
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
    speedButtons.forEach((item, index) => item.setAttribute("aria-pressed", String(SPEEDS[index] === speed)));
    controls.hidden = !playing;
  }

  function update(seconds) {
    explosions = explosions.filter((explosion) => advanceExplosion(explosion, seconds));
    if (!playing) return;
    const alive = game.satellites.filter((satellite) => satellite.alive);
    step(game, seconds * speed);
    for (const satellite of alive) {
      // 遠くへ飛んでいったものは爆発させない。
      if (!satellite.alive && satellite.end !== "away") {
        const explosion = createExplosion(satellite.end === "crash" ? 0.7 : 0.45);
        // 月に落ちたら月に、地球に落ちたら自転に付いていく（×16 でも爆発が置き去りにならないように）。ぶつかり合いはその場。
        explosion.at =
          satellite.end === "moon"
            ? moonAnchor(game.world, game.t, satellite)
            : satellite.end === "earth"
              ? earthAnchor(satellite, angleOfLongitude(0, game.t, earthStart, game.world.earthPeriod))
              : { x: satellite.x, y: satellite.y };
        explosions.push(explosion);
      }
    }
    for (const satellite of game.satellites) {
      const trail = trails.get(satellite.id);
      if (!trail || !satellite.alive) continue;
      trail.push({ x: satellite.x, y: satellite.y });
      if (trail.length > TRAIL_POINTS) trail.shift();
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
      c.fillStyle = "rgba(255,255,255,0.8)";
      for (const point of preview(origin, velocity, game.t, 0, PREVIEW_SECONDS, 0.08, game.world)) {
        const at = toScreen(point);
        c.fillRect(at.x - 1.5, at.y - 1.5, 3, 3);
      }
      const pulled = Math.min(1, Math.hypot(dragPull.x, dragPull.y) / MAX_PULL);
      c.font = "bold 13px system-ui, sans-serif";
      c.textAlign = "center";
      c.fillStyle = "#ffffff";
      c.fillText(`${Math.round(pulled * 100)}%`, from.x, from.y - 14);
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
