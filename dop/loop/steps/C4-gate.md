# C4 関門

AI の判断を使わず、ツールだけで確かめる。AI は結果を見て進めるか戻すかを選ぶだけ。

```xml
<step id="C4_gate" actor="tool">
  <purpose>bank に入れてよいかを機械で確かめ、入れる。</purpose>
  <actions>
    <a>q gate &lt;ID&gt; を呼ぶ（中で下の検査を全部行う）。</a>
    <a>ok なら q publish &lt;ID&gt; を呼ぶ（もう一度検査してから bank/ へ入れ、status を verified にする）。</a>
    <a>ok でなければ、ツールが作った feedback.json を確かめずにそのまま C2 へ戻す。</a>
  </actions>
  <exit>
    <pass>q publish が ok → loop advance --result pass</pass>
    <fail>loop advance --result fail</fail>
  </exit>
</step>
```

事典の項目（G-、P-014）では q gate / q publish の代わりに g gate / g publish を呼ぶ（形・根拠の原文・検証が ok・同じ名前が別のページに無い、を見て glossary/services/ に入れる）。

図の項目（D-、P-015）では dg gate / dg publish（形・検証が ok・描けること を見て、diagrams/ に図の元、app/public/diagrams/ に絵を入れる）。

## q gate の検査

```json
[
  { "id": "schema",     "rule": "schemas/question.schema.json に合う" },
  { "id": "verified",   "rule": "全問 q verdict で ok、かつ verdict の後に questions.json を書き換えていない" },
  { "id": "refs",       "rule": "references の url が許可したドメイン、quote が sources.md に原文のまま有る。HTTP 200 の確認は --net を付けた時と、週 1 の q linkcheck" },
  { "id": "dedupe",     "rule": "bank の問題・束の中の他の問題と、問題文＋正解の 3-gram（英単語）の Jaccard が 0.6 未満" },
  { "id": "len_bias",   "rule": "正解の選択肢が、他の平均の 1.5 倍より長くない（P-010 で q validate でも見る）" },
  { "id": "pos_bias",   "rule": "bank 全体で正解の位置（A〜D）がそれぞれ 15〜35%（偏る時は q publish が選択肢を並べ替える）" },
  { "id": "status",     "rule": "正解の選択肢に config/service-status.json の retired / closed_to_new のサービス（verified: true の物だけ）が出ない" },
  { "id": "banned",     "rule": "All of the above / None of the above が無い" },
  { "id": "explain",    "rule": "per_choice が全選択肢にある" }
]
```
