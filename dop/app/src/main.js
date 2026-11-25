// 1 問ずつ解く画面。採点などの計算は logic/ に置く。
import { grade, canSubmit } from './logic/grade.js';

const app = document.getElementById('app');
const progress = document.querySelector('[data-testid=progress]');

const state = { questions: [], index: 0, selected: [], answered: false, correct: 0 };

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

async function load() {
  try {
    const res = await fetch('public/questions.json', { cache: 'no-cache' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data.questions) || !data.questions.length) throw new Error('問題が 0 問');
    state.questions = data.questions;
    render();
  } catch (e) {
    progress.textContent = '';
    app.replaceChildren(el('p', { class: 'error', 'data-testid': 'load-error', text: `問題を読み込めません（${e.message}）。時間をおいて開き直してください。` }));
  }
}

function render() {
  if (state.index >= state.questions.length) return renderResult();
  const q = state.questions[state.index];
  const multi = q.type === 'multi';
  progress.textContent = `${state.index + 1} / ${state.questions.length}`;

  const meta = el('div', { class: 'meta' },
    el('span', { text: `タスク ${q.task}` }),
    el('span', { text: q.services.join('・') }),
    q.low_confidence ? el('span', { class: 'badge warn', 'data-testid': 'low-confidence', title: '検証役の AI が迷った問題です。解説と出典を確かめてください', text: 'AI の確信が低い' }) : null,
  );

  const list = el('ul', { class: 'choices', role: multi ? 'group' : 'radiogroup', 'aria-label': '選択肢' });
  for (const c of q.choices) {
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
    list.append(el('li', {}, el('label', { class: `choice${mark}`, 'data-testid': 'choice' }, input, el('span', { class: 'key', text: `${c.key}.` }), el('span', { text: c.text }))));
  }

  const card = el('section', { class: 'card', 'aria-labelledby': 'stem' },
    meta,
    el('p', { class: 'stem', id: 'stem', 'data-testid': 'stem', text: q.stem }),
    multi ? el('p', { class: 'hint', 'data-testid': 'select-hint', text: `${q.select_count} つ選ぶ` }) : null,
    list,
  );

  if (!state.answered) {
    card.append(el('div', { class: 'actions' },
      el('button', { type: 'button', disabled: !canSubmit(q, state.selected), onclick: submit, text: '答える' })));
  } else {
    card.append(renderAnswer(q));
  }
  app.replaceChildren(card);
}

function renderAnswer(q) {
  const ok = grade(q, state.selected);
  const last = state.index === state.questions.length - 1;
  return el('div', {},
    el('p', { class: `verdict ${ok ? 'ok' : 'ng'}`, 'data-testid': 'verdict', role: 'status', text: ok ? `正解（${q.answer.join(', ')}）` : `不正解（正解は ${q.answer.join(', ')}）` }),
    el('p', { text: q.explanation.summary }),
    el('ul', { class: 'explain' }, q.choices.map((c) => el('li', {
      class: q.answer.includes(c.key) ? 'is-correct' : '', 'data-testid': 'explain-item',
    }, el('strong', { text: `${c.key}. ` }), q.explanation.per_choice[c.key] ?? ''))),
    el('div', { class: 'refs' }, q.references.map((r) => el('figure', { class: 'ref', 'data-testid': 'reference' },
      el('blockquote', { lang: 'en', text: r.quote }),
      el('figcaption', {}, el('a', { href: r.url, target: '_blank', rel: 'noopener noreferrer', text: '出典（AWS 公式ドキュメント）' }))))),
    el('div', { class: 'actions' }, el('button', { type: 'button', onclick: next, text: last ? '結果を見る' : '次へ' })),
  );
}

function submit() {
  const q = state.questions[state.index];
  if (!canSubmit(q, state.selected)) return;
  state.answered = true;
  if (grade(q, state.selected)) state.correct += 1;
  render();
  app.querySelector('[data-testid=verdict]')?.focus?.();
}

function next() {
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

function restart() {
  Object.assign(state, { index: 0, selected: [], answered: false, correct: 0 });
  render();
}

load();
