#!/bin/bash

# Security Check Script for MediaCareers.in
# This script checks for common security issues before committing code

echo "🔒 Running Security Checks..."
echo ""

# Initialize exit code
EXIT_CODE=0

# Check 1: Ensure no .env file is committed
echo "✓ Checking for .env files..."
if git ls-files | grep -E "\.env$" > /dev/null 2>&1; then
  echo "❌ ERROR: .env file found in repository!"
  echo "   Remove .env files from git tracking"
  EXIT_CODE=1
else
  echo "  ✓ No .env files committed"
fi
echo ""

# Check 2: Check for hardcoded secrets (common patterns)
echo "✓ Checking for hardcoded secrets..."
SECRET_PATTERNS=(
  "password\s*=\s*['\"][^'\"]{8,}['\"]"
  "api[_-]?key\s*=\s*['\"][^'\"]+['\"]"
  "secret\s*=\s*['\"][^'\"]{20,}['\"]"
  "token\s*=\s*['\"][^'\"]{20,}['\"]"
  "mongodb.*://.*:[^@]+@"
  "mysql.*://.*:[^@]+@"
)

SECRETS_FOUND=0
for pattern in "${SECRET_PATTERNS[@]}"; do
  if git diff --cached | grep -iE "$pattern" > /dev/null 2>&1; then
    echo "  ⚠️  WARNING: Potential secret pattern found: $pattern"
    SECRETS_FOUND=$((SECRETS_FOUND + 1))
  fi
done

if [ $SECRETS_FOUND -eq 0 ]; then
  echo "  ✓ No obvious secrets detected in staged files"
else
  echo "  ⚠️  Found $SECRETS_FOUND potential secret patterns"
  echo "  Please review before committing"
fi
echo ""

# Check 3: Verify TEST_MODE is not hardcoded to false in production code
echo "✓ Checking TEST_MODE configuration..."
if grep -r "TEST_MODE.*=.*false" backend/src/ --exclude-dir=node_modules 2>/dev/null | grep -v "process.env.TEST_MODE === 'false'" > /dev/null; then
  echo "  ⚠️  WARNING: TEST_MODE may be hardcoded to false"
  echo "  Ensure TEST_MODE is controlled via environment variable"
else
  echo "  ✓ TEST_MODE properly configured"
fi
echo ""

# Check 4: Verify .env.example exists and is up to date
echo "✓ Checking .env.example..."
if [ ! -f "backend/.env.example" ]; then
  echo "  ❌ ERROR: .env.example not found!"
  EXIT_CODE=1
else
  echo "  ✓ .env.example exists"
fi
echo ""

# Check 5: Verify gitignore includes common sensitive files
echo "✓ Checking .gitignore..."
if [ ! -f ".gitignore" ]; then
  echo "  ❌ ERROR: .gitignore not found!"
  EXIT_CODE=1
else
  required_ignores=(".env" "node_modules")
  missing_ignores=0
  for ignore in "${required_ignores[@]}"; do
    if ! grep -q "^$ignore" .gitignore; then
      echo "  ⚠️  WARNING: $ignore not in .gitignore"
      missing_ignores=$((missing_ignores + 1))
    fi
  done
  
  if [ $missing_ignores -eq 0 ]; then
    echo "  ✓ .gitignore properly configured"
  else
    echo "  ⚠️  Some entries missing from .gitignore"
  fi
fi
echo ""

# Check 6: Verify email service uses TEST_MODE
echo "✓ Checking email service TEST_MODE usage..."
if ! grep -q "config.testMode" backend/src/utils/emailService.js 2>/dev/null; then
  echo "  ❌ ERROR: Email service doesn't check TEST_MODE!"
  EXIT_CODE=1
else
  echo "  ✓ Email service properly checks TEST_MODE"
fi
echo ""

# Summary
echo "================================"
if [ $EXIT_CODE -eq 0 ]; then
  echo "✅ All security checks passed!"
else
  echo "❌ Security checks failed!"
  echo "Please fix the errors above before committing"
fi
echo "================================"

exit $EXIT_CODE
