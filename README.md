# n8n Design

Architecture Design Documentation for n8n - the open-source workflow automation platform.

## Overview

This is an architecture design documentation site for [n8n](https://github.com/n8n-io/n8n), generated from the source code analysis. n8n is a workflow automation platform that gives technical teams the flexibility of code with the speed of no-code.

## Documentation

- [Architecture Overview](/architecture) — Monorepo structure, technology stack, key patterns
- [Workflow Engine](/workflow-engine) — Core execution engine, node traversal, data flow
- [Node System](/nodes) — Extensible node architecture, 400+ built-in integrations
- [AI Agents (LangChain)](/ai-agents) — Native AI capabilities, RAG, vector stores
- [API Reference](/api) — REST API endpoints, authentication, webhooks
- [Getting Started](/getting-started) — Developer quick start guide

## Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | Vue 3 + TypeScript + Vite + Pinia |
| Backend | Node.js + TypeScript + Express + TypeORM |
| Testing | Jest (unit) + Playwright (E2E) |
| Build | pnpm workspaces + Turbo |

## Monorepo Structure

```
packages/
├── @n8n/api-types     # Shared TypeScript interfaces
├── workflow            # Core workflow interfaces
├── core               # Workflow execution engine
├── cli                # Express server, REST API
├── editor-ui          # Vue 3 frontend
├── nodes-base         # 400+ built-in nodes
├── @n8n/nodes-langchain  # AI/LangChain nodes
├── @n8n/design-system    # Vue component library
└── @n8n/config       # Configuration management
```

## License

n8n is [fair-code](https://faircode.io) distributed under the Sustainable Use License.

---

Built from [n8n-io/n8n](https://github.com/n8n-io/n8n) source code.
