// 採点（画面に頼らない）

/** 選んだ組が答えの組と完全に同じなら正解（順は問わない） */
export function grade(question, selected) {
  const a = [...question.answer].sort();
  const s = [...new Set(selected)].sort();
  return a.length === s.length && a.every((k, i) => k === s[i]);
}

/** select_count 個そろったら答えられる */
export function canSubmit(question, selected) {
  return new Set(selected).size === question.select_count;
}
