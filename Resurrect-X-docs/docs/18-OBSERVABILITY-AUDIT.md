# 18 — Observability and Audit

## 1. Principle

The audit trail should answer:

**Who did what, to which matter/resource, under which policy decision, when, from which session, and what changed?**

It should not become a second uncontrolled repository of privileged text.

## 2. Audit event schema

```json
{
  "event_id": "uuid",
  "timestamp": "RFC3339",
  "actor_user_id": "uuid",
  "session_id": "uuid",
  "matter_id": "uuid|null",
  "event_type": "FILE_WRITE",
  "resource_id": "uuid|null",
  "tool": "file.create_output|null",
  "mode": "read_write",
  "policy_decision": "allow",
  "reason_code": "RW_OUTPUT_ALLOWED",
  "request_hash": "sha256",
  "result_hash": "sha256|null",
  "correlation_id": "uuid",
  "metadata": {}
}
```

## 3. Events

At minimum:

- login/logout/failure;
- session mode change;
- matter open;
- file read;
- search;
- model request metadata;
- tool proposal;
- policy allow/deny;
- approval;
- tool execution;
- file version creation;
- classification change;
- admin change;
- backup/update;
- external connection enable/disable;
- security alert.

## 4. Content policy

Default:

- store hashes, ids, counts, timing, model/runtime ids;
- avoid raw privileged prompt/output in central operational logs;
- if conversation retention is needed, store in the conversation store under the same matter ACL, not duplicated in generic telemetry.

## 5. Integrity

Pilot+ options:

- append-only database permissions;
- hash-chain events;
- periodic signed checkpoint;
- copy to separate local log host/storage;
- immutable backup.

## 6. Privacy

Admins should not automatically receive ordinary UI access to every private conversation simply because they can manage users. OS-level owners can ultimately access the appliance, so governance and privileged-admin logging remain necessary.

## 7. Metrics vs logs

Metrics contain no document text:

- request count;
- latency;
- token count;
- GPU memory;
- error rates;
- policy denial counts;
- storage/index health.

## 8. Alert examples

- repeated denied cross-matter ids;
- repeated path traversal attempts;
- admin login anomaly;
- unexpected outbound connection attempt;
- backup older than threshold;
- disk nearly full;
- audit writer failure;
- too many auth failures;
- connected mode enabled outside approved window.

Audit failure for a high-risk write should fail closed rather than execute an unlogged mutation.
