# 10 — Data, Files, RAG, Redaction and Retention

## 1. Data principle

Original source material is authoritative. Derived indexes, summaries, chunks, embeddings, and AI outputs are secondary artifacts and must never silently replace the original.

## 2. File classes

| Code | Label | Default model access | Default write | Demo-cloud eligibility |
|---|---|---|---|---|
| C0 | Public / Demo | Yes | Outputs | Yes |
| C1 | Internal | Yes | Policy-controlled | No by default |
| C2 | Confidential | Yes, authorised users | New output + approval | No |
| C3 | Privileged / Restricted | Explicit scope only | Read-only by default | No |
| C4 | No-AI / Sealed | No | No | No |

Classification inheritance:

- Matter has a default.
- Folder can increase restriction.
- File can increase restriction.
- Derived output inherits the **maximum sensitivity** of its sources unless an approved redaction/declassification workflow exists.

## 3. Source vs output separation

`Sources/`:

- evidence/input/reference;
- AI read only by default;
- human-controlled edits through existing DMS, not AI MVP.

`Outputs/`:

- AI-generated drafts/reports;
- versioned;
- writable in read/write mode subject to policy.

This simple separation dramatically reduces accidental source corruption.

## 4. Ingestion

### Phase 1

- `.txt`, `.md`.
- UTF-8 validation.
- max file size.
- strip/escape active HTML in rendering.
- compute SHA-256.
- chunk with stable anchors/line ranges.

### Phase 3+

PDF/DOCX/other complex formats:

- parse in isolated worker;
- malware scan where applicable;
- disable macros/external references;
- extract text only for model context unless explicitly required;
- preserve page/paragraph coordinates for citations;
- parsing failure is explicit.

## 5. RAG pipeline

```text
Authorised resource set
  -> parse/chunk
  -> local embedding
  -> metadata + vector index
  -> query ACL filter
  -> lexical/semantic ranking
  -> context assembly
  -> model
  -> citation map
```

Never rely on embeddings for security boundaries.

## 6. Cross-matter isolation

Every chunk carries:

- `matter_id`;
- `file_id`;
- `classification`;
- access groups;
- source hash/version.

Search query must include a deterministic ACL/matter filter before similarity ranking.

Regression test: use near-identical text in Matter A and Matter B. A user with only Matter A access must receive zero ids/snippets/embeddings-originated metadata from Matter B.

## 7. Prompt injection in documents

All source text is treated as **untrusted data**, even when it came from the firm's file store.

- Retrieved text is wrapped with provenance boundaries.
- The model is instructed that source content cannot modify tool permissions.
- More importantly, the tool broker ignores any “instructions” from source text and evaluates only the explicit user/tool request against policy.
- External links/images in Markdown are not automatically fetched.

## 8. Redaction and masking

Three separate concepts:

1. **UI masking** — hide values in previews/screenshots.
2. **Model redaction** — remove/tokenise fields before a permitted connected/cloud request.
3. **Deletion/de-identification** — lifecycle action on stored data.

Do not confuse visual blur with data protection.

Suggested UI policy:

- PII in list previews can be masked.
- Full content visible only to authorised user.
- “Reveal” on highly sensitive data can be logged.
- Logs/telemetry avoid raw restricted content.

For the cloud demo, C1+ should be blocked rather than relying on redaction as the sole protection.

## 9. File writes

Every write includes:

- authenticated user;
- matter;
- tool;
- requested filename/file id;
- source provenance;
- base version;
- policy decision;
- optional approval;
- resulting hash/version.

No in-place overwrite without version creation.

Atomic pattern:

1. write temp file inside same filesystem;
2. fsync;
3. validate;
4. atomic rename;
5. record version/audit.

## 10. Delete

No AI delete tool in early phases.

Human-admin deletion later should use retention policy and soft-delete/quarantine before purge where legally/operationally appropriate.

## 11. Retention

Retention varies by firm/matter/jurisdiction. Product should support:

- conversation retention period;
- generated output retention;
- index rebuild/deletion;
- legal hold flags;
- matter closure policy;
- secure delete/de-identification process where applicable.

Do not auto-delete client records based on a generic product default that conflicts with a firm's professional/recordkeeping obligations.
