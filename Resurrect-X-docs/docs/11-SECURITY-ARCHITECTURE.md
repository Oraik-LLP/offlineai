# 11 — Security Architecture

## 1. Security objective

Contain AI uncertainty inside deterministic trust boundaries.

The language model can be wrong, manipulated, or confused. It must therefore be treated as an **untrusted planner/content generator**, not an access-control component.

## 2. Trust boundaries

1. **Browser/user boundary** — requests are untrusted until authenticated/authorised.
2. **Model boundary** — model text and tool proposals are untrusted.
3. **Source-content boundary** — files/web text are untrusted instructions-wise.
4. **Tool boundary** — typed broker enforces capability/paths.
5. **Storage boundary** — OS/NAS ACLs reinforce app policy.
6. **Network boundary** — local services isolated; egress default-deny.
7. **Admin/maintenance boundary** — separate from normal user UI.

## 3. Core controls

### Authentication

- Strong local credentials or SSO/OIDC.
- Argon2id/scrypt-class password hashing for local accounts.
- MFA for admin/remote routes.
- Short session lifetime for high-risk modes.
- Session revoke and forced logout.

### Authorisation

- Server-side RBAC + matter ACL + classification policy.
- Deny by default.
- Direct object reference tests.
- Admin role does not automatically imply “read all private conversations” unless deployment policy explicitly grants it.

### Capability-based tool execution

The model proposes an action; server returns a narrowly scoped, short-lived capability only after policy and approval.

Capability scope includes:

- user/session;
- matter;
- exact tool;
- file/path scope;
- max classification;
- expiry;
- one-time nonce.

### Network

Production:

- no direct public inbound;
- internal HTTPS only;
- default-deny outbound;
- provider/web/integration egress as explicit allowlist exceptions;
- separate management network where possible.

### Secrets

- Never in system prompt.
- Never in browser bundle/localStorage.
- Never in source repo.
- OS secret store/systemd credentials/container secrets.
- Rotation procedure.
- Provider keys scoped/rate-limited where vendor supports it.

### File system

- Separate source and output roots.
- NAS source mount read-only to AI process.
- Canonicalise path then validate against root.
- Reject symlinks/reparse escapes.
- Extension allowlist.
- No arbitrary path from model.

## 4. Prompt-injection posture

Do not promise prevention. Design for **non-escalation**:

- prompts cannot grant capabilities;
- source text cannot grant capabilities;
- model output cannot bypass schema;
- system prompt contains no sensitive secrets;
- retrieval cannot cross ACLs;
- egress is unavailable unless explicitly enabled;
- writes require policy/possibly human approval.

Desired failure mode: manipulated model gives a bad answer that is reviewable, not a data breach or filesystem compromise.

## 5. Cloud demo controls

The demo is a materially different threat boundary.

- C0 synthetic data only.
- Server-side gateway.
- No API key in browser.
- Cost and rate caps.
- Strict outbound allowlist to chosen provider endpoint.
- No provider-side file upload unless necessary; send minimum request content.
- Disable training/retention features where vendor contract/API permits, but do not treat policy settings as equivalent to local processing.
- Wipe/reset demo data regularly.

## 6. Production local controls

- Local inference endpoint not reachable outside host/private service network.
- No telemetry from model runtime unless explicitly allowed.
- Local embeddings.
- Encrypted disks.
- Host firewall.
- Container/service isolation.
- Signed update path.
- Backup encryption.
- Audit log protection.

## 7. Web application security

Target OWASP Top 10:2025 classes including access control, security configuration, supply chain, crypto, injection, authentication, logging and exceptional-condition handling.

Controls:

- CSP;
- HSTS on appropriate deployed domain;
- secure cookies;
- CSRF protection;
- output encoding;
- parameterised database queries;
- strict schema validation;
- dependency pinning/scanning;
- no raw HTML from model/source by default;
- safe Markdown renderer;
- upload size/type limits;
- structured error handling.

## 8. Supply chain

- Lockfiles.
- SBOM for production builds.
- Signed artifacts where possible.
- Dependency vulnerability scanning.
- Container image pinning by digest for production.
- Model files pinned by hash/revision.
- Record model licence/source and checksum.
- No auto-download of arbitrary models/plugins in production.

## 9. Security claims policy

Approved style:

- “Default-deny outbound in the local deployment profile.”
- “Writes are policy checked and versioned.”
- “The model cannot add tools to itself.”

Avoid:

- “zero chance of data leak”;
- “prompt injection impossible”;
- “unhackable”;
- “guarantees legal privilege”.

## 10. Security acceptance principle

Every major security claim must map to:

- configuration;
- test;
- evidence;
- owner;
- re-test cadence.
