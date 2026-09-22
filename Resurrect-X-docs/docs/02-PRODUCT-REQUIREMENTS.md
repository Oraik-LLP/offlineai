# 02 — Product Requirements

## 1. Requirement levels

- **P0:** must exist for the first credible demo/pilot.
- **P1:** required for a law-firm pilot.
- **P2:** later enterprise capability.

## 2. Functional requirements

### Conversation

- **P0** Create and persist conversations.
- **P0** Stream model responses.
- **P0** Show current mode (`READ ONLY` / `READ & WRITE`) in the persistent chrome.
- **P0** Show when a request is demo-connected vs local.
- **P0** Attach/select permitted text/Markdown sources.
- **P0** Source-cited answers for RAG requests.
- **P1** Matter-scoped chat history.
- **P1** Conversation retention policies.

### Files and search

- **P0** Store/read/write `.txt` and `.md` only.
- **P0** Exact filename/full-text search.
- **P0** Semantic retrieval for indexed demo documents.
- **P0** File metadata: id, name, path, owner, matter, classification, hash, version, created/modified timestamps.
- **P0** Render files in a safe text viewer.
- **P0** Never execute Markdown HTML/scripts.
- **P1** PDF/DOCX ingest in isolated parser workers.
- **P1** NAS watched folders with explicit allowlist.
- **P1** OCR only as a separately enabled pipeline.

### Read-only mode

- **P0** Server rejects all mutation tool calls.
- **P0** UI hides/disabled mutation affordances, but UI state is not relied upon for security.
- **P0** A malicious prompt cannot change mode.
- **P0** A retrieved document cannot change mode.

### Read/write mode

- **P0** Create new `.md` / `.txt` outputs in an approved root.
- **P0** Patch generated output files.
- **P0** Version every change.
- **P0** Show path and change summary before higher-risk writes.
- **P0** Deny path traversal, symlink escapes, unsupported extensions, and disallowed destinations.
- **P1** Rename/move generated outputs under policy.
- **P1** Multi-file action plans with approval.

### Classification

- **P0** Every file has a classification.
- **P0** Unknown classification behaves as restricted/fail-closed.
- **P0** C4 / No-AI content cannot be indexed or sent to a model.
- **P0** Cloud demo provider route accepts C0 only unless an explicit demo-safe policy is configured.
- **P1** Matter defaults and inherited folder classification.
- **P1** Information-barrier groups.

### Authentication and authorisation

- **P0** Authenticated sessions for non-public demos.
- **P0** Role: user/admin.
- **P0** Authorise every resource request server-side.
- **P1** SSO/OIDC or directory integration.
- **P1** Roles plus matter membership/capability policy.
- **P1** MFA for admin and remote access.

### Audit

- **P0** Log authentication, mode changes, file accesses, search, tool plans, tool outcomes, policy denials, writes and admin changes.
- **P0** Never store provider API secrets in audit records.
- **P0** Sensitive prompt bodies are configurable; default pilot logs metadata/hashes rather than raw privileged text.
- **P1** Hash-chain or append-only audit records.
- **P1** Export for review.

## 3. AI requirements

- The model can propose actions but cannot authorise itself.
- Every tool has a fixed JSON schema.
- Tool parameters are validated server-side.
- Retrieval is filtered by user + matter + classification **before** semantic ranking.
- System prompt contains no secrets.
- Model-provider identity is abstracted from normal UI.
- Model fallback cannot silently widen the data boundary.
- Local model runtime must be replaceable behind an OpenAI-compatible or equivalent internal adapter.

## 4. Non-functional requirements

### Security

- Default-deny network policy in production.
- TLS even on the local network.
- Encryption at rest.
- Principle of least privilege.
- No root container for the application path where practical.
- Separate parser/inference/tool services or sandboxes.
- Security headers and CSP for web app.
- Secrets never compiled into frontend bundles.

### Performance

Initial targets (validate on delivery hardware):

- App shell usable < 2 seconds on LAN after cache warm.
- Search response < 1 second for common metadata/exact search at pilot scale.
- First token target < 4 seconds for everyday local model after warm load.
- File write acknowledgement < 1 second after policy/approval.

These are product targets, not hardware promises.

### Reliability

- Core read/search/chat should survive internet outage in production.
- Graceful model restart.
- Backups have a tested restore procedure.
- Corrupt/unparseable file is reported as failed, never silently indexed as empty.

### Accessibility

- Keyboard navigable.
- Visible focus states.
- WCAG 2.2 AA target for customer-facing UI.
- Do not rely on colour alone for classification/mode.

### Operability

- Health page with model, index, storage, queue, and disk status.
- Safe update/rollback flow.
- Clear local version/build id.
- Log rotation and disk-pressure handling.

## 5. Legal-professional workflow requirements

- “AI-generated” output remains review-required unless a firm policy explicitly defines a low-risk workflow.
- Citations should point to local source ids/locations and passage ranges.
- The UI must not present generated text as authoritative legal advice simply because it came from the firm's data.
- Draft/report export includes provenance metadata where useful.
- The product should support firm policy notices, client consent/disclosure workflows if required by the deployment.

## 6. Acceptance rule

A feature is not considered “secure” merely because the UI prevents it. The backend acceptance test must prove the denied operation is impossible through direct API calls using the same user/session.
