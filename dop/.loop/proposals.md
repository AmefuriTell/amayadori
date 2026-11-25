# ループの改善案

S9 で書く。人が採否を決める（loop/steps/S9-close.md）。

## 試しの 1 束（C-0017、2026-11-25）から

```xml
<proposal id="P-001" from="C-0017" status="adopted">
  <issue>sources.md の「原文」が本当に原文のままかを確かめる仕組みが無かった。researcher は表の行を「名前: 説明」の形に写し、別の所の文をつないだ段落もあった（中身は正しかった）</issue>
  <kind>tool</kind>
  <change>docs check が、原文の控え（work/&lt;ID&gt;/raw/*.md）と 1 文ずつ照らす（英数字だけで比べるので表の写し方の違いは通す）。控えが無ければ落とす</change>
</proposal>

<proposal id="P-002" from="C-0017" status="adopted">
  <issue>researcher が URL を推測で作り、無いページ（404、または meta refresh でサービスの先頭へ飛ばされる 200）を docs fetch が成功として保存していた</issue>
  <kind>tool</kind>
  <change>docs fetch が 200 以外・meta refresh・本文 50 語未満を失敗にする。取れたページの本文の中のリンクを raw/*.links.txt に残し、次のページはそこから選ぶ</change>
</proposal>

<proposal id="P-003" from="C-0017" status="adopted-doc-only">
  <issue>検証役が 5 問とも確信度 high で正解した。正解の選択肢が問題文の数字や語をそのまま言い換えていて（例: 「10% を 5 分」→ Canary10Percent5Minutes）、本番の Professional より易しい可能性がある</issue>
  <kind>doc + tool</kind>
  <change>C2 の書き方に「問題文の数字・語を正解だけがそのまま持たない。要件の一部だけを満たす選択肢を 2 つ以上入れる。設定名だけでなく構成の組み合わせで答えさせる」を足す。q gate に、問題文と正解・誤りの選択肢の語の重なりの差を見る検査（giveaway）を足す</change>
</proposal>

<proposal id="P-004" from="C-0017" status="adopted">
  <issue>検証役は答えを見ずに解く時に sources.md を見られるので、根拠を探せば解けてしまい、「問題として答えが割れないか」の確かめが弱い</issue>
  <kind>doc + tool</kind>
  <change>1 周目は sources.md も見ずに自分の知識だけで解き（q blind の後、sources.md は reveal の後に読む）、確信度を出す。全問 high が続く束は「易しすぎ」として人に知らせる</change>
</proposal>
```

- P-003 は書き方（C2）だけ採った。語の重なりで見え見えを見つける検査は、試しの 5 問で効かなかった（誤りの選択肢にも同じ数字が入っており、見え見えなのは意味の上だった）ので入れていない。
- P-004 は採った。検証役は出典を見ずに解き、q verdict が全問 high の束に too_easy を付ける。

## C-0001（2026-11-25）から

```xml
<proposal id="P-005" from="C-0001" status="adopted">
  <issue>検証役が「事実として正しいが sources.md に無い補足」を style で書くと、q verdict が fix にして C2 へ戻す。直す中身が無いのに 1 往復増える</issue>
  <kind>tool + doc</kind>
  <change>検証役が verdict を ok にした問題の style は、記録だけにして戻さない（giveaway は今のまま戻す）。C3 の判定の決まりも合わせる</change>
</proposal>

<proposal id="P-006" from="C-0017,C-0001" status="adopted">
  <issue>P-003 の書き方にした C-0001 でも、検証役は 3 問とも確信度 high で正解した（too_easy が 2 束続いた）。出典なしで解いても易しい</issue>
  <kind>doc</kind>
  <change>Professional の難しさに寄せる案: 1 問に要件を 3 つ以上（止まる時間・費用・手間・権限など）入れ、どの誤りの選択肢も少なくとも 1 つは満たす。2 つのサービスを組み合わせる問題を 1 束に 1 問以上</change>
</proposal>
```

```xml
<proposal id="P-007" from="C-0001" status="adopted">
  <issue>直した後の検証役が、前の検証役の求めた直し（「これから push する分だけ」）を「sources.md に無い」として fix にし、問題が drop になった（q-1.1-0002）。検証役どうしの判断が食い違う</issue>
  <kind>doc</kind>
  <change>fix で足す事実は、C2 で researcher に根拠を sources.md へ足してもらってから書く（根拠なしに足さない）。検証役には、前の回の指摘（feedback.json）だけを渡し、その直しが根拠に基づくかを見てもらう</change>
</proposal>
```

## 1 回目の実行の後（2026-11-25）

- 利用者が P-005〜P-008 を採った。利用者が寝ている間は、判断が要る時に推奨の案で進めてよいと言われた（2026-11-25）。

```xml
<proposal id="P-008" from="C-0017,C-0001,C-0006" status="adopted">
  <issue>too_easy が 3 束続いた。ただし検証役の AI は AWS に詳しく、人に難しい問題でも確信度 high になりうる。AI の確信度は人の難しさの目安として弱い</issue>
  <kind>doc</kind>
  <change>too_easy は記録だけにし、書き方を変える理由にしない。難しさは利用者の正答率（L1）で見る</change>
</proposal>
```

## C-0074（2026-11-25）から

```xml
<proposal id="P-009" from="C-0074" status="adopted">
  <issue>公式ドキュメントが試験より新しくなっている所がある（Security Hub CSPM の central configuration がレガシーになり、declarative policies に置き換わった）。試験（DOP-C02）が古い形のまま出題する可能性がある</issue>
  <kind>doc + app</kind>
  <change>こうした問題には note に「試験とずれるかもしれない」を書き（q-6.2-0002 で実施）、アプリで印を出す。新旧で答えが変わる問題は作らない（C-0074 ではそうした）。決まりとして C2 に足すかは人が決める</change>
</proposal>
```

- C-0063（2026-11-25）: EventBridge のドキュメントにも新しい API（Custom Event Bus と Classic、CreateSubscriber、PutRawEvents、JSONata の変換、既定の再試行 5 回・300 秒）が出ていた。従来のルールの既定の再試行とは違う可能性があり、試験とずれるので、P-009 に沿って新旧で答えが変わる所（S5・S7）は問題にしなかった。

```xml
<proposal id="P-010" from="C-0065,C-0007" status="adopted">
  <issue>正解の長さの偏り（len_bias）と All/None of the above は C4 の関門でしか見ておらず、落ちると検証（C3）を 1 往復やり直していた（C-0065 で 2 回）</issue>
  <kind>tool</kind>
  <change>q validate（書くたびの hook）でも同じ検査をする。利用者の不在中に、任された判断として入れた</change>
</proposal>
```

```xml
<proposal id="P-011" from="C-0019" status="adopted">
  <issue>検証役が答えを見ずに解いて外した（q-2.1-0004）。reveal の後に根拠で正解が 1 組に決まると確かめ、事実の誤りも無かったが、決まりでは外れは必ず fix で、2 回で drop になる。難しい良い問題ほど捨てられる</issue>
  <kind>tool + doc</kind>
  <change>外れても、検証役が ok にし重い指摘が無ければ ok にして「AI の確信が低い」の印を付ける。利用者の不在中に、任された判断として入れた（ループを pause してから文書を変えた）</change>
</proposal>
```

- P-009 を利用者が採った（2026-11-26）。C2 の書き方に足し、アプリで note の印を出す項目（A-0007）を足した。

## 利用者の指摘（2026-11-26）から

```xml
<proposal id="P-012" from="user" status="adopted">
  <issue>問題文と選択肢が英語だけだった。利用者は本番を日本語で受ける（利用者の回答）。英語にしたのはこちらの判断で、確かめていなかった</issue>
  <kind>tool + doc + app</kind>
  <change>問題に stem_ja・choices[].text_ja を足す。英語は根拠と照らす元として残す。q validate が日本語の有無・条件の語・数字・英語の名前・正解の長さを見る。C3 は日本語版で答えを見ずに解き、reveal で英語と照らして kind: translation を書く。今の bank は訳の項目（T-、loop seed --translate、10 問ずつ）で日本語を足す（英語を変えさせない。答えの位置も変えない）。アプリは日本語を先に出し、英語に切り替えられるようにする（A-0008）。利用者が方向を選び、推奨の形で入れた</change>
</proposal>
```

```xml
<proposal id="P-013" from="A-0012" status="adopted">
  <issue>アプリに「分からない」（無回答の不正解）を足した。これを L1 の「誤りが疑わしい問題」（正答率 20% 未満）に数えると、知らないだけの問題が見直しに回る</issue>
  <kind>tool + doc</kind>
  <change>learn weak は「分からない」を苦手のタスクの判定には数え、誤りが疑わしい問題の判定には数えない。利用者の依頼（分からないボタン）に伴う細部として入れた（ループの実行中はツールだけ直し、pause してから L1 の文書を直した）</change>
</proposal>
```

## 利用者の依頼（2026-11-26）から

```xml
<proposal id="P-014" from="user" status="adopted">
  <issue>解説が足りない。構成図と、各サービスが何をするかを参照できるようにしたい。共通の部分は別のファイルにし、個別から参照したい（利用者）。進め方は「サービス事典だけ先に」（利用者の回答）</issue>
  <kind>tool + doc + app</kind>
  <change>サービス事典 glossary/services/&lt;id&gt;.json（1 サービス 1 ページ、schemas/glossary.schema.json）を作る。問題の services の名前から aliases で引く。作り方は問題と同じ C1〜C4（事典の項目 G-、loop seed --glossary で 5 サービスずつ）で、C2〜C4 は g validate / verdict / gate / publish。検証役は各文を sources.md と照らす。アプリでの表示は別の app の項目。構成図はその後</change>
</proposal>
```

```xml
<proposal id="P-015" from="user" status="adopted">
  <issue>文字だけの解説には限界がある。draw.io のような描画で構成図を作れないか（利用者）。方法は Mermaid（利用者の回答）</issue>
  <kind>tool + doc + app</kind>
  <change>問題ごとの図の元 diagrams/&lt;問題 ID&gt;.json（Mermaid の flowchart。サービスは X@{ svc: "…" } と名前で書く）を、dg.mjs がこの環境のブラウザで SVG にし app/public/diagrams/ に置く。アイコンは AWS 公式のアイコン集（aws.amazon.com/architecture/icons。構成図に使うことが認められている）から config/icon-map.json の分だけ assets/aws-icons/ に写す（共通）。図の箱を押すと事典（共通）を開く。作り方はループの図の項目（D-）: C2 で描き、C3 で検証役が問題・解説と絵を照らし、C4 で描けることを確かめて入れる。まず 3 問で試作してアプリで見てもらう</change>
</proposal>
```
