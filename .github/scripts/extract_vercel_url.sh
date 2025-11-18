#!/usr/bin/env bash
# Robustly extract a Vercel deployment URL from Vercel CLI output or JSON.
# Usage: extract_vercel_url.sh path/to/vercel-output.txt
set -euo pipefail

INPUT_FILE="${1:-/dev/stdin}"
OUT=""

# Try to parse JSON-like "url" fields (e.g. {"url":"https://..."}).
if grep -qi '"url"' "$INPUT_FILE" 2>/dev/null || grep -qi '\\"url\\":' "$INPUT_FILE" 2>/dev/null; then
  OUT=$(grep -Eo '"url"[[:space:]]*:[[:space:]]*"[^"]+"' "$INPUT_FILE" 2>/dev/null \
    | head -n1 \
    | sed -E 's/.*"url"[[:space:]]*:[[:space:]]*"([^"]+)".*/\1/')
fi

# Fallback: find the first https://*.vercel.app (or now.sh) or other http(s) hostname.
if [ -z "$OUT" ]; then
  OUT=$(grep -Eo 'https?://[a-z0-9._-]+\.(vercel\.app|now\.sh|[a-z0-9.-]+)' "$INPUT_FILE" 2>/dev/null | head -n1 || true)
fi

# Final safety check: only print if it looks like an http URL
if [[ "$OUT" =~ ^https?:// ]]; then
  echo "$OUT"
  exit 0
fi

# Nothing found
exit 1