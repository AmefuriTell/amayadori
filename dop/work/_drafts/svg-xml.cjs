// 公開済みの講義の図（app/public/lectures/*/visuals/*.svg）を、XML として正しい形に書き直す。
// 前の書き出しは outerHTML で <br> などが閉じておらず、<img> で読むと壊れた画像になっていた。
// ブラウザで HTML として読み、XMLSerializer で書き出し、DOMParser で読めることを確かめる。
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
(async () => {
  const root = process.argv[2];
  const files = [];
  for (const t of fs.readdirSync(root)) {
    const d = path.join(root, t, 'visuals');
    if (fs.existsSync(d)) for (const f of fs.readdirSync(d)) if (f.endsWith('.svg')) files.push(path.join(d, f));
  }
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.setContent('<div id="d"></div>');
  let fixed = 0; let bad = 0;
  for (const f of files) {
    const src = fs.readFileSync(f, 'utf8');
    const res = await p.evaluate((s) => {
      const okBefore = !new DOMParser().parseFromString(s, 'image/svg+xml').querySelector('parsererror');
      const host = document.getElementById('d'); host.innerHTML = s;
      const xml = new XMLSerializer().serializeToString(host.querySelector('svg'));
      const ok = !new DOMParser().parseFromString(xml, 'image/svg+xml').querySelector('parsererror');
      return { okBefore, ok, xml };
    }, src);
    if (!res.ok) { bad++; console.log('NG', f); continue; }
    if (!res.okBefore) { fs.writeFileSync(f, res.xml); fixed++; }
  }
  await b.close();
  console.log(JSON.stringify({ files: files.length, fixed, bad }));
})();
