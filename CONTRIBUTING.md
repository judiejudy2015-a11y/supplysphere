# Contributing to SupplySphere Frontend

> Thank you for your interest in contributing to SupplySphere! 🌐✨

We appreciate your help in making supply chain transparency accessible to everyone. This guide will help you get started with contributing to our frontend application.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Design System](#design-system)
- [Testing](#testing)

## 🤝 Code of Conduct

This project adheres to a code of conduct that ensures a welcoming environment for all contributors. By participating, you're expected to uphold these standards:

- **Be respectful** and inclusive in all interactions
- **Be collaborative** and open to feedback
- **Be patient** with newcomers and those learning
- **Focus on what's best** for the supply chain transparency community

Report any unacceptable behavior to [conduct@supplysphere.app](mailto:conduct@supplysphere.app).

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm**, **yarn**, or **pnpm**
- **Git** ([Download](https://git-scm.com/))
- A code editor (we recommend [VS Code](https://code.visualstudio.com/))

### Fork & Clone

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:

```bash
git clone https://github.com/YOUR_USERNAME/supplysphere-frontend.git
cd supplysphere-frontend
```

3. **Add upstream** remote:

```bash
git remote add upstream https://github.com/supplysphere/supplysphere-frontend.git
```

### Setup Development Environment

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

## 🔄 Development Workflow

### 1. Stay Updated

Always sync with the latest changes:

```bash
git checkout main
git pull upstream main
git push origin main
```

### 2. Create Feature Branch

Create a descriptive branch name:

```bash
# Feature branches
git checkout -b feature/ai-assistant-integration
git checkout -b feature/mobile-dashboard-optimization

# Bug fix branches  
git checkout -b fix/qr-scanner-camera-permissions
git checkout -b fix/dark-mode-theme-switching

# Documentation branches
git checkout -b docs/api-integration-guide
```

### 3. Make Changes

- Write clean, well-documented code
- Follow our [coding standards](#coding-standards)
- Add tests for new functionality
- Update documentation as needed

### 4. Test Your Changes

```bash
# Run all tests
npm test

# Run linting
npm run lint

# Run type checking
npm run type-check

# Build project
npm run build
```

### 5. Commit & Push

```bash
git add .
git commit -m "feat: add AI assistant natural language queries"
git push origin your-branch-name
```

## 📝 Coding Standards

### TypeScript Guidelines

```typescript
// ✅ Good: Use proper typing
interface Product {
  id: string
  name: string
  batchId: string
  status: 'active' | 'inactive' | 'recalled'
}

// ✅ Good: Use descriptive function names
const fetchProductsBySupplier = async (supplierId: string): Promise<Product[]> => {
  // Implementation
}

// ❌ Avoid: Any types
const data: any = await fetchData() // Don't do this

// ✅ Good: Proper error handling
try {
  const products = await apiClient.get('/products')
  return products.data
} catch (error) {
  logger.error('Failed to fetch products:', error)
  throw new Error('Unable to load products')
}
```

### React Component Guidelines

```tsx
// ✅ Good: Functional components with proper props typing
interface DashboardCardProps {
  title: string
  value: string | number
  trend?: 'up' | 'down' | 'neutral'
  className?: string
}

export function DashboardCard({ title, value, trend, className }: DashboardCardProps) {
  return (
    <Card className={cn('supplysphere-glow', className)}>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {trend && <TrendIndicator trend={trend} />}
      </CardContent>
    </Card>
  )
}

// ✅ Good: Custom hooks for logic separation
export function useSupplyChainData(supplierId: string) {
  const [data, setData] = useState<SupplyChainData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Fetch logic here
  }, [supplierId])

  return { data, loading, error }
}
```

### CSS/Styling Guidelines

```css
/* ✅ Good: Use CSS custom properties from our design system */
.dashboard-header {
  background: var(--color-background);
  border-bottom: 1px solid var(--color-border);
  color: var(--color-foreground);
}

/* ✅ Good: Use utility classes with custom CSS when needed */
.product-card {
  @apply rounded-lg border bg-card text-card-foreground shadow-sm;
}

.product-card:hover {
  @apply supplysphere-glow;
}

/* ❌ Avoid: Hard-coded colors */
.bad-example {
  background-color: #1e3a8a; /* Use var(--color-primary) instead */
}
```

## 📋 Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- **feat**: New feature for users
- **fix**: Bug fix for users
- **docs**: Documentation changes
- **style**: Code style changes (formatting, missing semi-colons, etc)
- **refactor**: Code refactoring without feature changes
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Build process or auxiliary tool changes

### Examples

```bash
# Features
git commit -m "feat(dashboard): add real-time inventory alerts"
git commit -m "feat(ai): integrate natural language query processing"

# Bug fixes
git commit -m "fix(qr-scanner): resolve camera permission handling"
git commit -m "fix(auth): prevent token expiry race condition"

# Documentation
git commit -m "docs(api): add blockchain integration examples"

# Refactoring
git commit -m "refactor(components): extract reusable chart components"
```

## 🔍 Pull Request Process

### Before Opening a PR

- [ ] Code follows our style guidelines
- [ ] Tests pass locally (`npm test`)
- [ ] Linting passes (`npm run lint`)
- [ ] TypeScript compilation succeeds (`npm run type-check`)
- [ ] Build succeeds (`npm run build`)
- [ ] Self-review completed
- [ ] Related documentation updated

### PR Template

```markdown
## Description
Brief description of changes and motivation.

## Type of Change
- [ ] 🐛 Bug fix (non-breaking change fixing an issue)
- [ ] ✨ New feature (non-breaking change adding functionality)
- [ ] 💥 Breaking change (fix or feature causing existing functionality to change)
- [ ] 📚 Documentation update
- [ ] 🧹 Code refactoring

## Testing
- [ ] Unit tests added/updated
- [ ] E2E tests added/updated
- [ ] Manual testing completed

## Screenshots (if applicable)
Add screenshots showing the changes.

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where necessary
- [ ] I have updated relevant documentation
- [ ] My changes generate no new warnings
```

### Review Process

1. **Automated checks** must pass (CI/CD pipeline)
2. **Code review** by at least one maintainer
3. **Design review** for UI/UX changes
4. **Testing** in staging environment
5. **Approval** from project maintainer

## 🐛 Issue Guidelines

### Before Creating an Issue

1. **Search existing issues** to avoid duplicates
2. **Check documentation** for common solutions
3. **Test with latest version** to ensure issue exists

### Issue Types

#### 🐛 Bug Report
```markdown
**Bug Description**
A clear description of the bug.

**Steps to Reproduce**
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected Behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g., macOS, Windows, Linux]
- Browser: [e.g., Chrome, Firefox, Safari]
- Version: [e.g., 1.0.0]
```

#### ✨ Feature Request
```markdown
**Feature Description**
Clear description of the feature you'd like to see.

**Problem Statement**
What problem does this solve?

**Proposed Solution**
How should this feature work?

**Alternatives Considered**
Any alternative solutions or features considered?

**Additional Context**
Add any other context about the feature request.
```

## 🎨 Design System

### Brand Colors

Always use our CSS custom properties:

```css
/* Primary colors */
--color-primary: oklch(0.65 0.16 162.5);        /* SupplySphere Green */
--color-foreground: oklch(0.25 0.08 248.5);     /* SupplySphere Navy */

/* Usage in components */
.cta-button {
  background: var(--color-primary);
  color: var(--color-primary-foreground);
}
```

### Component Patterns

```tsx
// ✅ Good: Consistent component structure
interface ComponentProps {
  // Props definition
}

export function Component({ ...props }: ComponentProps) {
  // Hooks
  // Event handlers
  // Render
  return (
    <div className="component-wrapper">
      {/* JSX */}
    </div>
  )
}
```

### Responsive Design

```css
/* Mobile-first approach */
.dashboard-grid {
  @apply grid grid-cols-1 gap-4;
}

/* Tablet */
@media (min-width: 768px) {
  .dashboard-grid {
    @apply grid-cols-2;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .dashboard-grid {
    @apply grid-cols-3;
  }
}
```

## 🧪 Testing

### Unit Tests

```typescript
// Example test file: __tests__/components/ProductCard.test.tsx
import { render, screen } from '@testing-library/react'
import { ProductCard } from '@/components/ProductCard'

describe('ProductCard', () => {
  it('displays product information correctly', () => {
    const product = {
      id: '1',
      name: 'Organic Tomatoes',
      batchId: 'BATCH123',
      status: 'active' as const
    }

    render(<ProductCard product={product} />)
    
    expect(screen.getByText('Organic Tomatoes')).toBeInTheDocument()
    expect(screen.getByText('BATCH123')).toBeInTheDocument()
  })
})
```

### E2E Tests

```typescript
// Example: tests/e2e/dashboard.spec.ts
import { test, expect } from '@playwright/test'

test('supplier can add new product', async ({ page }) => {
  await page.goto('/dashboard/supplier')
  
  await page.click('[data-testid="add-product-button"]')
  await page.fill('[data-testid="product-name"]', 'Test Product')
  await page.fill('[data-testid="batch-id"]', 'TEST001')
  await page.click('[data-testid="submit-button"]')
  
  await expect(page.locator('[data-testid="success-message"]')).toBeVisible()
})
```

## 🚀 Deployment & Release

### Development Environment
- **Branch**: Any feature branch
- **URL**: `https://dev-supplysphere.vercel.app`
- **Auto-deploy**: On push to feature branches

### Staging Environment
- **Branch**: `develop`
- **URL**: `https://staging-supplysphere.vercel.app`
- **Auto-deploy**: On merge to develop

### Production Environment
- **Branch**: `main`
- **URL**: `https://supplysphere.app`
- **Manual deploy**: After thorough testing

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussions
- **Discord**: [Join our community](https://discord.gg/supplysphere)
- **Email**: [dev@supplysphere.app](mailto:dev@supplysphere.app)

## 🎉 Recognition

Contributors are recognized in:
- **README.md** contributors section
- **Release notes** for significant contributions
- **Hall of Fame** on our website
- **Special mentions** in community updates

---

## Thank You! 🙏

Every contribution, no matter how small, helps make supply chains more transparent and trustworthy. We appreciate your time and effort in making SupplySphere better!

Happy coding! 🚀✨