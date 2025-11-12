# Contributing to MediaCareers.in

Thank you for your interest in contributing to MediaCareers.in! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- Clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (OS, Node version, etc.)

### Suggesting Features

We welcome feature suggestions! Please:
- Check if the feature is already requested
- Provide a clear use case
- Explain how it benefits users
- Consider implementation complexity

### Code Contributions

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Update documentation as needed

4. **Test your changes**
   ```bash
   npm test
   npm run lint
   ```

5. **Commit your changes**
   ```bash
   git commit -m "Add: Brief description of your changes"
   ```
   
   Commit message format:
   - `Add:` for new features
   - `Fix:` for bug fixes
   - `Update:` for updates to existing features
   - `Refactor:` for code refactoring
   - `Docs:` for documentation changes

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Provide a clear title and description
   - Reference any related issues
   - Include screenshots for UI changes

## Development Setup

### Prerequisites
- Node.js v18 or higher
- MongoDB (local or Atlas)
- OpenAI API key (for AI features)

### Setup Steps

1. Clone your fork
   ```bash
   git clone https://github.com/YOUR_USERNAME/mediacareers.in.git
   cd mediacareers.in
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Configure environment
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Seed the database (optional)
   ```bash
   npm run seed
   ```

5. Start development server
   ```bash
   npm run dev
   ```

## Project Structure

```
mediacareers.in/
├── server/              # Backend code
│   ├── config/         # Configuration files
│   ├── controllers/    # Request handlers
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── middleware/     # Custom middleware
│   ├── utils/          # Utility functions
│   └── index.js        # Server entry point
├── scripts/            # Utility scripts
├── tests/              # Test files
└── package.json        # Dependencies and scripts
```

## Coding Standards

### JavaScript Style
- Use ES6+ features
- Use `const` and `let`, avoid `var`
- Use async/await over callbacks
- Add semicolons
- Use meaningful variable names
- Keep functions small and focused

### Error Handling
- Always handle errors properly
- Use try-catch for async operations
- Return meaningful error messages
- Log errors for debugging

### API Design
- Follow RESTful conventions
- Use appropriate HTTP methods
- Return consistent response formats
- Include proper status codes

### Example Response Format
```javascript
// Success
{
  success: true,
  data: { /* response data */ },
  message: "Operation successful"
}

// Error
{
  success: false,
  message: "Error description"
}
```

## Testing

### Writing Tests
- Write tests for new features
- Maintain test coverage above 70%
- Test both success and failure cases
- Use descriptive test names

### Running Tests
```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- tests/api.test.js
```

## Documentation

- Update API_DOCUMENTATION.md for API changes
- Update README.md for setup changes
- Add inline comments for complex logic
- Document new environment variables

## Database Changes

- Create migration scripts if needed
- Update seed data if applicable
- Document schema changes
- Test with fresh database

## Security

- Never commit sensitive data
- Use environment variables for secrets
- Validate all user inputs
- Sanitize data before database operations
- Follow OWASP security practices

## Pull Request Checklist

Before submitting a PR, ensure:
- [ ] Code follows project style guidelines
- [ ] Tests pass (`npm test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Documentation is updated
- [ ] No sensitive data in code
- [ ] Commit messages are clear
- [ ] PR description is detailed

## Review Process

1. Automated checks run on PR
2. Code review by maintainers
3. Requested changes (if any)
4. Approval and merge

## Questions?

If you have questions:
- Check existing documentation
- Search closed issues
- Open a new issue for discussion
- Email: info@phildass.com
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

---

Thank you for contributing to MediaCareers.in! 🎉
