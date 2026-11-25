// 問題文と選択肢の言葉（P-012）。既定は日本語、日本語版が無い問題は英語。
export const LANG_KEY = 'dop:v1:lang';

export function parseLang(raw) {
  return raw === 'en' ? 'en' : 'ja';
}

/** 出す文。ja: その問題に日本語版があるか */
export function display(q, lang) {
  const ja = typeof q.stem_ja === 'string' && q.choices.every((c) => typeof c.text_ja === 'string');
  const useJa = lang === 'ja' && ja;
  return {
    ja,
    lang: useJa ? 'ja' : 'en',
    stem: useJa ? q.stem_ja : q.stem,
    choices: q.choices.map((c) => ({ key: c.key, text: useJa ? c.text_ja : c.text })),
  };
}
