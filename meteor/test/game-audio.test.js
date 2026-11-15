import { test } from "node:test";
import assert from "node:assert/strict";
import { createAudio } from "../src/game/audio.js";

// 差し替えの ZZFX: 鳴らした引数を覚える。
function fakeZzfx() {
  const played = [];
  return { played, module: { ZZFX: { volume: 0.3, audioContext: { state: "running", resume: async () => {} }, play: (...args) => played.push(args) } } };
}

test("while muted, load does not import zzfx and play is silent", async () => {
  let imports = 0;
  const fake = fakeZzfx();
  const audio = createAudio({ isMuted: () => true, isOpen: () => true, importer: async () => (imports++, fake.module) });
  await audio.load();
  audio.play("launch");
  assert.equal(imports, 0);
  assert.equal(fake.played.length, 0);
});

test("after loading, play uses the sound's arguments and sets the overall volume to 1", async () => {
  const fake = fakeZzfx();
  let imports = 0;
  const audio = createAudio({ isMuted: () => false, isOpen: () => true, importer: async () => (imports++, fake.module) });
  audio.play("launch");
  assert.equal(fake.played.length, 0);
  await audio.load();
  await audio.load();
  assert.equal(imports, 1);
  assert.equal(fake.module.ZZFX.volume, 1);
  audio.play("orbit");
  audio.play("unknown");
  assert.equal(fake.played.length, 1);
});

test("if loading fails it is never tried again and stays silent", async () => {
  let imports = 0;
  const audio = createAudio({ isMuted: () => false, isOpen: () => true, importer: async () => { imports++; throw new Error("no AudioContext"); } });
  await audio.load();
  await audio.load();
  audio.play("launch");
  audio.resume();
  assert.equal(imports, 1);
  const throwing = createAudio({ isMuted: () => false, isOpen: () => true, importer: () => { imports++; throw new Error("sync"); } });
  await throwing.load();
  await throwing.load();
  assert.equal(imports, 2);
});

test("after closing (isOpen false) nothing plays", async () => {
  const fake = fakeZzfx();
  let open = true;
  const audio = createAudio({ isMuted: () => false, isOpen: () => open, importer: async () => fake.module });
  await audio.load();
  audio.play("moon");
  open = false;
  audio.play("moon");
  audio.play("earth", 1000);
  assert.equal(fake.played.length, 1);
});

test("resume only restarts a context that is not running", async () => {
  const fake = fakeZzfx();
  let resumed = 0;
  fake.module.ZZFX.audioContext = { state: "suspended", resume: async () => { resumed++; } };
  const audio = createAudio({ isMuted: () => false, isOpen: () => true, importer: async () => fake.module });
  audio.resume();
  await audio.load();
  audio.resume();
  fake.module.ZZFX.audioContext.state = "running";
  audio.resume();
  assert.equal(resumed, 1);
});
