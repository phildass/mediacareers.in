#!/usr/bin/env bash
set -euo pipefail
INPUT_FILE="${1:-/dev/stdin}"
OUT=""
if grep -qi '"url"' "$INPUT_FILE" 2>/dev/null || grep -qi '\"url\":' "$INPUT_FILE" 2>/dev/null; then
  OUT=$(grep -Eo '"url"[[:space:]]*:[[:space:]]*"[^"]+"' "$INPUT_FILE" 2>/dev/null | head -n1 | sed -E 's/.*"url"[[:space:]]*:[[:space:]]*"([^"]+)".*/\1/')
fi
if [ -z "$OUT" ]; then
  OUT=$(grep -Eo 'https?://[a-z0-9._-]+\.(vercel\.app|now\.sh|[a-z0-9.-]+)' "$INPUT_FILE" 2>/dev/null | head -n1 || true)
fi
if [[ "$OUT" =~ ^https?:// ]]; then
  echo "$OUT"
  exit 0
fi
exit 1
