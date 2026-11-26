#!/bin/bash
# C3 の検証の後: verdict → gate → publish → close → data。引数: 項目 ID
set -e
cd "$(dirname "$0")/../.."
id=$1
[ "$2" = skipverdict ] || node tools/dg.mjs verdict $id | sed -n 3p
node tools/loop.mjs advance --result pass | sed -n 3p
node tools/dg.mjs publish $id | sed -n 3p
node tools/loop.mjs advance --result pass | sed -n 3p
node tools/loop.mjs close | sed -n 3p
node tools/app.mjs data | sed -n 3p
