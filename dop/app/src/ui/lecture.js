// 講義の画面（A-0017）: 一覧 → スライド（図・要点・音声・台本・根拠）→ その task の問題へ。
// 講義のデータは lec publish が public/lectures/ に置く。進み具合の形は logic/lecture.js。
import { el } from './el.js';
import { slideOf, setSlide, markSeen, isSeen, closeLecture } from '../logic/lecture.js';
import { loadLecture, saveLecture } from '../storage.js';

const ROOT = 'public/lectures/';

async function getJSON(url) {
  const res = await fetch(url, { cache: 'no-cache' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

/** 一覧の 1 行 */
function renderRow(l, saved, onOpen) {
  return el('li', {},
    el('button', { type: 'button', class: 'lec-row', 'data-testid': 'lecture-row', 'data-task': l.task, onclick: () => onOpen(l.task) },
      el('span', { class: 'lec-task', text: `タスク ${l.task}` }),
      el('span', { class: 'lec-row-title', text: l.title }),
      el('span', { class: 'lec-meta muted small' },
        `${l.slides ?? '?'} 枚・約 ${l.minutes ?? '?'} 分`,
        isSeen(saved, l.task) ? el('span', { class: 'badge seen', 'data-testid': 'lecture-seen', text: '見た' }) : null)));
}

/** 講義の一覧。index が null なら読み込み中 */
function renderList({ index, saved, error }, onOpen) {
  const body = index === null
    ? el('p', { class: 'muted', text: '読み込み中…' })
    : index.length
      ? el('ul', { class: 'lec-list', 'data-testid': 'lecture-list' }, index.map((l) => renderRow(l, saved, onOpen)))
      : el('p', { class: 'muted', 'data-testid': 'lecture-empty', text: '講義はまだありません。' });
  return el('section', { class: 'card', 'data-testid': 'lectures' },
    el('h2', { class: 'title', text: '講義' }),
    el('p', { class: 'muted small', text: 'タスクごとに、図と音声で要点を説明します。見終えたらそのタスクの問題を解けます。' }),
    error ? el('p', { class: 'error', 'data-testid': 'lecture-error', text: error }) : null,
    body);
}

function renderMermaid(v, url, onLoad) {
  return el('div', { class: 'lec-visual diagram-box', 'data-testid': 'lecture-visual', 'data-type': 'mermaid' },
    el('img', { src: url(v.svg), alt: v.alt ?? '', onload: onLoad }));
}

function renderCompare(v) {
  return el('div', { class: 'lec-visual lec-table', 'data-testid': 'lecture-visual', 'data-type': 'compare' },
    el('table', { class: 'stats' },
      el('thead', {}, el('tr', {}, v.columns.map((c) => el('th', { scope: 'col', text: c })))),
      el('tbody', {}, v.rows.map((r) => el('tr', {}, (Array.isArray(r) ? r : [r]).map((c, k) => el(k ? 'td' : 'th', { scope: k ? null : 'row', text: c })))))));
}

function renderSteps(v) {
  return el('ol', { class: 'lec-visual lec-steps', 'data-testid': 'lecture-visual', 'data-type': 'steps' },
    v.items.map((it, k) => el('li', {},
      el('span', { class: 'n', text: String(k + 1) }),
      el('span', {}, el('b', { text: it.label ?? String(it) }), it.note ? el('span', { class: 'muted small', text: it.note }) : null))));
}

/** スライドの図。url(path) は講義のフォルダーからの URL、onLoad は絵を読み終えた時 */
function renderVisual(v, url, onLoad) {
  if (!v) return null;
  if (v.type === 'mermaid' && v.svg) return renderMermaid(v, url, onLoad);
  if (v.type === 'compare' && Array.isArray(v.columns) && Array.isArray(v.rows)) return renderCompare(v);
  if (v.type === 'steps' && Array.isArray(v.items)) return renderSteps(v);
  return null;
}

function renderRefs(refs) {
  return el('details', { class: 'lec-more', 'data-testid': 'lecture-refs' },
    el('summary', { text: '根拠' }),
    el('div', { class: 'refs' }, refs.map((r) => el('figure', { class: 'ref', 'data-testid': 'lecture-ref' },
      el('blockquote', { lang: 'en', text: r.quote }),
      r.url ? el('figcaption', {}, el('a', { href: r.url, target: '_blank', rel: 'noopener noreferrer', text: '出典（AWS 公式ドキュメント）' })) : null))));
}

// 掛け合いの役の名前（声は先生 = 四国めたん、生徒 = ずんだもん）
const SPEAKERS = { teacher: 'めたん先生', student: 'ずんだもん' };

/** 台本。掛け合い（dialogue）なら話す人の名前を付けて 1 行ずつ、無ければ narration をそのまま */
function renderScript(s) {
  if (!Array.isArray(s.dialogue)) return el('p', { class: 'lec-script', text: s.narration ?? '' });
  return el('dl', { class: 'lec-script lec-dialogue', 'data-testid': 'lecture-dialogue' },
    s.dialogue.map((l) => el('div', { class: `lec-line ${l.who === 'student' ? 'student' : 'teacher'}` },
      el('dt', { text: SPEAKERS[l.who] ?? l.who }),
      el('dd', { text: l.text }))));
}

/** スライドの舞台（A-0018）: 決まった大きさの枠に番号・題・図・要点。入りきらない時は fitStage が字を縮める */
function renderStage(s, i, n, url, onLoad) {
  return el('section', { class: 'card lec-slide lec-stage', 'data-testid': 'lecture-slide', 'aria-live': 'polite' },
    el('div', { class: 'lec-stage-in', 'data-testid': 'lecture-stage' },
      el('div', { class: 'lec-stage-head' },
        el('h3', { class: 'lec-title', 'data-testid': 'lecture-title', text: s.title }),
        el('span', { class: 'lec-num muted small', 'data-testid': 'lecture-num', text: `${i + 1} / ${n}` })),
      el('div', { class: 'lec-stage-visual' }, renderVisual(s.visual, url, onLoad)),
      el('ul', { class: 'lec-bullets', 'data-testid': 'lecture-bullets' }, (s.bullets ?? []).map((b) => el('li', { text: b })))));
}

/** 舞台の下に出す物（台本・根拠） */
function renderBelow(s) {
  return el('div', { class: 'lec-below' },
    el('details', { class: 'lec-more', 'data-testid': 'lecture-script' },
      el('summary', { text: '台本を読む' }), renderScript(s)),
    renderRefs(s.refs ?? []));
}

/** 再生の操作。on: { show(n), toggle(), setAuto(checked), full() } */
function renderControls({ i, last, hasAudio, playing, auto, full }, on) {
  return el('div', { class: 'lec-controls' },
    el('button', { type: 'button', class: 'secondary', 'data-testid': 'lecture-prev', disabled: i === 0, onclick: () => on.show(i - 1), text: '前へ' }),
    hasAudio ? el('button', {
      type: 'button', 'data-testid': 'lecture-play',
      onclick: on.toggle,
      text: playing ? '一時停止' : '再生',
    }) : null,
    el('button', { type: 'button', class: 'secondary', 'data-testid': 'lecture-next', disabled: last, onclick: () => on.show(i + 1), text: '次へ' }),
    hasAudio ? el('label', { class: 'lec-auto' },
      el('input', { type: 'checkbox', 'data-testid': 'lecture-auto', checked: auto, onchange: (e) => on.setAuto(e.target.checked) }), '自動で次へ') : null,
    el('button', { type: 'button', class: 'secondary lec-full-btn', 'data-testid': 'lecture-full', 'aria-pressed': full ? 'true' : 'false', onclick: on.full, text: full ? '全画面を終える' : '全画面' }));
}

function renderDots(slides, i, onShow) {
  return el('nav', { class: 'lec-dots', 'aria-label': 'スライド' }, slides.map((x, k) => el('button', {
    type: 'button', class: 'secondary', 'data-testid': 'lecture-dot', 'aria-label': `${k + 1}. ${x.title}`,
    'aria-current': k === i ? 'true' : null, onclick: () => onShow(k), text: String(k + 1),
  })));
}

/** 最後のスライドの「この task の問題を解く」 */
function renderSolve(canSolve, onSolve) {
  return el('div', { class: 'actions' },
    canSolve ? null : el('p', { class: 'muted small', text: 'このタスクの問題はまだありません。' }),
    el('button', {
      type: 'button', 'data-testid': 'lecture-solve', disabled: !canSolve,
      onclick: onSolve,
      text: 'この task の問題を解く',
    }));
}

/** スライドの画面。view: { lec, i, playing, auto, full, canSolve, url }、on: { back(), show(n), toggle(), setAuto(c), full(), solve(), fit() } */
function renderSlide({ lec, i, playing, auto, full, canSolve, url }, on) {
  const s = lec.slides[i];
  const n = lec.slides.length;
  const last = i === n - 1;
  const hasAudio = lec.audio === true && !!s.audio;
  return el('div', { class: 'lec' },
    el('div', { class: 'lec-head' },
      el('button', { type: 'button', class: 'secondary', 'data-testid': 'lecture-back', onclick: on.back, text: '一覧へ' }),
      el('span', { class: 'muted small', text: `タスク ${lec.task}・約 ${lec.minutes ?? '?'} 分` })),
    el('h2', { class: 'lec-name', text: lec.title }),
    el('div', { class: 'lec-player', 'data-testid': 'lecture-player' },
      renderStage(s, i, n, url, on.fit),
      hasAudio ? el('div', { class: 'lec-bar', 'aria-hidden': 'true' }, el('i')) : null,
      renderControls({ i, last, hasAudio, playing, auto, full }, on)),
    renderDots(lec.slides, i, on.show),
    renderBelow(s),
    last ? renderSolve(canSolve, on.solve) : null,
    lec.credit ? el('p', { class: 'lec-credit muted small', 'data-testid': 'lecture-credit', text: `音声: ${lec.credit}` }) : null,
  );
}

/** 音声の終わり（onEnded）と進み具合のバー */
function bindAudio(audio, app, onEnded) {
  audio.addEventListener('ended', onEnded);
  audio.addEventListener('timeupdate', () => {
    const bar = app.querySelector('.lec-bar i');
    if (bar && audio.duration) bar.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
  });
}

/** ← → でスライドを移る。F で全画面、Esc で全画面を終える。current() は { lec, i } か null */
function bindKeys(current, isActive, show, keys = {}) {
  document.addEventListener('keydown', (e) => {
    const c = current();
    if (!c || !isActive() || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    if (e.target.closest?.('input, textarea, select, dialog')) return;
    if ((e.key === 'f' || e.key === 'F') && keys.full) { e.preventDefault(); keys.full(); return; }
    if (e.key === 'Escape' && keys.esc) keys.esc();
    if (e.key === 'ArrowRight' && c.i < c.lec.slides.length - 1) { e.preventDefault(); show(c.i + 1); }
    if (e.key === 'ArrowLeft' && c.i > 0) { e.preventDefault(); show(c.i - 1); }
  });
}

/** 描き直す。前にフォーカスがあった所（一覧の行は除く）へフォーカスを戻す */
function redraw(app, node) {
  const focused = document.activeElement?.dataset?.testid;
  app.replaceChildren(node);
  if (focused) {
    const again = app.querySelector(`[data-testid="${focused}"]:not([disabled])`);
    if (again && focused !== 'lecture-row') again.focus();
  }
}

/** 講義の一覧を読む。読めなければ [] */
async function fetchIndex() {
  try {
    const list = await getJSON(`${ROOT}index.json`);
    return Array.isArray(list) ? list.filter((l) => l && typeof l.task === 'string') : [];
  } catch {
    return [];
  }
}

/** 講義を 1 つ読む。スライドが無ければ投げる */
async function fetchLecture(task) {
  const data = await getJSON(`${ROOT}${task}/lecture.json`);
  if (!Array.isArray(data?.slides) || !data.slides.length) throw new Error('スライドが 0 枚');
  return data;
}

// ここから下の関数は、createLecture が持つ状態 c を受けて動く。
// c: { app, progress, hasTask, openTask, isActive, audio, saved, index, lec, i, playing, auto, error }

const store = (c, next) => { c.saved = next; saveLecture(c.saved); };

// 全画面（A-0018）。描き直しで要素が入れ替わっても続くよう、ブラウザの全画面は文書全体に掛け、
// 再生の枠を画面いっぱいに出すのは body の印（lec-full）で行う。全画面の API が無い端末でも印だけで広がる
function setFull(c, on) {
  c.full = on;
  document.body.classList.toggle('lec-full', on);
  const doc = document;
  try {
    if (on && !doc.fullscreenElement) doc.documentElement.requestFullscreen?.()?.catch?.(() => {});
    if (!on && doc.fullscreenElement) { c.selfExit = true; doc.exitFullscreen?.()?.catch?.(() => {}); }
  } catch { /* 全画面にできない端末は印だけ */ }
}

/** 舞台に入りきるまで字を縮める（--lec-k を 1 から 0.4 まで） */
function fitStage(app) {
  const stage = app.querySelector('.lec-stage-in');
  if (!stage) return;
  const over = () => stage.scrollHeight > stage.clientHeight + 1 || [...stage.querySelectorAll('.lec-stage-visual, .lec-table')].some((x) => x.scrollHeight > x.clientHeight + 1 || x.scrollWidth > x.clientWidth + 1);
  let k = 1;
  stage.style.setProperty('--lec-k', String(k));
  while (over() && k > 0.4) { k = Math.round((k - 0.05) * 100) / 100; stage.style.setProperty('--lec-k', String(k)); }
}
const slideUrl = (c) => (path) => `${ROOT}${c.lec.task}/${path}`;

function play(c) {
  c.playing = true;
  c.audio.play().catch(() => { c.playing = false; draw(c); });
}

function pause(c) {
  c.playing = false;
  c.audio.pause();
}

function show(c, n) {
  c.i = Math.max(0, Math.min(n, c.lec.slides.length - 1));
  store(c, setSlide(c.saved, c.lec.task, c.i));
  const s = c.lec.slides[c.i];
  if (c.lec.audio && s.audio) {
    c.audio.src = slideUrl(c)(s.audio);
    if (c.playing) play(c);
  } else pause(c);
  draw(c);
}

/** 音声が終わった: 自動なら次へ。最後のスライドなら見たことにする */
function ended(c) {
  if (!c.lec) return;
  if (c.auto && c.i < c.lec.slides.length - 1) { show(c, c.i + 1); return; }
  c.playing = false;
  if (c.i === c.lec.slides.length - 1) store(c, markSeen(c.saved, c.lec.task));
  draw(c);
}

async function loadIndex(c) {
  c.index = await fetchIndex();
  if (c.isActive() && !c.lec) draw(c);
}

async function open(c, task) {
  pause(c);
  c.error = '';
  try {
    c.lec = await fetchLecture(task);
    c.audio.removeAttribute('src');
    show(c, slideOf(c.saved, task, c.lec.slides.length));
  } catch (e) {
    c.lec = null;
    store(c, closeLecture(c.saved));
    c.error = `講義 ${task} を読み込めません（${e.message}）。`;
    draw(c);
  }
  window.scrollTo(0, 0);
}

function toList(c) {
  pause(c);
  if (c.full) setFull(c, false);
  c.lec = null;
  store(c, closeLecture(c.saved));
  draw(c);
}

/** スライドの画面のボタンが呼ぶ先 */
function slideHandlers(c) {
  return {
    back: () => toList(c),
    show: (n) => show(c, n),
    toggle: () => { if (c.playing) pause(c); else play(c); draw(c); },
    setAuto: (checked) => { c.auto = checked; },
    full: () => { setFull(c, !c.full); draw(c); },
    fit: () => fitStage(c.app),
    solve: () => { const t = c.lec.task; store(c, markSeen(c.saved, t)); c.openTask(t); },
  };
}

function draw(c) {
  if (!c.isActive()) return;
  if (!c.lec) {
    c.progress.textContent = '';
    redraw(c.app, renderList(c, (task) => open(c, task)));
    return;
  }
  c.progress.textContent = `${c.i + 1} / ${c.lec.slides.length}`;
  const view = { lec: c.lec, i: c.i, playing: c.playing, auto: c.auto, full: c.full, canSolve: c.hasTask(c.lec.task), url: slideUrl(c) };
  redraw(c.app, renderSlide(view, slideHandlers(c)));
  fitStage(c.app);
}

/**
 * app: 描く場所、progress: 上の「i / n」の場所、hasTask(task): その task の問題があるか、
 * openTask(task): その task の最初の問題を開く、isActive(): 講義の画面を出しているか
 */
export function createLecture({ app, progress, hasTask, openTask, isActive }) {
  const c = {
    app, progress, hasTask, openTask, isActive,
    audio: el('audio', { preload: 'auto', 'data-testid': 'lecture-audio' }),
    saved: loadLecture(),
    index: null, // 一覧。読めなければ []
    lec: null, // 開いている講義
    i: 0,
    playing: false,
    auto: true,
    full: false,
    selfExit: false,
    error: '',
  };
  document.body.append(c.audio);
  bindAudio(c.audio, app, () => ended(c));
  bindKeys(() => (c.lec ? { lec: c.lec, i: c.i } : null), isActive, (n) => show(c, n), {
    full: () => { setFull(c, !c.full); draw(c); },
    esc: () => { if (c.full) { setFull(c, false); draw(c); } },
  });
  // ブラウザの全画面が Esc などで終わった時は印も外す。大きさが変わったら字を合わせ直す
  // こちらから終えた時の知らせ（selfExit）は、その後に押し直した全画面を消さないよう読み捨てる
  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement && c.selfExit) c.selfExit = false;
    else if (!document.fullscreenElement && c.full) { setFull(c, false); draw(c); return; }
    fitStage(app);
  });
  window.addEventListener('resize', () => { if (c.lec) fitStage(app); });

  return {
    /** 開いていた講義（読み込み直した時に続ける）。無ければ null */
    opened: () => c.saved.open,
    /** 上の「講義」を押した: 一覧へ */
    toList: () => toList(c),
    render() {
      if (c.index === null) loadIndex(c);
      if (!c.lec && c.saved.open && !c.error) { const t = c.saved.open; c.saved = closeLecture(c.saved); open(c, t); }
      draw(c);
    },
    /** ほかの画面へ移った: 音声を止め、開いていた講義を閉じる（スライドの位置は残る） */
    leave() {
      if (c.playing) pause(c);
      if (c.full) setFull(c, false);
      if (c.lec || c.saved.open) { c.lec = null; store(c, closeLecture(c.saved)); }
    },
  };
}
