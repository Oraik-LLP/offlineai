# 24 — Suggested Repository Structure

```text
resurrect-x/
├─ apps/
│  └─ web/                     # Next.js UI/BFF
├─ services/
│  ├─ inference/               # optional Phase 2 local model adapter
│  └─ parser/                  # Phase 3 sandboxed document parser
├─ packages/
│  ├─ policy/                  # deterministic policy engine
│  ├─ schemas/                 # shared API/tool schemas
│  ├─ model-gateway/           # provider/local adapters
│  ├─ file-repository/         # safe file operations
│  ├─ retrieval/               # search/RAG orchestration
│  └─ audit/                   # event schema/writer
├─ data/
│  └─ demo/                    # synthetic fixtures only
├─ tests/
│  ├─ e2e/
│  ├─ policy/
│  ├─ security/
│  ├─ rag-evals/
│  └─ fixtures/
├─ deploy/
│  ├─ compose/
│  ├─ systemd/
│  ├─ reverse-proxy/
│  └─ appliance/
├─ docs/
├─ scripts/
├─ .github/ or ci/
└─ README.md
```

## Key module interfaces

### `policy`

No network/model dependencies. Pure input → decision where possible.

### `file-repository`

Only module permitted to translate logical file ids into OS paths. Centralises canonicalisation, root enforcement, versioning and atomic writes.

### `model-gateway`

Normalises local and connected model APIs. Receives policy-approved context only.

### `retrieval`

Never receives “global unrestricted” corpus access for convenience. Requires authenticated scope.

### `audit`

Asynchronous for low-risk reads if needed, but high-risk mutations should fail closed when durable audit cannot be written.

## Environment variables

Public/client variables may contain only non-secret UX configuration.

Server-only:

- secret/session keys;
- model endpoint credentials;
- encryption keys/references;
- database credentials.

Use names such as `RX_MODEL_PRIMARY_ENDPOINT`, not provider names in customer-facing frontend code.

## Branch/release hygiene

- protected main;
- required tests;
- secret scan;
- dependency scan;
- signed/tagged releases for appliance builds;
- no generated demo/client data committed.
