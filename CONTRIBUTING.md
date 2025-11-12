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

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to MediaCareers.in! 🎉
