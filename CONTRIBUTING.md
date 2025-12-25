# Contributing to Terminal Shell

Thank you for your interest in contributing to Terminal Shell! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## How to Contribute

### Reporting Bugs

If you find a bug, please open an issue with the following information:

- **Clear title**: Brief description of the issue
- **Description**: Detailed explanation of the bug
- **Steps to reproduce**: Step-by-step instructions to reproduce the issue
- **Expected behavior**: What you expected to happen
- **Actual behavior**: What actually happened
- **Browser/Environment**: Browser version, OS, screen size (if relevant)
- **Screenshots**: If applicable, add screenshots to help explain the problem

### Suggesting Features

We welcome feature suggestions! Please open an issue with:

- **Clear title**: Brief description of the feature
- **Use case**: Explain why this feature would be useful
- **Proposed solution**: Describe how you envision the feature working
- **Alternatives**: Any alternative solutions you've considered

### Pull Requests

We actively welcome your pull requests! Follow these steps:

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following our coding standards
3. **Test your changes** across different browsers
4. **Update documentation** if you've made changes to functionality
5. **Ensure code quality** by following the style guide below
6. **Submit your pull request** with a clear description

## Development Setup

1. Fork and clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/terminalllll.git
   cd terminalllll
   ```

2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Start a local development server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Or using Node.js
   npx http-server
   ```

4. Make your changes and test them in the browser

## Coding Standards

### HTML

- Use semantic HTML5 elements
- Include proper attributes (alt text for images, labels for inputs)
- Maintain consistent indentation (4 spaces)
- Use lowercase for element names and attributes
- Close all tags properly

### CSS

- Follow the existing CSS architecture
- Use CSS custom properties for colors and common values
- Maintain mobile-first responsive design
- Keep selectors specific but not overly nested
- Group related styles together
- Add comments for complex styling logic

Example:
```css
/* Component: Feature Card */
.feature-card {
    background: var(--background);
    padding: 32px;
    border-radius: 12px;
}
```

### JavaScript

- Use modern ES6+ syntax
- Declare variables with `const` and `let` (avoid `var`)
- Use descriptive variable and function names
- Add comments for complex logic
- Follow DRY (Don't Repeat Yourself) principles
- Handle errors gracefully
- Validate all user input

Example:
```javascript
// Good
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Avoid
var check = function(e) {
    if (e.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return true;
    return false;
};
```

### Naming Conventions

- **HTML/CSS Classes**: Use kebab-case (`feature-card`, `btn-primary`)
- **JavaScript Variables**: Use camelCase (`isValid`, `emailAddress`)
- **JavaScript Functions**: Use camelCase with verb prefix (`validateForm`, `showError`)
- **Constants**: Use UPPER_SNAKE_CASE (`MAX_LENGTH`, `API_ENDPOINT`)

## Testing

Before submitting a pull request, please test your changes:

### Browser Testing

Test in the following browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Responsive Testing

Test at these viewport sizes:
- Mobile: 320px, 375px, 425px
- Tablet: 768px
- Desktop: 1024px, 1440px, 1920px

### Functional Testing

For UI changes:
- Test all interactive elements (buttons, forms, links)
- Verify form validation works correctly
- Check error states display properly
- Ensure success messages appear as expected

For JavaScript changes:
- Test edge cases
- Verify error handling
- Check browser console for errors

## Commit Messages

Write clear, concise commit messages:

- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Keep first line under 50 characters
- Add detailed description after a blank line if needed

Examples:
```
Good commit messages:
- Add email validation to signup form
- Fix responsive layout on mobile devices
- Update button hover states
- Improve form error messaging

Avoid:
- Fixed stuff
- Updates
- WIP
- asdfasdf
```

## Security

### Reporting Security Issues

If you discover a security vulnerability, please email the maintainers directly instead of opening a public issue.

### Security Best Practices

When contributing:
- Never commit API keys, passwords, or sensitive data
- Validate and sanitize all user input
- Follow OWASP security guidelines
- Use HTTPS in production environments
- Implement proper authentication checks

## Documentation

When adding new features:
- Update the README.md with usage instructions
- Add inline code comments for complex logic
- Update this CONTRIBUTING.md if you change the development workflow
- Include JSDoc comments for JavaScript functions

Example JSDoc:
```javascript
/**
 * Validates an email address format
 * @param {string} email - The email address to validate
 * @returns {boolean} True if email is valid, false otherwise
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
```

## Pull Request Process

1. **Update documentation**: Ensure README and other docs reflect your changes
2. **Test thoroughly**: Verify your changes work as expected
3. **Clean commits**: Squash commits if you have multiple small fixes
4. **Descriptive PR**: Write a clear description of what your PR does
5. **Link issues**: Reference any related issues in your PR description
6. **Be responsive**: Address review comments promptly

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## Testing
- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested in Safari
- [ ] Tested on mobile
- [ ] Tested all form validations

## Screenshots (if applicable)
Add screenshots of UI changes

## Related Issues
Fixes #123
```

## Questions?

If you have questions about contributing, feel free to:
- Open an issue with the "question" label
- Check existing issues and discussions
- Review the README.md for project information

## Recognition

All contributors will be recognized in the project. Thank you for helping make Terminal Shell better!

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.
