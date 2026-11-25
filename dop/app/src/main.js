// 1 問ずつ解く画面。採点などの計算は logic/ に置く。
import { grade, canSubmit } from './logic/grade.js';
import { addAnswer, domainStats, skipEntry } from './logic/record.js';
import { KINDS, addReport, issueUrl } from './logic/report.js';
import { buildExport, exportFileName } from './logic/export.js';
import { display } from './logic/lang.js';
import { RATES, questionScript, answerScript } from './logic/speech.js';
import { resume, snapshot } from './logic/progress.js';
import { lookup, pageList } from './logic/glossary.js';
import { loadAnswers, saveAnswers, clearAnswers, loadReports, saveReports, loadLang, saveLang, loadSpeech, saveSpeech, loadProgress, saveProgress } from './storage.js';

const app = document.getElementById('app');
const progress = document.querySelector('[data-testid=progress]');

const stored = loadAnswers();
const storedReports = loadReports();
const state = {
  view: 'solve', questions: [], domains: {}, index: 0, selected: [], answered: false, correct: 0,
  answers: stored.answers, storageOk: stored.ok,
  reports: storedReports.reports,
  report: null, // 報告の欄を開いている間 { kind, comment, status }
  lang: loadLang(), // 問題文と選択肢の言葉（P-012）
  glossary: null, // サービス事典（A-0013）。取れなければ null のまま
  speech: loadSpeech(), // 読み上げ（A-0009）{ on, rate }
  spokenKey: null, // 最後に読んだ段（"問題の番号:答えたか"）。同じ段は読み直さない
};

for (const tab of document.querySelectorAll('.tab')) {
  tab.addEventListener('click', () => { state.view = tab.dataset.view; render(); });
}

function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === false || v == null) continue;
    if (k === 'class') node.className = v;
    else if (k === 'text') node.textContent = v;
    else if (k.startsWith('on')) node.addEventListener(k.slice(2), v);
    else node.setAttribute(k, v === true ? '' : v);
  }
  for (const c of children.flat()) if (c != null) node.append(c);
  return node;
}

// ---- 版（A-0011）: 読み込む先に版の番号が付いている。開いた時に最新の版を確かめ、古ければ知らせる ----
const APP_VERSION = document.querySelector('meta[name=app-version]')?.content ?? '';

function showVersion() {
  const foot = document.querySelector('[data-testid=version]');
  if (foot && APP_VERSION) foot.textContent = `版 ${APP_VERSION}`;
}

async function checkVersion() {
  try {
    const res = await fetch('public/version.json', { cache: 'no-cache' });
    if (!res.ok) return;
    const latest = (await res.json())?.version;
    if (!latest || !APP_VERSION || latest === APP_VERSION || document.querySelector('[data-testid=update]')) return;
    document.body.prepend(el('div', { class: 'update', role: 'status', 'data-testid': 'update' },
      el('span', { text: '新しい版があります。' }),
      el('button', { type: 'button', onclick: () => window.location.reload(), text: '読み込み直す' })));
  } catch {
    // 確かめられない時は何もしない（今の版のまま解ける）
  }
}

// ---- サービス事典（A-0013、P-014）: 問題とは別のファイル。問題のサービス名から引く ----
const dialog = el('dialog', { class: 'gloss', 'data-testid': 'glossary-dialog', 'aria-label': 'サービス事典' });
document.body.append(dialog);

async function loadGlossary() {
  try {
    const res = await fetch('public/glossary.json', { cache: 'no-cache' });
    if (!res.ok) return;
    state.glossary = await res.json();
    if (state.questions.length) render(); // 問題が読めていない時（エラーの表示中）は描き直さない
  } catch {
    // 事典が無くても解ける
  }
}

function renderGlossaryPage(p) {
  return el('article', { class: 'gloss-page', 'data-testid': 'glossary-page' },
    el('h2', { class: 'gloss-name', text: p.name }),
    p.reading ? el('p', { class: 'muted small', text: p.reading }) : null,
    el('p', { text: p.summary }),
    el('h3', { text: '主な機能' }),
    el('ul', {}, p.features.map((f) => el('li', {}, el('strong', { text: `${f.title}: ` }), f.text))),
    el('h3', { text: '試験のポイント' }),
    el('ul', {}, p.exam_points.map((t) => el('li', { text: t }))),
    p.compare?.length ? [el('h3', { text: '似たサービスとの違い' }), el('ul', {}, p.compare.map((c) => el('li', {}, el('strong', { text: `${c.with}: ` }), c.text)))] : null,
    el('div', { class: 'refs' }, p.references.map((r) => el('figure', { class: 'ref' },
      el('blockquote', { lang: 'en', text: r.quote }),
      el('figcaption', {}, el('a', { href: r.url, target: '_blank', rel: 'noopener noreferrer', text: '出典（AWS 公式ドキュメント）' }))))),
  );
}

function openGlossary(p) {
  dialog.replaceChildren(renderGlossaryPage(p),
    el('div', { class: 'actions' }, el('button', { type: 'button', onclick: () => dialog.close(), text: '閉じる' })));
  if (typeof dialog.showModal === 'function') dialog.showModal(); else dialog.setAttribute('open', '');
  dialog.scrollTop = 0;
}

function serviceLabel(name) {
  const p = lookup(state.glossary, name);
  return p ? el('button', { type: 'button', class: 'svc', 'data-testid': 'service', onclick: () => openGlossary(p), text: name }) : el('span', { text: name });
}

function renderGlossaryList() {
  progress.textContent = '';
  const list = pageList(state.glossary);
  app.replaceChildren(el('section', { class: 'card', 'data-testid': 'glossary' },
    el('h2', { class: 'title', text: 'サービス事典' }),
    list.length
      ? el('ul', { class: 'gloss-list' }, list.map((p) => el('li', {},
        el('button', { type: 'button', class: 'svc', onclick: () => openGlossary(p), text: p.name }),
        el('span', { class: 'muted small', text: ` ${p.reading ?? ''}` }))))
      : el('p', { class: 'muted', 'data-testid': 'glossary-empty', text: '事典はまだありません。' }),
  ));
}

async function load() {
  showVersion();
  checkVersion();
  loadGlossary();
  try {
    const res = await fetch('public/questions.json', { cache: 'no-cache' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data.questions) || !data.questions.length) throw new Error('問題が 0 問');
    state.questions = data.questions;
    state.domains = data.domains ?? {};
    Object.assign(state, resume(state.questions, loadProgress())); // A-0010: 読み込み直しても続きから
    render();
  } catch (e) {
    progress.textContent = '';
    app.replaceChildren(el('p', { class: 'error', 'data-testid': 'load-error', text: `問題を読み込めません（${e.message}）。時間をおいて開き直してください。` }));
  }
}

// ---- 読み上げ（A-0009）: ブラウザの speechSynthesis。外へは送らない -------------
const synth = typeof window.SpeechSynthesisUtterance === 'function' && window.speechSynthesis ? window.speechSynthesis : null;

function speak(parts) {
  if (!synth) return;
  synth.cancel();
  const voices = synth.getVoices?.() ?? [];
  for (const p of parts) {
    const u = new window.SpeechSynthesisUtterance(p.text);
    u.lang = p.lang === 'ja' ? 'ja-JP' : 'en-US';
    u.rate = state.speech.rate;
    const voice = voices.find((v) => String(v.lang).replace('_', '-').startsWith(u.lang));
    if (voice) u.voice = voice;
    synth.speak(u);
  }
}

function stopSpeech() {
  if (synth && state.spokenKey) synth.cancel();
  state.spokenKey = null;
}

// 問題が出た時と答えた時に 1 回だけ読む
function autoSpeak(q, view) {
  const key = `${state.index}:${state.answered}`;
  if (!synth || !state.speech.on || key === state.spokenKey) return;
  state.spokenKey = key;
  speak(state.answered ? answerScript(q, grade(q, state.selected), state.skipped) : questionScript(view));
}

function setSpeech(change) {
  state.speech = { ...state.speech, ...change };
  saveSpeech(state.speech);
}

function renderSpeech() {
  const on = state.speech.on;
  return el('div', { class: 'speech', 'data-testid': 'speech' },
    el('button', {
      type: 'button', class: on ? '' : 'secondary', 'aria-pressed': on ? 'true' : 'false', disabled: !synth,
      onclick: () => { setSpeech({ on: !on }); if (on) stopSpeech(); else state.spokenKey = null; render(); },
      text: on ? '読み上げ オン' : '読み上げ',
    }),
    synth ? null : el('span', { class: 'muted small', 'data-testid': 'speech-hint', text: 'このブラウザは読み上げに対応していません' }),
    synth && on ? el('button', { type: 'button', class: 'secondary', onclick: () => { state.spokenKey = null; render(); }, text: 'もう一度' }) : null,
    synth && on ? el('label', { class: 'small' }, '速さ ', el('select', {
      'aria-label': '読み上げの速さ',
      onchange: (ev) => { setSpeech({ rate: Number(ev.target.value) }); },
    }, RATES.map((r) => el('option', { value: String(r), selected: r === state.speech.rate, text: `${r}` })))) : null,
  );
}

function render() {
  if (state.questions.length) saveProgress(snapshot(state));
  if (state.view !== 'solve' || state.index >= state.questions.length) stopSpeech();
  for (const tab of document.querySelectorAll('.tab')) {
    if (tab.dataset.view === state.view) tab.setAttribute('aria-current', 'page'); else tab.removeAttribute('aria-current');
  }
  if (state.view === 'stats') return renderStats();
  if (state.view === 'glossary') return renderGlossaryList();
  if (state.index >= state.questions.length) return renderResult();
  const q = state.questions[state.index];
  const multi = q.type === 'multi';
  const view = display(q, state.lang);
  progress.textContent = `${state.index + 1} / ${state.questions.length}`;

  const meta = el('div', { class: 'meta' },
    el('span', { text: `タスク ${q.task}` }),
    el('span', { class: 'svcs' }, q.services.flatMap((s, i) => (i ? ['・', serviceLabel(s)] : [serviceLabel(s)]))),
    q.low_confidence ? el('span', { class: 'badge warn', 'data-testid': 'low-confidence', title: '検証役の AI が迷った問題です。解説と出典を確かめてください', text: 'AI の確信が低い' }) : null,
    state.reports.some((r) => r.id === q.id) ? el('span', { class: 'badge warn', 'data-testid': 'reported', text: '報告済み' }) : null,
    view.ja ? null : el('span', { class: 'badge', 'data-testid': 'no-ja', text: '日本語版はまだありません' }),
    el('button', {
      type: 'button', class: 'lang secondary', 'data-testid': 'lang', lang: state.lang === 'ja' ? 'en' : 'ja',
      onclick: () => { state.lang = state.lang === 'ja' ? 'en' : 'ja'; saveLang(state.lang); render(); },
      text: state.lang === 'ja' ? 'English' : '日本語',
    }),
  );

  const list = el('ul', { class: 'choices', role: multi ? 'group' : 'radiogroup', 'aria-label': '選択肢' });
  for (const c of view.choices) {
    const input = el('input', {
      type: multi ? 'checkbox' : 'radio', name: 'choice', value: c.key,
      checked: state.selected.includes(c.key),
      disabled: state.answered || (multi && !state.selected.includes(c.key) && state.selected.length >= q.select_count),
      onchange: (ev) => {
        if (multi) state.selected = ev.target.checked ? [...state.selected, c.key] : state.selected.filter((k) => k !== c.key);
        else state.selected = [c.key];
        render();
      },
    });
    let mark = '';
    if (state.answered) mark = q.answer.includes(c.key) ? ' is-correct' : state.selected.includes(c.key) ? ' is-wrong' : '';
    list.append(el('li', {}, el('label', { class: `choice${mark}`, 'data-testid': 'choice' }, input, el('span', { class: 'key', text: `${c.key}.` }), el('span', { lang: view.lang, text: c.text }))));
  }

  const card = el('section', { class: 'card', 'aria-labelledby': 'stem' },
    meta,
    renderSpeech(),
    el('p', { class: 'stem', id: 'stem', 'data-testid': 'stem', lang: view.lang, text: view.stem }),
    multi ? el('p', { class: 'hint', 'data-testid': 'select-hint', text: `${q.select_count} つ選ぶ` }) : null,
    list,
  );

  if (!state.answered) {
    card.append(el('div', { class: 'actions' },
      el('button', { type: 'button', class: 'secondary', 'data-testid': 'skip', onclick: skip, text: '分からない' }),
      el('button', { type: 'button', disabled: !canSubmit(q, state.selected), onclick: submit, text: '答える' })));
  } else {
    card.append(renderAnswer(q));
  }
  app.replaceChildren(card);
  autoSpeak(q, view);
}

// ---- 構成図（A-0014、P-015）: 答えた後に出す。箱を押すと事典を開く ----
const diagrams = {}; // 問題 ID → SVG の文字列（null は取れなかった）

function renderDiagram(q) {
  if (!q.diagram) return null;
  if (!(q.id in diagrams)) {
    diagrams[q.id] = undefined;
    fetch(`public/diagrams/${encodeURIComponent(q.id)}.svg`, { cache: 'no-cache' })
      .then((r) => (r.ok ? r.text() : null)).catch(() => null)
      .then((svg) => { diagrams[q.id] = svg && svg.trim().startsWith('<svg') ? svg : null; if (state.questions[state.index]?.id === q.id && state.answered) render(); });
    return null;
  }
  const svg = diagrams[q.id];
  if (!svg) return null;
  const box = el('div', { class: 'diagram-box', role: 'img', 'aria-label': q.diagram.alt });
  box.innerHTML = svg; // 自分たちが作って検証した図だけ（app/public/diagrams/）
  const open = (ev) => {
    const node = ev.target.closest?.('[data-service]');
    if (!node) return;
    const p = lookup(state.glossary, node.getAttribute('data-service'));
    if (p) openGlossary(p);
  };
  box.addEventListener('click', open);
  box.addEventListener('keydown', (ev) => { if (ev.key === 'Enter') open(ev); });
  return el('figure', { class: 'diagram', 'data-testid': 'diagram' },
    el('h3', { class: 'small', text: '構成図' }),
    box,
    el('figcaption', { class: 'muted small', text: '図のサービスを押すと、事典の説明が開きます。' }));
}

function renderAnswer(q) {
  const ok = grade(q, state.selected);
  const last = state.index === state.questions.length - 1;
  return el('div', {},
    el('p', { class: `verdict ${ok ? 'ok' : 'ng'}`, 'data-testid': 'verdict', role: 'status', text: state.skipped ? `分からない（正解は ${q.answer.join(', ')}）` : ok ? `正解（${q.answer.join(', ')}）` : `不正解（正解は ${q.answer.join(', ')}）` }),
    el('p', { text: q.explanation.summary }),
    el('ul', { class: 'explain' }, q.choices.map((c) => el('li', {
      class: q.answer.includes(c.key) ? 'is-correct' : '', 'data-testid': 'explain-item',
    }, el('strong', { text: `${c.key}. ` }), q.explanation.per_choice[c.key] ?? ''))),
    renderDiagram(q),
    q.note ? el('aside', { class: 'note', 'data-testid': 'note' }, el('strong', { text: '補足' }), el('p', { text: q.note })) : null,
    el('div', { class: 'refs' }, q.references.map((r) => el('figure', { class: 'ref', 'data-testid': 'reference' },
      el('blockquote', { lang: 'en', text: r.quote }),
      el('figcaption', {}, el('a', { href: r.url, target: '_blank', rel: 'noopener noreferrer', text: '出典（AWS 公式ドキュメント）' }))))),
    state.report ? renderReport(q) : null,
    el('div', { class: 'actions' },
      state.report ? null : el('button', { type: 'button', class: 'secondary', onclick: () => { state.report = { kind: 'answer', comment: '', status: '' }; render(); app.querySelector('#report-comment')?.focus(); }, text: '誤りを報告' }),
      el('button', { type: 'button', onclick: next, text: last ? '結果を見る' : '次へ' })),
  );
}

// 誤りの報告の欄。打っている間は描き直さず、送り先のリンクだけを更新する（入力の位置が飛ばないように）
function renderReport(q) {
  const r = state.report;
  const draft = () => ({ id: q.id, kind: r.kind, comment: r.comment, selected: state.selected });
  const link = el('a', { class: 'button-link', href: issueUrl(draft()), target: '_blank', rel: 'noopener noreferrer', text: 'GitHub に送る' });
  const refresh = () => { link.href = issueUrl(draft()); };
  const kinds = el('fieldset', { class: 'kinds' }, el('legend', { text: '種類' }),
    Object.entries(KINDS).map(([k, label]) => el('label', { class: 'kind' },
      el('input', { type: 'radio', name: 'report-kind', value: k, checked: r.kind === k, onchange: () => { r.kind = k; refresh(); } }), label)));
  const comment = el('textarea', { id: 'report-comment', rows: '3', maxlength: '1000', oninput: (ev) => { r.comment = ev.target.value; refresh(); } });
  comment.value = r.comment;
  return el('form', { class: 'report', 'data-testid': 'report', onsubmit: (ev) => { ev.preventDefault(); saveReport(q); } },
    el('h3', { class: 'title', text: '誤りを報告' }),
    kinds,
    el('label', { for: 'report-comment', text: 'コメント' }),
    comment,
    r.status ? el('p', { class: r.status.startsWith('報告を保存') ? 'muted' : 'note', 'data-testid': 'report-status', role: 'status', text: r.status }) : null,
    el('div', { class: 'actions' },
      el('button', { type: 'button', class: 'secondary', onclick: () => { state.report = null; render(); }, text: '閉じる' }),
      el('button', { type: 'submit', class: 'secondary', text: '保存' }),
      link),
    el('p', { class: 'muted small', text: '「GitHub に送る」は、この問題の報告を issue の下書きとして開きます。送ると、問題を作るループが拾って直します。' }),
  );
}

function saveReport(q) {
  const r = state.report;
  state.reports = addReport(state.reports, { id: q.id, kind: r.kind, comment: r.comment, at: Date.now() });
  r.status = saveReports(state.reports)
    ? '報告を保存しました。直してほしい時は「GitHub に送る」も押してください。'
    : 'このブラウザでは端末に残せません。「GitHub に送る」で送ってください。';
  render();
}

function submit() {
  const q = state.questions[state.index];
  if (!canSubmit(q, state.selected)) return;
  state.answered = true;
  const correct = grade(q, state.selected);
  if (correct) state.correct += 1;
  state.answers = addAnswer(state.answers, { id: q.id, task: q.task, domain: q.domain, selected: [...state.selected], correct, at: Date.now() });
  if (!saveAnswers(state.answers)) state.storageOk = false;
  render();
  app.querySelector('[data-testid=verdict]')?.focus?.();
}

// 「分からない」（A-0012）: 選んだ物は捨て、無回答の不正解として記録する
function skip() {
  const q = state.questions[state.index];
  state.selected = [];
  state.answered = true;
  state.skipped = true;
  state.answers = addAnswer(state.answers, skipEntry(q));
  if (!saveAnswers(state.answers)) state.storageOk = false;
  render();
  app.querySelector('[data-testid=verdict]')?.focus?.();
}

function next() {
  state.report = null;
  state.skipped = false;
  state.index += 1;
  state.selected = [];
  state.answered = false;
  render();
  window.scrollTo(0, 0);
}

function renderResult() {
  progress.textContent = '';
  const n = state.questions.length;
  app.replaceChildren(el('section', { class: 'card result', 'data-testid': 'result' },
    el('p', { class: 'muted', text: '結果' }),
    el('p', { class: 'score', text: `${n} 問中 ${state.correct} 問 正解` }),
    el('div', { class: 'actions', style: 'justify-content:center' }, el('button', { type: 'button', onclick: restart, text: 'もう一度' })),
  ));
}

function renderStats() {
  progress.textContent = '';
  const rows = domainStats(state.answers, state.questions, state.domains);
  const pct = (r) => (r == null ? '—' : `${Math.round(r * 100)}%`);
  app.replaceChildren(el('section', { class: 'card', 'aria-labelledby': 'stats-title' },
    el('h2', { id: 'stats-title', class: 'title', text: 'ドメイン別の正答率' }),
    el('p', { class: 'muted', text: '問題ごとに一番新しい答えで数えます。記録はこの端末のブラウザにだけ残ります。' }),
    state.storageOk ? null : el('p', { class: 'note', 'data-testid': 'storage-note', text: 'このブラウザでは記録を残せません（非公開の窓や設定で保存が止まっています）。解くことはできます。' }),
    el('table', { class: 'stats' },
      el('thead', {}, el('tr', {}, el('th', { text: 'ドメイン' }), el('th', { class: 'num', text: '解いた数' }), el('th', { class: 'num', text: '正答率' }))),
      el('tbody', {}, rows.map((r) => el('tr', { 'data-testid': 'stats-row', 'data-domain': String(r.domain) },
        el('td', { text: `${r.domain}. ${r.name}` }),
        el('td', { class: 'num', text: `${r.answered} / ${r.total}` }),
        el('td', { class: 'num', text: pct(r.rate) })))),
    ),
    renderExport(),
    el('div', { class: 'actions' }, el('button', { type: 'button', class: 'secondary', onclick: onClear, text: '記録を消す' })),
  ));
}

// 記録の書き出し（A-0005）。ブラウザの保存だけで、外へは送らない
function renderExport() {
  const empty = !state.answers.length && !state.reports.length;
  return el('div', { class: 'export' },
    el('h3', { class: 'title', text: '記録を書き出す' }),
    el('p', { class: 'muted small', 'data-testid': 'export-help', text: '解いた記録と誤りの報告を 1 つのファイルに保存します。このファイルを Claude に渡すと、苦手な範囲の問題づくりと、誤りが疑わしい問題の見直しに使われます。' }),
    empty ? el('p', { class: 'muted small', 'data-testid': 'export-hint', text: 'まだ記録がありません。問題を解くと書き出せます。' }) : null,
    el('div', { class: 'actions' }, el('button', { type: 'button', disabled: empty, onclick: onExport, text: '記録を書き出す' })),
  );
}

function onExport() {
  const now = new Date();
  const blob = new Blob([JSON.stringify(buildExport(state.answers, state.reports, now), null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = el('a', { href: url, download: exportFileName(now) });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function onClear() {
  if (!window.confirm('この端末の記録を全部消します。よろしいですか？')) return;
  state.answers = [];
  clearAnswers();
  render();
}

function restart() {
  Object.assign(state, { index: 0, selected: [], answered: false, skipped: false, correct: 0 });
  render();
}

load();
