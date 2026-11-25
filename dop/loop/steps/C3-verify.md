# C3 検証

問題の誤りの多くは「書いた本人が気づかない」もの。書いた AI とは別の文脈の AI が、**答えを見ずに解いてから** 根拠と照らす。

```xml
<step id="C3_verify" actor="verifier" context="fresh">
  <purpose>正解が 1 つに決まり、根拠どおりに正しいことを確かめる。</purpose>
  <inputs>
    <tool>q blind &lt;ID&gt; → 答え・解説・references を抜いた問題を work/&lt;ID&gt;/blind.json に書く</tool>
    <file>work/&lt;ID&gt;/sources.md</file>
  </inputs>
  <actions>
    <a by="orchestrator">dop-verifier のエージェントを起こす。author のやり取りは渡さない。渡すのは項目 ID だけ。直した後の検証なら、前の回の指摘（work/&lt;ID&gt;/feedback.json の場所）も渡し、その直しが sources.md に基づくかを見てもらう（P-007）。</a>
    <a by="verifier">1 周目: sources.md も答えも見ずに、自分の知識だけで各問を解き、答えと確信度（high/mid/low）と理由を書く（P-004。根拠を探せば解ける問題かではなく、本番のように解けるかを見る）。</a>
    <a by="verifier">2 周目: q reveal で答えと解説を受け取り、sources.md と一緒に照らす（blind が全問そろうまで reveal は断る）。</a>
    <a by="verifier">verify.json を書く（下の形）。</a>
    <a by="orchestrator">q verdict を呼ぶ。束としての結論（result）をツールが出す。その result で advance する。</a>
  </actions>
  <outputs><file>work/&lt;ID&gt;/verify.json, 戻る時は work/&lt;ID&gt;/feedback.json（q:verdict が作る）</file></outputs>
  <exit>
    <pass>残った問題が全部 ok（drop の問題は dropped.json へ移し、束から外す）</pass>
    <fix>fix が 1 問以上 → feedback.json を作って C2 へ</fix>
    <drop>全問 drop → S9（この束からは bank に入れない）</drop>
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
- 同じ問題が 2 回 fix（言い回しだけの fix は数えない）→ drop。
- `style`・`giveaway`（答えが見え見え）だけ → 検証役の verdict が fix なら fix（attempts を数えない）、ok なら記録だけで ok（P-005）。
- 3 問以上の束で、全問が match かつ `confidence: high` → 結果は変えず、`too_easy: true` を出して history に too_easy を残す。AI の確信度は人の難しさの目安として弱いので、これだけで書き方を変えない（P-008。難しさは人の正答率で見る）。
- blind で `confidence: low` かつ match → ok。問題に `low_confidence: true` を付け、アプリで印を出す（人は事前に読まないため）。
