// 模試（A-0003）の画面。本番に近い形で通して解き、終わってから結果と解説を見る。
// 解く画面（main.js の state.index など）とは別に、途中の状態を localStorage の dop:v1:mock に持つ。
import { el } from './el.js';
import { display } from '../logic/lang.js';
import { MOCK_QUESTIONS, MOCK_MINUTES, pickMock, scoreMock, remaining, formatTime } from '../logic/mock.js';
import { loadMock, saveMock } from '../storage.js';

const pct = (r) => `${Math.round(r * 100)}%`;

/** 採点の結果から、記録に足す行を作る（答えなかった問題は skipped） */
function mockEntries(mock, qs, wrong, at) {
  return mock.ids.filter((id) => qs[id]).map((id, i) => {
    const q = qs[id];
    const selected = mock.answers[id] ?? [];
    return { id, task: q.task, domain: q.domain, selected, correct: !wrong.has(id), ...(selected.length ? {} : { skipped: true }), mock: true, at: at + i };
  });
}

function renderStart(n, onStart) {
  return el('section', { class: 'card', 'data-testid': 'mock-start' },
    el('h2', { class: 'title', text: '模試' }),
    el('p', { text: `ドメインの割合どおりに ${n} 問を出します。制限時間は ${MOCK_MINUTES} 分です。途中では正誤も解説も出さず、終えてから結果と解説を見られます。` }),
    el('p', { class: 'muted small', 'data-testid': 'mock-note', text: '本番は 100〜1000 の換算点（750 点で合格）ですが、ここでは正答率だけを出します。答えは記録にも足します。' }),
    el('div', { class: 'actions' }, el('button', { type: 'button', onclick: onStart, text: '開始' })));
}

/** 解く画面。on: { answer(key, checked), prev(), next(), finish() } */
function renderRunning({ q, lang, selected, index, total, deadline }, on) {
  const view = display(q, lang);
  const multi = q.type === 'multi';
  const list = el('ul', { class: 'choices', role: multi ? 'group' : 'radiogroup', 'aria-label': '選択肢' });
  for (const c of view.choices) {
    const input = el('input', {
      type: multi ? 'checkbox' : 'radio', name: 'mock-choice', value: c.key, checked: selected.includes(c.key),
      disabled: multi && !selected.includes(c.key) && selected.length >= q.select_count,
      onchange: (ev) => on.answer(c.key, ev.target.checked),
    });
    list.append(el('li', {}, el('label', { class: 'choice', 'data-testid': 'choice' }, input, el('span', { class: 'key', text: `${c.key}.` }), el('span', { lang: view.lang, text: c.text }))));
  }
  const last = index === total - 1;
  return el('section', { class: 'card', 'data-testid': 'mock' },
    el('div', { class: 'meta' }, el('span', { text: `タスク ${q.task}` }), el('span', { class: 'badge', 'data-testid': 'mock-time', text: `残り ${formatTime(remaining(deadline))}` })),
    el('p', { class: 'stem', 'data-testid': 'stem', lang: view.lang, text: view.stem }),
    multi ? el('p', { class: 'hint', text: `${q.select_count} つ選ぶ` }) : null,
    list,
    el('div', { class: 'actions' },
      el('button', { type: 'button', class: 'secondary', disabled: index === 0, onclick: on.prev, text: '前へ' }),
      last ? null : el('button', { type: 'button', onclick: on.next, text: '次へ' }),
      el('button', { type: 'button', class: last ? '' : 'secondary', onclick: () => { if (window.confirm('模試を終えて採点します。よろしいですか？')) on.finish(); }, text: '終える' })));
}

function renderReview(q, lang, yours) {
  const view = display(q, lang);
  return el('details', { class: 'mock-review', 'data-testid': 'mock-wrong' },
    el('summary', { text: `${q.id}（タスク ${q.task}）: ${yours.length ? `あなたの答え ${yours.join(', ')}` : '答えなし'} / 正解 ${q.answer.join(', ')}` }),
    el('p', { class: 'stem', lang: view.lang, text: view.stem }),
    el('ul', { class: 'explain' }, view.choices.map((c) => el('li', { class: q.answer.includes(c.key) ? 'is-correct' : '' },
      el('strong', { text: `${c.key}. ` }), c.text, el('br', {}), el('span', { class: 'muted small', text: q.explanation.per_choice[c.key] ?? '' })))),
    el('p', { text: q.explanation.summary }));
}

function renderResult(r, qs, lang, answers, onRestart) {
  return el('section', { class: 'card', 'data-testid': 'mock-result' },
    el('h2', { class: 'title', text: '模試の結果' }),
    el('p', { class: 'score', text: `${r.total} 問中 ${r.correct} 問 正解（${pct(r.rate)}）` }),
    el('table', { class: 'stats' },
      el('thead', {}, el('tr', {}, el('th', { text: 'ドメイン' }), el('th', { class: 'num', text: '正解' }), el('th', { class: 'num', text: '正答率' }))),
      el('tbody', {}, r.byDomain.map((d) => el('tr', {},
        el('td', { text: `${d.domain}. ${d.name}` }), el('td', { class: 'num', text: `${d.correct} / ${d.total}` }), el('td', { class: 'num', text: pct(d.rate) }))))),
    el('h3', { class: 'small', text: `間違えた・答えなかった問題（${r.wrong.length}）` }),
    r.wrong.length ? r.wrong.map((id) => qs[id]).filter(Boolean).map((q) => renderReview(q, lang, answers[q.id] ?? [])) : el('p', { class: 'muted', text: '全問正解です。' }),
    el('div', { class: 'actions' }, el('button', { type: 'button', onclick: onRestart, text: 'もう一度（新しい模試）' })));
}

/** ctx: { app, progress, state: () => main の state, record(entries), render() } */
export function createMock(ctx) {
  let mock = loadMock();
  let timer = null;

  const byId = () => Object.fromEntries(ctx.state().questions.map((q) => [q.id, q]));
  const save = () => saveMock(mock);
  const change = (fn) => { fn(); save(); ctx.render(); };

  const stopTimer = () => { if (timer) clearInterval(timer); timer = null; };

  function start() {
    const s = ctx.state();
    const ids = pickMock(s.questions, s.domains, MOCK_QUESTIONS);
    change(() => { mock = { ids, index: 0, answers: {}, deadline: Date.now() + MOCK_MINUTES * 60 * 1000, done: false }; });
  }

  function finish(rerender = true) {
    if (!mock || mock.done) return;
    const s = ctx.state();
    const result = scoreMock(s.questions, mock.ids, mock.answers, s.domains);
    ctx.record(mockEntries(mock, byId(), new Set(result.wrong), Date.now()));
    mock.done = true;
    save();
    stopTimer();
    if (rerender) ctx.render();
  }

  function tick() {
    const clock = ctx.app.querySelector('[data-testid=mock-time]');
    const left = remaining(mock.deadline);
    if (clock) clock.textContent = `残り ${formatTime(left)}`;
    if (left <= 0) finish();
  }

  function running() {
    const id = mock.ids[mock.index];
    const q = byId()[id];
    ctx.progress.textContent = `${mock.index + 1} / ${mock.ids.length}`;
    if (!q) return el('p', { class: 'error', text: 'この問題は今の問題集にありません。' });
    const multi = q.type === 'multi';
    return renderRunning({ q, lang: ctx.state().lang, selected: mock.answers[id] ?? [], index: mock.index, total: mock.ids.length, deadline: mock.deadline }, {
      answer: (key, checked) => change(() => {
        const cur = mock.answers[id] ?? [];
        mock.answers[id] = multi ? (checked ? [...cur, key] : cur.filter((k) => k !== key)) : [key];
      }),
      prev: () => change(() => { mock.index--; }),
      next: () => change(() => { mock.index++; }),
      finish: () => finish(),
    });
  }

  function result() {
    const s = ctx.state();
    ctx.progress.textContent = '';
    return renderResult(scoreMock(s.questions, mock.ids, mock.answers, s.domains), byId(), s.lang, mock.answers, () => change(() => { mock = null; }));
  }

  return {
    render() {
      if (!mock) { stopTimer(); return renderStart(Math.min(MOCK_QUESTIONS, ctx.state().questions.length), start); }
      if (mock.done) { stopTimer(); return result(); }
      if (remaining(mock.deadline) <= 0) { finish(false); return result(); }
      if (!timer) timer = setInterval(tick, 1000);
      return running();
    },
    leave: stopTimer,
  };
}
