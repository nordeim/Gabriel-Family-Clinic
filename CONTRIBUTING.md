# Contributing to Gabriel Family Clinic

Thank you for your interest in contributing to the Gabriel Family Clinic healthcare platform! This document provides guidelines and information for contributors.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Standards](#development-standards)
- [Healthcare Considerations](#healthcare-considerations)
- [Accessibility Requirements](#accessibility-requirements)
- [Testing Guidelines](#testing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Development Workflow](#development-workflow)
- [Documentation Standards](#documentation-standards)
- [Performance Guidelines](#performance-guidelines)

## 🤝 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

### Our Pledge

We are committed to making participation in this project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Healthcare Focus

As this is a healthcare platform, we have additional responsibilities:
- **Patient Privacy:** All contributions must maintain HIPAA compliance
- **Medical Accuracy:** Healthcare content must be reviewed by qualified professionals
- **Accessibility:** We serve elderly patients with specific accessibility needs
- **Cultural Sensitivity:** Respect for diverse healthcare needs and cultural backgrounds

## 🚀 Getting Started

### Prerequisites

**⚠️ IMPORTANT:** This project requires Node.js version **≥20.9.0**

```bash
# Verify Node.js version
node --version  # Should be ≥20.9.0

# Verify pnpm installation
pnpm --version
```

### Development Environment Setup

```bash
# Clone the repository
git clone https://github.com/nordeim/Gabriel-Family-Clinic.git
cd Gabriel-Family-Clinic/gabriel-clinic

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run tests to verify setup
pnpm test

# Open http://localhost:3000 in your browser
```

## 📝 Development Standards

### Code Quality Requirements

1. **TypeScript Strict Mode:**
   ```bash
   # Type checking must pass
   pnpm type-check
   
   # No TypeScript errors allowed
   pnpm tsc --noEmit
   ```

2. **ESLint Compliance:**
   ```bash
   # All ESLint rules must pass
   pnpm lint
   
   # Fix auto-fixable issues
   pnpm lint --fix
   ```

3. **Code Formatting:**
   ```bash
   # Code must be formatted with Prettier
   pnpm format
   
   # Verify formatting
   pnpm format:check
   ```

4. **Test Coverage:**
   ```bash
   # All tests must pass
   pnpm test
   
   # Coverage must be ≥80%
   pnpm test:coverage
   ```

### Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): description

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

**Examples:**
```bash
feat(components): add new accessibility component for skip links
fix(seo): resolve structured data validation errors
docs(readme): update installation instructions for Node.js 20+
test(components): add unit tests for elder-friendly button component
```

### File Naming Conventions

- **Components:** PascalCase (e.g., `ElderButton.tsx`, `TestimonialCard.tsx`)
- **Utilities:** camelCase (e.g., `analytics.ts`, `utils.ts`)
- **Types:** camelCase with `.ts` extension (e.g., `testimonial.ts`)
- **Constants:** UPPER_SNAKE_CASE (e.g., `DESIGN_TOKENS.ts`)
- **Tests:** ComponentName.test.tsx (e.g., `elder-button.test.tsx`)

## 🏥 Healthcare Considerations

### Medical Content Standards

1. **Medical Accuracy:**
   - All healthcare content must be reviewed by qualified medical professionals
   - Use evidence-based medical information
   - Include appropriate medical disclaimers where required
   - Avoid making specific medical recommendations

2. **Patient Privacy (HIPAA Compliance):**
   - Never commit patient data or personal health information
   - Use environment variables for sensitive configuration
   - Follow HIPAA guidelines for analytics and tracking
   - Implement proper data encryption and security measures

3. **Trust Signals:**
   - Highlight board-certified physicians and credentials
   - Include years of experience and specializations
   - Display patient testimonials and reviews appropriately
   - Maintain professional medical standards throughout

4. **Legal Compliance:**
   - Include medical disclaimers for healthcare content
   - Follow healthcare advertising regulations
   - Ensure accessibility compliance (ADA, WCAG)
   - Maintain proper licensing and certification information

### Cultural Sensitivity

1. **Singapore Healthcare:**
   - Support CHAS healthcare system integration
   - Use British English spelling and formatting
   - Respect local healthcare customs and preferences
   - Include Singapore-specific healthcare information

2. **Elder-Friendly Design:**
   - Maintain 18px minimum font size
   - Ensure 44px+ touch targets
   - Support high contrast (7:1 ratio minimum)
   - Provide clear navigation and simple language

## ♿ Accessibility Requirements

### WCAG AAA Compliance

All contributions must maintain WCAG AAA accessibility standards:

1. **Visual Accessibility:**
   - Maintain 7:1 contrast ratio for all text
   - Use color-blind friendly palettes
   - Support text size adjustments (up to 200%)
   - Provide clear visual hierarchy

2. **Motor Accessibility:**
   - Ensure 44px minimum touch targets
   - Support keyboard-only navigation
   - Provide sufficient spacing between interactive elements
   - Avoid time-based interactions without alternatives

3. **Cognitive Accessibility:**
   - Use simple, clear language
   - Provide consistent navigation
   - Include clear error messages and instructions
   - Avoid complex mental models

4. **Screen Reader Support:**
   - Include proper ARIA labels and descriptions
   - Use semantic HTML elements
   - Provide alternative text for images
   - Support live regions for dynamic content

### Accessibility Testing

```bash
# Run accessibility tests
pnpm test:accessibility

# Test with screen readers
# - NVDA (Windows)
# - JAWS (Windows)
# - VoiceOver (macOS)
# - Orca (Linux)

# Verify keyboard navigation
# - Tab through all interactive elements
# - Ensure visible focus indicators
# - Test skip links functionality
```

## 🧪 Testing Guidelines

### Testing Standards

1. **Unit Testing (Jest):**
   - Minimum 80% code coverage
   - Test all component props and variants
   - Include accessibility testing for components
   - Mock external dependencies

2. **Accessibility Testing (jest-axe):**
   - Include accessibility tests for all components
   - Test with automated axe-core integration
   - Verify WCAG AAA compliance
   - Test with different screen reader configurations

3. **Cross-Browser Testing (Playwright):**
   - Test on Chrome, Firefox, Safari, Edge
   - Include mobile device testing
   - Verify accessibility across browsers
   - Test performance on different devices

### Writing Tests

```typescript
// Component testing example
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import ElderButton from '../elder-button';

expect.extend(toHaveNoViolations);

describe('ElderButton', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      <ElderButton variant="primary" size="large">
        Test Button
      </ElderButton>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should render with correct accessibility attributes', () => {
    render(
      <ElderButton variant="primary" aria-label="Test button">
        Test Button
      </ElderButton>
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Test button');
  });
});
```

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run specific test file
pnpm test elder-button.test.tsx

# Run accessibility tests
pnpm test:accessibility

# Run cross-browser tests
pnpm test:cross-browser

# Generate coverage report
pnpm test:coverage
```

## 🔄 Pull Request Process

### Before Submitting

1. **Run Quality Checks:**
   ```bash
   pnpm type-check
   pnpm lint
   pnpm format
   pnpm test
   pnpm test:coverage
   ```

2. **Verify Accessibility:**
   ```bash
   pnpm test:accessibility
   ```

3. **Test Performance:**
   ```bash
   pnpm build
   pnpm export
   # Verify bundle size remains under 300KB
   ```

### Pull Request Template

```markdown
## Description
Brief description of changes made

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Healthcare Considerations
- [ ] Medical content reviewed and accurate
- [ ] HIPAA compliance maintained
- [ ] Accessibility standards met (WCAG AAA)
- [ ] Cultural sensitivity considered

## Testing
- [ ] All tests pass
- [ ] Accessibility tests pass
- [ ] Cross-browser testing completed
- [ ] Performance benchmarks maintained

## Screenshots (if applicable)
Add screenshots for visual changes

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Code is well-commented
- [ ] Documentation updated
- [ ] Tests added/updated for changes
```

### Review Process

1. **Automated Checks:**
   - TypeScript compilation
   - ESLint validation
   - Test execution
   - Accessibility testing
   - Bundle size validation

2. **Code Review:**
   - Healthcare content accuracy
   - Accessibility compliance
   - Performance impact
   - Documentation completeness
   - Cultural sensitivity

3. **Manual Testing:**
   - Cross-browser compatibility
   - Screen reader testing
   - Keyboard navigation
   - Mobile responsiveness

## 🛠️ Development Workflow

### Branch Strategy

- `main`: Production-ready code
- `develop`: Integration branch for features
- `feature/feature-name`: Feature development
- `fix/issue-name`: Bug fixes
- `docs/documentation-name`: Documentation updates

### Feature Development

```bash
# Create feature branch
git checkout -b feature/new-accessibility-component

# Make changes and commit
git add .
git commit -m "feat(accessibility): add new skip link component"

# Push and create PR
git push origin feature/new-accessibility-component
```

### Code Review Guidelines

**For Reviewers:**
- Check healthcare content accuracy
- Verify accessibility compliance
- Ensure performance standards
- Review documentation completeness
- Test cross-browser compatibility

**For Contributors:**
- Respond to feedback promptly
- Make requested changes
- Update documentation as needed
- Re-run tests after modifications

## 📚 Documentation Standards

### Code Documentation

1. **Component Documentation:**
   ```typescript
   /**
    * ElderButton - Accessible button component for elderly users
    * 
    * Features:
    * - WCAG AAA compliant with 7:1 contrast ratios
    * - Minimum 44px touch targets
    * - Screen reader support with ARIA labels
    * - Reduced motion support
    * 
    * @example
    * ```tsx
    * <ElderButton variant="primary" size="large">
    *   Schedule Appointment
    * </ElderButton>
    * ```
    */
   ```

2. **Utility Function Documentation:**
   ```typescript
   /**
    * Calculates WCAG AAA compliant text colors
    * @param backgroundColor - Background color in hex format
    * @param textSize - Font size in pixels
    * @returns Hex color for text that meets 7:1 contrast ratio
    */
   export function calculateAccessibleTextColor(
     backgroundColor: string,
     textSize: number
   ): string
   ```

### README Updates

- Update main README.md for new features
- Add examples for new components
- Update installation instructions if needed
- Include performance metrics for changes

## ⚡ Performance Guidelines

### Bundle Size Limits

- **First Load JS:** <300KB (target: 232KB)
- **Total Bundle:** <1.5MB (target: 1.3MB)
- **SEO Impact:** <5KB (target: ~4KB)

### Performance Testing

```bash
# Build and analyze bundle
pnpm build
pnpm analyze

# Performance testing
pnpm test:performance

# Lighthouse audit
pnpm lighthouse
```

### Optimization Guidelines

1. **Code Splitting:**
   - Use dynamic imports for large components
   - Lazy load non-critical features
   - Minimize initial bundle size

2. **Image Optimization:**
   - Use appropriate image formats (WebP, AVIF)
   - Implement responsive images
   - Optimize for different screen sizes

3. **Caching Strategy:**
   - Leverage browser caching
   - Implement service worker caching
   - Use CDN for static assets

## 🆘 Getting Help

### Communication Channels

- **GitHub Issues:** For bug reports and feature requests
- **GitHub Discussions:** For questions and general discussion
- **Documentation:** Check comprehensive guides in `/docs`

### Healthcare Questions

For medical content accuracy and healthcare-specific questions:
- **Medical Review:** Required for all healthcare content changes
- **HIPAA Compliance:** Contact the healthcare compliance team
- **Accessibility:** Consult accessibility guidelines in `/docs/DESIGN_SYSTEM.md`

### Technical Support

- **Documentation:** [Project_Architecture_Document.md](Project_Architecture_Document.md)
- **Design System:** [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md)
- **SEO Guide:** [docs/SEO_IMPLEMENTATION.md](docs/SEO_IMPLEMENTATION.md)

## 🎯 Contribution Areas

We welcome contributions in these areas:

1. **Accessibility Improvements:**
   - Enhanced screen reader support
   - Better keyboard navigation
   - Improved color contrast solutions

2. **Performance Optimization:**
   - Bundle size reduction
   - Loading performance improvements
   - Core Web Vitals optimization

3. **Healthcare Features:**
   - CHAS integration improvements
   - Medical content enhancement
   - Patient journey optimization

4. **Internationalization:**
   - Multi-language support
   - Cultural adaptation
   - Regional healthcare system integration

5. **Testing Infrastructure:**
   - Enhanced test coverage
   - Automated accessibility testing
   - Cross-browser compatibility improvements

## 📞 Contact Information

**Development Team:**
- **Lead Developer:** MiniMax Agent
- **Project Type:** Healthcare Web Platform
- **Specialization:** Elder-friendly accessibility, WCAG AAA compliance

**Healthcare Information:**
- **Emergency:** +1-555-URGENT
- **Main Clinic:** +1-555-CLINIC
- **Website:** https://c5g75qzy047a.space.minimax.io

---

**Thank you for contributing to Gabriel Family Clinic!**  
*Together, we're building a more accessible and user-friendly healthcare platform for everyone.*

**Remember:** Every contribution helps improve healthcare accessibility for elderly patients and their families.
