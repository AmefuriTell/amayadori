# DOP 問題集（設計中）

AWS Certified DevOps Engineer – Professional（DOP-C02 の想定。要確認）の合格に向けた Web の問題集。
問題づくりとアプリづくりを、AI が回すループ（ループエンジニアリング）で進める。

いまは **ループの設計だけ**。ツール（`tools/`）とアプリ（`app/`）はまだ無い。

## 読む順番

| 読む人 | ファイル | 中身 |
| --- | --- | --- |
| 人・AI | [loop/LOOP.md](loop/LOOP.md) | ループ全体（状態の移り方・役割・文脈の決まり・止まる条件） |
| AI | `loop/steps/*.md` | 各工程の約束（入力・やること・出力・終わる条件・失敗した時）。**今いる工程の 1 枚だけ読む** |
| 人・AI | [loop/tools.md](loop/tools.md) | ツールの一覧と入出力（JSON）。AI はツールの中身を読まず、出力の要約だけ見る |
| 人 | [docs/aws-hosting-cost.md](docs/aws-hosting-cost.md) | AWS で動かす時の案と料金の目安（相談用） |
| ツール | `schemas/*.json`・`config/*.json` | 問題・作業の項目の形と、試験の範囲・割合 |

## 決まっていないこと（人が決める）

```xml
<open_questions>
  <q id="Q1" blocking="yes">試験は DOP-C02（Professional）で合っているか。「DevOps Association」という名前の試験は無い。</q>
  <q id="Q2" blocking="yes">動かす場所と料金の上限（docs/aws-hosting-cost.md の案 A / B / C）。</q>
  <q id="Q3" blocking="no">使う人は自分だけか、公開するか。公開するなら問題の誤りへの備え（報告ボタン・免責）が要る。</q>
  <q id="Q4" blocking="no">置き場所はこのリポジトリの dop/ でよいか、別リポジトリにするか（AWS へデプロイするなら別の方が分けやすい）。</q>
  <q id="Q5" blocking="no">1 回のループで作る問題の数と、人が抜き取りで読む割合（初めは 1 束 5 問・全部読む を提案）。</q>
</open_questions>
```

## 守ること（変えない）

- 本物の試験問題・問題集の流出品（いわゆる dump）は使わない。言い換えて使うのもだめ。試験の規約（NDA）に反する。
- 問題の根拠は AWS の公式ドキュメントと公式の試験ガイドだけ。どの問題にも出典の URL を付ける。
- AWS にお金がかかる操作（デプロイ・リソースを作る）は、毎回人の承認を取る。
