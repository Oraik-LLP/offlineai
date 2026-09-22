# 09 — API and Tool Contracts

## 1. API principles

- Versioned: `/api/v1/...`
- JSON for control plane; SSE for streamed model output.
- Every route authenticates and authorises.
- Resource ids are opaque UUIDs.
- Do not reveal whether an inaccessible resource exists; use policy-consistent 404 where appropriate.
- Idempotency keys on write actions.
- Audit correlation id on every request.

## 2. Core endpoints

### Auth/session

```text
POST /api/v1/auth/login
POST /api/v1/auth/logout
GET  /api/v1/session
PATCH /api/v1/session/mode
```

`PATCH /session/mode` accepts `read_only` or `read_write`; server verifies role/policy.

### Matters

```text
GET /api/v1/matters
GET /api/v1/matters/{matter_id}
```

Only permitted matters returned.

### Files

```text
GET  /api/v1/matters/{matter_id}/files
GET  /api/v1/files/{file_id}
GET  /api/v1/files/{file_id}/versions
POST /api/v1/matters/{matter_id}/outputs
POST /api/v1/files/{file_id}/patch
```

No general “write arbitrary path” endpoint.

### Search

```text
POST /api/v1/search
```

Request:

```json
{
  "matter_id": "uuid",
  "query": "termination clause",
  "mode": "hybrid",
  "limit": 10
}
```

Server ignores any attempt to request a scope the user is not entitled to.

### Chat

```text
POST /api/v1/conversations
POST /api/v1/conversations/{id}/messages
GET  /api/v1/conversations/{id}/stream
```

Message request includes matter id and optional allowed file ids; backend derives classification ceiling.

### Tool plan/execution

```text
POST /api/v1/tool-plans
POST /api/v1/tool-plans/{id}/approve
POST /api/v1/tool-plans/{id}/execute
```

For low-risk reads, plan+execute may be internal/automatic. Writes can require explicit approval.

### Audit/admin

```text
GET /api/v1/admin/audit
GET /api/v1/admin/health
GET /api/v1/admin/policy
PUT /api/v1/admin/policy
```

## 3. Tool schemas

### `file.search`

```json
{
  "name": "file.search",
  "arguments": {
    "matter_id": "uuid",
    "query": "string",
    "limit": 10
  }
}
```

Policy: read permission + matter scope.

### `file.read`

```json
{
  "name": "file.read",
  "arguments": {
    "file_id": "uuid",
    "start_anchor": "optional",
    "end_anchor": "optional"
  }
}
```

Model never supplies raw filesystem path.

### `file.create_output`

```json
{
  "name": "file.create_output",
  "arguments": {
    "matter_id": "uuid",
    "filename": "contract-review.md",
    "content": "...",
    "classification": "C2"
  }
}
```

Server calculates actual root path; sanitises filename; extension allowlist `.md/.txt`; classification cannot be less restrictive than source-derived policy.

### `file.patch_output`

```json
{
  "name": "file.patch_output",
  "arguments": {
    "file_id": "uuid",
    "base_version": 3,
    "operations": [
      {"op": "replace", "anchor": "section:summary", "text": "..."}
    ]
  }
}
```

Optimistic concurrency rejects stale base versions.

## 4. Policy decision response

```json
{
  "decision": "allow",
  "reason_code": "RW_OUTPUT_ALLOWED",
  "approval_required": true,
  "capability": {
    "tool": "file.create_output",
    "matter_id": "uuid",
    "path_scope": "outputs/",
    "expires_in_seconds": 60
  }
}
```

Capability token is server-signed/opaque and single-use.

## 5. Error model

```json
{
  "error": {
    "code": "POLICY_DENIED",
    "message": "This session is read-only.",
    "correlation_id": "..."
  }
}
```

Do not return raw stack traces or filesystem paths to ordinary users.

## 6. Model provider adapter

Internal only; not exposed to browser.

```text
chat(request)
embed(texts)
health()
capabilities()
```

Configuration can map `primary`, `fallback_a`, `fallback_b` internally. Provider names/secrets are operational config, not customer-facing product copy.

## 7. API security requirements

- SameSite/HttpOnly/Secure session cookies or equivalent secure token design.
- CSRF protection for cookie-authenticated mutation routes.
- Rate limit login and model endpoints.
- Strict JSON schema validation.
- Request size limits.
- Content-type allowlist.
- Path never accepted from model/user where an opaque file id will do.
- CORS disabled or tightly scoped; same-origin preferred.
- CSP and standard security headers at reverse proxy/app.
