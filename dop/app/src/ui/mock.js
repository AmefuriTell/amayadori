// 模試（A-0003）の画面。本番に近い形で通して解き、終わってから結果と解説を見る。
// 解く画面（main.js の state.index など）とは別に、途中の状態を localStorage の dop:v1:mock に持つ。
import { el } from './el.js';
import { display } from '../logic/lang.js';
import { MOCK_QUESTIONS, MOCK_MINUTES, pickMock, scoreMock, remaining, formatTime } from '../logic/mock.js';
import { loadMock, saveMock } from '../storage.js';

const pct = (r) => `${Math.round(r * 100)}%`;

/** ctx: { app, progress, state: () => main の state, record(entries), render() } */
export function createMock(ctx) {
  let mock = loadMock();
  let timer = null;

  const byId = () => Object.fromEntries(ctx.state().questions.map((q) => [q.id, q]));
  const save = () => saveMock(mock);

  function stopTimer() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  function start() {
    const s = ctx.state();
    const ids = pickMock(s.questions, s.domains, MOCK_QUESTIONS);
    mock = { ids, index: 0, answers: {}, deadline: Date.now() + MOCK_MINUTES * 60 * 1000, done: false };
    save();
    ctx.render();
  }

  function finish(rerender = true) {
    if (!mock || mock.done) return;
    const s = ctx.state();
    const qs = byId();
    const at = Date.now();
    const result = scoreMock(s.questions, mock.ids, mock.answers, s.domains);
    const wrong = new Set(result.wrong);
    ctx.record(mock.ids.filter((id) => qs[id]).map((id, i) => {
      const q = qs[id];
      const selected = mock.answers[id] ?? [];
      return { id, task: q.task, domain: q.domain, selected, correct: !wrong.has(id), ...(selected.length ? {} : { skipped: true }), mock: true, at: at + i };
    }));
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

  function renderStart() {
    const s = ctx.state();
    const n = Math.min(MOCK_QUESTIONS, s.questions.length);
    return el('section', { class: 'card', 'data-testid': 'mock-start' },
      el('h2', { class: 'title', text: '模試' }),
      el('p', { text: `ドメインの割合どおりに ${n} 問を出します。制限時間は ${MOCK_MINUTES} 分です。途中では正誤も解説も出さず、終えてから結果と解説を見られます。` }),
      el('p', { class: 'muted small', 'data-testid': 'mock-note', text: '本番は 100〜1000 の換算点（750 点で合格）ですが、ここでは正答率だけを出します。答えは記録にも足します。' }),
      el('div', { class: 'actions' }, el('button', { type: 'button', onclick: start, text: '開始' })));
  }

  function renderRunning() {
    const s = ctx.state();
    const qs = byId();
    const id = mock.ids[mock.index];
    const q = qs[id];
    ctx.progress.textContent = `${mock.index + 1} / ${mock.ids.length}`;
    if (!q) return el('p', { class: 'error', text: 'この問題は今の問題集にありません。' });
    const view = display(q, s.lang);
    const multi = q.type === 'multi';
    const selected = mock.answers[id] ?? [];
    const list = el('ul', { class: 'choices', role: multi ? 'group' : 'radiogroup', 'aria-label': '選択肢' });
    for (const c of view.choices) {
      const input = el('input', {
        type: multi ? 'checkbox' : 'radio', name: 'mock-choice', value: c.key, checked: selected.includes(c.key),
        disabled: multi && !selected.includes(c.key) && selected.length >= q.select_count,
        onchange: (ev) => {
          const cur = mock.answers[id] ?? [];
          mock.answers[id] = multi ? (ev.target.checked ? [...cur, c.key] : cur.filter((k) => k !== c.key)) : [c.key];
          save();
          ctx.render();
        },
      });
      list.append(el('li', {}, el('label', { class: 'choice', 'data-testid': 'choice' }, input, el('span', { class: 'key', text: `${c.key}.` }), el('span', { lang: view.lang, text: c.text }))));
    }
    const last = mock.index === mock.ids.length - 1;
    return el('section', { class: 'card', 'data-testid': 'mock' },
      el('div', { class: 'meta' }, el('span', { text: `タスク ${q.task}` }), el('span', { class: 'badge', 'data-testid': 'mock-time', text: `残り ${formatTime(remaining(mock.deadline))}` })),
      el('p', { class: 'stem', 'data-testid': 'stem', lang: view.lang, text: view.stem }),
      multi ? el('p', { class: 'hint', text: `${q.select_count} つ選ぶ` }) : null,
      list,
      el('div', { class: 'actions' },
        el('button', { type: 'button', class: 'secondary', disabled: mock.index === 0, onclick: () => { mock.index--; save(); ctx.render(); }, text: '前へ' }),
        last ? null : el('button', { type: 'button', onclick: () => { mock.index++; save(); ctx.render(); }, text: '次へ' }),
        el('button', { type: 'button', class: last ? '' : 'secondary', onclick: () => { if (window.confirm('模試を終えて採点します。よろしいですか？')) finish(); }, text: '終える' })));
  }

  function renderReview(q, s) {
    const view = display(q, s.lang);
    const yours = mock.answers[q.id] ?? [];
    return el('details', { class: 'mock-review', 'data-testid': 'mock-wrong' },
      el('summary', { text: `${q.id}（タスク ${q.task}）: ${yours.length ? `あなたの答え ${yours.join(', ')}` : '答えなし'} / 正解 ${q.answer.join(', ')}` }),
      el('p', { class: 'stem', lang: view.lang, text: view.stem }),
      el('ul', { class: 'explain' }, view.choices.map((c) => el('li', { class: q.answer.includes(c.key) ? 'is-correct' : '' },
        el('strong', { text: `${c.key}. ` }), c.text, el('br', {}), el('span', { class: 'muted small', text: q.explanation.per_choice[c.key] ?? '' })))),
      el('p', { text: q.explanation.summary }));
  }

  function renderResult() {
    const s = ctx.state();
    const qs = byId();
    const r = scoreMock(s.questions, mock.ids, mock.answers, s.domains);
    ctx.progress.textContent = '';
    return el('section', { class: 'card', 'data-testid': 'mock-result' },
      el('h2', { class: 'title', text: '模試の結果' }),
      el('p', { class: 'score', text: `${r.total} 問中 ${r.correct} 問 正解（${pct(r.rate)}）` }),
      el('table', { class: 'stats' },
        el('thead', {}, el('tr', {}, el('th', { text: 'ドメイン' }), el('th', { class: 'num', text: '正解' }), el('th', { class: 'num', text: '正答率' }))),
        el('tbody', {}, r.byDomain.map((d) => el('tr', {},
          el('td', { text: `${d.domain}. ${d.name}` }), el('td', { class: 'num', text: `${d.correct} / ${d.total}` }), el('td', { class: 'num', text: pct(d.rate) }))))),
      el('h3', { class: 'small', text: `間違えた・答えなかった問題（${r.wrong.length}）` }),
      r.wrong.length ? r.wrong.map((id) => qs[id]).filter(Boolean).map((q) => renderReview(q, s)) : el('p', { class: 'muted', text: '全問正解です。' }),
      el('div', { class: 'actions' }, el('button', { type: 'button', onclick: () => { mock = null; save(); ctx.render(); }, text: 'もう一度（新しい模試）' })));
  }

  return {
    render() {
      if (!mock) { stopTimer(); return renderStart(); }
      if (mock.done) { stopTimer(); return renderResult(); }
      if (remaining(mock.deadline) <= 0) { finish(false); return renderResult(); }
      if (!timer) timer = setInterval(tick, 1000);
      return renderRunning();
    },
    leave: stopTimer,
  };
}
