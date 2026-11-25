import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { version, stamp, isStamped } from '../../tools/lib/stamp.mjs';

const APP = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('A-0011 AC1 版の番号と印。今のアプリは印が合っている', () => {
  assert.equal(isStamped(APP), true, 'app/ を変えたら node dop/tools/app.mjs stamp を呼ぶ');

  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'dop-stamp-'));
  fs.mkdirSync(path.join(dir, 'src', 'logic'), { recursive: true });
  fs.writeFileSync(path.join(dir, 'src', 'main.js'), "import './logic/a.js';\n");
  fs.writeFileSync(path.join(dir, 'src', 'logic', 'a.js'), 'export const a = 1;\n');
  fs.writeFileSync(path.join(dir, 'style.css'), 'body{}\n');
  fs.writeFileSync(path.join(dir, 'index.html'), '<head>\n  <!-- version:start（node dop/tools/app.mjs stamp が書く。手で直さない） -->\n  <!-- version:end -->\n</head>\n');
  const v1 = stamp(dir).version;
  assert.equal(isStamped(dir), true);
  const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
  assert.match(html, new RegExp(`"\\./src/logic/a\\.js":"\\./src/logic/a\\.js\\?v=${v1}"`));
  assert.match(html, new RegExp(`src="src/main\\.js\\?v=${v1}"`));
  assert.match(html, new RegExp(`href="style\\.css\\?v=${v1}"`));
  assert.deepEqual(JSON.parse(fs.readFileSync(path.join(dir, 'public', 'version.json'), 'utf8')), { version: v1 });

  fs.writeFileSync(path.join(dir, 'src', 'logic', 'a.js'), 'export const a = 2;\n');
  assert.notEqual(version(dir), v1);
  assert.equal(isStamped(dir), false);
  assert.equal(stamp(dir).changed, true);
  assert.equal(isStamped(dir), true);
});
