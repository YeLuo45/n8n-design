# AI Agents (LangChain Integration)

> Native AI capabilities powered by LangChain with specialized n8n nodes.

## 1. Overview

n8n provides first-class AI integration through:
- LangChain-based nodes in `packages/@n8n/nodes-langchain`
- Instance AI features in `packages/@n8n/instance-ai`
- Vector store support for RAG (Retrieval-Augmented Generation)
- Multi-model support (OpenAI, Anthropic, local models)

## 2. LangChain Nodes

Located in `packages/@n8n/nodes-langchain/`:

### LLM Nodes

| Node | Model | Capabilities |
|------|-------|---------------|
| `ChatOpenAI` | GPT-4o, GPT-4-turbo, GPT-3.5 | Streaming, function calling |
| `ChatAnthropic` | Claude 3.5, Claude 3 | Long context, Haiku |
| `ChatOllama` | Local models | Self-hosted, privacy |
| `ChatGoogleGenerativeAI` | Gemini Pro | Multimodal |

### Embedding Nodes

| Node | Provider | Use Case |
|------|----------|----------|
| `EmbeddingsOpenAI` | OpenAI ada-002, text-embedding-3 | Semantic search |
| `EmbeddingsCohere` | Cohere embed-v3 | Multilingual |
| `EmbeddingsLocal` | Local sentences-transformers | Offline embedding |

### Vector Store Nodes

| Node | Backend | Description |
|------|---------|-------------|
| `VectorStorePinecone` | Pinecone | Managed cloud vector DB |
| `VectorStoreChroma` | Chroma | Open-source embedded DB |
| `VectorStoreSupabase` | Supabase pgvector | PostgreSQL vector extension |
| `VectorStoreQdrant` | Qdrant | High-performance vector search |

### Chain Nodes

| Node | Purpose |
|------|---------|
| `LLM Chain` | Simple prompt + LLM chain |
| `Conversational Agent` | Agent with memory |
| `OpenAI Function Agent` | OpenAI tool-calling agent |
| `Tools Agent` | LangChain agent with tools |

## 3. Tool Nodes

Custom tools for AI agents:

```typescript
// Example: Custom Calculator Tool
const calculatorTool = {
  name: 'calculator',
  description: 'Perform mathematical calculations',
  schema: z.object({
    expression: z.string().describe('Math expression to evaluate')
  }),
  async execute({ expression }) {
    const result = eval(expression);
    return { result };
  }
};
```

### Built-in Tool Nodes

| Tool | Description |
|------|-------------|
| `Code` | Execute JavaScript/Python |
| `HTTP Request` | Make API calls |
| `Search` | Web search capability |
| `Wikipedia` | Wikipedia lookup |
| `Calculator` | Math operations |

## 4. Memory

AI agents can maintain conversation memory:

### Memory Types

| Type | Storage | Use Case |
|------|---------|----------|
| `BufferMemory` | In-memory | Simple conversations |
| `BufferWindowMemory` | Sliding window | Recent N messages |
| `VectorStoreMemory` | Vector DB | Long-term memory |
| `SQLiteMemory` | SQLite | Persistent memory |

### Configuration

```typescript
const memory = new BufferMemory({
  chatHistory: new InMemoryStore(),
  memoryKey: 'chat_history',
  inputKey: 'input',
  returnMessages: true,
});
```

## 5. Retrieval-Augmented Generation (RAG)

### RAG Pipeline

```
Documents → Chunking → Embedding → Vector Store
                                      ↓
User Query → Embedding → Similarity Search → LLM → Response
```

### Document Loader Nodes

| Loader | Source |
|--------|--------|
| `Website` | Web pages via URL |
| `PDF` | PDF documents |
| `Notion` | Notion pages |
| `Airtable` | Airtable bases |
| `Google Drive` | Google Drive files |

### Chunking Strategies

| Strategy | Description |
|----------|-------------|
| `RecursiveCharacter` | Split on characters recursively |
| `TokenText` | Split by token count |
| `MarkdownHeader` | Split on markdown headers |
| `JSON` | Split JSON objects |

## 6. Instance AI

`@n8n/instance-ai` provides AI assistant features:

- **Chat Interface**: In-editor AI chat
- **Workflow Suggestions**: AI-recommended next steps
- **Node Help**: Contextual AI assistance
- **Error Analysis**: AI-powered debugging

## 7. Multi-Model Support

### API Configuration

```typescript
// packages/@n8n/nodes-langchain/src/types.ts
interface LLMConfig {
  provider: 'openai' | 'anthropic' | 'google' | 'ollama';
  model: string;
  apiKey?: string;
  baseURL?: string;  // For proxies/self-hosted
  temperature?: number;
  maxTokens?: number;
}
```

### Model Fallback

```typescript
// Automatic fallback on rate limits
const models = ['gpt-4o', 'gpt-4-turbo', 'gpt-3.5-turbo'];
for (const model of models) {
  try {
    const response = await callModel(model, prompt);
    break;
  } catch (error) {
    if (isRateLimit(error)) continue;
    throw error;
  }
}
```

## 8. Streaming

Real-time AI response streaming:

```typescript
const stream = await chatModel.stream(messages);

for await (const chunk of stream) {
  // Process streaming response
  process.stdout.write(chunk.content);
}
```

## 9. Security

### Credential Management

- API keys stored encrypted
- Never logged or exposed
- Credential testing before use

### Input Sanitization

- User prompts sanitized
- Prompt injection prevention
- Output filtering for sensitive data

## 10. Example: AI Agent Workflow

```
[Webhook Trigger]
      ↓
[ChatOpenAI] → {system: "You are a helpful assistant"}
      ↓
[VectorStore] → {query: user message, topK: 5}
      ↓
[LLM Chain] → {context: retrieved docs, question: user message}
      ↓
[Slack Message] → {channel: "#ai-responses"}
```
