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
   - Server: `cd server && npm install`
   - Client: `cd client && npm install`
3. Start development servers:
   - Server: `cd server && npm run dev` (or as documented)
   - Client: `cd client && npm start`
4. Keep `TEST_MODE=true` while testing so that emails and application deliveries are suppressed or sent to the test address.

## Important configuration
- TEST_MODE: when true, the app should not send real emails or applications to scraped employer addresses.
- ADMIN_USER / ADMIN_PASS: admin credentials must live in environment variables and never be committed.
- EMAIL_*: SMTP credentials used only when TEST_MODE=false.

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

## Quick checklist before production
- Replace TEST_MODE with verified email and payment integrations.
- Harden authentication and admin access (replace basic auth with proper user management).
- Verify scrapers respect robots.txt and rate limits.
- Security audit for secrets, dependency vulnerabilities, and input validation.

## License
MIT — see LICENSE file.
