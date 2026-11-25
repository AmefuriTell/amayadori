# L1 苦手の分析（外側のループ）

解いた記録と誤りの報告から、次に作る問題と、直す問題を決める。問題を作るループ（C）と、利用者が解くループをつなぐ。

```xml
<step id="L1_learn" actor="tool">
  <purpose>苦手なタスク番号と、誤りが疑わしい問題を見つけて backlog に足す。</purpose>
  <inputs>
    <file>.loop/answers/*.json: アプリの「記録の書き出し」のファイル（利用者がチャットに上げるか、置く）</file>
    <file>.loop/answers/issues.json: GitHub の issue の一覧（下の手順で進行役が置く）</file>
  </inputs>
  <actions>
    <a>GitHub の道具（list_issues）で AmefuriTell/amayadori の open の issue を取り、題が「[DOP]」で始まる物の number・title・body・state だけを JSON の配列で .loop/answers/issues.json に書く。本文は読まなくてよい（ツールが読む）。</a>
    <a>node dop/tools/learn.mjs weak を呼ぶ。ツールが下の決まりで計算し、backlog に項目を足し、札を書く。</a>
    <a>出力の summary を S9 の記録に書く。pass_signal が true なら、利用者に「受けてよい頃」と伝える。AI は記録の中身を読まない。</a>
    <a>issue を閉じたり書き込んだりはしない（外に出る操作なので、利用者が行う）。</a>
  </actions>
  <exit>loop advance --result ok</exit>
</step>
```

## learn weak の決まり（tools/learn.mjs の RULES）

```json
{
  "weak_task":        { "rule": "タスク番号ごとの正答率（問題ごとの最新の答え）が 70% 未満、かつ解いた問題が 5 以上", "adds": "content 項目（count 5、priority 2、source learn）。同じタスクの learn の項目が残っていれば足さない" },
  "suspect_question": { "rule": "その問題の正答率（全ての答え）が 20% 未満で 3 回以上解かれた、または「誤りを報告」（端末の記録か [DOP] の issue）がある", "adds": "recheck 項目（priority 1）。タスクごとにまとめ、理由と報告のコメントを note に書く。進めている recheck に入っている問題は足さない" },
  "pass_signal":      { "rule": "直近 100 回の答えの正答率が 80% 以上", "adds": "なし。利用者に伝える（模試ができたら模試の結果に変える）" },
  "thin_task":        { "rule": "（使わない）", "adds": "試験ガイドの範囲は loop seed で足し済み" }
}
```

## recheck の項目の流れ

loop next が、その問題を bank から work/<ID>/questions.json に写す（"recheck": true）→ C1 で根拠を集め直す → C2 で item.note の指摘の所だけ直す（id は変えない）→ C3・C4 → q publish が同じ id で上書きする。
