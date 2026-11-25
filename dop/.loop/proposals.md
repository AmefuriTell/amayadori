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

<proposal id="P-003" from="C-0017" status="open">
  <issue>検証役が 5 問とも確信度 high で正解した。正解の選択肢が問題文の数字や語をそのまま言い換えていて（例: 「10% を 5 分」→ Canary10Percent5Minutes）、本番の Professional より易しい可能性がある</issue>
  <kind>doc + tool</kind>
  <change>C2 の書き方に「問題文の数字・語を正解だけがそのまま持たない。要件の一部だけを満たす選択肢を 2 つ以上入れる。設定名だけでなく構成の組み合わせで答えさせる」を足す。q gate に、問題文と正解・誤りの選択肢の語の重なりの差を見る検査（giveaway）を足す</change>
</proposal>

<proposal id="P-004" from="C-0017" status="open">
  <issue>検証役は答えを見ずに解く時に sources.md を見られるので、根拠を探せば解けてしまい、「問題として答えが割れないか」の確かめが弱い</issue>
  <kind>doc + tool</kind>
  <change>1 周目は sources.md も見ずに自分の知識だけで解き（q blind の後、sources.md は reveal の後に読む）、確信度を出す。全問 high が続く束は「易しすぎ」として人に知らせる</change>
</proposal>
```
