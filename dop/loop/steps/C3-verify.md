# C3 検証

問題の誤りの多くは「書いた本人が気づかない」もの。書いた AI とは別の文脈の AI が、**答えを見ずに解いてから** 根拠と照らす。

```xml
<step id="C3_verify" actor="verifier" context="fresh">
  <purpose>正解が 1 つに決まり、根拠どおりに正しいことを確かめる。</purpose>
  <inputs>
    <tool>q blind &lt;ID&gt; → 答え・解説・references を抜いた日本語版の問題を work/&lt;ID&gt;/blind.json に書く（P-012。利用者と同じ日本語で解く）</tool>
    <file>work/&lt;ID&gt;/sources.md</file>
  </inputs>
  <actions>
    <a by="orchestrator">dop-verifier のエージェントを起こす。author のやり取りは渡さない。渡すのは項目 ID だけ。直した後の検証なら、前の回の指摘（work/&lt;ID&gt;/feedback.json の場所）も渡し、その直しが sources.md に基づくかを見てもらう（P-007）。</a>
    <a by="verifier">1 周目: sources.md も答えも見ずに、自分の知識だけで各問を解き、答えと確信度（high/mid/low）と理由を書く（P-004。根拠を探せば解ける問題かではなく、本番のように解けるかを見る）。</a>
    <a by="verifier">2 周目: q reveal で答えと解説と英語版（stem_en・choices_en）を受け取り、sources.md と一緒に照らす（blind が全問そろうまで reveal は断る）。英語と日本語の意味が違う所（条件の語・否定・数字・要件の抜け・足し）は issues に kind: translation で書く。</a>
    <a by="verifier">translate の項目では sources.md は無い。英語の問題は検証済みなので、事実は見直さず、日本語だけで解けるか・英語と意味が同じかだけを見る。</a>
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
        { "kind": "fact|ambiguous|two_correct|no_correct|unsupported|deprecated|translation|giveaway|style", "where": "choice C", "detail": "...", "source": "S2" }
      ],
      "verdict": "ok|fix|drop"
    }
  ]
}
```

## 判定の決まり（q:verdict の中。人の確認用）

- `match: false` → 少なくとも fix（答えが割れる問題は、本番の形として悪いか、正解が違う）。ただし検証役が reveal の後に sources.md と照らして verdict を ok にし、fact・two_correct などの重い指摘も無い時は、知識の穴による外れとして ok にし、`low_confidence: true` を付ける（P-011。難しい問題を捨てないため）。
- issues に `fact`・`two_correct`・`no_correct`・`unsupported`・`deprecated`・`translation` → fix。
- translate の項目で drop → 日本語版を bank に入れないだけ。英語の問題は retired にしない。
- 同じ問題が 2 回 fix（言い回しだけの fix は数えない）→ drop。
- `style`・`giveaway`（答えが見え見え）だけ → 検証役の verdict が fix なら fix（attempts を数えない）、ok なら記録だけで ok（P-005）。
- 3 問以上の束で、全問が match かつ `confidence: high` → 結果は変えず、`too_easy: true` を出して history に too_easy を残す。AI の確信度は人の難しさの目安として弱いので、これだけで書き方を変えない（P-008。難しさは人の正答率で見る）。
- blind で `confidence: low` かつ match → ok。問題に `low_confidence: true` を付け、アプリで印を出す（人は事前に読まないため）。

## 事典の項目（G-。P-014）の検証

答えを見ずに解く段は無い。検証役は glossary.json の各ページの文を 1 つずつ sources.md と照らし、verify.json を書く。進行役は q verdict の代わりに g verdict を呼ぶ。

```json
{
  "item": "G-0001",
  "entries": [
    { "id": "codedeploy", "issues": [ { "kind": "fact|unsupported|deprecated|unclear|style", "where": "features[1]", "detail": "..." } ], "verdict": "ok|fix|drop" }
  ]
}
```

- `fact`（出典と違う）・`unsupported`（出典に無い）・`deprecated`（廃止の機能を今の物として書いた）→ fix。同じページが 2 回 fix → drop。
- `unclear`（大学生に伝わらない言い方）・`style` だけ → 検証役が fix なら fix（attempts を数えない）、ok なら記録だけ。

## 図の項目（D-。P-015）の検証

答えを見ずに解く段は無い。検証役は context.json（問題・答え・解説）と diagrams.json の図の元、work/&lt;ID&gt;/preview/&lt;問題 ID&gt;.png（描いた絵）を見比べて verify.json を書く。進行役は g・q の代わりに dg verdict を呼ぶ。

```json
{ "item": "D-0001", "diagrams": [ { "id": "q-1.3-0002", "issues": [ { "kind": "fact|unsupported|unreadable|unclear|style", "where": "…", "detail": "…" } ], "verdict": "ok|fix|drop" } ] }
```

- `fact`（問題・解説と食い違う。⚠・✔ の付け所の誤りも）・`unsupported`（問題・解説に無い構成や事実）・`unreadable`（絵で文字や線が重なって読めない）→ fix。同じ図が 2 回 fix → drop。
- `unclear`・`style` だけ → 検証役が fix なら fix（attempts を数えない）、ok なら記録だけ。
- verdict が ok の図に重い種類（fact・unsupported・unreadable）を書くと、dg verdict は判定せずに止まる（P-021）。検証役に直してもらう。
- 図の点検の項目（check: true）も同じ手順。context.json は見直した後の問題なので、今の図がそれと食い違っていないかを見る。合っていれば pass で入れ直し（last_checked が進む）、食い違えば fix で書き直しに回る。
- 同じ verify.json に dg verdict を 2 回呼んでも、2 回目は前の結論を返すだけ（P-019）。
