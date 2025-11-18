#!/usr/bin/env bash
# Robustly extract a vercel deployment URL from Vercel CLI output or JSON.
# Usage: extract_vercel_url.sh path/to/vercel-output.txt
set -euo pipefail
INPUT_FILE="${1:-/dev/stdin}"
OUT=""
# Try to parse JSON-like output for common fields
if grep -qi '"url"' "$INPUT_FILE" 2>/dev/null || grep -qi '\"url\":' "$INPUT_FILE" 2>/dev/null; then
  # attempt to extract the first URL-looking value
  OUT=$(grep -Eo '"url"[[:space:]]*:[[:space:]]*"[^"]+"' "$INPUT_FILE" 2>/dev/null | head -n1 | sed -E 's/.*"url"[[:space:]]*:[[:space:]]*"([^"]+)".*/\1/')
fi
# Fallback: find the first https://*.vercel.app or custom domain URL
if [ -z "$OUT" ]; then
  OUT=$(grep -Eo 'https?://[a-z0-9._-]+\.(vercel\.app|now\.sh|[a-z0-9.-]+)' "$INPUT_FILE" 2>/dev/null | head -n1 || true)
fi
# Final safety check: only output if contains http
if [[ "$OUT" =~ ^https?:// ]]; then
  echo "$OUT"
  exit 0
fi
# Nothing found
exit 1
