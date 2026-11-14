# 隕石を当てろ

https://amefuritell.github.io/amayadori/meteor/ で遊べるブラウザのゲーム（隕石当てと、軌道に乗せろ）。

GitHub Pages はビルドしないので、ビルドした `meteor.js`・`meteor.css` もコミットする。

## 作り直す

```sh
cd meteor
npm ci
npm test        # 試験（node --test）
npm run build   # src/ から meteor.js・meteor.css を作り、index.html の ?v= を中身の SHA-256 の先頭 10 文字に変える
```

`?v=` は、更新の直後にブラウザが古いファイルを読まないための印。手で変えなくてよい。

## 決まり

- ライブラリ・フォント・画像は npm で入れて同梱する。CDN や外のサイトからは読み込まない。
- アクセス解析にイベントは送らない（ページの読み込みの計測だけ）。
- 設計は [DESIGN.md](DESIGN.md)。
