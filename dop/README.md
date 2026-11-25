# DOP 問題集（設計中）

AWS Certified DevOps Engineer – Professional（DOP-C02）の合格に向けた Web の問題集。
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

## 決めたこと（2026-11-25）

```xml
<decisions>
  <d id="Q1">試験は DOP-C02（AWS Certified DevOps Engineer – Professional）。</d>
  <d id="Q2">初めはこのリポジトリの GitHub Pages（0 円）。アプリが固まったら S3＋CloudFront へ移す。</d>
  <d id="Q3">AWS へ移した後の月の上限は 10 USD。AWS Budgets のアラートは 5 USD と 10 USD。</d>
  <d id="Q4">使うのは自分だけ。トップのページからはリンクしない（公開リポジトリなので URL を知っていれば開ける）。</d>
  <d id="Q5">置き場所はこのリポジトリの dop/。AWS へ移す時に分けるかを改めて決める。</d>
  <d id="Q6">1 束 5 問。人は事前に問題を読まない。誤りは解きながら見つけて報告する（備えは loop/LOOP.md 6 章）。</d>
</decisions>
```

## 守ること（変えない）

- 本物の試験問題・問題集の流出品（いわゆる dump）は使わない。言い換えて使うのもだめ。試験の規約（NDA）に反する。
- 問題の根拠は AWS の公式ドキュメントと公式の試験ガイドだけ。どの問題にも出典の URL を付ける。
- AWS にお金がかかる操作（デプロイ・リソースを作る）は、毎回人の承認を取る。
