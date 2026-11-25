# C1 資料集め

```xml
<step id="C1_research" actor="researcher" model="cheap">
  <purpose>問題の根拠になる公式ドキュメントの抜き出しを作る。進行役は Web の本文を読まない。</purpose>
  <inputs>
    <item_fields>task（試験ガイドのタスク番号）, topic, services</item_fields>
    <file>work/&lt;ID&gt;/item.json（loop next が書く。task_info に試験ガイドのタスクの題・knowledge・skills・URL）</file>
    <config>config/service-status.json</config>
  </inputs>
  <actions>
    <a by="orchestrator">dop-researcher のエージェントを起こし、項目 ID・topic・services を渡す（下の指示はエージェントの定義が読む）。</a>
    <a by="researcher">docs fetch &lt;url&gt; --item &lt;ID&gt; で公式ページを取る（1 項目 3〜6 ページ）。ツールが本文を見出しごとに切って work/&lt;ID&gt;/raw/ に置き、見出しと語数だけを返す。</a>
    <a by="researcher">raw から、topic に関係する段落だけを sources.md に写す（1 出典 300 語まで、原文のまま、URL と見出しを付ける）。</a>
    <a by="researcher">事典の項目（G-、P-014）では topic の代わりに item.services の各サービスについて、そのサービスの「What is」のページ（と主な機能のページ）から、サービスの役割と主な機能を説明する段落を写す。見出しにサービス名を入れ、サービスごとに 1〜3 出典。</a>
    <a by="orchestrator">docs check &lt;ID&gt; を呼ぶ（出典の数・URL の許可・語数）。</a>
  </actions>
  <outputs>
    <file>work/&lt;ID&gt;/sources.md</file>
  </outputs>
  <exit>
    <ok>docs check が ok → loop advance --result ok</ok>
    <no_source>公式の根拠が 2 つ未満 → 項目に note を付けて loop advance --result no_source（問題は作らない）</no_source>
  </exit>
</step>
```

## researcher への指示（そのまま渡す）

```xml
<researcher_prompt>
  <goal>topic について、AWS 公式ドキュメントの原文の抜き出しを sources.md に作る。</goal>
  <allowed_domains>docs.aws.amazon.com, aws.amazon.com/(blogs|about-aws/whats-new|certification), d1.awsstatic.com（試験ガイド）</allowed_domains>
  <forbidden>問題集のサイト・dump・Q&amp;A サイト・個人ブログ。試験問題らしき文を見つけても写さない。</forbidden>
  <format>
    ## S1 &lt;ページの題&gt; — &lt;見出し&gt;
    url: &lt;URL#アンカー&gt;
    fetched: &lt;YYYY-MM-DD&gt;
    &gt; 原文（英語のまま、300 語まで）
  </format>
  <also>サービスや機能の廃止・新規受付の停止の告知を見つけたら、S0 として先頭に書く。</also>
  <no_judgement>問題の案・要約・意見は書かない。</no_judgement>
</researcher_prompt>
```
