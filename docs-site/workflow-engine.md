# Workflow Engine

> The core execution engine that powers n8n's workflow automation.

## 1. Overview

The workflow engine (`packages/core`) is responsible for:
- Loading and validating workflow definitions
- Traversing the node graph
- Executing nodes in the correct order
- Managing data flow between nodes
- Handling errors and retries

## 2. Workflow Definition

A workflow is a JSON structure:

```typescript
interface IWorkflow {
  id?: string;
  name: string;
  nodes: INode[];
  connections: IConnections;
  active: boolean;
  settings?: IWorkflowSettings;
  staticData?: any;
}
```

### Node Structure

```typescript
interface INode {
  id: string;
  name: string;
  type: string;
  typeVersion: number;
  position: [number, number];
  parameters: Record<string, any>;
  credentials?: Record<string, string | ICredentialDecrypted>;
}
```

### Connection Structure

Connections are indexed by **source node**:
```typescript
interface IConnections {
  [sourceNodeName: string]: {
    main: IConnection[][];  // Array of output arrays
  };
}
```

## 3. Execution Flow

```
WorkflowActivation
      ↓
WorkflowExecute (start from trigger nodes)
      ↓
NodeExecute (per node)
      ↓
DataTransformation (between nodes)
      ↓
NextNode (traverse to children)
      ↓
WorkflowComplete
```

### Key Classes

| Class | Package | Responsibility |
|-------|---------|----------------|
| `Workflow` | `n8n-workflow` | Workflow definition, node access |
| `WorkflowExecute` | `n8n-core` | Orchestrates execution |
| `ActiveWorkflowManager` | `@n8n/cli` | Manages active workflow instances |

## 4. Node Execution

### Execution Order

1. **Start Nodes**: Trigger/schedule nodes (no inputs required)
2. **Dependency Resolution**: Topological sort of connected nodes
3. **Parallel Execution**: Nodes with no data dependencies execute in parallel

### Data Passing

Nodes communicate via `INodeExecutionData[]`:

```typescript
interface INodeExecutionData {
  json: any;           // Structured data
  binary?: IBinaryData; // Binary data (files, images)
}
```

### Output Routing

Each node can have multiple outputs:
- **Main output**: Success path (`main: 0`)
- **Error output**: Error path (`main: 1`)

## 5. Execution Contexts

| Context | Use Case | Provided Data |
|---------|----------|---------------|
| `IExecuteFunctions` | Regular node execution | Input data, credentials, helpers |
| `IExecuteSingleNodeFunctions` | Single-item processing | Single input item |
| `IGetExecuteTriggerFunctions` | Trigger node polling | Poll interval, returning data |
| `IWebhookFunctions` | Webhook handling | Webhook URL, request data |

## 6. Error Handling

### Error Types

```typescript
// Node throws an error
throw new NodeOperationError(node, 'Error message', {
  severity: 'warning', // or 'error'
  cause: originalError,
});

// Workflow halts on error by default
// Can be configured to continue or retry
```

### Retry Logic

```typescript
// In node parameters
{
  retryOnFail: true,
  maxRetries: 3,
  retryInterval: 1000,
  continueOnFail: false,
}
```

## 7. Data Transformation

### Set Node Operations

- **Move**: Move field paths
- **Rename**: Rename field names
- **Remove**: Delete fields
- **Sort**: Sort array items
- **Filter**: Filter array items
- **Item Lists**: Split/merge arrays

### Code Node

Execute JavaScript/Python inline:
```javascript
// Access input data
const items = $input.all();
const result = items.map(item => ({
  json: {
    ...item.json,
    processed: true,
    timestamp: new Date().toISOString()
  }
}));
return result;
```

## 8. Subworkflows

Calling another workflow from within a node:

```typescript
const workflowResult = await executeWorkflow(
  subworkflowId,
  subworkflowNodes,
  subworkflowConnections,
  inputData,
  credentials
);
```

## 9. Execution Modes

| Mode | Description |
|------|-------------|
| **Manual** | User triggers workflow via UI/API |
| **Trigger** | Automatic via webhook, schedule, or event |
| **Test** | Preview run with mock data |
| **Production** | Live execution with real credentials |

## 10. Key Files

| File | Package | Purpose |
|------|---------|---------|
| `WorkflowExecute.ts` | `packages/core` | Main execution orchestrator |
| `ActiveWorkflowManager.ts` | `packages/cli` | Active workflow lifecycle |
| `workflow/index.ts` | `packages/workflow` | Workflow class and types |
| `NodeExecute.ts` | `packages/core` | Individual node execution |
