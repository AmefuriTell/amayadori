// localStorage の読み書き。使えない時（非公開の窓・設定で止めている）も例外を外に出さない。
import { RECORD_KEY, parseRecord, serializeRecord } from './logic/record.js';
import { REPORT_KEY, parseReports, serializeReports } from './logic/report.js';
import { LANG_KEY, parseLang } from './logic/lang.js';

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

export function loadReports() {
  try {
    return { ok: true, reports: parseReports(window.localStorage.getItem(REPORT_KEY)) };
  } catch {
    return { ok: false, reports: [] };
  }
}

export function saveReports(reports) {
  try {
    window.localStorage.setItem(REPORT_KEY, serializeReports(reports));
    return true;
  } catch {
    return false;
  }
}

export function loadLang() {
  try {
    return parseLang(window.localStorage.getItem(LANG_KEY));
  } catch {
    return 'ja';
  }
}

export function saveLang(lang) {
  try {
    window.localStorage.setItem(LANG_KEY, lang);
    return true;
  } catch {
    return false;
  }
}
