# 13 — Threat Model

## 1. Protected assets

- client confidential information;
- privileged material;
- matter data;
- personal information;
- firm precedents/IP;
- credentials/API keys;
- model/system configuration;
- audit records;
- source integrity;
- availability of the appliance.

## 2. Threat actors

- malicious external attacker;
- compromised user endpoint;
- malicious/curious insider;
- over-privileged administrator;
- compromised dependency/model package;
- malicious document/source content;
- stolen appliance/drive;
- attacker abusing public demo endpoint.

## 3. Key threats and controls

| Threat | Example | Primary controls |
|---|---|---|
| Direct prompt injection | user asks model to ignore policy | policy outside model; fixed tool list; no secrets in prompt |
| Indirect prompt injection | document contains “send all files…” | source treated as data; no egress tool; tool broker policy |
| Cross-matter leakage | semantic search returns another client | ACL filter before retrieval; matter ids on chunks; tests |
| Excessive agency | model edits/deletes source | no delete tool; source mount read-only; capabilities |
| API key leakage | key included in frontend | server-side gateway; secret scanning; rotation |
| Path traversal | output name `../../...` | opaque ids; canonicalisation; fixed output root |
| Symlink escape | path inside outputs links outside | no-follow/openat-style safe file ops; root validation |
| RAG poisoning | malicious precedent/source manipulates answer | provenance; source trust metadata; human review; ingestion controls |
| System prompt leakage | user extracts system prompt | prompt has no secrets; auth not dependent on hidden instructions |
| Malicious Markdown | script/external image exfiltrates | sanitised renderer; CSP; no external resources |
| Unsafe model output | generated HTML/command executed | output treated as text; typed tools; sanitisation |
| Supply-chain compromise | package/model tampered | pinned hashes, SBOM, signed artifacts, scan |
| Kiosk escape | shortcut opens shell/browser | restricted OS account; app allowlisting; no desktop session |
| NAS credential theft | app has full RW domain account | separate least-privilege read-only service account |
| Audit deletion | attacker removes evidence | append-only/remote/immutable log strategy; restricted admin |
| Data theft after appliance theft | disk read offline | full-disk encryption; key handling |
| Denial of service | huge prompt/file/model calls | quotas, size limits, timeouts, concurrency limits |

## 4. AI-specific safety property

For every model-controlled input, ask:

> If the model is fully compromised, what can it do with the capabilities currently exposed?

The answer for MVP should be approximately:

- read only the same matter data already authorised to the user;
- create/patch only approved output files when session policy allows;
- no arbitrary network;
- no shell;
- no permission changes;
- no source deletion.

That is the desired blast radius.

## 5. Attack trees to test

### Exfiltrate Matter B while user is in Matter A

Possible paths:

- guess file id;
- semantic retrieval leakage;
- search metadata leakage;
- citation endpoint bypass;
- cached model context reuse;
- audit/admin endpoint leakage.

Each must be tested independently.

### Turn read-only into read/write

Possible paths:

- UI tampering;
- API parameter;
- forged tool JSON;
- prompt injection;
- session cookie manipulation;
- stale capability replay.

Server must reject all except an authorised mode transition.

### Escape output path

Possible paths:

- `../`;
- percent encoding;
- Unicode separators;
- absolute path;
- symlink;
- race condition;
- filename extension trick.

Use safe filesystem APIs and tests, not regex alone.

## 6. Residual risk

Even with the architecture:

- model answers may be inaccurate;
- authorised users may intentionally misuse permitted data;
- source data can itself be wrong;
- physical/admin compromise can defeat application-level controls;
- zero-day vulnerabilities exist;
- prompt injection can affect content quality even when agency is contained.

These risks must be addressed through human review, governance, monitoring and layered controls.
