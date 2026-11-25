// localStorage の読み書き。使えない時（非公開の窓・設定で止めている）も例外を外に出さない。
import { RECORD_KEY, parseRecord, serializeRecord } from './logic/record.js';

export function loadAnswers() {
  try {
    return { ok: true, answers: parseRecord(window.localStorage.getItem(RECORD_KEY)) };
  } catch {
    return { ok: false, answers: [] };
  }
}

export function saveAnswers(answers) {
  try {
    window.localStorage.setItem(RECORD_KEY, serializeRecord(answers));
    return true;
  } catch {
    return false;
  }
}

export function clearAnswers() {
  try {
    window.localStorage.removeItem(RECORD_KEY);
    return true;
  } catch {
    return false;
  }
}
