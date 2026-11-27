DOP 問題集の講義 {TASK}（項目 {ID}）の 2 回目以降の検証をお願いします（ループの C3）。一人読みの台本（lecture.single.json）を先生と生徒の掛け合い（lecture.json の dialogue）に書き直し、前回の検証の指摘を直した物です。あなたは書いた人ともこれまでの検証役とも別の人で、整合性と分かりやすさの両方を見ます。

見る物: /home/user/amayadori/dop/work/{ID}/lecture.json（notes 付き）、lecture.single.json、sources.md、前回の指摘 review-consistency.json と review-clarity.json。決まりは /home/user/amayadori/dop/loop/steps/C2-author.md の「掛け合い」「掛け合いの決まり」と C3-verify.md の講義の節。Web は使わないでください。

確かめること:
1. 前回の重・中が直っているか。notes の採らなかった理由が妥当か。
2. 直したことで新しい重・中が出ていないか。特に、事実と試験の判断を言うのは先生か、生徒の誤りを次の先生の行で正し、生徒が言い直して先生が受けているか、根拠に打ち消す文の無いことを「違います」と言い切っていないか、元の講義から事実を足したり条件を落としたりしていないか、画面（bullets・図・表）と台本が食い違わないか。
重 = 受験者が誤って覚える、中 = 分からなくなる・食い違う。細かい言い回しは軽。台本の上限は 6,000 字なので、足す提案には削る所も添える。

書くもの: review-consistency.json と review-clarity.json を今回の結果で上書き。形 `{ "slides": [ { "id", "issues": [ { "kind", "severity": "重|中|軽", "detail", "suggest" } ] } ], "global": [] }`。kind は整合性が fact・unsupported・mismatch・terms・flow、分かりやすさが jargon・leap・visual・listen・exam。指摘が無いファイルは `{ "slides": [], "global": [] }`。ほかのファイルは書き換えず、git も使わないでください。
返事: pass（重・中 0）かどうかと重・中の要点を短く。
