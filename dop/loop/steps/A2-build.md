# A2 作る

```xml
<step id="A2_build" actor="builder">
  <purpose>spec.json の acceptance を満たすコードと試験を書く。</purpose>
  <inputs>
    <file>work/&lt;ID&gt;/spec.json</file>
    <file optional="yes">work/&lt;ID&gt;/feedback.json（A3 から戻った時。失敗した AC と要約）</file>
    <file>app/SPEC.md</file>
  </inputs>
  <actions>
    <a>先に acceptance ごとの試験を書く。unit は app/test/*.test.js、e2e は app/e2e/*.e2e.js（Playwright。app/e2e/helpers.js の startServer・launch・openPage・shot・overflowX を使う）。試験の名前の先頭は「&lt;項目 ID&gt; &lt;AC の id&gt; 」（例 "A-0001 AC2 複数選択は…"）。app check がこの名前で合否を数える。</a>
    <a>e2e では openPage が集めるブラウザのエラーが 0 件であることも確かめ、幅 375 と 1280 で shot を撮る。</a>
    <a>コードを書く。問題のデータは bank/ を直接読まず、node dop/tools/app.mjs data が作る app/public/questions.json を fetch で読む。</a>
    <a>app/SPEC.md の該当する所を今の形に直す（短く）。</a>
    <a>リファクタリングの項目（F-）では、spec.json の plan どおりに直し、振る舞い（ツールの出力・画面）を変えない。新しい試験は足さず、今の試験が全部通ることで確かめる（試験のファイルは spec.allow_test_changes に書いた物だけ変えてよい）。</a>
    <a>app/ のファイルを変えたら node dop/tools/app.mjs stamp を呼ぶ（読み込む先に版の番号を付け直す。忘れると npm test が落ちる）。</a>
    <a>feedback.json があれば、そこに出た AC だけ直す。同じ AC が 2 回続けて落ちたら、直し方を変える（前と違う原因を 1 行で書いてから直す）。</a>
  </actions>
  <constraints>
    <c>ビルドしない。素の HTML・CSS・JS（ES modules）で書き、GitHub Pages にそのまま置ける形にする（入口は app/index.html）。外の CDN・フォントは読み込まない。</c>
    <c>パスは全部相対にする（/amayadori/dop/app/ の下に置かれる。e2e のサーバーも同じ深さで配る）。</c>
    <c>画面のロジックと画面に頼らない計算（採点・出題の並べ方・記録の集計）を分け、後者は app/src/logic/ に置いて unit で試す。</c>
    <c>localStorage の読み書きは try/catch で包む（使えない時も画面は動く）。</c>
  </constraints>
  <exit>書けた → loop advance --result ok</exit>
</step>
```
