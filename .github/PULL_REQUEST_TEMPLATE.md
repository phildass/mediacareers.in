## Description
<!-- Provide a brief description of the changes in this PR -->

## Related Issue
<!-- Link to the issue this PR addresses, if applicable -->
Closes #

## Type of Change
<!-- Mark with an 'x' all that apply -->

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Refactoring (no functional changes)
- [ ] Performance improvement
- [ ] Security fix

## PR Checklist
<!-- Mark with an 'x' when completed -->

### Code Quality
- [ ] Code follows the project's style guidelines
- [ ] Self-review of code has been performed
- [ ] Code is well-commented, particularly in complex areas
- [ ] No unnecessary console.log statements or debug code

### Testing
- [ ] Unit tests have been added/updated
- [ ] Integration tests have been added/updated (if applicable)
- [ ] All tests pass locally (`npm test`)
- [ ] Test coverage is adequate for new code
- [ ] Manual testing has been performed (see testing notes below)

### Security
- [ ] Security check script passes (`./scripts/security-check.sh`)
- [ ] No secrets or credentials committed
- [ ] TEST_MODE properly configured (true for dev features)
- [ ] Input validation added for all user inputs
- [ ] Authentication/authorization properly implemented
- [ ] No SQL injection vulnerabilities
- [ ] No XSS vulnerabilities

### Documentation
- [ ] README updated (if needed)
- [ ] CONTRIBUTING.md updated (if needed)
- [ ] Environment variables documented in `.env.example`
- [ ] API documentation updated (if new endpoints added)
- [ ] Code comments added/updated

### Build & Deploy
- [ ] Linting passes (`npm run lint`)
- [ ] Build succeeds (if applicable)
- [ ] No new warnings or errors
- [ ] `.gitignore` updated (if new artifacts generated)

## Testing Notes
<!-- Describe the testing you performed -->

### Manual Testing Performed
<!-- List the manual test scenarios you executed -->

- [ ] Test scenario 1: ...
- [ ] Test scenario 2: ...

### Test Results
<!-- Paste relevant test output -->

```
# npm test output
Test Suites: X passed, X total
Tests: X passed, X total
```

## Security Summary
<!-- Required for all PRs -->

### Vulnerabilities Found
<!-- List any security vulnerabilities discovered -->
- [ ] No vulnerabilities found
- [ ] Vulnerabilities found and fixed (describe below)
- [ ] Known vulnerabilities (not fixed - requires discussion)

### Security Features
<!-- List security features added/modified -->

- [ ] Input validation
- [ ] Authentication
- [ ] Authorization
- [ ] Password hashing
- [ ] Rate limiting
- [ ] Other: ...

## Changes Made
<!-- Provide detailed list of changes -->

### Added
- 

### Changed
-

### Removed
-

### Fixed
-

## Database Changes
<!-- If applicable, describe any database schema changes -->

- [ ] No database changes
- [ ] New models/collections added
- [ ] Schema modifications
- [ ] Migration script needed

## Breaking Changes
<!-- If applicable, describe any breaking changes -->

- [ ] No breaking changes
- [ ] Breaking changes (describe below)

## Screenshots
<!-- If UI changes, add screenshots -->

## Deployment Notes
<!-- Any special deployment considerations -->

- [ ] No special deployment steps
- [ ] Environment variables need to be added/updated
- [ ] Database migration required
- [ ] Other: ...

## Additional Context
<!-- Add any other context about the PR here -->

## Reviewer Notes
<!-- Any specific areas you'd like reviewers to focus on -->

---

**By submitting this PR, I confirm that:**
- [ ] I have read and followed the CONTRIBUTING.md guidelines
- [ ] All checklist items above are completed
- [ ] This PR is ready for review
