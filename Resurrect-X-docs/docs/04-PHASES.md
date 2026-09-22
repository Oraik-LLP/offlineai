# 04 — Delivery Phases

## Phase 0 — Product/security foundation

**Purpose:** remove ambiguity before code expands.

Deliver:

- Product requirements and user flows.
- Classification model.
- Read-only/read-write semantics.
- Threat model.
- API/tool contracts.
- Demo vs production boundary.
- Visual design direction.
- Initial security test plan.

Exit criteria: team can answer “what can the model do?” with a finite list of capabilities.

---

## Phase 1 — Investor/client demo

**Purpose:** demonstrate the interaction model quickly.

Deliver:

- Premium web UI.
- Demo auth.
- Synthetic matters.
- Text/Markdown file store.
- Chat + RAG + citations.
- Read-only/read-write mode.
- Four typed file tools.
- Server-side cloud model gateway.
- Audit timeline.
- Blocked-action demo.

Security boundary: no real client data.

Exit criteria: polished 10-minute demonstration can be repeated reliably.

---

## Phase 2 — Local AI technical pilot

**Purpose:** replace hosted inference with local inference and prove on-premise viability.

Deliver:

- Linux/NVIDIA host.
- Local model endpoint behind the same model-gateway interface.
- Local embeddings.
- Local-only mode with outbound network disabled after setup.
- Internal HTTPS.
- Local accounts/roles.
- Realistic synthetic legal corpus.
- NAS/file-server connector in **read-only** mode first.
- Backup/restore prototype.

Hardware note: support must be sized from available VRAM/RAM. An older GTX-class card may run only smaller/quantised models; do not promise a specific model family until benchmarked. RTX/workstation or DGX-class hardware is preferable for heavier workloads.

Exit criteria: core chat/search/citation works without internet.

---

## Phase 3 — Controlled law-firm pilot

**Purpose:** safely introduce real firm data under a written pilot scope.

Deliver:

- SSO/OIDC where possible.
- Matter-based ACLs.
- Information barriers.
- PDF/DOCX ingest in sandboxed parser workers.
- Read/write outputs with versioning and approvals.
- Classification policy UI.
- Admin security/configuration surface.
- Retention controls.
- Audit export.
- Redaction/masking controls.
- RAG evaluation on firm-approved test questions.

Exit criteria: pilot acceptance suite passes on customer data and hardware.

---

## Phase 4 — Hardened appliance

**Purpose:** turn the pilot into a controlled product appliance.

Deliver:

- Kiosk/operator shell.
- Separate maintenance/admin mode.
- Full-disk encryption.
- Secure boot/TPM where supported.
- Default-deny egress.
- Network segmentation.
- Signed/reproducible release pipeline where practical.
- Image/container hardening.
- Immutable or protected system partitions where practical.
- Encrypted, tested backup/restore.
- Security monitoring.
- Independent penetration test/remediation.

Exit criteria: reproducible install + acceptance checklist + rollback path.

---

## Phase 5 — Production legal platform

**Purpose:** build operational maturity for broader legal deployments.

Deliver:

- DMS connectors under least privilege.
- More document types.
- Precedent/matter workflows.
- Policy packs by practice area.
- Fine-grained admin/audit.
- Incident response playbook.
- Update rings and signed updates.
- Support access that is disabled unless explicitly opened by customer.
- Compliance evidence pack.
- Capacity planning and monitoring.

Exit criteria: customer deployment can be operated and supported without ad hoc engineering access.

---

## Phase 6 — Governed agentic workflows

**Purpose:** add automation only after the permission model is mature.

Potential features:

- Scheduled briefs.
- Intake workflows.
- Controlled document generation.
- Approved task integrations.
- Matter housekeeping.
- Human-in-the-loop email/workflow actions.

Rules:

- New tool = new permission + threat analysis + audit schema + acceptance test.
- No “generic shell” tool simply to accelerate feature delivery.
- Agents cannot create new tools or broaden their own scopes.

---

## Phase sequencing principle

**Capability follows containment.**

Do not add a more powerful action until there is a deterministic way to scope, approve, log, test, and revoke it.
