# アプリの今の形

DOP-C02 の問題を解く静的なページ。ビルドしない（素の HTML・CSS・ES modules）。GitHub Pages の `/amayadori/dop/app/` に置く。

## ファイル

| ファイル | 中身 |
| --- | --- |
| `index.html` | 入口 |
| `style.css` | 見た目（明るい・暗いの配色は端末の設定に従う） |
| `src/main.js` | 画面（読み込み・1 問ずつの表示・答えた後の解説・結果） |
| `src/logic/*.js` | 画面に頼らない計算（採点など）。unit で試す |
| `public/questions.json` | 配信用の問題。`node dop/tools/app.mjs data` が bank から作る。手で書かない |
| `test/*.test.js`・`e2e/*.e2e.js` | 試験。名前の先頭は「<項目 ID> <AC>」 |

## 画面

- 1 問ずつ。上に「i / n」。問題文・選択肢は英語、画面の文は日本語。
- 1 つ選ぶ問題はラジオ、複数選ぶ問題はチェックで「n つ選ぶ」。そろうまで「答える」を押せない。
- 答えると、正誤・正解の選択肢の印・全選択肢の解説・出典の原文とリンク。「次へ」。
- 最後は正解の数。「もう一度」。
- low_confidence の問題は「AI の確信が低い」の印。
