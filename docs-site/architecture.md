# n8n Architecture Overview

> n8n is a workflow automation platform written in TypeScript, using a monorepo structure managed by pnpm workspaces.

## 1. Technology Stack

| Layer | Technology | Details |
|-------|------------|---------|
| **Frontend** | Vue 3 + TypeScript + Vite | Pinia state management, Storybook UI library |
| **Backend** | Node.js + TypeScript + Express | TypeORM database abstraction |
| **Testing** | Jest (unit) + Playwright (E2E) | `nock` for server mocking |
| **Code Quality** | Biome + ESLint + lefthook | Git hooks for quality enforcement |
| **Build** | pnpm workspaces + Turbo | Monorepo orchestration |

## 2. Monorepo Structure

```
n8n/
├── packages/
│   ├── @n8n/api-types        # Shared TypeScript interfaces (FE↔BE communication)
│   ├── workflow               # Core workflow interfaces and types
│   ├── core                  # Workflow execution engine
│   ├── cli                   # Express server, REST API, CLI commands
│   ├── editor-ui             # Vue 3 frontend application
│   ├── @n8n/i18n             # Internationalization for UI text
│   ├── nodes-base            # 400+ built-in integration nodes
│   ├── @n8n/nodes-langchain  # AI/LangChain specialized nodes
│   ├── @n8n/instance-ai     # AI Assistant backend (instance AI)
│   ├── @n8n/design-system    # Vue component library (design tokens)
│   ├── @n8n/config           # Centralized configuration management
│   └── @n8n/db               # Database layer (TypeORM)
├── packages/@n8n/            # Scoped packages
├── packages/cli/             # Main CLI package
├── packages/core/            # Core execution engine
└── packages/frontend/        # Vue 3 editor UI
```

## 3. Key Architectural Patterns

### 3.1 Dependency Injection
Uses `@n8n/di` for Inversion of Control (IoC) container across the application.

### 3.2 Controller-Service-Repository
Backend follows MVC-like separation:
- **Controller**: Handles HTTP requests, input validation
- **Service**: Business logic, orchestration
- **Repository**: Data access (TypeORM)

### 3.3 Event-Driven Architecture
Internal event bus (`@n8n/event-bus`) for decoupled communication between components.

### 3.4 Context-Based Execution
Different execution contexts for different node types:
- `TriggerContext` — for trigger nodes (webhooks, schedules)
- `PollContext` — for polling-based triggers
- `ExecuteContext` — for regular node execution

### 3.5 State Management
Frontend uses **Pinia stores** for reactive state management.

## 4. Design System

All UI components are centralized in `@n8n/design-system`:
- Reusable Vue components
- Design tokens (CSS variables)
- Ensures consistency across the editor

Key tokens:
```css
--n8n-primary-color: #8338ec;    /* Purple brand color */
--n8n-secondary-color: #14b8a6; /* Teal accent */
--n8n-background: #1a1a1a;      /* Dark background */
```

## 5. Workflow Execution Model

```
Workflow → Nodes → Connections → Data Flow
```

- **Workflow**: JSON definition with nodes and connections
- **Nodes**: Individual processing units with `execute()` method
- **Connections**: Directed edges between node outputs and inputs
- **Data**: `INodeExecutionData[]` passed along connections

### Traversal Utilities

Use exported utilities from `n8n-workflow` instead of custom logic:

```typescript
import { getParentNodes, getChildNodes, mapConnectionsByDestination } from 'n8n-workflow';

// Finding parent nodes (predecessors) - requires inverted connections
const connectionsByDestination = mapConnectionsByDestination(workflow.connections);
const parents = getParentNodes(connectionsByDestination, 'NodeName', 'main', 1);

// Finding child nodes (successors) - uses connections directly
const children = getChildNodes(workflow.connections, 'NodeName', 'main', 1);
```

## 6. Key Development Patterns

| Pattern | Description |
|---------|-------------|
| **Lazy Loading** | Heavy modules use `await import()` at point of use |
| **Type Safety** | Never use `any`; use `unknown` and type guards |
| **Shared Types** | API interfaces in `@n8n/api-types` for FE↔BE |
| **Node Isolation** | Each package can be developed independently |
| **Hot Reload** | Full stack hot reload during development |

## 7. Error Handling

| Error Class | Use Case |
|-------------|----------|
| `UnexpectedError` | Critical system errors |
| `OperationalError` | Expected operational failures |
| `UserError` | User-facing error messages |

> **Note**: `ApplicationError` is deprecated — do not use in CLI or nodes.

## 8. Database Support

TypeORM with SQLite (development) and PostgreSQL (production) support.
