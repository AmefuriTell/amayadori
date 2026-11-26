#!/bin/bash
# 下書きのある項目を始める: 優先度を上げ → next → 下書きを写す → dg validate → advance。引数: 項目 ID
set -e
cd "$(dirname "$0")/../.."
id=$1
node tools/loop.mjs set $id --priority 1 >/dev/null
node tools/loop.mjs next | sed -n 3p
cp work/_drafts/$id.json work/$id/diagrams.json
node tools/dg.mjs validate $id | sed -n 2,5p
