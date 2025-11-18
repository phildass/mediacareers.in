#!/bin/bash
# Script to extract Vercel deployment URL from Vercel CLI output
# Usage: ./extract_vercel_url.sh <vercel-output-file>
# Or pipe output: echo "$VERCEL_OUTPUT" | ./extract_vercel_url.sh

set -e

INPUT="${1:-/dev/stdin}"

# Extract URL from Vercel CLI output
# Vercel CLI typically outputs URLs in formats like:
# - "Preview: https://..."
# - "Production: https://..."
# - "https://..." (standalone)
# - "Deployed to production. Run `vercel --prod` to overwrite later changes. https://..."

if [ "$INPUT" != "/dev/stdin" ] && [ -f "$INPUT" ]; then
  VERCEL_OUTPUT=$(cat "$INPUT")
else
  VERCEL_OUTPUT=$(cat)
fi

# Try multiple patterns to extract URL
URL=$(echo "$VERCEL_OUTPUT" | grep -oP 'https://[a-zA-Z0-9\-\.]+\.vercel\.app' | head -n1)

if [ -z "$URL" ]; then
  # Try alternative pattern for production URL
  URL=$(echo "$VERCEL_OUTPUT" | grep -oP 'Production: \Khttps://[^\s]+' | head -n1)
fi

if [ -z "$URL" ]; then
  # Try to find any https URL in the output
  URL=$(echo "$VERCEL_OUTPUT" | grep -oE 'https://[a-zA-Z0-9\-\.]+\.[a-z]+(/[^\s]*)?' | grep -v 'vercel.com' | head -n1)
fi

if [ -n "$URL" ]; then
  echo "$URL"
  exit 0
else
  echo "ERROR: Could not extract Vercel URL from output" >&2
  echo "Output was:" >&2
  echo "$VERCEL_OUTPUT" >&2
  exit 1
fi
