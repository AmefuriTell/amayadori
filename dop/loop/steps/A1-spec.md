# A1 仕様

```xml
<step id="A1_spec" actor="orchestrator">
  <purpose>app の項目を、確かめられる受け入れ条件に落とす。</purpose>
  <inputs>
    <item_fields>id, title, why（人の言葉）, depends_on</item_fields>
    <file>app/SPEC.md（今の画面と決まりの要約。無ければ作る）</file>
  </inputs>
  <actions>
    <a>work/&lt;ID&gt;/spec.json を書く（下の形）。acceptance は全部、ツールか e2e で確かめられる文にする。</a>
    <a>選び方が 2 つ以上あり、人の好みで決まるものは options に入れる。</a>
    <a>AWS のリソースを作る・変えるなら aws_change: true。</a>
  </actions>
  <exit>
    <ok>options が空、かつ aws_change が false → loop advance --result ok</ok>
    <need_human>そうでなければ loop advance --result need_human（人の関門 H1 / H4）</need_human>
  </exit>
</step>
```

## spec.json の形

```json
{
  "item": "A-0003",
  "goal": "1 問ずつ解き、答えた直後に正誤と解説と出典の原文を出す",
  "acceptance": [
    { "id": "AC1", "check": "e2e", "text": "選択肢を選んで「答える」を押すと、正誤と per_choice の解説が出る" },
    { "id": "AC2", "check": "unit", "text": "複数選択は select_count 個そろうまで「答える」を押せない" },
    { "id": "AC3", "check": "e2e", "text": "幅 375px で横に溢れない" }
  ],
  "out_of_scope": ["ログイン", "端末をまたいだ記録"],
  "options": [],
  "aws_change": false
}
```

## 最初の app 項目（backlog の初期値の案）

```json
[
  { "id": "A-0001", "title": "解く画面の最小版（1 問ずつ・正誤・解説・出典リンク）", "priority": 1, "depends_on": [] },
  { "id": "A-0002", "title": "解いた記録を端末に残す（localStorage）と、ドメイン別の正答率", "priority": 2, "depends_on": ["A-0001"] },
  { "id": "A-0003", "title": "模試モード（75 問・180 分・ドメインの割合どおりに出す）", "priority": 3, "depends_on": ["A-0001"] },
  { "id": "A-0004", "title": "間違えた問題だけ解き直す", "priority": 3, "depends_on": ["A-0002"] },
  { "id": "A-0005", "title": "記録の書き出し（L1 の入力）", "priority": 3, "depends_on": ["A-0002"] },
  { "id": "A-0006", "title": "問題ごとの「誤りを報告」（端末に残し、記録の書き出しに入れる）", "priority": 2, "depends_on": ["A-0001"] }
]
```

## リファクタリングの項目（F-。P-016）の仕様

item.findings（refactor.mjs scan が見つけた直す所）を、振る舞いを変えずに直す計画にする。spec.json の形:

```json
{
  "item": "F-0001",
  "goal": "g.mjs と dg.mjs の、検証の結論を出す処理の写しを 1 つにまとめる",
  "findings": ["dup:tools/dg.mjs|tools/g.mjs"],
  "plan": ["tools/lib/verdict.mjs に共通の関数を作り、g・dg・q から使う"],
  "invariants": ["ツールの出力（JSON）と札の書き方は変えない", "試験のファイルは変えない"],
  "allow_test_changes": []
}
```

- findings の周り（同じ写しの別の所・同じ役の関数）も一緒に見て、まとめられる物はまとめる。測った物だけを機械的に割らない。
- 試験を変えないと直せない時だけ allow_test_changes にファイルと理由を書く（例: 試験が内部の関数を直接読んでいて、その関数の置き場所を移す）。試験の中身（確かめる事）は変えない。
- options・aws_change は無い。書けたら loop advance --result ok。
