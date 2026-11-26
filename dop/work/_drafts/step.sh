# 使い方: step.sh <閉じる ID> <題> [次の ID]
set -e; cd "$(dirname "$0")/../.."
bash work/_drafts/finish.sh $1 ${SKIP:-}
cd .. && git add dop ':!dop/work/_drafts' && git commit -qm "DOP ループ: $1 pass（図 $2）

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01D7y75Dk82NgjucHFjbQKe3"
[ "${NOPUSH:-}" = 1 ] || git push -q origin ccr-958cc12a-2vgdlv
cd dop
if [ -n "${3:-}" ]; then bash work/_drafts/begin.sh $3; node tools/loop.mjs advance --result ok | sed -n 3p; fi
