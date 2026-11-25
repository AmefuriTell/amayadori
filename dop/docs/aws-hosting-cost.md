# AWS で動かす案と料金（相談用）

> 金額は 2026-11 時点の記憶からの**目安**。東京リージョン、使う人 1 人を想定。決める前に AWS Pricing Calculator と、自分のアカウントの無料枠（2025-07 以降の新規アカウントは無料枠の仕組みが変わったはず。要確認）で確かめる。

## 先に言っておきたいこと

- 問題集は静的なページ（HTML・JS・問題の JSON）で作れる。**動かすだけなら AWS は無くてもよい**（このリポジトリの GitHub Pages なら 0 円）。
- それでも AWS で動かす意味は「DOP の範囲（CodePipeline・CloudFormation・CloudWatch など）を自分の手で触れる練習になる」こと。お金を払う理由はそこなので、案 C の価値はホスティングではなく練習にある。
- 一番大きい費用は、たぶん AWS ではなく AI の利用量。ループをツールに寄せているのはそのため。

## 案

| 案 | 構成 | 月の目安 | できること | 練習になる範囲 |
| --- | --- | --- | --- | --- |
| Z | GitHub Pages（このリポジトリ） | 0 円 | 解く・記録は端末だけ | なし |
| A | S3（非公開）＋ CloudFront（OAC）。GitHub Actions から OIDC でデプロイ | ほぼ 0〜数十円（独自ドメインなら Route 53 のホストゾーン 0.5 USD/月 ＋ ドメイン代） | Z と同じ | S3・CloudFront・IAM（OIDC） |
| B | A ＋ Cognito ＋ API Gateway（HTTP API）＋ Lambda ＋ DynamoDB（オンデマンド） | 1 人ならほぼ無料枠の中（〜1 USD） | 端末をまたいで記録を同期 | ＋ サーバーレス・認証 |
| C | B ＋ CodePipeline・CodeBuild・CloudFormation（または CDK）でデプロイ、CloudWatch のアラームとダッシュボード | 1〜5 USD（ビルドの回数しだい） | B と同じ | DOP のドメイン 1・2・4 を直に触れる |

## 避けるもの（置きっぱなしで毎月かかる）

```json
[
  { "item": "NAT Gateway", "approx": "40 USD/月〜（時間＋通信量）" },
  { "item": "Application Load Balancer", "approx": "20 USD/月〜" },
  { "item": "RDS・EC2・ECS（常時起動）", "approx": "10〜20 USD/月〜" },
  { "item": "パブリック IPv4 アドレス", "approx": "1 個あたり約 3.6 USD/月" },
  { "item": "AWS Config・GuardDuty・Security Hub（練習で入れる時）", "approx": "量しだい。練習の後に止める" }
]
```

## 守り（どの案でも）

- AWS Budgets で 1 USD・5 USD のアラートを最初に作る。
- リソースは全部 IaC（CloudFormation か CDK）で作り、1 回のコマンドで消せるようにする。
- 全リソースにタグ `project=dop`。
- AWS を変える操作は、ループの人の関門 H1 で毎回承認する（AI が勝手にデプロイしない）。

## 提案

1. ループを回し始める間は **Z**（費用 0、承認の手間も無い）。
2. アプリが固まったら **A** へ移す。
3. 練習したくなったら **C**。B（同期）は、複数の端末で解きたいと思った時だけ。

## 決めたこと（2026-11-25）

- Z（GitHub Pages）から始め、アプリが固まったら A（S3＋CloudFront）へ移す。
- 月の上限は 10 USD。Budgets のアラートは 5 USD と 10 USD。上限の中なら、C（練習のパイプライン）と B（同期）も候補にしてよい。
- 置きっぱなしでかかるもの（上の「避けるもの」）は、上限の中でも作らない。練習で作ったら同じ日に消す。
