import { test } from "node:test";
import assert from "node:assert/strict";
import { PUBLIC_GAME_URL, pageUrl, postUrl, shareResult, shareUrl, xIntentUrl } from "../src/share.js";

test("share uses the device share sheet when there is one, with a link to today's challenge", async () => {
  const shared = [];
  const result = await shareResult("🎯 今日の隕石当て", { share: async (data) => shared.push(data) }, "https://example.test/meteor/#x");
  assert.deepEqual(result, { success: true });
  assert.deepEqual(shared, [{ text: "🎯 今日の隕石当て", url: "https://example.test/meteor/?daily" }]);
});

test("share falls back to copying the text and the link, and says it was copied", async () => {
  const copied = [];
  const result = await shareResult("🎯 結果", { clipboard: { writeText: async (text) => copied.push(text) } }, "https://example.test/meteor/?daily");
  assert.deepEqual(result, { success: true, copied: true });
  assert.deepEqual(copied, ["🎯 結果 https://example.test/meteor/?daily"]);
});

test("a cancelled share sheet or no clipboard is a failure (the game then shows the text)", async () => {
  await assert.rejects(shareResult("x", { share: async () => { throw new Error("AbortError"); } }, "https://example.test/"));
  await assert.rejects(shareResult("x", {}, "https://example.test/"));
});

test("the shared link opens today's challenge", () => {
  assert.equal(shareUrl("https://a.test/amayadori/meteor/?foo=1#bar"), "https://a.test/amayadori/meteor/?daily");
});

test("the post to X opens the web intent with the text, the link and the hashtag", () => {
  const intent = new URL(xIntentUrl("🎯 今日の隕石当て 11/14・東京: 123 km", "https://example.test/meteor/?daily"));
  assert.equal(intent.origin + intent.pathname, "https://twitter.com/intent/tweet");
  assert.equal(intent.searchParams.get("text"), "🎯 今日の隕石当て 11/14・東京: 123 km");
  assert.equal(intent.searchParams.get("url"), "https://example.test/meteor/?daily");
  assert.equal(intent.searchParams.get("hashtags"), "隕石を当てろ");
});

test("the link in a post leads to today's challenge only for daily results", () => {
  assert.equal(postUrl("https://example.test/meteor/?daily#a", true), "https://example.test/meteor/?daily");
  assert.equal(postUrl("https://example.test/meteor/?daily#a", false), "https://example.test/meteor/");
  assert.equal(pageUrl(PUBLIC_GAME_URL), "https://amefuritell.github.io/amayadori/meteor/");
});
