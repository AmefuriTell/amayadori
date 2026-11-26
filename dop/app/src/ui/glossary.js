// サービス事典の表示（A-0013、P-014）。F-0003 で main.js から切り出した。事典のデータは引数で受け取る。
import { el } from './el.js';
import { lookup, pageList } from '../logic/glossary.js';

const dialog = el('dialog', { class: 'gloss', 'data-testid': 'glossary-dialog', 'aria-label': 'サービス事典' });
document.body.append(dialog);

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

export function openGlossary(p) {
  dialog.replaceChildren(renderGlossaryPage(p),
    el('div', { class: 'actions' }, el('button', { type: 'button', onclick: () => dialog.close(), text: '閉じる' })));
  if (typeof dialog.showModal === 'function') dialog.showModal(); else dialog.setAttribute('open', '');
  dialog.scrollTop = 0;
}

export function serviceLabel(name, glossary) {
  const p = lookup(glossary, name);
  return p ? el('button', { type: 'button', class: 'svc', 'data-testid': 'service', onclick: () => openGlossary(p), text: name }) : el('span', { text: name });
}

export function renderGlossaryList(app, glossary) {
  const list = pageList(glossary);
  app.replaceChildren(el('section', { class: 'card', 'data-testid': 'glossary' },
    el('h2', { class: 'title', text: 'サービス事典' }),
    list.length
      ? el('ul', { class: 'gloss-list' }, list.map((p) => el('li', {},
        el('button', { type: 'button', class: 'svc', onclick: () => openGlossary(p), text: p.name }),
        el('span', { class: 'muted small', text: ` ${p.reading ?? ''}` }))))
      : el('p', { class: 'muted', 'data-testid': 'glossary-empty', text: '事典はまだありません。' }),
  ));
}
