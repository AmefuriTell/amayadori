# A3 確かめる

```xml
<step id="A3_check" actor="tool">
  <purpose>acceptance を全部、機械で確かめる。</purpose>
  <actions>
    <a>app:check work/&lt;ID&gt; を呼ぶ。中で unit → build → e2e（Playwright、幅 375 と 1280）→ size を行い、AC の id ごとの合否を返す。</a>
    <a>ok なら e2e の画面写真（app:check が .loop/reports/&lt;ID&gt;/ に置く）を 1 枚だけ見て、見た目の崩れが無いかを確かめる。</a>
  </actions>
  <outputs>
    <json>{ "ok": false, "summary": "AC1 失敗 / AC2・AC3 合格", "items": [{ "ac": "AC1", "error": "解説の欄が見つからない (selector: .explain)", "log": ".loop/reports/A-0003/e2e.txt#L40-60" }], "repeat": false }</json>
  </outputs>
  <exit>
    <pass>全 AC 合格、かつ写真に崩れが無い → loop advance --result pass</pass>
    <fail>loop advance --result fail（ツールが feedback.json を作る）。"repeat": true なら止まって人に回す</fail>
  </exit>
</step>
```

## 確かめないこと（人が見る）

- デザインの好み。初めの数回は、S9 で写真を人に送って意見をもらう。
