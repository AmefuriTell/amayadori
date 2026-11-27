DOP 問題集の講義 {TASK}（項目 {ID}）の検証をお願いします（ループの C3）。この講義は、2 人の検証を通った一人読みの台本（lecture.single.json）を、先生と生徒の掛け合い（lecture.json の dialogue）に書き直した物です。あなたは書いた人とは別の人で、{ROLE} を見ます。もう一人が別の観点を見ますが、その結果は見ないでください。

**見る物**
- 掛け合いの講義: /home/user/amayadori/dop/work/{ID}/lecture.json（notes 付き）
- 元の一人読みの講義: /home/user/amayadori/dop/work/{ID}/lecture.single.json
- 根拠: /home/user/amayadori/dop/work/{ID}/sources.md
- 図: /home/user/amayadori/dop/work/{ID}/preview/*.png（図は元と同じなので、台本との食い違いだけ見ればよい）
- 決まり: /home/user/amayadori/dop/loop/steps/C2-author.md の「掛け合い」「掛け合いの決まり」と、/home/user/amayadori/dop/loop/steps/C3-verify.md の講義の節
Web は使わないでください。

{FOCUS}

重 = 受験者が誤って覚える、中 = 分からなくなる・食い違う、軽 = 言い回し。

**書く先**: /home/user/amayadori/dop/work/{ID}/{FILE}。形 `{ "slides": [ { "id", "issues": [ { "kind", "severity": "重|中|軽", "detail", "suggest" } ] } ], "global": [ { "severity", "detail", "suggest" } ] }`。kind は {KINDS}。指摘が無ければ `{ "slides": [], "global": [] }`。このファイル以外は書き換えず、git も使わないでください。

**返事**: 件数と重・中の要点を短く。
