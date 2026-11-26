# S9 閉じる

```xml
<step id="S9_close" actor="orchestrator">
  <purpose>項目を閉じ、次のループに効く学びだけを残す。</purpose>
  <actions>
    <a>loop close を呼ぶ。app・refactor の項目では、ツールがコードを測り直し（refactor.mjs scan）、決まり（config/refactor.json）を超えた所をリファクタリングの項目（F-）として足す（loop start の時も同じ。P-016）。</a>
    <a>loop close を呼ぶ。ツールが runs.jsonl に 1 行足し（項目・終わり方・attempts）、work/&lt;ID&gt;/ を .loop/archive/ へ移し、S0_pick へ進める。</a>
    <a>content・recheck の項目を done で閉じると、ツールが図の無い問題の図の項目（D-）を足す。recheck では、見直した問題にもう付いている図の点検の項目（D-、check: true）も足す（どちらも出力の diagrams_added）。人は足さなくてよい。</a>
    <a>この項目で、同じ種類の指摘が 2 回以上出たか確かめる（loop close の出力の repeated_issues）。</a>
    <a>出ていれば、その再発を防ぐ決まりを 1 行、該当する工程の文書に足す案を .loop/proposals.md に書く。<b>工程の文書は直接書き換えない</b>（人が週に 1 回まとめて採否を決める）。</a>
    <a>機械で確かめられる指摘なら、文書でなくツールの検査を足す案にする（AI が覚えるより確実）。</a>
    <a>出力の human_needed が null でなければ（項目が blocked）、その理由と選べる案を 3 行で人に伝える。ループは次の項目へ進めてよい。</a>
    <a>dop/ と .claude/ の変更をコミットして、作業のブランチへ push する（クラウドのコンテナは使い捨てなので、項目ごとに残す）。メッセージは「DOP ループ: &lt;ID&gt; &lt;終わり方&gt;（&lt;題&gt;）」。</a>
    <a>loop next が STOP（この回の上限）を返したら、作業のブランチから master への PR を作り、CI が通ったらマージする。人の承認は要らない（LOOP.md 6 章）。マージした後は master を作業のブランチへ fast-forward して push し、次の回を loop start で始める。</a>
    <a>PR が開いている間は、作業のブランチへ push しない（手元でコミットするのはよい）。CI が落ちたら原因を直してから push する。</a>
  </actions>
  <exit>loop close が advance も兼ねる。次は loop next</exit>
</step>
```

## proposals.md の 1 件の形

```xml
<proposal id="P-007" from="C-0012,C-0015">
  <issue>誤りの選択肢に、存在しない CodeDeploy の設定名が 2 回出た</issue>
  <kind>tool</kind>
  <change>q:lint に「選択肢の設定名が sources.md か config/known-terms.json にあるか」の検査を足す</change>
</proposal>
```
