# S0 選ぶ

```xml
<step id="S0_pick" actor="tool">
  <purpose>次にやる項目を 1 つ決める。AI は判断しない（並べ方の決まりはツールの中）。</purpose>
  <inputs>
    <tool>loop next</tool>
  </inputs>
  <actions>
    <a>loop next を呼ぶ。</a>
    <a>出力の kind に対応する工程へ進む（loop next が state も進め、work/&lt;ID&gt;/item.json を書く）。</a>
  </actions>
  <outputs>
    <json>{ "ok": true, "item": { "id": "C-0012", "kind": "content", "task": "1.2", "topic": "...", "count": 5, "attempts": 0 }, "state": "C1_research", "doc": "steps/C1-research.md" }</json>
  </outputs>
  <exit>item が返った → 次の工程。"empty": true → STOP。</exit>
</step>
```

## 並べ方（ツールが行う。AI 向けではなく人の確認用）

1. `blocked` を除く。
2. `priority`（1 が高い）の小さい順。
3. 同じなら content は coverage の不足（目標の割合 − 今の割合）が大きい順。
4. app の項目は、`depends_on` が全部 done のものだけ。
5. まだ問題が 30 問未満の間は app を後回しにしない（解く画面が無いと人の確認ができないため、最初の app 項目「解く画面の最小版」は priority 1）。
