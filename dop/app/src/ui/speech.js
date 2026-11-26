// 読み上げ（A-0009）。ブラウザの speechSynthesis。外へは送らない。F-0003 で main.js から切り出した。
// 設定（state.speech）と最後に読んだ段（state.spokenKey）は main.js の state にあり、ここへ渡す。
import { el } from './el.js';
import { grade } from '../logic/grade.js';
import { RATES, questionScript, answerScript } from '../logic/speech.js';
import { saveSpeech } from '../storage.js';

export const synth = typeof window.SpeechSynthesisUtterance === 'function' && window.speechSynthesis ? window.speechSynthesis : null;

export function createSpeech(state, render) {
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

  return { stop: stopSpeech, auto: autoSpeak, panel: renderSpeech };
}
