# Resurrect X — Coding Agent Starter Prompt (Phase 1 + Phase 2 Foundation)

Use this as the opening prompt for a strong coding agent. It is deliberately model/vendor agnostic.

---

You are the lead product engineer and security-minded architect for an internal project codenamed **Resurrect X**.

## Mission

Build a polished Phase 1 MVP of a private-AI workspace for Australian law firms, while keeping the code structured so Phase 2 can swap hosted demo inference for a local NVIDIA-hosted model without rewriting the product.

The MVP is a browser application with two server-enforced modes:

1. **READ ONLY** — the assistant can search/read permitted documents and answer with citations, but every filesystem mutation is denied by backend policy.
2. **READ & WRITE** — the assistant can additionally create or patch `.md` / `.txt` files only inside an approved matter `outputs/` directory. It must never modify source files.

## Non-negotiable security architecture

Treat the LLM as untrusted. The model may propose an action but cannot authorise one.

- No API keys or secrets in browser JavaScript, source code, client storage, or system prompts.
- Hosted demo model calls go through a server-side ModelGateway/BFF.
- Normal UI must display `DEMO CONNECTED`, not the model-provider brand.
- Production/local inference must use the same ModelGateway interface.
- No arbitrary shell tool.
- No browser automation tool.
- No arbitrary URL fetch tool.
- No email/calendar tool.
- No delete tool.
- Only these MVP tools: `file.search`, `file.read`, `file.create_output`, `file.patch_output`.
- Every tool call is schema validated and policy checked server-side.
- Retrieval is filtered by authenticated user + matter + classification before semantic ranking.
- Source text is untrusted data and cannot change permissions/mode/tool availability.
- System prompt contains no secrets.
- Read-only mode must reject direct API mutation calls, not merely hide buttons.
- All file paths are derived server-side from opaque ids / approved roots. Reject path traversal and symlink escape.
- Writes are versioned and atomic.
- Audit all tool plans, policy decisions, approvals and writes.

## Demo data boundary

Phase 1 uses synthetic legal-style demo data only. Add a visible `DEMO — DO NOT USE CLIENT DATA` environment banner.

Use file classifications:

- C0 Public/Demo — allowed in demo model route.
- C1 Internal — cloud route blocked by default.
- C2 Confidential — cloud route blocked.
- C3 Privileged/Restricted — cloud route blocked; read-only by default.
- C4 No-AI/Sealed — do not index or send to any model.

Unknown classification fails closed.

## Product UX

Desktop app shell:

- left sidebar: Chats, Matters, Files, Search;
- center: streaming conversation;
- right inspector: Sources, Actions, Security;
- top bar: active matter, persistent READ ONLY / READ & WRITE state, LOCAL / DEMO CONNECTED processing badge.

Source citations should open the exact passage in the right inspector.

For a write request:

1. model proposes typed tool call;
2. backend validates schema;
3. policy engine evaluates;
4. if approval required, render a human-readable action card with target filename/path, classification, effect and reason;
5. user approves;
6. server mints/uses one-shot capability;
7. write executes atomically;
8. create version + audit event;
9. show resulting file/version.

Read-only blocked request should produce a clear UX message rather than a generic error.

## Visual direction

Premium, restrained, institutional. No neon AI gradients, robot brains, excessive glassmorphism, or fake terminal aesthetic.

Use:

- warm off-white / white / near-black neutral palette;
- restrained blue signal accent;
- strong editorial typography and whitespace;
- compact panels and thin borders;
- actual product states instead of decorative illustration.

Reference feel: premium sovereign/private-AI sites and editorial technical agencies, but do not copy layouts/text.

## Suggested implementation

Prefer a modular monolith.

Recommended default if no repo exists:

- Next.js + TypeScript frontend/BFF;
- server-side route handlers for session/model gateway OR FastAPI backend if Python is already present;
- SQLite metadata/audit for Phase 1;
- SQLite FTS5 for exact/full-text search;
- optional embedded vector index for semantic search;
- SSE for streamed responses;
- Docker Compose for local dev.

If using Next.js-only for MVP, still create clean interfaces:

- `ModelGateway`
- `PolicyEngine`
- `FileRepository`
- `RetrievalService`
- `AuditService`
- `ToolBroker`

so Phase 2 can move inference/RAG components into Python/local GPU services without changing UI contracts.

## Required data entities

- User
- Session
- Matter
- MatterMembership
- File
- FileVersion
- Chunk
- Conversation
- Message
- ToolPlan
- ToolExecution
- AuditEvent

## Directory model

Logical server data root:

```text
/data/matters/<matter-id>/sources/   # immutable to AI
/data/matters/<matter-id>/outputs/   # writable by approved tool
```

Do not let the model specify an absolute path.

## Required API surface

Implement equivalent versioned endpoints for:

- auth/session;
- session mode;
- matters;
- file listing/read/versions;
- search;
- conversation/message streaming;
- tool plan/approve/execute;
- admin health/audit (minimal Phase 1).

## Security headers / web safety

- same-origin by default;
- secure HttpOnly SameSite session cookie or equivalently robust session design;
- CSRF protection for cookie-based mutations;
- CSP;
- no raw model/source HTML execution;
- sanitised Markdown;
- external images/resources disabled in untrusted Markdown;
- request/file size limits;
- rate limit auth/model routes;
- parameterised DB queries;
- no stack traces to normal users.

## Tests that must exist before calling Phase 1 complete

- direct write API blocked in read-only mode;
- User A cannot retrieve User B matter/file by id;
- cross-matter semantic search leakage test returns zero forbidden results;
- C4 file is not indexed/model-visible;
- malicious source instruction cannot change mode or create a write capability;
- `../`, absolute paths, encoded traversal and symlink escape rejected;
- malicious Markdown does not execute JS/load external beacon;
- provider key absent from browser bundle/network responses;
- write creates a new version and does not mutate source;
- stale version patch rejected;
- audit event created for allow/deny/write.

## Phase 2 preparation

After Phase 1 works, add a local ModelGateway adapter targeting an OpenAI-compatible local inference endpoint on the Linux/NVIDIA host. Do not change the rest of the product contract.

Add local embeddings, outbound-network-off test, internal HTTPS and read-only NAS mount.

## Engineering behaviour

Before coding:

1. inspect the repository;
2. write a short implementation plan;
3. state any assumption that changes the security model;
4. do not broaden scope without explicit reason.

While coding:

- prefer simple, inspectable code;
- do not invent fake security controls;
- make failures explicit/fail closed;
- use typed schemas;
- keep permission logic centralised;
- add tests with each security-sensitive feature.

At completion provide:

- run instructions;
- architecture summary;
- threat-control summary;
- demo script;
- test results;
- known limitations;
- exact next steps for Phase 2.

Do not claim “prompt-injection-proof”, “unhackable”, or “zero data leak”. The acceptance target is that model manipulation cannot gain authority or cross the enforced data boundary.
