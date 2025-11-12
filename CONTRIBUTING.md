# Contributing to MediaCareers.in

Thank you for your interest in contributing to MediaCareers.in! This document provides guidelines for the PR-based development workflow.

## Development Approach

This project follows a **small, focused PR** strategy for easier review and incremental merging.

## Planned PRs

### ✅ PR A: Backend Skeleton + User Model + Register Endpoint + Welcome Email Stub (COMPLETED)
- Backend architecture with Express.js
- User model and authentication endpoints
- Email service with TEST_MODE
- Comprehensive tests
- Security features

### 🔜 PR B: Frontend Landing Page + Signup Form + Styles
**Objectives:**
- Create React-based frontend
- Landing page with attractive design
- Signup form integrated with backend
- Lavender (#e6d5f0) and red (#ff6b6b) color scheme
- Responsive design

**Requirements:**
- Must connect to `/api/auth/register` endpoint
- Form validation on frontend
- Display success/error messages
- Match the email template styling

### 🔜 PR C: Resume Upload Endpoint + Naive Resume Parser + Membership Eligibility
**Objectives:**
- Resume upload endpoint
- Basic resume parser (extract name, email, skills, experience)
- Membership eligibility logic based on resume
- File validation and storage

**Requirements:**
- Support PDF and DOCX formats
- Parse common resume sections
- Store parsed data in user profile
- Unit tests for parser logic

### 🔜 PR D: Job Model + Listing Endpoints + Admin Basic Auth Route
**Objectives:**
- Job posting model (title, description, company, location, requirements)
- CRUD endpoints for jobs
- Public job listing endpoint
- Admin authentication route
- Admin-only job management

**Requirements:**
- Job schema with validation
- Public GET endpoint for listings
- Protected POST/PUT/DELETE for admins
- Pagination support
- Basic search/filter functionality

### 🔜 PR E: Scraper Skeleton (Respect robots.txt) with Unit Tests
**Objectives:**
- Web scraper skeleton for job sites
- robots.txt compliance
- Rate limiting to be respectful
- Error handling and retries
- Unit tests

**Requirements:**
- Respect robots.txt rules
- Configurable scraping targets
- Parse job listings to standard format
- Store scraped jobs in database
- Comprehensive tests

### 🔜 PR F: AI Integration Stubs (Endpoints) with Mock Responses
**Objectives:**
- AI endpoints for resume analysis
- Job recommendation endpoint
- Resume improvement suggestions
- Mock responses for testing

**Requirements:**
- Endpoint structure for AI features
- Mock/stub responses
- Documentation for future AI integration
- Tests with mock data

## Development Workflow

### 1. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes
- Follow existing code style
- Keep changes focused and minimal
- Add tests for new features
- Update documentation

### 3. Run Tests
```bash
cd backend
npm test
npm run lint
```

### 4. Run Security Checks
```bash
./scripts/security-check.sh
```

### 5. Commit Changes
```bash
git add .
git commit -m "Descriptive commit message"
```

### 6. Push and Create PR
```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## Code Standards

### Backend (Node.js/Express)

- **ES6+**: Use modern JavaScript features
- **Async/Await**: Prefer async/await over callbacks
- **Error Handling**: Always handle errors properly
- **Validation**: Validate all inputs using Joi
- **Security**: Never commit secrets, use environment variables
- **Testing**: Write unit and integration tests
- **Documentation**: Comment complex logic, update README

### Code Style

- Use ESLint configuration provided
- 2 spaces for indentation
- Single quotes for strings
- Semicolons required
- Meaningful variable names

## Testing Requirements

### Critical Pieces Requiring Tests

1. **Authentication Flow**: Registration, login, JWT validation
2. **Resume Parser**: Extraction logic, format handling
3. **Application Logic**: Job application submission
4. **Input Validation**: All user inputs
5. **Security Features**: Authentication, authorization

### Test Structure

```
backend/tests/
├── unit/           # Unit tests for individual functions
└── integration/    # Integration tests for API endpoints
```

### Running Tests

```bash
# All tests
npm test

# Unit tests only
npm run test:unit

# Integration tests only
npm run test:integration

# Watch mode (for development)
npm run test:watch
```

## Security Guidelines

### Required Checks

1. **No Secrets in Code**: All secrets in environment variables
2. **TEST_MODE**: Email sending disabled during development
3. **Input Validation**: Validate all user inputs
4. **Authentication**: Protect sensitive endpoints
5. **Password Security**: Hash passwords with bcrypt
6. **SQL Injection**: Use parameterized queries
7. **XSS Prevention**: Sanitize user inputs

### Security Check Script

Run before every commit:
```bash
./scripts/security-check.sh
```

## Environment Variables

All configuration through environment variables:

1. Copy `.env.example` to `.env`
2. Update with your values
3. Never commit `.env` file
4. Document new variables in `.env.example` and README

## PR Review Checklist

Before submitting a PR, ensure:

- [ ] Tests written and passing (30/30 or more)
- [ ] Linting passes (`npm run lint`)
- [ ] Security check passes (`./scripts/security-check.sh`)
- [ ] Documentation updated (README, comments)
- [ ] Environment variables documented in `.env.example`
- [ ] No secrets committed
- [ ] TEST_MODE=true for development features
- [ ] Code follows project style guidelines
- [ ] Changes are minimal and focused

## PR Review Focus

Reviewers will focus on:

1. **Tests**: Are critical paths tested?
2. **Input Validation**: Are all inputs validated?
3. **Documentation**: Are env vars and setup steps documented?
4. **Security**: No secrets, proper authentication?
5. **Code Quality**: Clean, maintainable code?

## Questions?

For questions or clarifications, please open an issue on GitHub.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
