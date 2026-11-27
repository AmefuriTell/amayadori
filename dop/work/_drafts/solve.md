DOP 問題集の講義 {TASK}（項目 {ID}）の「解けるかの試し」をお願いします。講義を見ただけで、その task の問題が解けるかを確かめます。

**見てよい物**: /home/user/amayadori/dop/work/{ID}/solve-lecture.json（講義の画面と台本だけ）と /home/user/amayadori/dop/work/{ID}/solve-blind.json（答えの無い問題）だけ。
**見てはいけない物**: lecture.json（notes と covers に答えの手がかりがある）、points.json、questions.json、bank/、review-*.json、sources.md、notes、Web。git も使わない。

**やること**: solve-blind.json の問題を全部解く。自分の知識ではなく、講義に書いてある事で選ぶ。講義から決められない時は、一番近い物を選び、quote は空にして why に「講義に無い」と書く（無理に講義に合わせない。この試しは講義の抜けを見つけるための物）。
**書く先**: /home/user/amayadori/dop/work/{ID}/solve.json に配列で。`[{ "id": "q-…", "answer": ["C"], "slide": "s05", "quote": "決め手にした講義の文をそのまま（台本・要点・図の文の一部、4 字以上）", "why": "なぜその選択肢か（短く）" }]`
**作業用のファイル**: 置くなら /tmp/claude-0/-home-user-amayadori/1a86ad4f-aa47-58a2-9a6d-56125d27a5aa/scratchpad/{ID}/ の中だけ。
**返事（短く）**: 解いた数と、講義から決められなかった問題の ID。
