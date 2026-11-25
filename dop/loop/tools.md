# ツール

AI が読まなくてよい作業は全部ここに入れる。AI はこの表の「入力」と「出力」だけ知っていればよい。
中身（`dop/tools/*.mjs`）は読まない。

## 共通の約束

```xml
<tool_contract>
  <call>node dop/tools/&lt;file&gt;.mjs &lt;cmd&gt; [args]（package.json に npm run の別名も置く）</call>
  <stdout>JSON 1 つ、30 行まで: { "ok": bool, "summary": "1 行", "items": [ 最大 10 件 ], "details_path": "…", "repeat": bool }</stdout>
  <details>全文・ログ・一覧は details_path（.loop/reports/ の下）に書く。AI は ok=false で原因が summary と items で分からない時だけ読む。</details>
  <exit_code>0 = ok、1 = 検査で落ちた、2 = 使い方の誤り・ツールの故障</exit_code>
  <repeat>直前の同じ工程の失敗と items が同じなら true（LOOP.md 7 章で止まる）</repeat>
  <deterministic>同じ入力なら同じ出力。乱数を使う所は項目 ID を種にする。</deterministic>
  <network>docs:fetch と q:linkcheck だけが外へ出る。ほかは手元だけ。</network>
</tool_contract>
```

## 一覧

| ツール | 工程 | 入力 | 出力の items | AI から隔離するもの |
| --- | --- | --- | --- | --- |
| `loop status` | 毎回のはじめ | なし | state, item, doc, attempts | state.json・backlog.json の全体 |
| `loop next` | S0 | なし | 次の item と state | 並べ方の決まり |
| `loop advance --result <key>` | 各工程の終わり | 結果の key | 次の state と doc | 状態の移り方の表・attempts の数え方 |
| `loop close` | S9 | なし | runs の 1 行・repeated_issues | runs.jsonl の過去分 |
| `loop add --json <item>` | 人・L1 | backlog の 1 項目 | 付けた ID | backlog の重複の確認 |
| `docs:fetch <url>` | C1 | URL（許可したドメインだけ） | 見出しの一覧と各語数 | ページの HTML・ナビ・不要な部分 |
| `sources:check <ID>` | C1 | work/<ID>/sources.md | 出典の数・語数超え・許可外の URL | |
| `q:validate <file>` | C2 | questions.json | スキーマの誤り（JSON Pointer と理由） | スキーマの細部 |
| `q:blind <file>` / `q:reveal <file>` | C3 | questions.json | 答えを抜いた問題 / 答えと解説 | 答え（verifier が先に見ないように） |
| `q:verdict <ID>` | C3 | verify.json | 束の結論・feedback.json の場所 | 判定の決まり |
| `q:gate <ID>` | C4 | work/<ID>/ | 落ちた検査と問題 ID | C4-gate.md の検査の全部 |
| `q:publish <ID>` | C4 | work/<ID>/ | bank に入れた問題 ID | 選択肢の並べ替え・ファイル名の付け方 |
| `q:find --task 1.2 --service CodeDeploy` | どこでも | 条件 | 問題 ID と 1 行の要約（最大 10） | bank の全体 |
| `q:coverage` | S0・L1 | なし | タスク番号ごとの数・目標・不足 | bank の全体 |
| `q:dedupe <file>` | C4（q:gate の中） | questions.json | 似ている bank の問題 ID と率 | bank の全体 |
| `q:linkcheck` | C4・週 1 | なし | 切れた URL と問題 ID | |
| `q:stats` | 週 1 | なし | 正解の位置・長さの偏り | |
| `app:check <ID>` | A3 | spec.json | AC ごとの合否・失敗の要点 | 試験・ビルド・e2e のログ全文 |
| `app:data` | A2・A3 | なし | app/public/questions.json の問題数 | bank → 配信用 JSON の変換 |
| `learn:weak` | L1 | .loop/answers/*.json | 足した項目 | 解答の記録の全部 |
| `aws:cost` | 人に聞かれた時・週 1 | なし | 今月の費用（サービス別の上位 5） | Cost Explorer の生の応答（人の承認後に作る） |

## ハーネス（Claude Code）に入れるもの

ツールを「呼び忘れ」させないため、Claude Code の仕組みで自動で動かす。

```json
{
  "hooks": {
    "PostToolUse": [
      { "matcher": "Write|Edit", "when": "path が dop/work/*/questions.json", "run": "q:validate", "on_fail": "誤りをそのまま AI に返す（次の手で直させる）" },
      { "matcher": "Write|Edit", "when": "path が dop/loop/steps/*.md か dop/loop/LOOP.md", "run": "拒否", "reason": "工程の文書は S9 の proposals を人が採った時だけ変える" }
    ],
    "Stop": [
      { "run": "loop status --check", "on_fail": "工程の途中（advance を呼んでいない）なら止まらせず、呼ぶように返す。人の関門なら止まってよい" }
    ]
  },
  "permissions": {
    "deny": ["Read(dop/bank/**)", "Read(dop/.loop/state.json)", "Read(dop/.loop/backlog.json)", "Read(dop/tools/**)"]
  },
  "agents": {
    "dop-researcher": { "model": "haiku", "tools": ["WebFetch", "Bash(docs:fetch)", "Read(dop/work/**)", "Write(dop/work/*/sources.md)"] },
    "dop-verifier":   { "model": "sonnet 以上", "tools": ["Read(dop/work/*/sources.md)", "Bash(q:blind|q:reveal)", "Write(dop/work/*/verify.json)"], "note": "Web を使わせない（sources.md の外の知識で正解を決めないため。ただし sources.md に無いが正しいと思う事は issues に unsupported として書く）" }
  },
  "skill": { "name": "dop-loop", "body": "LOOP.md 8 章 bootstrap を行う" }
}
```

- hooks の deny（Read の禁止）は `cat` などで抜けられる。強制ではなく「間違って読まない」ための柵。
- 上は設計。実際の `.claude/settings.json` の書き方に合わせるのは、ツールを作る時に行う。

## 作る順番（ツールを作る app 項目とは別の、最初の準備）

```json
[
  { "order": 1, "tools": ["loop status/next/advance/close/add"], "why": "これが無いとループが回らない" },
  { "order": 2, "tools": ["q:validate", "q:blind", "q:reveal", "q:verdict"], "why": "C2・C3 の最小" },
  { "order": 3, "tools": ["docs:fetch", "sources:check"], "why": "C1。初めは researcher が WebFetch で代わりをしてもよい" },
  { "order": 4, "tools": ["q:gate", "q:publish", "q:dedupe", "q:find", "q:coverage"], "why": "bank に入れる" },
  { "order": 5, "tools": ["app:data", "app:check"], "why": "A3。アプリの骨組みと一緒に" },
  { "order": 6, "tools": ["learn:weak", "q:linkcheck", "q:stats", "aws:cost"], "why": "回り出してから" }
]
```
