# API Reference

> REST API architecture, endpoints, and real-time capabilities.

## 1. Overview

n8n provides a comprehensive REST API for:
- Workflow management (CRUD)
- Execution control (run, stop, resume)
- Credential management
- User management
- Webhook triggering
- Node execution

## 2. Base URL

```
Production: https://your-n8n-instance.com/api/v1
Local:      http://localhost:5678/api/v1
```

## 3. Authentication

### API Key Authentication

```bash
curl -H "X-N8N-API-KEY: your-api-key" \
     https://your-n8n-instance.com/api/v1/workflows
```

### Bearer Token

```bash
curl -H "Authorization: Bearer your-jwt-token" \
     https://your-n8n-instance.com/api/v1/workflows
```

### Generating API Key

1. Go to **Settings** → **API Key**
2. Click **Create New API Key**
3. Copy and securely store the key

## 4. Workflows API

### List Workflows

```http
GET /workflows
```

**Response:**
```json
{
  "data": [
    {
      "id": "WkRm8X3e7kA2j9H",
      "name": "My Workflow",
      "active": true,
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-20T14:22:00Z"
    }
  ],
  "count": 1
}
```

### Get Workflow

```http
GET /workflows/{id}
```

### Create Workflow

```http
POST /workflows
Content-Type: application/json

{
  "name": "New Workflow",
  "nodes": [...],
  "connections": {...},
  "settings": {
    "executionOrder": "v1"
  }
}
```

### Update Workflow

```http
PUT /workflows/{id}
Content-Type: application/json

{
  "name": "Updated Workflow",
  "nodes": [...],
  "connections": {...}
}
```

### Delete Workflow

```http
DELETE /workflows/{id}
```

### Activate/Deactivate

```http
POST /workflows/{id}/activate
POST /workflows/{id}/deactivate
```

## 5. Executions API

### List Executions

```http
GET /executions
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `workflowId` | string | Filter by workflow |
| `status` | string | `success`, `error`, `running` |
| `limit` | number | Max results (default: 20) |
| `cursor` | string | Pagination cursor |

### Get Execution

```http
GET /executions/{id}
```

**Response:**
```json
{
  "id": "exec_123",
  "workflowId": "WkRm8X3e7kA2j9H",
  "status": "success",
  "mode": "trigger",
  "startedAt": "2024-01-20T14:00:00Z",
  "finishedAt": "2024-01-20T14:00:05Z",
  "data": {
    "resultData": {
      "executionData": {...}
    }
  }
}
```

### Run Workflow

```http
POST /workflows/{id}/run
Content-Type: application/json

{
  "startNodes": ["TriggerNode"],
  "destinationNode": "LastNode",
  "runData": {
    "NodeName": [{ "json": {...} }]
  }
}
```

### Stop Execution

```http
POST /executions/{id}/stop
```

## 6. Credentials API

### List Credentials

```http
GET /credentials
```

### Get Credential

```http
GET /credentials/{id}
```

### Create Credential

```http
POST /credentials
Content-Type: application/json

{
  "name": "My API Key",
  "type": "apiKey",
  "data": {
    "apiKey": "secret-key"
  }
}
```

### Test Credential

```http
POST /credentials/{id}/test
Content-Type: application/json

{
  "authentication": "headerAuth",
  "data": {
    "apiKey": "test-key"
  }
}
```

## 7. Webhooks

### Manual Trigger

```http
POST /webhook/{webhookPath}
Content-Type: application/json

{
  "trigger_value": "data"
}
```

### Test Webhook

```http
POST /webhook/{webhookPath}/test
```

## 8. Users API

### Get Current User

```http
GET /me
```

### Update User

```http
PUT /me
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com"
}
```

## 9. Tags API

### List Tags

```http
GET /tags
```

### Create Tag

```http
POST /tags
Content-Type: application/json

{
  "name": "Production",
  "color": "#FF0000"
}
```

## 10. Variables API

### List Variables

```http
GET /variables
```

### Create/Update Variable

```http
POST /variable
Content-Type: application/json

{
  "key": "ENV_NAME",
  "value": "production"
}
```

## 11. Error Responses

```json
{
  "code": 404,
  "message": "Workflow not found",
  "description": "The requested workflow does not exist"
}
```

### HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 422 | Unprocessable Entity |
| 500 | Internal Server Error |

## 12. Rate Limiting

Default limits per instance:
- **API calls**: 1000 per minute
- **Workflow runs**: Configurable per workflow
- **Webhook calls**: Configurable

## 13. API Versioning

Current version: **v1**

Version header (future):
```
API-Version: 2024-01-01
```

## 14. Filters & Search

### Workflow Filters

```http
GET /workflows?tags=ai,automation&active=true
```

### Execution Filters

```http
GET /executions?workflowId=WkRm8X3e7kA2j9H&status=error&limit=50
```

## 15. Pagination

### Cursor-Based

```http
GET /executions?cursor=eyJpZCI6MTIzfQ
```

**Response includes:**
```json
{
  "data": [...],
  "nextCursor": "eyJpZCI6MTQzfQ"
}
```
