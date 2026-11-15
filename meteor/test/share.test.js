import { test } from "node:test";
import assert from "node:assert/strict";
import { PUBLIC_GAME_URL, pageUrl, postUrl, shareResult, shareUrl, xIntentUrl, xShareText, isMobileDevice } from "../src/share.js";

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

test("the text for sharing a post with a file has the text, the link and the hashtag", () => {
  assert.equal(xShareText("🛰️ 軌道に乗せろ（ふつうモード）: 3 周", "https://example.test/meteor/"), "🛰️ 軌道に乗せろ（ふつうモード）: 3 周 https://example.test/meteor/ #隕石を当てろ");
});

test("only phones and tablets share the gif with the device share sheet", () => {
  const iphone = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";
  const mac = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15";
  const windows = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36";
  assert.equal(isMobileDevice({ userAgent: iphone, maxTouchPoints: 5 }), true);
  assert.equal(isMobileDevice({ userAgent: "Mozilla/5.0 (Linux; Android 14) Chrome/130 Mobile", userAgentData: { mobile: true } }), true);
  // iPadOS の Safari は Mac の UA。タッチの点で見分ける。
  assert.equal(isMobileDevice({ userAgent: mac, maxTouchPoints: 5 }), true);
  assert.equal(isMobileDevice({ userAgent: mac, maxTouchPoints: 0 }), false);
  assert.equal(isMobileDevice({ userAgent: windows, maxTouchPoints: 0, userAgentData: { mobile: false } }), false);
  // タッチのある Windows・ChromeOS の PC も、userAgentData が PC と言えば PC。
  assert.equal(isMobileDevice({ userAgent: windows, maxTouchPoints: 10, userAgentData: { mobile: false } }), false);
});
