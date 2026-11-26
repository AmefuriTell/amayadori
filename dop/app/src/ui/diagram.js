// 構成図（A-0014、P-015）: 答えた後に出す。箱を押すと事典を開く。F-0007 で main.js から切り出した。
// 事典（state.glossary）と今の問題（state.questions・state.index・state.answered）は main.js の state にあり、ここへ渡す。
import { el } from './el.js';
import { lookup } from '../logic/glossary.js';
import { openGlossary } from './glossary.js';

export function createDiagram(state, render) {
  const diagrams = {}; // 問題 ID → SVG の文字列（null は取れなかった）

  return function renderDiagram(q) {
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
  };
}
