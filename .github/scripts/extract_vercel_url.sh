#!/usr/bin/env bash
# Robustly extract a Vercel deployment URL from Vercel CLI output or JSON.
# Usage:
#   extract_vercel_url.sh [path/to/vercel-output.txt]
#   cat vercel-output.txt | extract_vercel_url.sh
set -euo pipefail

# Read from argument (file) or stdin
INPUT="${1:-/dev/stdin}"
CONTENT="$(cat "$INPUT")"

# Try to extract a URL from JSON if jq is available. Look for common fields.
URL=""
if command -v jq >/dev/null 2>&1; then
  # Attempt several common JSON keys that might contain the deployment URL.
  URL="$(printf '%s' "$CONTENT" \
    | jq -r '(.url // .productionUrl // .production_url // .deploymentUrl // .deployment_url // .preview?.url // empty)  // empty' 2>/dev/null || true)"
fi

# Fallback: grep for a vercel.app URL in the text
if [ -z "${URL:-}" ]; then
  URL="$(printf '%s' "$CONTENT" | grep -oE 'https://[a-zA-Z0-9._-]+\.vercel\.app' | head -n 1 || true)"
fi

# Final check and output
if [ -z "${URL:-}" ]; then
  echo "Error: Could not extract Vercel deployment URL from input" >&2
  exit 1
fi

# Safe to print the URL (public, not a secret)
printf '%s\n' "$URL"