# MediaCareers.in

MediaCareers.in is an AI-driven job platform focused on careers in the media and aligned industries across India. It connects journalists, editors, sub-editors, copy editors, social media managers, PR and corporate communications professionals, content creators and other media specialists with curated job opportunities and employer profiles.

## About
This project aggregates listings (manual + scraped), offers AI-assisted resume and cover-letter help, and provides a simple membership model:
- Premium membership: Rs 199 for 3 months (placeholder UPI QR/flow for now).
- Juniors/freshers: free membership eligibility determined by experience extracted from uploaded or entered resumes.
- Unlimited applications for premium members while membership is active.

Note: During development and testing, applications and emails are routed to a test address (info@phildass.com) or suppressed depending on TEST_MODE. Do not disable TEST_MODE until you have verified email/payment configurations.

## Features
- AI-powered job matching and job recommendations
- Resume upload (file or pasted text) and basic resume parsing
- AI assistance for writing and tailoring resumes and cover letters
- Job search and listing pages with media-specific categories:
  - Journalism & Reporting
  - Editing & Copy Editing
  - PR & Corporate Communications
  - Social Media Management
  - Content Creation and more
- Employer/company profiles and a directory of media/education institutions
- Free employer job-posting form and admin-curated listings
- Scraper skeleton (must respect robots.txt and site ToS; rate-limited)
- Admin area (hidden link: /admin) protected via environment-configured credentials
- Privacy policy placeholder included in repository

## Getting started (development)
1. Copy `.env.example` to `.env` and update values (do NOT commit `.env`).
2. Install dependencies:
   - Root (client): `npm install --legacy-peer-deps`
   - Backend: `cd backend && npm install`
3. Start development servers:
   - Client: `npm run dev` (Next.js dev server on port 3000)
   - Backend: `cd backend && npm run dev` (API server on port 3000)
   - Both: `npm run dev:full` (runs both servers concurrently)
4. Keep `TEST_MODE=true` while testing so that emails and application deliveries are suppressed or sent to the test address.

## Running CI locally

To test your changes locally before pushing (simulating CI):

### Client Build
```bash
# Build without requiring production secrets
TEST_MODE=true NEXT_PUBLIC_API_URL=http://localhost:3000 npm run build

# Verify the build output
ls -la out/

# Run linting
npm run lint
```

### Backend Tests
```bash
cd backend

# Run tests in TEST_MODE (no real DB/email needed)
TEST_MODE=true NODE_ENV=test npm test

# Run linting
npm run lint
```

### Important: CI uses TEST_MODE=true by default
- All CI workflows automatically set `TEST_MODE=true`
- Builds and tests run without requiring real database credentials
- Email service logs messages instead of sending them
- This ensures CI can run independently without production secrets

## Important configuration
- **TEST_MODE**: when true, the app should not send real emails or applications to scraped employer addresses. Email service will log messages to console instead.
- **ADMIN_USER / ADMIN_PASS**: admin credentials must live in environment variables and never be committed.
- **EMAIL_***: SMTP credentials used only when TEST_MODE=false.
- **MONGODB_URI**: MongoDB connection string. In TEST_MODE or tests, uses in-memory database or local test DB.
- **JWT_SECRET**: Secret key for JWT tokens. Use a strong random string in production.

## Payment
- UPI QR is used as a placeholder in the UI. Implement a secure payment provider and verification flow before enabling real payments and toggling TEST_MODE off.

## Privacy & Compliance
- privacy-policy.md is included as a starter. Update it with legal counsel before launch and ensure scraping follows site terms and data-protection guidance.
- Do not store or share credentials, sensitive personal data, or payment details without proper security and encryption.

## Contributing & Workflow
- Work in feature branches; open focused PRs (small, testable changes).
- Keep secrets out of the repo; add environment variables to `.env` only.
- Add unit tests for critical business logic (resume parsing, application sending).
- Resolve merge conflicts by producing valid JSON or unioned lists (e.g., `.gitignore`) — avoid blindly accepting both sides in editors for JSON files.

## Deployment

MediaCareers.in uses a split deployment architecture:
- **Client (Frontend)**: Deploy to Vercel using Next.js static export
- **Backend (API)**: Deploy separately to Render, Railway, or a VPS

### Quick Start
1. **Deploy Client to Vercel**: Connect your GitHub repository to Vercel and it will auto-deploy the Next.js app
2. **Deploy Backend to Render**: Create a new Web Service on Render pointing to the `backend/` directory
3. **Configure MongoDB**: Use MongoDB Atlas for the production database
4. **Set Environment Variables**: Configure all required environment variables in Vercel (for frontend) and Render/VPS (for backend)

### Detailed Guide
See [docs/deploy-vercel.md](docs/deploy-vercel.md) for comprehensive step-by-step instructions including:
- Vercel deployment and custom domain setup for mediacareers.in
- Backend deployment options (Render vs VPS)
- MongoDB Atlas configuration
- Environment variable reference
- Security checklist
- Troubleshooting common issues

### Important Notes
- Keep `TEST_MODE=true` in backend until email and payment are fully verified
- Never commit secrets or credentials to the repository
- Use Vercel and Render environment variable UIs to manage sensitive configuration
- The backend should be deployed separately from the frontend

## Quick checklist before production
- Replace TEST_MODE with verified email and payment integrations.
- Harden authentication and admin access (replace basic auth with proper user management).
- Verify scrapers respect robots.txt and rate limits.
- Security audit for secrets, dependency vulnerabilities, and input validation.

## License
MIT — see LICENSE file.
