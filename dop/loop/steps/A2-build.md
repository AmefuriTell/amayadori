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
    <a>先に acceptance ごとの試験を書く（unit は app/test/、e2e は app/e2e/）。試験の名前の先頭に AC の id を付ける（例 "AC2 複数選択は…"）。</a>
    <a>コードを書く。問題のデータは bank/ を直接読まず、ビルドの時に tools が作る app/public/questions.json を使う。</a>
    <a>app/SPEC.md の該当する所を今の形に直す（短く）。</a>
    <a>feedback.json があれば、そこに出た AC だけ直す。同じ AC が 2 回続けて落ちたら、直し方を変える（前と違う原因を 1 行で書いてから直す）。</a>
  </actions>
  <constraints>
    <c>外の CDN から読み込まない。依存は npm で入れて同梱する（meteor/ と同じ決まり）。</c>
    <c>画面のロジックと画面に頼らない計算（採点・出題の並べ方・記録の集計）を分け、後者は unit で試す。</c>
  </constraints>
  <exit>書けた → loop advance --result ok</exit>
</step>
```
