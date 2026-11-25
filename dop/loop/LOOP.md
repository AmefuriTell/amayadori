# ループ全体

AI はこのファイルと、今いる工程の 1 枚（`steps/<id>.md`）だけを読む。ほかは必要になった時にツールの出力が場所を示す。

## 1. 形

1 回のループ = 作業の一覧（backlog）から 1 項目を取り、その種類の工程を通して閉じる。

```
            ┌──────────── S0 選ぶ（ツールが決める） ────────────┐
            │                    │                    │          │
         content               app                 learn      空 → 止まる
            │                    │                    │
   C1 資料集め（安いモデル）  A1 仕様               L1 苦手の分析（ツール）
            │                    │                    │
   C2 問題を書く             A2 作る                  │
            │                    │                    │
   C3 検証（別の AI、答えを見ずに解く）  A3 確かめる（ツール）   │
            │                    │                    │
   C4 関門（ツールだけ）          │                    │
            └──────────── S9 閉じる（記録・振り返り） ──┘
                                 │
                                 └→ S0 へ
```

- **content**: 問題を 1 束（既定 5 問）作る。
- **app**: Web アプリの機能を 1 つ作る・直す。
- **learn**: 自分の解答の記録から苦手な範囲を出し、content の項目を足す（外側のループ）。

## 2. 状態の移り方（ツール `loop` がこの通りに動かす）

```json
{
  "states": {
    "S0_pick":      { "doc": "steps/S0-pick.md",      "actor": "tool",         "next": { "content": "C1_research", "recheck": "C1_research", "translate": "C2_author", "app": "A1_spec", "learn": "L1_learn", "empty": "STOP" } },
    "C1_research":  { "doc": "steps/C1-research.md",  "actor": "researcher",   "next": { "ok": "C2_author", "no_source": "S9_close" } },
    "C2_author":    { "doc": "steps/C2-author.md",    "actor": "author",       "next": { "ok": "C3_verify" } },
    "C3_verify":    { "doc": "steps/C3-verify.md",    "actor": "verifier",     "next": { "pass": "C4_gate", "fix": "C2_author", "drop": "S9_close" } },
    "C4_gate":      { "doc": "steps/C4-gate.md",      "actor": "tool",         "next": { "pass": "S9_close", "fail": "C2_author" } },
    "A1_spec":      { "doc": "steps/A1-spec.md",      "actor": "orchestrator", "next": { "ok": "A2_build", "need_human": "HUMAN" } },
    "A2_build":     { "doc": "steps/A2-build.md",     "actor": "builder",      "next": { "ok": "A3_check" } },
    "A3_check":     { "doc": "steps/A3-check.md",     "actor": "tool",         "next": { "pass": "S9_close", "fail": "A2_build" } },
    "L1_learn":     { "doc": "steps/L1-learn.md",     "actor": "tool",         "next": { "ok": "S9_close" } },
    "S9_close":     { "doc": "steps/S9-close.md",     "actor": "orchestrator", "next": { "ok": "S0_pick" } }
  },
  "limits": {
    "max_attempts_per_item": 3,
    "max_items_per_session": 5,
    "on_limit": "項目を blocked にして S9 → S0（人に回す）"
  }
}
```

- 移るのは `loop advance --result <key>`（S0 は `loop next`、S9 は `loop close`）だけ。AI が状態のファイルを直接書き換えない。
- C1〜C4・A3・L1 の結果は、ツールが `work/<ID>/result.json` に札を書き、advance はその札と照らす（ツールを通らずに進めない）。
- この表は `tools/loop.mjs` がそのまま読む。表を変えるとツールの動きも変わる。
- `fix` / `fail` で戻るたびに attempts が 1 増える。上限で blocked。

## 3. 役割

```xml
<roles>
  <role id="orchestrator" model="main">ループを回す。工程の文書を読み、ツールを呼び、下の役を起こす。問題の中身は書かない。</role>
  <role id="researcher" model="cheap (haiku)">公式ドキュメントから根拠の抜き出しを作る。判断はしない。Web の本文を進行役の文脈に入れないための役。</role>
  <role id="author" model="main or sonnet">根拠の抜き出しだけを見て問題を書く。</role>
  <role id="verifier" model="author と別の新しい文脈">答えを見ずに解き、そのあと根拠と照らす。author の考えた過程は渡さない（引きずられないため）。</role>
  <role id="builder" model="main or sonnet">アプリのコードを書く。</role>
  <role id="human" model="-">人の関門（6 章）で判断する。</role>
</roles>
```

## 4. 文脈の決まり（AI に見せないもの）

```xml
<context_rules>
  <read>loop/LOOP.md、今の工程の steps/*.md、ツールの出力（要約の JSON）、work/&lt;項目 ID&gt;/ の中</read>
  <do_not_read reason="量が多い。ツールが要約する">
    <path>bank/**（公開済みの問題の全部）→ q:find / q:coverage / q:dedupe で聞く</path>
    <path>Web のドキュメントの本文 → researcher が work/&lt;ID&gt;/sources.md に抜き出す</path>
    <path>試験・ビルドのログの全文 → ツールが失敗した所だけ返す。全文は .loop/reports/ にあり、失敗の原因が分からない時だけ読む</path>
    <path>tools/** の中身 → tools.md の入出力だけ見る</path>
    <path>.loop/state.json・.loop/backlog.json → loop status で聞く</path>
  </do_not_read>
  <tool_output_contract>1 回の出力は JSON で 30 行まで: { "ok": bool, "summary": "1 行", "items": [...最大 10], "details_path": "..." }</tool_output_contract>
</context_rules>
```

## 5. 置き場所

```
dop/
  loop/            ループの文書（この階層）
  tools/           ツール（Node 22、依存は最小）
  schemas/         JSON Schema
  config/          試験の範囲と割合・サービスの状態（廃止など）
  work/<項目ID>/   作業中の束（sources.md, questions.json, verify.json）。閉じたら消す
  bank/            公開済みの問題（1 問 1 ファイル）。AI は直接読まない
  app/             Web アプリ
  .loop/           状態・記録・報告（state.json, backlog.json, runs.jsonl, reports/）
```

## 6. 人の関門

```xml
<human_gates>
  <gate id="H1" when="AWS にお金がかかる操作（デプロイ・リソース作成・料金の設定の変更）">必ず止まって承認を取る。自動では進めない。</gate>
  <gate id="H2" when="（なし）">人は事前に問題を読まない（Q6 で決めた）。代わりに下の 3 つで誤りを拾う。
    <r>アプリの解説に出典の原文（references.quote）とリンクを必ず出し、解きながら自分で確かめられるようにする。</r>
    <r>C3 で confidence が low だった問題は「AI の確信が低い」印を付けて出す。</r>
    <r>「誤りを報告」（A-0006）を早めに作り、報告は L1 で recheck の項目になる。</r>
  </gate>
  <gate id="H3" when="項目が blocked になった">理由と選べる案を書いて人に回す。</gate>
  <gate id="H4" when="A1 で仕様に選択肢が残った">案を 2〜3 個にまとめて人に聞く。</gate>
</human_gates>
```

## 7. 止まる条件

- backlog が空、または 1 回の実行で `max_items_per_session` を閉じた。
- 人の関門に当たった。
- 同じ工程で同じ失敗が 2 回続いた（ツールが `"repeat": true` を返す）。直し方を変えずに 3 回目をしない。`loop block --reason "…"` で人に回す。
- 人に「止めて」と言われた → `loop pause`（Stop の hook は、ループの途中では止まらせないため）。

## 8. 毎回のはじめ方（AI への指示）

```xml
<bootstrap>
  <step>node dop/tools/loop.mjs start を呼ぶ（この回の数を 0 に戻し、続きの state を返す）</step>
  <step>出力の state に対応する steps/*.md を 1 枚読む</step>
  <step>その文書の actions を順に行い、最後に loop advance --result &lt;key&gt; を呼ぶ（S0 は loop next、S9 は loop close）</step>
  <step>出力の次の state で 2 に戻る。止まる条件なら、何をしたか 3 行で報告して終える</step>
</bootstrap>
```
