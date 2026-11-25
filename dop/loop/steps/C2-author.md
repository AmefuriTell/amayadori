# C2 問題を書く

```xml
<step id="C2_author" actor="author">
  <purpose>sources.md だけを根拠に、試験の形の問題を count 問書く。</purpose>
  <inputs>
    <file>work/&lt;ID&gt;/sources.md</file>
    <file optional="yes">work/&lt;ID&gt;/feedback.json（C3・C4 から戻った時の指摘）</file>
    <schema>schemas/question.schema.json（形はツールが確かめるので、項目名だけ見ればよい）</schema>
  </inputs>
  <actions>
    <a>feedback.json があれば、指摘された問題だけ直す。ほかは触らない。</a>
    <a>無ければ下の「書き方」で count 問書き、work/&lt;ID&gt;/questions.json に置く。</a>
    <a>q:validate を呼ぶ。ok でなければ直して呼び直す（形の間違いはここで消す）。</a>
  </actions>
  <outputs><file>work/&lt;ID&gt;/questions.json（status は draft）</file></outputs>
  <exit>q:validate が ok → loop advance --result ok</exit>
</step>
```

## 書き方

```xml
<authoring_rules>
  <style>
    <r>Professional の形: 2〜5 文の場面（会社・構成・困りごと・制約）＋ 問い。</r>
    <r>問いには必ず条件の語を入れる: "MOST operationally efficient" / "LEAST amount of effort" / "MOST cost-effective" / "with the LEAST downtime" など。条件で正解が 1 つに決まること。</r>
    <r>問題文と選択肢は英語（本番と同じ）。解説は日本語。</r>
    <r>1 束のうち 1〜2 問は複数選択（Choose TWO / THREE）にする。</r>
  </style>
  <choices>
    <r>選択肢は 4 つ（複数選択は 5〜6）。どれも AWS で実際に動く構成にする（存在しない機能を誤りの選択肢にしない）。</r>
    <r>誤りの選択肢は「動くが条件に合わない」もの（手作業が多い・止まる時間がある・費用が高い・権限が広すぎる）。</r>
    <r>正解だけ長い・詳しい、にしない（q:lint が長さの偏りを見る）。</r>
    <r>"All of the above" / "None of the above" は使わない。</r>
  </choices>
  <grounding>
    <r>正解の理由になる事実は、必ず sources.md の S 番号で示す（references に url と 200 字までの原文）。</r>
    <r>sources.md に無い事実を正解の理由にしない。足りなければ問題を減らし、note に書く。</r>
    <r>config/service-status.json で retired / closed_to_new のサービスを正解にしない。</r>
  </grounding>
  <explanation>
    <r>summary: 正解の理由を 2〜3 文。</r>
    <r>per_choice: 全ての選択肢に、なぜ正しい・なぜ条件に合わないかを 1〜2 文。</r>
  </explanation>
  <originality>本物の試験問題や問題集の文を思い出して書かない。場面は自分で作る。</originality>
</authoring_rules>
```
