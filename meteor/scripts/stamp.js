// index.html の meteor.js?v=… と meteor.css?v=… を、中身の SHA-256 の先頭 10 文字に書き換える
// （更新の直後に、ブラウザが覚えている古いファイルを読まないように）。`npm run build` の最後に動く。
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";

const version = (file) => createHash("sha256").update(readFileSync(file)).digest("hex").slice(0, 10);
let html = readFileSync("index.html", "utf8");
for (const file of ["meteor.js", "meteor.css"]) {
  const pattern = new RegExp(`${file.replace(".", "\\.")}\\?v=[0-9a-f]+`);
  if (!pattern.test(html)) throw new Error(`index.html に ${file}?v= が見つからない`);
  html = html.replace(pattern, `${file}?v=${version(file)}`);
}
writeFileSync("index.html", html);
