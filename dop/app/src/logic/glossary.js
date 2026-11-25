// サービス事典（A-0013、P-014）。問題の services の名前から、共通のページを引く。
export function lookup(glossary, name) {
  const id = glossary?.names?.[name];
  return (id && glossary.pages?.[id]) || null;
}

/** 一覧（名前の順） */
export function pageList(glossary) {
  return Object.values(glossary?.pages ?? {}).sort((a, b) => a.name.localeCompare(b.name, 'en'));
}
