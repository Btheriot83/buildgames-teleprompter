#!/usr/bin/env bash
set -euo pipefail
MSG="${1:?commit message like rN: focus}"
# expect workbench to have last "- commit: PENDING"
if ! rg -q '\- commit: PENDING' gauntlet/workbench-r4.md; then
  echo "workbench missing PENDING" >&2
  exit 1
fi
git add -A -- gauntlet/shots-r4 gauntlet/workbench-r4.md src scripts/r4-shot.mjs scripts/r4-finish-round.sh
# do not add brandon-audit
git reset HEAD -- gauntlet/brandon-audit 2>/dev/null || true
git status --short
git commit -m "$MSG"
SHA=$(git rev-parse --short HEAD)
python3 - "$SHA" <<'PY'
import sys
from pathlib import Path
sha=sys.argv[1]
p=Path('gauntlet/workbench-r4.md')
t=p.read_text()
i=t.rfind('- commit: PENDING')
if i<0: raise SystemExit('no PENDING')
p.write_text(t[:i]+f'- commit: {sha}'+t[i+len('- commit: PENDING'):])
print('sha', sha)
PY
git add gauntlet/workbench-r4.md
git commit --amend --no-edit
echo "COMMIT=$(git rev-parse --short HEAD)"
