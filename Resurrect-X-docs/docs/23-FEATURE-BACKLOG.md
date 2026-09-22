# 23 — Feature Backlog

## P0 — Demo

- [ ] Auth/login
- [ ] Matter selector
- [ ] Chat streaming
- [ ] `.md`/`.txt` file store
- [ ] FTS/search
- [ ] RAG citations
- [ ] Read-only/read-write server policy
- [ ] Create/patch output tools
- [ ] File versions
- [ ] Audit events
- [ ] Classification C0–C4
- [ ] Demo-connected model gateway
- [ ] Security/processing badges
- [ ] Demo data reset
- [ ] Security test suite

## P1 — Local technical pilot

- [ ] Local model adapter
- [ ] Local embedding adapter
- [ ] GPU health/capacity panel
- [ ] Internal TLS/DNS
- [ ] Offline test
- [ ] Read-only NAS mount
- [ ] Local encrypted storage
- [ ] Backup/restore
- [ ] Kiosk prototype

## P1 — Law-firm pilot

- [ ] SSO/OIDC
- [ ] Matter membership/RBAC
- [ ] Information barriers
- [ ] PDF parser sandbox
- [ ] DOCX parser sandbox
- [ ] Exact page/paragraph citations
- [ ] Admin policy editor
- [ ] Retention controls
- [ ] Audit export
- [ ] Redaction/masking policies
- [ ] Human approval policies
- [ ] Firm-specific RAG eval set

## P2 — Production appliance

- [ ] Host hardening baseline
- [ ] Default-deny egress
- [ ] Signed update path
- [ ] Update rollback
- [ ] SBOM
- [ ] Central/local security alerts
- [ ] maintenance console
- [ ] secure boot/TPM integration where available
- [ ] encrypted backup target
- [ ] independent pen test

## P2 — Legal workflows

- [ ] contract checklist comparison
- [ ] chronology generator
- [ ] precedent research workspace
- [ ] client update draft workflow
- [ ] discovery/brief summary
- [ ] matter handover pack
- [ ] house-style templates

## P3 — Integrations

Potential, each separately scoped:

- [ ] Microsoft 365/SharePoint
- [ ] iManage
- [ ] NetDocuments
- [ ] local SMB/NFS file servers
- [ ] practice management systems
- [ ] controlled email draft (not auto-send by default)

Every integration requires:

- permissions model;
- data-flow diagram;
- external-connection decision;
- tool schema;
- security tests;
- audit schema;
- failure/rollback path.

## P3 — Agentic/automation

- [ ] scheduled read-only brief
- [ ] controlled matter summary refresh
- [ ] filing suggestions
- [ ] low-risk template generation

Do not add autonomous high-impact actions until real pilot data shows a clear need and the permission model is mature.
