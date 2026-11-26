// 講義の読み上げ（K-）: 台本を VOICEVOX ENGINE で mp3 にする（work/_lecture-sample/tts.mjs をライブラリにした物）。
// エンジンが答えなければ docker で起こす（ensureEngine）。アクセントは config/accents.json をユーザー辞書に入れ直す。
// 声の利用条件: 生成した音声には「VOICEVOX:<キャラクター名>」のクレジットが要る（CREDIT）。
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn, execFileSync } from 'node:child_process';
import { paths, readJSON, ToolError } from './io.mjs';

export const ENGINE = process.env.VOICEVOX_URL ?? 'http://127.0.0.1:50021';
export const IMAGE = 'mirror.gcr.io/voicevox/voicevox_engine:cpu-latest';
export const SPEAKER = 2; // 四国めたん（ノーマル）
export const CREDIT = 'VOICEVOX:四国めたん';
const CONTAINER = 'voicevox';
const WAIT_ENGINE_MS = 3 * 60e3;
const WAIT_DOCKER_MS = 60e3;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function alive() {
  try {
    const r = await fetch(`${ENGINE}/version`, { signal: AbortSignal.timeout(2000) });
    return r.ok;
  } catch {
    return false;
  }
}

/** docker のコマンドを呼ぶ。失敗したら null（out: 標準出力） */
function docker(args, { timeout = 60e3 } = {}) {
  try {
    return execFileSync('docker', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], timeout });
  } catch (e) {
    if (e.code === 'ENOENT') throw new ToolError('docker が無い。VOICEVOX ENGINE を動かせない（DOP_TTS=skip なら音声を作らずに進める）');
    return null;
  }
}
const lastError = (args) => {
  try { execFileSync('docker', args, { stdio: ['ignore', 'pipe', 'pipe'], timeout: 30e3 }); return ''; } catch (e) { return String(e.stderr ?? e.message).trim().split('\n').pop(); }
};

/** http://127.0.0.1:50021 が答えるようにする。{ started: bool } */
export async function ensureEngine() {
  if (await alive()) return { started: false };

  // 1. docker が動いていなければ dockerd を起こす
  if (docker(['info'], { timeout: 15e3 }) === null) {
    const log = path.join(os.tmpdir(), 'dop-dockerd.log');
    try {
      const fd = fs.openSync(log, 'a');
      spawn('dockerd', [], { detached: true, stdio: ['ignore', fd, fd] }).on('error', () => {}).unref();
    } catch (e) {
      throw new ToolError(`dockerd を起こせない: ${e.message}`);
    }
    const until = Date.now() + WAIT_DOCKER_MS;
    while (docker(['info'], { timeout: 15e3 }) === null) {
      if (Date.now() > until) throw new ToolError(`dockerd を起こしたが ${WAIT_DOCKER_MS / 1000} 秒たっても答えない（記録: ${log}）`);
      await sleep(1000);
    }
  }

  // 2. イメージが無ければ取る
  if (docker(['image', 'inspect', IMAGE]) === null) {
    if (docker(['pull', IMAGE], { timeout: 20 * 60e3 }) === null) throw new ToolError(`VOICEVOX ENGINE のイメージを取れない（${IMAGE}）: ${lastError(['pull', IMAGE])}`);
  }

  // 3. 動かす（同じ名前の止まった入れ物が残っていれば消す）
  const running = docker(['ps', '-q', '--filter', `name=^${CONTAINER}$`])?.trim();
  if (!running) {
    docker(['rm', '-f', CONTAINER]);
    const runArgs = ['run', '-d', '--rm', '--network', 'host', '--name', CONTAINER, IMAGE];
    if (docker(runArgs) === null) throw new ToolError(`VOICEVOX ENGINE を動かせない: ${lastError(runArgs)}`);
  }
  const until = Date.now() + WAIT_ENGINE_MS;
  while (!(await alive())) {
    if (Date.now() > until) throw new ToolError(`VOICEVOX ENGINE が 3 分たっても答えない（${ENGINE}/version）。docker logs ${CONTAINER} で確かめる`);
    await sleep(2000);
  }
  return { started: true };
}

/** config/accents.json の語で、エンジンのユーザー辞書を入れ直す。入れた語の数を返す */
export async function installAccents(file = paths.config('accents.json')) {
  const words = readJSON(file, { words: [] }).words ?? [];
  const have = await (await fetch(`${ENGINE}/user_dict`)).json();
  for (const uuid of Object.keys(have)) await fetch(`${ENGINE}/user_dict_word/${uuid}`, { method: 'DELETE' });
  for (const w of words) {
    const q = new URLSearchParams({ surface: w.surface, pronunciation: w.pronunciation, accent_type: String(w.accent), word_type: 'PROPER_NOUN', priority: '10' });
    const r = await fetch(`${ENGINE}/user_dict_word?${q}`, { method: 'POST' });
    if (!r.ok) throw new ToolError(`アクセント辞書に入れられない（${w.surface}）: ${r.status} ${await r.text()}`);
  }
  return words.length;
}

function tool(cmd, args) {
  try {
    return execFileSync(cmd, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  } catch (e) {
    if (e.code === 'ENOENT') throw new ToolError(`${cmd} が無い（音声を mp3 にするのに要る）`);
    throw new ToolError(`${cmd} が失敗した: ${String(e.stderr ?? e.message).trim().split('\n').pop()}`);
  }
}

/**
 * スライドごとに outDir/<slide id>.mp3 を作る。
 * @returns {{ files: { id: string, seconds: number }[], minutes: number }}
 */
export async function synthesize(lecture, outDir, { speaker = SPEAKER, speed = 1.1 } = {}) {
  await ensureEngine();
  await installAccents();
  fs.mkdirSync(outDir, { recursive: true });
  const files = [];
  for (const s of lecture.slides) {
    const q = await fetch(`${ENGINE}/audio_query?speaker=${speaker}&text=${encodeURIComponent(s.narration)}`, { method: 'POST' });
    if (!q.ok) throw new ToolError(`読み上げの準備（audio_query）に失敗: ${s.id}: ${q.status}`);
    const query = await q.json();
    query.speedScale = speed;
    query.postPhonemeLength = 0.6;
    const w = await fetch(`${ENGINE}/synthesis?speaker=${speaker}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(query) });
    if (!w.ok) throw new ToolError(`読み上げ（synthesis）に失敗: ${s.id}: ${w.status}`);
    const wav = path.join(outDir, `${s.id}.wav`);
    fs.writeFileSync(wav, Buffer.from(await w.arrayBuffer()));
    const mp3 = path.join(outDir, `${s.id}.mp3`);
    tool('ffmpeg', ['-loglevel', 'error', '-y', '-i', wav, '-b:a', '64k', mp3]);
    fs.rmSync(wav);
    const sec = Number(tool('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', mp3]).trim());
    files.push({ id: s.id, seconds: Math.round(sec * 10) / 10 });
  }
  const total = files.reduce((n, x) => n + x.seconds, 0);
  return { files, minutes: Math.round((total / 60) * 10) / 10 };
}
