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
    <a>事典の項目（G-、P-014）では問題ではなく、下の「事典の書き方」で item.services の各サービスの 1 ページを work/&lt;ID&gt;/glossary.json に { "item", "entries": [ … ] } の形で書き、q validate の代わりに g validate を呼ぶ。</a>
    <a>図の項目（D-、P-015）では、work/&lt;ID&gt;/context.json（問題・答え・解説）だけを読み、下の「図の書き方」で 1 問 1 枚を work/&lt;ID&gt;/diagrams.json に書き、q validate の代わりに dg validate を呼ぶ（描いた絵は work/&lt;ID&gt;/preview/ に出る。1 枚は自分の目で見る）。</a>
    <a>図の点検の項目（item.json の check: true。問題を見直した後に loop close が足す）では、diagrams.json に今の図が写してある。初めは書き直さず dg validate だけ呼び、C3 の点検に回す。validate が落ちた所と、C3 から fix で戻った図だけを書き直す。</a>
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

## 事典の書き方（G- の項目。P-014）

```xml
<glossary_rules>
  <r>1 サービス 1 ページ。形は schemas/glossary.schema.json。id はファイル名（例 codedeploy）。aliases に item.services の名前と name を入れる。</r>
  <r>読む人は大学生。summary は「何をするサービスか」を日本語 1〜2 文で、専門用語には言い換えを添える。</r>
  <r>features は 2〜6 個、exam_points は 1〜4 個、compare（似たサービスとの違い）は 0〜3 個。どれも sources.md の S 番号を source_id に付け、その出典に書いてある事だけを書く。</r>
  <r>exam_points は DOP-C02 の試験ガイドのタスクに関係する使い方（自動化・監視・復旧・権限など）を選ぶ。本物の試験問題や問題集の文を思い出して書かない。</r>
  <r>references に使った S 番号ごとに url と 200 字までの原文（quote）を写す。</r>
  <r>config/service-status.json で retired / closed_to_new のサービスは、その事を summary に書く。</r>
</glossary_rules>
```

## 図の書き方（D- の項目。P-015）

```xml
<diagram_rules>
  <r>目的: 大学生が「何を作ろうとしているか」と「選択肢がどこで問題になるか」を 1 枚で分かる。答えた後に出す図なので、正解を示してよい。</r>
  <r>形: { "id": "&lt;問題 ID&gt;", "source": "&lt;Mermaid&gt;", "alt": "&lt;図の説明。日本語 20 字以上。読み上げと画像が出ない時に使う&gt;" }。source は flowchart TB（スマホの縦の画面）で始める。</r>
  <r>サービスの箱は X@{ svc: "&lt;問題の services の名前&gt;", label: "&lt;短い役割&gt;" } と書く。道具が公式のアイコンを付け、押すと事典が開く。人・外のシステムは普通の箱 X["…"]。リージョン・アカウント・VPC・AZ は subgraph で囲む。</r>
  <r>線には何が流れるかを短く書く（"成果物" "イベント" "ログ" など）。選択肢の問題点は、その場所の線か箱に「⚠ A: …」、正解は「✔ C: …」と書く（全選択肢でなくてよい。大事な 2〜3 個）。</r>
  <r>context.json の問題文・選択肢・解説に無い構成や事実を足さない（図は解説を絵にする物で、新しい知識の置き場ではない）。</r>
  <r>1 枚の箱は 8 個まで。重なって読めない時は箱を減らすか分ける。dg validate が次を落とす（P-022。幅は全角 1・半角 0.5）: 線のラベルが 20 字を超える（説明は箱のラベルへ `&lt;br/&gt;` で入れ、線には「✔ A」など短い印）、同じ 2 つの箱の間にラベル付きの線が 2 本以上（行きと帰りは 1 本にまとめる）、subgraph の題が 14 字を超える（短くするか枠をやめる）。</r>
  <r>⚠ は、その選択肢が使う物・変える物を指す。正解の ✔ の箱を指すと正解の欠点に見える。問題・解説に無い物（サービス・構成・説明の文）は描かない。</r>
  <r>アイコンの無いサービス（config/icon-map.json に無い物）は、svc の箱のままラベルの頭にサービス名を書く（例 X@{ svc: "Amazon Athena", label: "Amazon Athena&lt;br/&gt;クエリ" }）。名前が無いと何の箱か分からない。</r>
</diagram_rules>
```

## 講義の項目（K-）の書き方

work/&lt;ID&gt;/sources.md と item.json の task_info だけを読み、work/&lt;ID&gt;/lecture.json を書いて lec validate を呼ぶ。試作（work/_lecture-sample/ の task 1.4）で、利用者と 2 人の検証役から受けた指摘を決まりにした物。

```xml
<lecture_rules>
  <r>形: { task, title, slides: [ { id: "s01"…, title, bullets: [3 個まで], visual, narration, refs: [ { source_id, quote, url } ] } ] }。12〜16 枚、台本の合計 3,000〜5,000 字（1 分 350 字で 10〜14 分）。</r>
  <r>根拠は sources.md だけ。図・表・bullets も含め、根拠に無い事実は書かない。根拠に「例」として挙がっている物を「これだけ」と言い切らない。ある条件の話（例: Beanstalk の in-place）を一般の話として書かない。</r>
  <r>構成: 1 枚目で講義の地図（何をどの順に扱うか）を示し、まとめで同じ地図に戻る。予告した事は本文で必ず扱う。最後から 2 枚目に「問題文に出る条件 → 選ぶ方法・確かめる所」の表を置く（問題集への橋）。</r>
  <r>用語は初めて出る所で一言説明してから使う（例: canary、task set、lifecycle hook）。同じ物の呼び方と表記は全スライドでそろえる（英語は AWS の表記どおり。「既定」は default の意味だけ）。根拠に無い独自の分類の軸を立てない（試験ガイドの task の knowledge・skills にある観点は軸にしてよい。中身の事実は sources.md から）。</r>
  <r>画面: bullets はキーワード中心で 1 個 20 字くらい。既定値・API 名・数字などの細部は台本で読み上げず、画面の表（compare）に置く。各スライドに visual を 1 つ（mermaid の構成図・compare の表・steps の手順）。mermaid は 6 枚以上。図は言いたい事の形にする（比べるなら左右、流れなら矢印、分かれ道は手順に混ぜない）。</r>
  <r>図の決まりは構成図と同じ（線のラベル 15 字・箱 7 個・題 12 字・同じ 2 つの箱の間の線は 1 本・svc は icon-map の名前）。図の中の物は台本で説明する。</r>
  <r>台本: 音声合成で読む。英語の名前は読みのカタカナで書く（コードデプロイ、イーシーツー）。英字・数字・記号・括弧は使わない。話し言葉の「です・ます」で 1 文を短く。同じ事を何度も言わない。</r>
  <r>refs の quote は sources.md の原文の写し（200 字まで）。各スライドに 1 つ以上。</r>
  <r>C3 から戻った時は feedback.json の重・中の指摘を全部直す。根拠に無い事実が要る提案は採らず、その理由を feedback への返事として lecture.json の notes に書く。</r>
</lecture_rules>
```

