#!/bin/bash
# Extract Vercel deployment URL from Vercel CLI output
# This script parses the output and emits a single canonical URL
# Ensures no secrets are leaked in the output

set -euo pipefail

# Read from stdin or file
INPUT="${1:-/dev/stdin}"

# Extract the production URL from Vercel CLI output
# The Vercel CLI typically outputs lines like:
# Production: https://your-app.vercel.app
# Or: https://your-app.vercel.app

URL=$(cat "$INPUT" | grep -oE 'https://[a-zA-Z0-9.-]+\.vercel\.app' | head -n 1 || echo "")

if [ -z "$URL" ]; then
  echo "Error: Could not extract Vercel deployment URL from output" >&2
  exit 1
fi

# Output the URL (this is safe - it's a public URL, not a secret)
echo "$URL"
