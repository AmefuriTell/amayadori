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
