# Node System

> Extensible node-based architecture powering n8n's 400+ integrations.

## 1. Overview

Nodes are the fundamental building blocks of n8n workflows. Each node performs a specific operation:
- Fetch data from external services
- Transform data
- Send data to external services
- Trigger workflows

## 2. Node Structure

```typescript
import {
  IExecuteFunctions,
  ILoadOptionsFunctions,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';

export class ExampleNode implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Example Node',
    name: 'exampleNode',
    group: ['trigger', 'output'],
    version: 1,
    description: 'An example node',
    defaults: { name: 'Example' },
    inputs: ['main'],
    outputs: ['main'],
    properties: [
      {
        displayName: 'API Key',
        name: 'apiKey',
        type: 'string',
        typeOptions: { password: true },
        required: true,
        displayOptions: { show: { resource: ['example'] } },
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
      const apiKey = this.getNodeParameter('apiKey', i) as string;
      // Process item
      returnData.push({ json: { processed: true } });
    }

    return [returnData];
  }
}
```

## 3. Node Properties

### Display Properties

| Property | Description |
|----------|-------------|
| `displayName` | Human-readable name shown in UI |
| `name` | Unique identifier (camelCase) |
| `group` | Categories: `trigger`, `input`, `output`, `transform` |
| `description` | What the node does |
| `version` | Node version (for migrations) |

### Parameter Types

| Type | UI Render | Use Case |
|------|----------|----------|
| `string` | Text input | Simple text |
| `number` | Number input | Numeric values |
| `boolean` | Toggle | On/off options |
| `options` | Dropdown | Select from list |
| `collection` | Multi-select | Multiple selections |
| `resourceLocator` | Special picker | Complex resource selection |
| `json` | Code editor | JSON objects |

### Type Options

```typescript
typeOptions: {
  password: true,           // Mask input
  rows: 10,                 // Textarea rows
  multipleValues: true,     // Array of values
  loadOptionsDependsOn: ['resource'],  // Reload when these change
  dateTimePicker: true,     // Date/time picker
}
```

## 4. Node Categories

### Trigger Nodes
Start a workflow automatically:
- **Webhook**: HTTP request trigger
- **Schedule**: Cron-based trigger
- **Email**: Email received trigger
- **OAuth2**: OAuth callback trigger

### Input Nodes
Receive data from external systems:
- **HTTP Request**: API calls
- **Database nodes**: Query results
- **File nodes**: Read files

### Output Nodes
Send data to external systems:
- **HTTP Request**: POST data
- **Database nodes**: Write data
- **File nodes**: Write files
- **Slack/Email**: Notifications

### Transform Nodes
Manipulate data within workflow:
- **Set**: Set/update fields
- **Code**: JavaScript/Python
- **Split/Batch**: Split arrays
- **Sort**: Order items

## 5. Credentials

### Credential Types

```typescript
interface ICredentialType {
  name: string;
  displayName: string;
  properties: INodeProperties[];
}
```

### Using Credentials in Nodes

```typescript
async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
  const credentials = await this.getCredentials('myCredentialApi') as IMyCredential;

  const response = await axios.get('https://api.example.com/data', {
    headers: { Authorization: `Bearer ${credentials.apiKey}` }
  });

  return [this.helpers.returnJsonArray(response.data)];
}
```

### Credential Testing

```typescript
async testCredentials(this: IExecuteFunctions): Promise<boolean> {
  const credentials = await this.getCredentials('myCredentialApi');
  try {
    await axios.get('https://api.example.com/test', {
      headers: { Authorization: `Bearer ${credentials.apiKey}` }
    });
    return true;
  } catch {
    return false;
  }
}
```

## 6. Built-in Nodes Base

Located in `packages/nodes-base/`, includes 400+ integrations:

| Category | Examples |
|----------|----------|
| **Communication** | Slack, Email, Discord, Telegram |
| **Cloud** | AWS S3, Google Cloud, Azure |
| **CRM** | Salesforce, HubSpot |
| **Database** | MySQL, PostgreSQL, MongoDB |
| **Development** | GitHub, GitLab, HTTP Request |
| **Marketing** | Mailchimp, ActiveCampaign |
| **Productivity** | Google Sheets, Notion, Airtable |
| **AI** | OpenAI, Anthropic, LangChain nodes |

## 7. Custom Node Development

### Create Node Structure

```
nodes-base/
└── nodes/
    └── MyNode/
        ├── MyNode.node.ts       # Main node file
        ├── MyNode.json         # Icon and descriptions
        └── GenericFunctions.ts  # Helper functions
```

### Node Icon

PNG or SVG in `nodes-base/nodes/{NodeName}/`:

```json
{
  "icon": "file:myNode.svg",
  "iconColor": "#FF6B6B"
}
```

### Publishing Nodes

Nodes can be published as npm packages for community distribution.

## 8. LangChain Nodes

Located in `packages/@n8n/nodes-langchain/`:

| Node | Purpose |
|------|---------|
| **ChatOpenAI** | OpenAI chat completions |
| **ChatAnthropic** | Anthropic Claude |
| **VectorStore** | Pinecone, Chroma, pgvector |
| **Embeddings** | OpenAI, Cohere embeddings |
| **LLM Chain** | Chain multiple prompts |
| **Tool** | Custom tool integration |

## 9. Node Development Tools

### node-dev

```bash
npx n8n-node-dev
# Watches for changes and reloads automatically
```

### Testing Nodes

```bash
cd packages/nodes-base
pnpm test nodes/{NodeName}/{NodeName}.test.ts
```

## 10. Node Execution Order

```
Input → [Parameter Validation] → [Credential Check] → [Execute] → [Error Handling] → Output
```

### Parallel Execution

Nodes without data dependencies execute in parallel for performance.

### Wait Node

The Wait node can pause execution:
- Fixed time delay
- Until specific datetime
- Until webhook call
