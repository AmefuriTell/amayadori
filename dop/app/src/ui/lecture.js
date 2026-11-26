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

/**
 * app: 描く場所、progress: 上の「i / n」の場所、hasTask(task): その task の問題があるか、
 * openTask(task): その task の最初の問題を開く、isActive(): 講義の画面を出しているか
 */
export function createLecture({ app, progress, hasTask, openTask, isActive }) {
  let saved = loadLecture();
  let index = null; // 一覧。読めなければ []
  let lec = null; // 開いている講義
  let i = 0;
  let playing = false;
  let auto = true;
  let error = '';
  const audio = el('audio', { preload: 'auto', 'data-testid': 'lecture-audio' });
  document.body.append(audio);

  const store = (next) => { saved = next; saveLecture(saved); };

  audio.addEventListener('ended', () => {
    if (!lec) return;
    if (auto && i < lec.slides.length - 1) { show(i + 1); return; }
    playing = false;
    if (i === lec.slides.length - 1) store(markSeen(saved, lec.task));
    draw();
  });
  audio.addEventListener('timeupdate', () => {
    const bar = app.querySelector('.lec-bar i');
    if (bar && audio.duration) bar.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
  });

  document.addEventListener('keydown', (e) => {
    if (!lec || !isActive() || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    if (e.target.closest?.('input, textarea, select, dialog')) return;
    if (e.key === 'ArrowRight' && i < lec.slides.length - 1) { e.preventDefault(); show(i + 1); }
    if (e.key === 'ArrowLeft' && i > 0) { e.preventDefault(); show(i - 1); }
  });

  const slideUrl = (path) => `${ROOT}${lec.task}/${path}`;

  function play() {
    playing = true;
    audio.play().catch(() => { playing = false; draw(); });
  }
  function pause() {
    playing = false;
    audio.pause();
  }

  function show(n) {
    i = Math.max(0, Math.min(n, lec.slides.length - 1));
    store(setSlide(saved, lec.task, i));
    const s = lec.slides[i];
    if (lec.audio && s.audio) {
      audio.src = slideUrl(s.audio);
      if (playing) play();
    } else pause();
    draw();
  }

  async function loadIndex() {
    try {
      const list = await getJSON(`${ROOT}index.json`);
      index = Array.isArray(list) ? list.filter((l) => l && typeof l.task === 'string') : [];
    } catch {
      index = [];
    }
    if (isActive() && !lec) draw();
  }

  async function open(task) {
    pause();
    error = '';
    try {
      const data = await getJSON(`${ROOT}${task}/lecture.json`);
      if (!Array.isArray(data?.slides) || !data.slides.length) throw new Error('スライドが 0 枚');
      lec = data;
      audio.removeAttribute('src');
      show(slideOf(saved, task, lec.slides.length));
    } catch (e) {
      lec = null;
      store(closeLecture(saved));
      error = `講義 ${task} を読み込めません（${e.message}）。`;
      draw();
    }
    window.scrollTo(0, 0);
  }

  function toList() {
    pause();
    lec = null;
    store(closeLecture(saved));
    draw();
  }

  function renderList() {
    progress.textContent = '';
    const body = index === null
      ? el('p', { class: 'muted', text: '読み込み中…' })
      : index.length
        ? el('ul', { class: 'lec-list', 'data-testid': 'lecture-list' }, index.map((l) => el('li', {},
          el('button', { type: 'button', class: 'lec-row', 'data-testid': 'lecture-row', 'data-task': l.task, onclick: () => open(l.task) },
            el('span', { class: 'lec-task', text: `タスク ${l.task}` }),
            el('span', { class: 'lec-title', text: l.title }),
            el('span', { class: 'lec-meta muted small' },
              `${l.slides ?? '?'} 枚・約 ${l.minutes ?? '?'} 分`,
              isSeen(saved, l.task) ? el('span', { class: 'badge seen', 'data-testid': 'lecture-seen', text: '見た' }) : null)))))
        : el('p', { class: 'muted', 'data-testid': 'lecture-empty', text: '講義はまだありません。' });
    return el('section', { class: 'card', 'data-testid': 'lectures' },
      el('h2', { class: 'title', text: '講義' }),
      el('p', { class: 'muted small', text: 'タスクごとに、図と音声で要点を説明します。見終えたらそのタスクの問題を解けます。' }),
      error ? el('p', { class: 'error', 'data-testid': 'lecture-error', text: error }) : null,
      body);
  }

  function renderVisual(s) {
    const v = s.visual;
    if (!v) return null;
    if (v.type === 'mermaid' && v.svg) {
      return el('div', { class: 'lec-visual diagram-box', 'data-testid': 'lecture-visual', 'data-type': 'mermaid' },
        el('img', { src: slideUrl(v.svg), alt: v.alt ?? '' }));
    }
    if (v.type === 'compare' && Array.isArray(v.columns) && Array.isArray(v.rows)) {
      return el('div', { class: 'lec-visual lec-table', 'data-testid': 'lecture-visual', 'data-type': 'compare' },
        el('table', { class: 'stats' },
          el('thead', {}, el('tr', {}, v.columns.map((c) => el('th', { scope: 'col', text: c })))),
          el('tbody', {}, v.rows.map((r) => el('tr', {}, (Array.isArray(r) ? r : [r]).map((c, k) => el(k ? 'td' : 'th', { scope: k ? null : 'row', text: c })))))));
    }
    if (v.type === 'steps' && Array.isArray(v.items)) {
      return el('ol', { class: 'lec-visual lec-steps', 'data-testid': 'lecture-visual', 'data-type': 'steps' },
        v.items.map((it, k) => el('li', {},
          el('span', { class: 'n', text: String(k + 1) }),
          el('span', {}, el('b', { text: it.label ?? String(it) }), it.note ? el('span', { class: 'muted small', text: it.note }) : null))));
    }
    return null;
  }

  function renderSlide() {
    const s = lec.slides[i];
    const n = lec.slides.length;
    const last = i === n - 1;
    progress.textContent = `${i + 1} / ${n}`;
    const hasAudio = lec.audio === true && !!s.audio;
    return el('div', { class: 'lec' },
      el('div', { class: 'lec-head' },
        el('button', { type: 'button', class: 'secondary', 'data-testid': 'lecture-back', onclick: toList, text: '一覧へ' }),
        el('span', { class: 'muted small', text: `タスク ${lec.task}・約 ${lec.minutes ?? '?'} 分` })),
      el('h2', { class: 'lec-name', text: lec.title }),
      el('section', { class: 'card lec-slide', 'data-testid': 'lecture-slide', 'aria-live': 'polite' },
        el('span', { class: 'lec-num muted small', 'data-testid': 'lecture-num', text: `${i + 1} / ${n}` }),
        el('h3', { class: 'lec-title', 'data-testid': 'lecture-title', text: s.title }),
        renderVisual(s),
        el('ul', { class: 'lec-bullets', 'data-testid': 'lecture-bullets' }, (s.bullets ?? []).map((b) => el('li', { text: b }))),
        el('details', { class: 'lec-more', 'data-testid': 'lecture-script' },
          el('summary', { text: '台本を読む' }), el('p', { class: 'lec-script', text: s.narration ?? '' })),
        el('details', { class: 'lec-more', 'data-testid': 'lecture-refs' },
          el('summary', { text: '根拠' }),
          el('div', { class: 'refs' }, (s.refs ?? []).map((r) => el('figure', { class: 'ref', 'data-testid': 'lecture-ref' },
            el('blockquote', { lang: 'en', text: r.quote }),
            r.url ? el('figcaption', {}, el('a', { href: r.url, target: '_blank', rel: 'noopener noreferrer', text: '出典（AWS 公式ドキュメント）' })) : null))))),
      hasAudio ? el('div', { class: 'lec-bar', 'aria-hidden': 'true' }, el('i')) : null,
      el('div', { class: 'lec-controls' },
        el('button', { type: 'button', class: 'secondary', 'data-testid': 'lecture-prev', disabled: i === 0, onclick: () => show(i - 1), text: '前へ' }),
        hasAudio ? el('button', {
          type: 'button', 'data-testid': 'lecture-play',
          onclick: () => { if (playing) pause(); else play(); draw(); },
          text: playing ? '一時停止' : '再生',
        }) : null,
        el('button', { type: 'button', class: 'secondary', 'data-testid': 'lecture-next', disabled: last, onclick: () => show(i + 1), text: '次へ' }),
        hasAudio ? el('label', { class: 'lec-auto' },
          el('input', { type: 'checkbox', 'data-testid': 'lecture-auto', checked: auto, onchange: (e) => { auto = e.target.checked; } }), '自動で次へ') : null),
      el('nav', { class: 'lec-dots', 'aria-label': 'スライド' }, lec.slides.map((x, k) => el('button', {
        type: 'button', class: 'secondary', 'data-testid': 'lecture-dot', 'aria-label': `${k + 1}. ${x.title}`,
        'aria-current': k === i ? 'true' : null, onclick: () => show(k), text: String(k + 1),
      }))),
      last ? el('div', { class: 'actions' },
        hasTask(lec.task) ? null : el('p', { class: 'muted small', text: 'このタスクの問題はまだありません。' }),
        el('button', {
          type: 'button', 'data-testid': 'lecture-solve', disabled: !hasTask(lec.task),
          onclick: () => { const t = lec.task; store(markSeen(saved, t)); openTask(t); },
          text: 'この task の問題を解く',
        })) : null,
      lec.credit ? el('p', { class: 'lec-credit muted small', 'data-testid': 'lecture-credit', text: `音声: ${lec.credit}` }) : null,
    );
  }

  function draw() {
    if (!isActive()) return;
    const focused = document.activeElement?.dataset?.testid;
    app.replaceChildren(lec ? renderSlide() : renderList());
    if (focused) {
      const again = app.querySelector(`[data-testid="${focused}"]:not([disabled])`);
      if (again && focused !== 'lecture-row') again.focus();
    }
  }

  return {
    /** 開いていた講義（読み込み直した時に続ける）。無ければ null */
    opened: () => saved.open,
    /** 上の「講義」を押した: 一覧へ */
    toList,
    render() {
      if (index === null) loadIndex();
      if (!lec && saved.open && !error) { const t = saved.open; saved = closeLecture(saved); open(t); }
      draw();
    },
    /** ほかの画面へ移った: 音声を止め、開いていた講義を閉じる（スライドの位置は残る） */
    leave() {
      if (playing) pause();
      if (lec || saved.open) { lec = null; store(closeLecture(saved)); }
    },
  };
}
