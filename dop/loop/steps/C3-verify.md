# C3 検証

問題の誤りの多くは「書いた本人が気づかない」もの。書いた AI とは別の文脈の AI が、**答えを見ずに解いてから** 根拠と照らす。

```xml
<step id="C3_verify" actor="verifier" context="fresh">
  <purpose>正解が 1 つに決まり、根拠どおりに正しいことを確かめる。</purpose>
  <inputs>
    <tool>q:blind work/&lt;ID&gt;/questions.json → 答え・解説・references を抜いた問題を出す</tool>
    <file>work/&lt;ID&gt;/sources.md</file>
  </inputs>
  <actions>
    <a by="orchestrator">verifier を新しい文脈で起こす。author のやり取りは渡さない。渡すのは q:blind の出力と sources.md と下の指示だけ。</a>
    <a by="verifier">1 周目: 各問を解き、答えと確信度（high/mid/low）と理由を書く（答えはまだ見ない）。</a>
    <a by="verifier">2 周目: q:reveal で答えと解説を受け取り、照らす。</a>
    <a by="verifier">verify.json を書く（下の形）。</a>
    <a by="orchestrator">q:verdict を呼ぶ。束としての結論をツールが出す。</a>
  </actions>
  <outputs><file>work/&lt;ID&gt;/verify.json, 戻る時は work/&lt;ID&gt;/feedback.json（q:verdict が作る）</file></outputs>
  <exit>
    <pass>全問 verdict が ok</pass>
    <fix>fix が 1 問以上 → feedback.json を作って C2 へ</fix>
    <drop>attempts が上限、または全問 drop → S9（作れた分だけ残す）</drop>
  </exit>
</step>
```

## verify.json の形

```json
{
  "item": "C-0012",
  "questions": [
    {
      "qid": "q-1.2-0007",
      "blind": { "answer": ["B"], "confidence": "high", "reason": "..." },
      "match": true,
      "issues": [
        { "kind": "fact|ambiguous|two_correct|no_correct|unsupported|deprecated|giveaway|style", "where": "choice C", "detail": "...", "source": "S2" }
      ],
      "verdict": "ok|fix|drop"
    }
  ]
}
```

## 判定の決まり（q:verdict の中。人の確認用）

- `match: false` → 少なくとも fix（答えが割れる問題は、本番の形として悪いか、正解が違う）。
- issues に `fact`・`two_correct`・`no_correct`・`unsupported`・`deprecated` → fix。
- 同じ問題が 2 回 fix → drop。
- `style`・`giveaway`（答えが見え見え）だけ → fix だが attempts を数えない。
- blind で `confidence: low` かつ match → ok。問題に `low_confidence: true` を付け、アプリで印を出す（人は事前に読まないため）。
