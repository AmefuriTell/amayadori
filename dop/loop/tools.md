# ツール

AI が読まなくてよい作業は全部ここに入れる。AI はこの表の「入力」と「出力」だけ知っていればよい。
中身（`dop/tools/*.mjs`）は読まない。

## 共通の約束

```xml
<tool_contract>
  <call>node dop/tools/&lt;loop|q|docs&gt;.mjs &lt;cmd&gt; [args]（リポジトリの根から。dop/ の中なら npm run loop -- &lt;cmd&gt; でもよい）</call>
  <stdout>JSON 1 つ、30 行まで: { "ok": bool, "summary": "1 行", …, "items": [ 最大 10 件 ], "more": 残りの数, "details_path": "…", "repeat": bool }</stdout>
  <details>全文・ログ・一覧は details_path（.loop/reports/ の下）に書く。AI は ok=false で原因が summary と items で分からない時だけ読む。</details>
  <exit_code>0 = ok、1 = 検査で落ちた、2 = 使い方の誤り・今の工程では使えない・ツールの故障</exit_code>
  <repeat>直前の同じ検査の失敗と items が同じなら true（LOOP.md 7 章で止まる）</repeat>
  <deterministic>同じ入力なら同じ出力。乱数を使う所（正解の位置）は項目 ID を種にする。</deterministic>
  <network>docs fetch・q linkcheck・q gate --net だけが外へ出る（curl を使う）。ほかは手元だけ。</network>
  <data>作業の物（.loop/・work/・bank/）の置き場は環境変数 DOP_DATA で変えられる（試験で使う）。既定は dop/。</data>
</tool_contract>
```

## 一覧

`L` = `node dop/tools/loop.mjs`、`Q` = `node dop/tools/q.mjs`、`D` = `node dop/tools/docs.mjs`。

| コマンド | 工程 | 入力 | 出力の主な鍵 | AI から隔離するもの | 状態 |
| --- | --- | --- | --- | --- | --- |
| `L start` | 毎回のはじめ | なし | state, doc, item | state.json・backlog.json | 済 |
| `L status` | いつでも | なし | state, doc, item, human_reason | 同上 | 済 |
| `L next` | S0 | なし | state, doc, item / empty | 並べ方の決まり・coverage | 済 |
| `L advance --result <key>` | 各工程の終わり | 結果の key | state, doc, item, stop | 状態の移り方・attempts・札の照合 | 済 |
| `L close` | S9 | なし | outcome, repeated_issues, diagrams_added, human_needed | runs.jsonl・archive への移動。content・recheck を done で閉じた時は、図の無い問題の図の項目（D-）を足す。recheck では付いている図の点検の項目（check: true）も足す | 済 |
| `L add --json '<項目か配列>'` / `--file` | 人・L1 | backlog の項目 | added | ID の振り方・重複の確認 | 済 |
| `L seed [--task 1.1] [--dry]` | 人（初め・試験ガイドの更新時） | config/exam.json | 足した項目数・タスク別の問題数 | 試験ガイドの skills の一覧 | 済 |
| `L seed --glossary [--size 5] [--dry]` | 人（P-014） | bank の services と glossary/ | 足した事典の項目（G-）の数 | 事典に無いサービスの一覧 | 済 |
| `L seed --diagram [--ids q-…,q-…] [--size 10] [--dry]` | 人（P-015）。ふだんは loop close が自動で足す | bank | 足した図の項目（D-） | 図の無い問題の一覧 | 済 |
| `L seed --lecture [--tasks 1.4,2.1] [--dry]` | 人 | config/exam.json・lectures/ | 足した講義の項目（K-、task ごとに 1 つ） | 講義がもうある task | 済 |
| `L seed --translate [--size 10] [--dry]` | 人（P-012） | bank | 足した訳の項目（T-）の数 | 日本語版の無い問題の一覧 | 済 |
| `L block --reason "…"` | 進められない時 | 理由 | state=HUMAN | | 済 |
| `L resume [--to <state>]` | 人が決めた後 | なし | state, doc | | 済 |
| `L pause` | 人に止められた時 | なし | state | | 済 |
| `D fetch <url> --item <ID>` | C1 | 許可した URL（200 以外・別ページへの転送・本文 50 語未満は失敗） | 見出しと語数、file、links（本文の中のリンク） | HTML・ナビ・不要な部分 | 済 |
| `D check <ID>` | C1 | work/<ID>/sources.md と raw/*.md | 誤り（原文の控えに無い文も） | | 済 |
| `Q validate <ID>` | C2（hook でも） | questions.json | 誤り（qid・JSON Pointer・理由。日本語版の条件の語・数字・名前も） | スキーマの細部 | 済 |
| `Q blind <ID>` / `Q reveal <ID>` | C3 | questions.json | file（blind.json / reveal.json） | 答え（先に見ないように） | 済 |
| `Q verdict <ID>` | C3 | verify.json | result, 問ごとの verdict | 判定の決まり・drop の移動 | 済 |
| `Q gate <ID> [--net]` | C4 | work/<ID>/ | 落ちた検査 | C4 の検査の全部 | 済 |
| `Q publish <ID>` | C4 | work/<ID>/ | bank に入れた問題 ID | 並べ替え・番号の振り方 | 済 |
| `node dop/tools/g.mjs validate\|verdict\|gate\|publish <ID>` | C2〜C4（G-） | work/<ID>/glossary.json・verify.json | 誤り・結論・入れたページ | スキーマ・根拠の照合・名前の重複 | 済 |
| `node dop/tools/dg.mjs validate\|verdict\|gate\|publish <ID>` | C2〜C4（D-） | work/<ID>/diagrams.json・verify.json | 誤り・結論・入れた図 | Mermaid・アイコン・ブラウザで描くこと | 済 |
| `node dop/tools/lec.mjs validate\|verdict\|yomi [--done]\|gate\|publish <ID>` | C2〜C4（K-） | work/<ID>/lecture.json・review-*.json・yomi.json | 誤り・結論・公開した講義 | 図を描く・VOICEVOX（Docker）で音声・アクセント辞書（config/accents.json） | 済 |
| `node dop/tools/dg.mjs icons --from <dir>` | 人（公式のアイコン集の更新時） | config/icon-map.json | 写した数 | 公式の集の中身 | 済 |
| `node dop/tools/g.mjs list` | いつでも | なし | 事典のページと名前 | glossary/ の全体 | 済 |
| `Q find [--task --service --text --id]` | どこでも | 条件 | id・task・services・問題文の先頭 | bank の全体 | 済 |
| `Q coverage` | いつでも | なし | タスク（ドメイン）ごとの数・目標・不足 | bank の全体 | 済 |
| `Q dedupe <ID>` | いつでも | questions.json | 似ている bank の問題と率 | bank の全体 | 済 |
| `Q stats` | 週 1 | なし | 正解の位置・ドメイン別の数 | | 済 |
| `Q export --task 1.4 --out <file.md>` | 人が読む時 | 条件 | 書いた数 | （人向け。AI は読まない） | 済 |
| `Q linkcheck` | 週 1 | なし | 開けない URL | | 済 |
| `node dop/tools/app.mjs data` | A2・A3 | なし | 配信用の問題数 | bank → app/public/questions.json | 済 |
| `node dop/tools/refactor.mjs scan [--dry]` | loop start・app と refactor の loop close（自動）、人 | tools/・app/src の .mjs・.js | 直す所と足した項目（F-） | 測り方（config/refactor.json） | 済 |
| `node dop/tools/refactor.mjs check <ID>` | A3（F-） | spec.json・base.json | 試験の不変・直す所の消えたか・全試験 | git の比べ方・unit と e2e の全部 | 済 |
| `node dop/tools/app.mjs stamp` | A2（app/ を変えたら） | app/src・style.css | 版の番号 | index.html の import map・version.json（忘れると npm test が落ちる） | 済 |
| `node dop/tools/app.mjs check <ID>` | A3 | spec.json・app/test・app/e2e | AC ごとの合否・画面写真 | 試験・e2e のログ全文 | 済 |
| （アプリ）読み上げ | 利用者 | 問題と解説 | ブラウザの speechSynthesis で読む（A-0009） | 読み方の表は app/src/logic/speech.js の READINGS | 済 |
| `node dop/tools/learn.mjs weak [--dry]` | L1 | .loop/answers/*.json（記録の書き出しと issues.json） | 足した項目・直近の正答率・受けてよい頃か | 解答の記録と issue の本文 | 済 |
| `aws:cost` | 週 1 | なし | 今月の費用 | Cost Explorer の応答 | 未（AWS へ移す時） |

## ハーネス（Claude Code）に入れたもの

ツールを「呼び忘れ」させないため、Claude Code の仕組みで自動で動かす。中身はリポジトリの根の `.claude/`。

```xml
<harness>
  <hook event="PostToolUse" matcher="Write|Edit|MultiEdit" run="tools/hooks.mjs post-write">dop/work/&lt;ID&gt;/questions.json を書いたら形を確かめ、誤りを AI に返す</hook>
  <hook event="PreToolUse" matcher="Write|Edit|MultiEdit" run="tools/hooks.mjs pre-write">ループの実行中（loop start から STOP・HUMAN・pause まで）は loop/LOOP.md と loop/steps/*.md を書き換えさせない</hook>
  <hook event="Stop" run="tools/hooks.mjs stop">ループの途中なら止まらせず、次に呼ぶコマンドを返す（2 回目は止まってよい）</hook>
  <permissions_deny>Read(./dop/bank/**), Read(./dop/.loop/state.json), Read(./dop/.loop/backlog.json)</permissions_deny>
  <agent name="dop-researcher" model="haiku">C1。docs fetch・check。返事は 3 行</agent>
  <agent name="dop-verifier" model="sonnet">C3。Web なし。blind → reveal → verify.json</agent>
  <skill name="dop-loop">LOOP.md 8 章のはじめ方</skill>
</harness>
```

- 読む禁止は `cat` などで抜けられる。強制ではなく「間違って読まない」ための柵。
- ツールを直す人（ループの外の作業）は `dop/tools/` を読んでよい。

## 結果の札（result.json）

ツールが `work/<ID>/result.json` に `{ "state", "result", "count" }` を書き、`L advance` はこれと照らして進める。札を書くのは次の時だけ。

```json
{
  "C1_research": { "ok": "D check が ok" },
  "C2_author":   { "ok": "Q validate が ok" },
  "C3_verify":   { "pass|fix|drop": "Q verdict（fix で言い回しだけなら count: false）" },
  "C4_gate":     { "pass": "Q publish が ok", "fail": "Q gate か Q publish が落ちた" },
  "A3_check":    { "pass|fail": "app.mjs check" },
  "L1_learn":    { "ok": "learn.mjs weak" }
}
```

C1 の `no_source`、A1 の `ok`・`need_human` は AI の判断で進めてよい（札は要らない）。
