# CI and Deployment Guide

## Overview

This document covers the CI/CD pipeline, deployment process, and post-deployment validation for MediaCareers.in.

## CI Pipeline

### Self-Contained CI Design

The CI pipeline is designed to run **without requiring production secrets or external services**:

- **TEST_MODE=true**: Set in all CI workflows to skip email sending and use mock services
- **No Real Database**: Tests use in-memory databases (mongodb-memory-server)
- **No External API Calls**: Mocked or stubbed during tests
- **Simplified Workflows**: Single Node version (18.x) for easier debugging

### Client CI Workflow

**File**: `.github/workflows/client-ci.yml`

**What it does**:
1. Builds Next.js application with TEST_MODE=true
2. Runs TypeScript type checking
3. Performs security audits
4. Checks for exposed secrets in code
5. Uploads build artifacts and logs on failure

**Environment Variables Set**:
- `TEST_MODE=true` - Ensures no production services needed
- `NEXT_PUBLIC_API_URL=http://localhost:3000` - Mock API endpoint

**Running Locally**:
```bash
# Run the same build as CI
TEST_MODE=true NEXT_PUBLIC_API_URL=http://localhost:3000 npm run build

# Verify output
ls -la out/
```

### Backend CI Workflow

**File**: `.github/workflows/backend-ci.yml`

**What it does**:
1. Security checks (via `scripts/security-check.sh`)
2. Runs all backend tests with TEST_MODE=true
3. ESLint code quality checks
4. CodeQL security analysis
5. Validates TEST_MODE configuration
6. Uploads coverage reports and logs on failure

**Environment Variables Set**:
- `NODE_ENV=test`
- `TEST_MODE=true`
- `JWT_SECRET=test-secret-key-for-ci-do-not-use-in-production`
- `MONGODB_URI=mongodb://127.0.0.1:27017/mediacareers-test`

**Running Locally**:
```bash
cd backend

# Run tests as CI does
TEST_MODE=true NODE_ENV=test npm test

# Run linting
npm run lint
```

### Key CI Features

1. **Detailed Logging**: Failed steps print verbose output for debugging
2. **Artifact Upload**: Logs and build artifacts saved on failure (5-7 days retention)
3. **No Matrix Complexity**: Single Node version (18.x) until stable, then re-add matrix
4. **Fast Feedback**: Parallel jobs where possible, fail-fast on critical errors

## Deployment Architecture

MediaCareers.in uses a split deployment model:

### Frontend (Client)
- **Platform**: Vercel
- **Build**: Next.js static export
- **Domain**: mediacareers.in, www.mediacareers.in
- **Auto-deploy**: Enabled for main branch

### Backend (API)
- **Platform**: Render / VPS
- **Runtime**: Node.js Express server
- **Database**: MongoDB Atlas
- **API Endpoint**: api.mediacareers.in (example)

## Deployment Process

### 1. Pre-Deployment Checklist

Before deploying:

- [ ] All CI checks pass on main branch
- [ ] Code review completed and approved
- [ ] Branch protection rules enforced
- [ ] TEST_MODE=true in backend until email/payment verified
- [ ] Environment variables documented
- [ ] Security audit completed (no exposed secrets)

### 2. Client Deployment (Vercel)

**Initial Setup**:
1. Connect GitHub repository to Vercel
2. Select `main` branch for production
3. Build settings auto-detected (Next.js)
4. Add environment variables:
   - `NEXT_PUBLIC_API_URL` = Your backend API URL

**Vercel Configuration**:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "out",
  "installCommand": "npm install --legacy-peer-deps"
}
```

**Custom Domain**:
1. In Vercel project settings → Domains
2. Add `mediacareers.in` and `www.mediacareers.in`
3. Update DNS records at your registrar:
   - Type: `CNAME`, Name: `www`, Value: `cname.vercel-dns.com`
   - Type: `A`, Name: `@`, Value: `76.76.21.21` (Vercel IP)

### 3. Backend Deployment (Render)

**Initial Setup**:
1. Create new Web Service on Render
2. Connect GitHub repository
3. Configure:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Node Version: 18.x

**Environment Variables** (Required):
```
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/mediacareers
JWT_SECRET=<strong-random-secret-64-chars>
JWT_EXPIRES_IN=7d

# Keep TEST_MODE=true until verified
TEST_MODE=true

# Email (only when TEST_MODE=false)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@mediacareers.in

# CORS
CORS_ORIGIN=https://www.mediacareers.in
```

### 4. Database Setup (MongoDB Atlas)

1. Create cluster on MongoDB Atlas
2. Create database user with strong password
3. Whitelist Render IPs (or allow from anywhere: `0.0.0.0/0`)
4. Get connection string
5. Add to Render environment variables

## Post-Deployment Validation

### Health Checks

After deployment, verify all systems are working:

#### 1. Client Health Check
```bash
# Test homepage loads
curl -I https://www.mediacareers.in
# Expected: HTTP 200

# Verify content
curl https://www.mediacareers.in | grep -i "mediacareers"
# Expected: Page title present
```

#### 2. Backend Health Check

Add health endpoint to backend (`src/routes/health.js`):
```javascript
router.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    testMode: process.env.TEST_MODE === 'true'
  });
});
```

Test:
```bash
curl https://api.mediacareers.in/health
# Expected: {"status":"ok",...}
```

#### 3. Database Connection Check
```bash
curl https://api.mediacareers.in/api/health/db
# Expected: {"status":"connected"}
```

### Smoke Tests

Create a simple smoke test script (`scripts/smoke-test.sh`):

```bash
#!/bin/bash
set -e

echo "🔍 Running smoke tests..."

# Test client
echo "Testing client..."
STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://www.mediacareers.in)
if [ "$STATUS" -ne 200 ]; then
  echo "❌ Client health check failed (HTTP $STATUS)"
  exit 1
fi
echo "✓ Client is up"

# Test API
echo "Testing API..."
STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://api.mediacareers.in/health)
if [ "$STATUS" -ne 200 ]; then
  echo "❌ API health check failed (HTTP $STATUS)"
  exit 1
fi
echo "✓ API is up"

# Test API response
echo "Testing API response..."
RESPONSE=$(curl -s https://api.mediacareers.in/health)
if ! echo "$RESPONSE" | grep -q "ok"; then
  echo "❌ API response invalid"
  exit 1
fi
echo "✓ API responding correctly"

echo "✅ All smoke tests passed!"
```

Make it executable:
```bash
chmod +x scripts/smoke-test.sh
```

Run after deployment:
```bash
./scripts/smoke-test.sh
```

### Automated Smoke Tests (GitHub Actions)

Add to workflows (`.github/workflows/smoke-test.yml`):

```yaml
name: Smoke Tests

on:
  workflow_dispatch:
  schedule:
    # Run every 6 hours
    - cron: '0 */6 * * *'

jobs:
  smoke-test:
    name: Production Smoke Tests
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Run smoke tests
      run: |
        chmod +x scripts/smoke-test.sh
        ./scripts/smoke-test.sh
    
    - name: Notify on failure
      if: failure()
      run: |
        echo "🚨 Smoke tests failed!"
        # Add notification logic (Slack, email, etc.)
```

## Branch Protection Rules

Configure on GitHub (Settings → Branches → Add rule):

### Main Branch Protection
- ✅ Require pull request reviews before merging (1 approval)
- ✅ Require status checks to pass before merging:
  - Client CI: Lint and Build Client
  - Client CI: Security Audit
  - Client CI: TypeScript Type Check
  - Backend CI: Security Checks
  - Backend CI: Backend Tests & Linting
  - Backend CI: CodeQL Security Scan
  - Backend CI: Validate TEST_MODE Configuration
- ✅ Require branches to be up to date before merging
- ✅ Require conversation resolution before merging
- ✅ Do not allow bypassing the above settings

### Develop Branch Protection (Optional)
- ✅ Require status checks to pass before merging (same as main)
- ⬜ Require pull request reviews (optional for develop)

## Rollback Procedure

If deployment fails or issues are found:

### Vercel Rollback
1. Go to Vercel dashboard → Deployments
2. Find previous working deployment
3. Click "..." → Promote to Production

### Render Rollback
1. Go to Render dashboard → Your service
2. Manual Deploy → Select previous commit
3. Or: Suspend service temporarily

### Quick Hotfix
If urgent fix needed:
```bash
# Create hotfix branch from main
git checkout main
git pull
git checkout -b hotfix/issue-name

# Make minimal fix
# ... edit files ...

# Test locally
npm test
npm run build

# Create PR
git add .
git commit -m "Hotfix: description"
git push origin hotfix/issue-name

# After PR approved, merge and deploy
```

## Monitoring and Alerts

### Recommended Monitoring

1. **Uptime Monitoring**: Use UptimeRobot or similar
   - Monitor: https://www.mediacareers.in
   - Monitor: https://api.mediacareers.in/health
   - Alert: Email/Slack on downtime

2. **Error Tracking**: Use Sentry or similar
   - Frontend errors
   - Backend exceptions
   - Performance monitoring

3. **Log Monitoring**: Use Render logs or external service
   - Application errors
   - Security events
   - Unusual traffic patterns

### Key Metrics to Track

- Response time (< 2s for pages)
- Error rate (< 1%)
- Uptime (> 99.5%)
- Database connection pool
- Memory usage
- API rate limiting hits

## Security Hardening

### Pre-Production Security Checklist

- [ ] All secrets in environment variables (not code)
- [ ] TEST_MODE=true until verified
- [ ] HTTPS enforced (Vercel auto-provides)
- [ ] CORS configured correctly
- [ ] Rate limiting enabled
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS prevention (sanitize inputs)
- [ ] Dependabot enabled for security updates
- [ ] Security alerts enabled on GitHub
- [ ] CodeQL analysis passing
- [ ] No exposed secrets in repository
- [ ] Strong JWT secret (64+ random chars)
- [ ] Database users with minimal permissions
- [ ] Backup strategy for database

### Enabling Dependabot

1. Go to GitHub repo → Settings → Security & analysis
2. Enable:
   - Dependabot alerts
   - Dependabot security updates
   - Dependabot version updates

Add `.github/dependabot.yml`:
```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
  
  - package-ecosystem: "npm"
    directory: "/backend"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
```

## Troubleshooting

### Build Failures

**Issue**: Client build fails with peer dependency errors
```bash
# Solution: Use legacy-peer-deps
npm install --legacy-peer-deps
```

**Issue**: Backend tests fail with database connection errors
```bash
# Solution: Ensure TEST_MODE=true is set
TEST_MODE=true NODE_ENV=test npm test
```

### Deployment Issues

**Issue**: Vercel build fails
1. Check build logs in Vercel dashboard
2. Verify environment variables are set
3. Test build locally with same command
4. Check for case-sensitive file imports

**Issue**: Backend deployment fails on Render
1. Check logs in Render dashboard
2. Verify all environment variables set
3. Check MongoDB connection string
4. Verify port is 3000 or uses PORT env var

**Issue**: CORS errors after deployment
1. Verify CORS_ORIGIN in backend matches frontend URL
2. Check backend is using helmet and cors middleware
3. Test with curl to isolate issue

### DNS Issues

**Issue**: Domain not resolving
1. Wait 24-48 hours for DNS propagation
2. Check DNS records with: `dig mediacareers.in`
3. Verify records match Vercel requirements
4. Clear DNS cache: `sudo dscacheutil -flushcache`

## Next Steps

Once CI is green and deployment is stable:

1. **Re-add Node Matrix**: Test on both Node 18.x and 20.x
2. **Enable Production Mode**: Set TEST_MODE=false (after verification)
3. **Setup Scheduled Scraper**: Use GitHub Actions cron or external scheduler
4. **Add Performance Monitoring**: Setup APM tool
5. **Create Staging Environment**: For pre-production testing
6. **Document Runbooks**: For common operational tasks
7. **Setup On-Call Rotation**: For production support

## Useful Commands

```bash
# Test CI locally (client)
TEST_MODE=true NEXT_PUBLIC_API_URL=http://localhost:3000 npm run build

# Test CI locally (backend)
cd backend && TEST_MODE=true NODE_ENV=test npm test

# Run security checks
./scripts/security-check.sh

# Run smoke tests
./scripts/smoke-test.sh

# Check for secrets in code
git grep -i "password\|secret\|api.key" | grep -v ".md\|example"

# View production logs (Render)
# Use Render dashboard or CLI

# Check site is up
curl -I https://www.mediacareers.in
```

## References

- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

## Support

For issues or questions:
- Open an issue on GitHub
- Check existing documentation
- Email: info@phildass.com
