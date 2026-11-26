---
name: dop-loop
description: DOP 問題集（dop/）のループを回す。「ループを回して」「問題を作って」「DOP のループ」で使う。
---

`dop/loop/LOOP.md` の 8 章（はじめ方）どおりに進める。

1. `node dop/tools/loop.mjs start` を呼ぶ。
2. 出力の `doc` の 1 枚だけを読み、その工程を行う。C1 は dop-researcher、C3 は dop-verifier のエージェントに任せる。
3. 工程の終わりに、文書に書かれたツールを呼んでから `node dop/tools/loop.mjs advance --result <key>`（S0 は `next`、S9 は `close`）。
4. `state` が STOP（この回の上限）になったら、PR を作って CI が通ればマージし（人の承認は要らない。`dop/loop/steps/S9-close.md`）、`loop start` で次の回へ進む。HUMAN になったら、何をしたかと人に決めてほしい事を 3 行で伝えて終える。

読まない物（`dop/bank/`・`.loop/state.json`・ツールの中身）は LOOP.md 4 章。
