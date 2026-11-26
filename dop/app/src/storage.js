// localStorage の読み書き。使えない時（非公開の窓・設定で止めている）も例外を外に出さない。
import { RECORD_KEY, parseRecord, serializeRecord } from './logic/record.js';
import { REPORT_KEY, parseReports, serializeReports } from './logic/report.js';
import { LANG_KEY, parseLang } from './logic/lang.js';
import { SPEECH_KEY, parseSpeech } from './logic/speech.js';
import { PROGRESS_KEY, parseProgress } from './logic/progress.js';
import { MOCK_KEY, parseMock } from './logic/mock.js';
import { RETRY_KEY, parseRetry } from './logic/retry.js';

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

export function loadSpeech() {
  try {
    return parseSpeech(window.localStorage.getItem(SPEECH_KEY));
  } catch {
    return parseSpeech(null);
  }
}

export function saveSpeech(speech) {
  try {
    window.localStorage.setItem(SPEECH_KEY, JSON.stringify(speech));
    return true;
  } catch {
    return false;
  }
}

export function loadProgress() {
  try {
    return parseProgress(window.localStorage.getItem(PROGRESS_KEY));
  } catch {
    return null;
  }
}

export function saveProgress(progress) {
  try {
    window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    return true;
  } catch {
    return false;
  }
}

export function loadMock() {
  try {
    return parseMock(window.localStorage.getItem(MOCK_KEY));
  } catch {
    return null;
  }
}

export function saveMock(mock) {
  try {
    if (mock) window.localStorage.setItem(MOCK_KEY, JSON.stringify(mock)); else window.localStorage.removeItem(MOCK_KEY);
    return true;
  } catch {
    return false;
  }
}

export function loadRetry() {
  try {
    return parseRetry(window.localStorage.getItem(RETRY_KEY));
  } catch {
    return null;
  }
}

export function saveRetry(retry) {
  try {
    if (retry) window.localStorage.setItem(RETRY_KEY, JSON.stringify(retry)); else window.localStorage.removeItem(RETRY_KEY);
    return true;
  } catch {
    return false;
  }
}
