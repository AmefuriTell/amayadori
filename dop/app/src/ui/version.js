// 版（A-0011）。F-0003 で main.js から切り出した。
import { el } from './el.js';

const APP_VERSION = document.querySelector('meta[name=app-version]')?.content ?? '';

export function showVersion() {
  const foot = document.querySelector('[data-testid=version]');
  if (foot && APP_VERSION) foot.textContent = `版 ${APP_VERSION}`;
}

export async function checkVersion() {
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
