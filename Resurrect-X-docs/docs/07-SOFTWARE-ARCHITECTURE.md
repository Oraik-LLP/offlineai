# 07 — Software Architecture

## 1. Architecture principle

Start as a **modular monolith** for Phase 1/2. Security boundaries are created with code-level capability separation, OS/container isolation where needed, and explicit interfaces. Do not create a microservice fleet simply to look enterprise.

## 2. Logical components

```text
Browser UI
   |
HTTPS
   v
Web/BFF + Auth
   |
   +--> Policy Engine
   +--> Conversation Service
   +--> File Repository ---> Local FS / NAS
   +--> Retrieval Service --> Metadata DB + vector/index
   +--> Tool Broker -------> Restricted tool workers
   +--> Audit Service ------> Append-only audit store
   +--> Model Gateway ------> Local inference (production)
                          \--> Hosted adapter (demo only)
```

## 3. Recommended stack

### Frontend

- Next.js + TypeScript.
- Server components/BFF where useful; avoid exposing internal service topology to browser.
- Accessible primitive library (Radix-class).
- Tokenised CSS/Tailwind-class utility layer.
- SSE for streaming.
- No secrets in build-time public env variables.

### Backend

Choose one of two clean paths:

**Option A — Python-forward (recommended once local AI work grows):**

- FastAPI.
- Pydantic schemas.
- SQLAlchemy/SQLModel or equivalent.
- Local inference/RAG integrations in the same language.

**Option B — TypeScript-forward for a very fast MVP:**

- Next.js BFF or separate Node service.
- Keep a stable model-gateway contract so Python local-inference services can be added later.

Do not maintain duplicate business/policy logic in both languages.

### Metadata store

- Phase 1: SQLite, WAL mode.
- Pilot+: PostgreSQL if concurrency/scale justifies it.

### Search/vector

- Phase 1: SQLite FTS5 + small embedded vector store.
- Pilot+: Qdrant or pgvector, still filtered by deterministic ACL/matter predicates before vector ranking.

### Local model runtime

Behind an internal adapter. Candidates vary by delivery hardware:

- vLLM or another OpenAI-compatible local server on suitable NVIDIA Linux hardware;
- llama.cpp-class runtime for quantised models and lower-memory hardware;
- vendor runtime/NIM where appropriate on supported NVIDIA appliances.

The product contract is the internal inference API, not a particular runtime.

### Reverse proxy

- Caddy or Nginx.
- HTTPS termination.
- Local certificate management.
- Request size/rate limits.

### Packaging

- Docker Compose/Podman Compose for dev/pilot.
- Production appliance may use systemd-managed rootless containers.

## 4. Model gateway

Interface example:

```python
class ModelGateway:
    async def chat(self, request: ModelRequest) -> ModelStream: ...
    async def embed(self, texts: list[str]) -> list[list[float]]: ...
    async def health(self) -> ModelHealth: ...
```

Request includes:

- `data_boundary`: local/demo-connected;
- `classification_ceiling`;
- `matter_id`;
- permitted tool schemas;
- context chunks;
- response schema.

Provider fallback is policy-controlled. A fallback is never allowed to lower the required data boundary.

## 5. Policy engine

Pure/deterministic core function:

```text
Decision = evaluate(
  user,
  role,
  session_mode,
  matter,
  resource_classification,
  action,
  target_path,
  processing_boundary,
  requested_export
)
```

Output:

- allow / deny;
- approval requirement;
- reason code;
- maximum data classification;
- path/tool scope;
- expiry for capability token.

Policy decisions are logged.

## 6. Retrieval architecture

Correct order:

1. authenticate user;
2. calculate permitted matter/resource filters;
3. query only permitted metadata/chunks;
4. rank exact/semantic results;
5. enforce classification/output route;
6. assemble context with untrusted-content delimiters/provenance;
7. send to model;
8. attach citations from chunk ids.

Incorrect order: vector-search the global corpus first and “hide” forbidden hits later.

## 7. Tool architecture

The model never calls OS APIs directly.

Model output → validated `ToolIntent` → policy decision → optional human approval → one-shot capability → tool worker.

Initial tools:

- search;
- read;
- create output;
- patch output.

Future tools are added one by one with their own schema and policy.

## 8. File architecture

Suggested logical roots:

```text
/data/
  matters/
    <matter-id>/
      sources/      # normally immutable to AI
      outputs/      # AI/human generated work product
      indexes/      # derived/search data
  audit/
  config/
```

NAS can be mounted under a separate read-only mount, e.g. `/mnt/firm_sources`, then mapped to logical matter ids.

## 9. Data-store separation

- Original source files: file/NAS store.
- Metadata: SQL database.
- Chunks/embeddings: derived index.
- Conversation history: SQL or dedicated store.
- Audit: append-only separate path/database.
- Secrets: OS secret store, not database rows or source code.

## 10. Demo deployment

```text
Browser -> HTTPS app/BFF -> Policy -> Model Gateway -> external demo model
                         -> Demo file store
                         -> Audit
```

Only demo-safe data.

## 11. Production deployment

```text
Firm Browser -> internal HTTPS -> Resurrect X appliance
                                  |-> local model runtime (GPU)
                                  |-> local embeddings/index
                                  |-> firm NAS (allowlisted mount)
                                  |-> audit/backup

Internet egress: DENY by default
```

Optional update/support/integration windows are separate policy-controlled exceptions.
