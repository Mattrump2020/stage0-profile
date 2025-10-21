# Stage 0 — /me Endpoint (Node.js / Express)

## What it does
GET `/me` returns JSON:
```json
{
  "status": "success",
  "user": {
    "email": "<your email>",
    "name": "<your full name>",
    "stack": "<your backend stack>"
  },
  "timestamp": "<current UTC ISO 8601>",
  "fact": "<random cat fact from catfact.ninja>"
}
