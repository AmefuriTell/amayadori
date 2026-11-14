# 設計

元は weatherDiscordBot（Discord の Bot）の地図の Activity の中のゲームで、設計の履歴は
`AmefuriTell/weatherDiscordBot` の `docs/design/activity-map.md` §4 の J・K・L・M（v0.27〜v0.32、コミット 2643329）にある。
2026-11-14 にゲームを Bot から切り離し、元のコードをここ（`meteor/`）に移した。ここでは今の形だけを短く書く。
コードの中の注釈には、Activity だったころの言い方（地図へ戻る・Discord の共有）が残っている。

## ファイル

| ファイル | 中身 |
| --- | --- |
| `src/web.js` | 入口。閉じるボタンはトップのページ（1 つ上）へ戻る |
| `src/share.js` | 結果の共有（端末の共有の機能、無ければクリップボード）と 𝕏 の投稿の URL |
| `src/game/game.js` | 隕石当ての画面（開くと今日のお題。ほかは上の「ほかの遊び方」から・今日のお題・フリー練習・ステージ） |
| `src/game/orbit-game.js` | 軌道に乗せろの画面 |
| `src/game/physics.js`・`orbit.js` | 計算（1/240 秒刻みの速度ベルレ法）。画面に頼らないので試験できる |
| `src/game/daily.js`・`stages.js`・`posts.js`・`targets.js` | 今日のお題・ステージ・投稿の文・的の都市 |
| `src/game/draw.js`・`explosion.js`・`game.css` | 陸の描き方・爆発・見た目 |
| `assets/world_land.json` | 陸の形（Natural Earth 1:110m、パブリックドメイン。weatherDiscordBot の `scripts/build_marine_areas.py` が作ったもの） |

## 遊び

- **隕石当て**: 北極の上から見た地球へ、引っ張って離した隕石を、地球と月の重力で曲げて的の都市に当てる。当たった所と的の経度のずれを赤道の上の km で出す（300 km 未満「ぴったり！」）。
  - 狙っている間（引っ張る前・引っ張っている間）は時間が止まり、離した瞬間から地球と月が動く。同じ引き方なら同じ結果になるように（いつ離すかの間合いは腕前にしない）。
- **今日のお題**: 日本時間の日付を種にした決まった乱数で、その日は誰でも同じ的と置き場。1 日 3 回。共有と投稿の文に 1 投ごとの印（💥🟩🟨🟥⬛）を並べる。
- **ステージ**: 世界（自転の速さ・月の数と重さ・向き）の違う 5 面。1,000 km 未満でクリア。
- **軌道に乗せろ**: 衛星を 3 機まで置くか打ち上げて回らせ、回った周と大きさ（2 乗）で点にする。

## 記録

端末の `localStorage` だけに覚える（サーバーは無い）。キーは Activity だったころの名前のまま
（`weatherbot.daily.<日付>`・`weatherbot.stages`・`weatherbot.orbitBest`）。変えると、このページで遊んだ人の記録が消えるため。
Discord の中で遊んだ記録は、サイトが違うので引き継がない。
