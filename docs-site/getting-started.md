# Getting Started

> Quick start guide for developers wanting to build, test, and contribute to n8n.

## 1. Prerequisites

| Requirement | Version | Notes |
|-------------|---------|-------|
| Node.js | >= 18.x | LTS recommended |
| pnpm | >= 8.x | Use `npm install -g pnpm` |
| Git | Any recent | For cloning and branching |

## 2. Clone & Install

```bash
# Clone the repository
git clone https://github.com/n8n-io/n8n.git
cd n8n

# Install dependencies (from root)
pnpm install
```

## 3. Build

Build all packages using pnpm workspaces:

```bash
pnpm build
```

> **Note**: Always redirect build output to a file — builds can produce a lot of output:
> ```bash
> pnpm build > build.log 2>&1
> tail -n 20 build.log
> ```

## 4. Development

### Full Stack Development

```bash
pnpm dev
```

This starts:
- Backend server on `http://localhost:5678`
- Frontend editor on `http://localhost:5173`

### Frontend Only

```bash
cd packages/editor-ui
pnpm dev
```

### Backend Only

```bash
cd packages/cli
pnpm dev
```

### AI Development

```bash
pnpm dev:ai
```

## 5. Testing

### Run All Tests

```bash
pnpm test
```

### Run Affected Tests

```bash
pnpm test:affected
```

### Run Specific Test

```bash
cd packages/nodes-base
pnpm test nodes/MyNode/MyNode.test.ts
```

### E2E Tests (Playwright)

```bash
pnpm --filter=n8n-playwright test:local
```

## 6. Code Quality

### Lint

```bash
pnpm lint
```

### Type Check

```bash
pnpm typecheck
```

> **Important**: Always run `typecheck` before committing — especially when changing:
> - Interfaces in `@n8n/api-types`
> - Cross-package dependencies

### Per-Package Development

```bash
cd packages/cli
pnpm lint
pnpm typecheck
```

## 7. Project Structure

### Key Packages

| Package | Path | Purpose |
|---------|------|---------|
| CLI | `packages/cli/` | Express server, REST API |
| Core | `packages/core/` | Workflow execution engine |
| Editor UI | `packages/editor-ui/` | Vue 3 frontend |
| Workflow | `packages/workflow/` | Interfaces and types |
| Nodes Base | `packages/nodes-base/` | 400+ built-in nodes |
| LangChain | `packages/@n8n/nodes-langchain/` | AI/LangChain nodes |
| Design System | `packages/@n8n/design-system/` | Vue component library |

## 8. Branching Strategy

### Create Branch from Linear

When starting work on a Linear ticket:

```bash
git checkout master
git pull origin master
git checkout -b {branch-name-from-linear}
```

### Security Fix Branches

For security fixes, use the naming convention:
```bash
git checkout -b fix/security-{ticket-number}
```

## 9. Commit & Pull Request

### Before Committing

1. Run lint: `pnpm lint`
2. Run typecheck: `pnpm typecheck`
3. Run tests: `pnpm test`

### Create PR

1. Push branch: `git push origin {branch-name}`
2. Create PR via GitHub UI
3. Link Linear ticket in PR description

## 10. Troubleshooting

### Build Errors

```bash
# Check build log
tail -n 50 build.log

# Clean and rebuild
pnpm clean
pnpm install
pnpm build
```

### Hot Reload Not Working

```bash
# Restart the dev server
pnpm dev
```

### Type Errors

```bash
# Run typecheck in affected package
cd packages/cli
pnpm typecheck
```

### Test Failures

```bash
# Run specific test file
pnpm test packages/nodes-base/nodes/MyNode/MyNode.test.ts

# Run with verbose output
pnpm test -- --verbose
```

## 11. Resources

| Resource | URL |
|----------|-----|
| Documentation | https://docs.n8n.io |
| GitHub Repository | https://github.com/n8n-io/n8n |
| Community Forum | https://community.n8n.io |
| Discord | https://discord.gg/n8n |
| API Reference | https://docs.n8n.io/api |
