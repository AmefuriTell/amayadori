import { test } from "node:test";
import assert from "node:assert/strict";
import { loadMuted, saveMuted, soundFor } from "../src/game/sound.js";

function memoryStorage() {
  const data = new Map();
  return { getItem: (key) => (data.has(key) ? data.get(key) : null), setItem: (key, value) => data.set(key, String(value)) };
}

test("the explosion gets quieter the farther the hit is from the target", () => {
  const volumes = [200, 800, 2000, 5000].map((km) => soundFor("earth", km)[0][0]);
  for (let index = 1; index < volumes.length; index += 1) assert.ok(volumes[index] < volumes[index - 1], `${volumes}`);
});

test("only hits closer than 300 km get the extra ping", () => {
  assert.equal(soundFor("earth", 299).length, 2);
  assert.equal(soundFor("earth", 300).length, 1);
  assert.equal(soundFor("earth", 2000).length, 1);
});

test("launch, moon and away return sounds, and unknown events return null", () => {
  for (const event of ["launch", "moon", "away"]) {
    const sounds = soundFor(event);
    assert.ok(Array.isArray(sounds) && sounds.length > 0 && sounds.every(Array.isArray), event);
  }
  assert.equal(soundFor("unknown"), null);
});

test("the mute setting is saved and read back, and unreadable storage means sound on", () => {
  const storage = memoryStorage();
  assert.equal(loadMuted(storage), false);
  saveMuted(true, storage);
  assert.equal(loadMuted(storage), true);
  saveMuted(false, storage);
  assert.equal(loadMuted(storage), false);
  const broken = { getItem: () => { throw new Error("blocked"); }, setItem: () => { throw new Error("blocked"); } };
  assert.equal(loadMuted(broken), false);
  saveMuted(true, broken);
});

test("the first-turn sound is a short sine ping, quieter than the 1000 km explosion", () => {
  const sounds = soundFor("orbit");
  assert.ok(Array.isArray(sounds) && sounds.length > 0 && sounds.every(Array.isArray));
  assert.ok(sounds[0][0] < soundFor("earth", 1000)[0][0], `${sounds[0][0]}`);
  const [, , frequency, attack, sustain, release, shape, , , , pitchJump] = sounds[0];
  assert.equal(shape, 0);
  assert.equal(frequency, 880);
  assert.ok(frequency + pitchJump > frequency && frequency + pitchJump <= 1400);
  assert.ok(attack + sustain + release <= 0.4);
});

test("the aim click is a tiny sine tick, quieter and shorter than the first-turn ping", () => {
  const sounds = soundFor("aim");
  assert.ok(Array.isArray(sounds) && sounds.length > 0 && sounds.every(Array.isArray));
  const orbit = soundFor("orbit")[0];
  const [volume, , frequency, attack, sustain, release, shape] = sounds[0];
  const length = (sound) => sound[3] + sound[4] + sound[5];
  assert.equal(shape, 0);
  assert.ok(frequency >= 1200 && frequency <= 1600, `${frequency}`);
  assert.ok(volume < orbit[0], `${volume}`);
  assert.ok(length(sounds[0]) < length(orbit), `${length(sounds[0])}`);
});
