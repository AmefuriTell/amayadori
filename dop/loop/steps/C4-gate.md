# C4 関門

AI の判断を使わず、ツールだけで確かめる。AI は結果を見て進めるか戻すかを選ぶだけ。

```xml
<step id="C4_gate" actor="tool">
  <purpose>bank に入れてよいかを機械で確かめ、入れる。</purpose>
  <actions>
    <a>q:gate work/&lt;ID&gt; を呼ぶ（中で下の検査を全部行う）。</a>
    <a>ok なら q:publish work/&lt;ID&gt; を呼ぶ（bank/ へ移し status を verified にする）。</a>
    <a>ok でなければ、ツールが作った feedback.json を確かめずにそのまま C2 へ戻す。</a>
  </actions>
  <exit>
    <pass>q:publish が ok → loop advance --result pass</pass>
    <fail>loop advance --result fail</fail>
  </exit>
</step>
```

## q:gate の検査

```json
[
  { "id": "schema",     "rule": "schemas/question.schema.json に合う" },
  { "id": "verified",   "rule": "全問 verify.json で ok" },
  { "id": "refs",       "rule": "references の url が許可したドメイン、かつ HTTP 200（q:linkcheck）。quote が sources.md に原文のまま有る" },
  { "id": "dedupe",     "rule": "bank の問題と、問題文＋正解の 3-gram の Jaccard が 0.6 未満" },
  { "id": "len_bias",   "rule": "正解の選択肢が、他の平均の 1.5 倍より長くない" },
  { "id": "pos_bias",   "rule": "bank 全体で正解の位置（A〜D）がそれぞれ 15〜35%（偏る時は q:publish が選択肢を並べ替える）" },
  { "id": "status",     "rule": "正解・解説の文に config/service-status.json の retired / closed_to_new のサービスが正解として出ない" },
  { "id": "banned",     "rule": "All of the above / None of the above が無い" },
  { "id": "explain",    "rule": "per_choice が全選択肢にある" }
]
```
