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
    <a>feedback.json があれば、指摘された問題だけ直す。ほかは触らない。直しで新しい事実を足す時は、先に dop-researcher に根拠を sources.md へ足してもらい（docs check を通す）、その S 番号を references に入れる。根拠の無い事実は足さず、言い回しを外す方で直す（P-007）。</a>
    <a>無ければ下の「書き方」で count 問書き、work/&lt;ID&gt;/questions.json に { "item": "&lt;ID&gt;", "questions": [ … ] } の形で置く。id は q-&lt;task&gt;-0001 から仮に振る（q publish が振り直す）。</a>
    <a>recheck の項目では questions.json に bank の問題が入っている（"recheck": true）。feedback か item.note の指摘の所だけ直し、id は変えない。</a>
    <a>translate の項目（"translate": true）では、bank の問題に日本語版（stem_ja と choices[].text_ja）を足すだけ。英語・答え・解説・出典・選択肢の順は変えない（q validate が bank と比べて止める）。sources.md は要らない。</a>
    <a>q validate を呼ぶ（書くたびに hook でも動く）。ok でなければ直して呼び直す（形の間違いはここで消す）。</a>
  </actions>
  <outputs><file>work/&lt;ID&gt;/questions.json（status は draft）</file></outputs>
  <exit>q validate が ok → loop advance --result ok</exit>
</step>
```

## 書き方

```xml
<authoring_rules>
  <style>
    <r>Professional の形: 2〜5 文の場面（会社・構成・困りごと・制約）＋ 問い。</r>
    <r>問いには必ず条件の語を入れる: "MOST operationally efficient" / "LEAST amount of effort" / "MOST cost-effective" / "with the LEAST downtime" など。条件で正解が 1 つに決まること。</r>
    <r>問題文と選択肢は英語で書き、同じ内容の日本語版を stem_ja と choices[].text_ja に書く（P-012。利用者は本番を日本語で受ける。英語は根拠の原文と照らす元として残す）。解説は日本語。</r>
    <r>1 束のうち 1〜2 問は複数選択（Choose TWO / THREE）にする。</r>
  </style>
  <choices>
    <r>選択肢は 4 つ（複数選択は 5〜6）。どれも AWS で実際に動く構成にする（存在しない機能を誤りの選択肢にしない）。</r>
    <r>誤りの選択肢は「動くが条件に合わない」もの（手作業が多い・止まる時間がある・費用が高い・権限が広すぎる）。</r>
    <r>正解だけ長い・詳しい、にしない（q gate が長さの偏りを見る）。</r>
    <r>正解が問題文の数字・語をそのまま言い換えた形にしない（例: 問題文「10% を 5 分」→ 正解 Canary10Percent5Minutes は見え見え）。数字は誤りの選択肢にも入れるか、問題文では要件を言い換えて書く（P-003）。</r>
    <r>1 問に要件を 3 つ以上入れ（止まる時間・費用・手間・権限・既存の物を変えない など）、どの誤りの選択肢も少なくとも 1 つは満たすようにする（P-006）。1 束に 1 問以上は、2 つ以上のサービスを組み合わせて答える問題にする。</r>
    <r>要件の一部だけを満たす選択肢を 2 つ以上入れる（例: 止まらないが手作業が多い、自動だが一部の通信だけを流せない）。設定名を 1 つ当てるより、構成の組み合わせで答えさせる。</r>
    <r>"All of the above" / "None of the above" は使わない。</r>
  </choices>
  <japanese>
    <r>本番の日本語の試験の書き方に寄せる: 問いは「〜はどれですか。」、複数選択は「（2 つ選択してください。）」。</r>
    <r>サービス名・機能名・API 名・設定値・コードは英語のまま（AWS CodeDeploy、s3:GetObject、CodeDeployDefault.AllAtOnce）。数字と単位も落とさない。</r>
    <r>条件の語を必ず訳す: LEAST operational overhead →「運用上のオーバーヘッドが最も少ない」、MOST cost-effective →「最も費用対効果の高い」、LEAST amount of downtime →「ダウンタイムが最も短い」。</r>
    <r>英語に無い説明を足さない・削らない（訳で答えのヒントが増えたり、要件が消えたりしないように）。正解の訳だけ長くしない。</r>
    <r>q validate が、日本語の有無・条件の語・数字・英語の名前・正解の長さを機械で見る。意味のずれは C3 の検証役が見る。</r>
  </japanese>
  <grounding>
    <r>正解の理由になる事実は、必ず sources.md の S 番号で示す（references に url と 200 字までの原文）。</r>
    <r>sources.md に無い事実を正解の理由にしない。足りなければ問題を減らし、note に書く。</r>
    <r>config/service-status.json で retired / closed_to_new のサービスを正解にしない。</r>
    <r>公式ドキュメントが試験より新しくなっている所（sources.md の S0 や「legacy」「replaced」「recommended」などの記述）は、新旧で答えが変わる問題を作らない。どちらでも正しい所だけを問題にし、問題の note に「試験とずれるかもしれない」点を書く（P-009）。</r>
  </grounding>
  <explanation>
    <r>summary: 正解の理由を 2〜3 文。</r>
    <r>per_choice: 全ての選択肢に、なぜ正しい・なぜ条件に合わないかを 1〜2 文。</r>
  </explanation>
  <originality>本物の試験問題や問題集の文を思い出して書かない。場面は自分で作る。</originality>
</authoring_rules>
```
