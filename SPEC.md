# n8n Design - Specification

## 1. Project Overview

**Project Name:** n8n Design
**Project Type:** Architecture Design Documentation Site
**Upstream Project:** [n8n-io/n8n](https://github.com/n8n-io/n8n)
**License:** Fair-code (Sustainable Use License)

### Project Summary

An architecture design documentation site for n8n - a workflow automation platform built with TypeScript, featuring a monorepo structure with pnpm workspaces, Vue 3 frontend, and Node.js backend.

### Value Proposition

- Comprehensive architecture documentation from source code analysis
- Clear visualization of n8n's node-based workflow system
- AI/LangChain integration documentation
- Developer onboarding guide

---

## 2. Technical Specification

### Platform

| Component | Technology |
|-----------|------------|
| Documentation Engine | VitePress |
| Deployment | GitHub Actions (workflow mode) |
| Theme | Custom dark theme (n8n purple #8338EC + teal #14B8A6) |

### File Structure

```
n8n-design/
├── README.md
├── SPEC.md
├── docs-site/
│   ├── package.json
│   ├── index.md                  # VitePress home layout
│   ├── architecture.md           # Monorepo structure, tech stack
│   ├── workflow-engine.md        # Core execution engine
│   ├── nodes.md                 # Node system, 400+ integrations
│   ├── ai-agents.md             # LangChain integration
│   ├── api.md                   # REST API reference
│   ├── getting-started.md        # Developer guide
│   └── .vitepress/
│       ├── config.mjs           # Nav, sidebar, base config
│       ├── theme/
│       │   ├── index.js         # Theme extension
│       │   └── style.css        # Dark purple/teal theme
│       └── public/
│           └── logo.svg         # Workflow nodes logo
└── .github/workflows/
    └── vitepress-pages.yml      # GitHub Actions workflow
```

---

## 3. Design Language

### Color Palette

| Role | Color | Usage |
|------|-------|-------|
| Primary | `#8338EC` | Buttons, links, highlights |
| Secondary | `#14B8A6` | Teal accent, gradients |
| Background | `#0F0F0F` | Dark background |
| Surface | `#1A1A1A` | Cards, sidebar |
| Text Primary | `#F5F5F5` | Headings |
| Text Secondary | `#B0B0B0` | Body text |

### Typography

- System fonts via VitePress defaults
- Gradient hero titles (purple → teal → blue)

### Visual Elements

- Workflow node network logo (SVG)
- Purple glow effects on hover cards
- Glass-morphism navbar

---

## 4. Documentation Content

### Required Pages

| Document | Description | Status |
|----------|-------------|--------|
| index.md | VitePress home with features grid | ✅ |
| architecture.md | Monorepo, tech stack, patterns | ✅ |
| workflow-engine.md | Execution engine, node traversal | ✅ |
| nodes.md | Node system, credentials, 400+ nodes | ✅ |
| ai-agents.md | LangChain nodes, RAG, vector stores | ✅ |
| api.md | REST API, authentication, endpoints | ✅ |
| getting-started.md | Dev guide: clone, build, test | ✅ |

---

## 5. Deployment

### GitHub Pages

- **Repository:** YeLuo45/n8n-design
- **URL:** https://yeluo45.github.io/n8n-design/
- **Build Type:** workflow mode
- **Artifact:** `docs-site/.vitepress/dist/`

### GitHub Actions

- Trigger: Push to main/master, changes in `docs-site/**`
- Node: 20 LTS
- Package manager: pnpm

---

## 6. Verification

### Build Verification

```bash
cd docs-site
pnpm install
pnpm run build
# Verify .vitepress/dist/ contains index.html and assets/
```

### Deployment Verification

```bash
curl -sI https://yeluo45.github.io/n8n-design/ | head -1
# Expected: HTTP/2 200
```

---

## 7. Upstream Project Details

| Aspect | Details |
|--------|---------|
| Language | TypeScript |
| Package Manager | pnpm (monorepo) |
| Frontend | Vue 3 + Vite + Pinia |
| Backend | Node.js + Express + TypeORM |
| Testing | Jest + Playwright |
| Key Packages | cli, core, workflow, editor-ui, nodes-base |
| AI Integration | @n8n/nodes-langchain (LangChain) |
| Design System | @n8n/design-system |

---

## 8. Constraints & Notes

1. **Documentation only** — no code from upstream is included
2. **Static generation** — VitePress builds to static HTML
3. **Subdirectory deployment** — base path `/n8n-design/`
4. **REST API upload** — used due to network blocking git push
5. **Theme consistency** — n8n brand purple (#8338EC) + teal (#14B8A6)
