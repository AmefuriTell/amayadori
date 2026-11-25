# L1 苦手の分析（外側のループ）

解いた記録から、次に作る問題を決める。問題を作るループ（C）と、自分が解くループをつなぐ。

```xml
<step id="L1_learn" actor="tool">
  <purpose>苦手なタスク番号と、誤りが疑わしい問題を見つけて backlog に足す。</purpose>
  <inputs>
    <file>.loop/answers/*.json（アプリの「記録の書き出し」で出したもの。人が置く）</file>
  </inputs>
  <actions>
    <a>learn:weak を呼ぶ。ツールが下を計算し、backlog に項目を足す。</a>
    <a>出力の summary をそのまま S9 の記録に書く。AI は記録の中身を読まない。</a>
  </actions>
  <exit>loop advance --result ok</exit>
</step>
```

## learn:weak の決まり

```json
{
  "weak_task":        { "rule": "タスク番号ごとの正答率が 70% 未満、かつ解いた数が 5 以上", "adds": "content 項目（count 5、priority 2）" },
  "thin_task":        { "rule": "タスク番号ごとの問題数が、試験の割合 × 目標の総数（初め 300）の半分未満", "adds": "content 項目（priority 3）" },
  "suspect_question": { "rule": "その問題の正答率が 20% 未満で 3 回以上解かれている、または「誤りを報告」がある", "adds": "content 項目 kind=recheck（その問題だけ C3 からやり直す）" },
  "pass_signal":      { "rule": "模試の直近 3 回がすべて 80% 以上", "adds": "なし。S9 で人に「受けてよい頃」と伝える" }
}
```
