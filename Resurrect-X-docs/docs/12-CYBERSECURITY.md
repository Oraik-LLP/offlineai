# 12 — Cybersecurity Baseline

## 1. Frameworks

Use a risk-based combination of:

- ASD/ACSC Essential Eight as a baseline for internet-connected enterprise IT;
- ASD Information Security Manual (ISM) concepts for broader control selection;
- OWASP Top 10:2025 for the web application;
- OWASP GenAI/LLM risk guidance for prompt injection, sensitive-information disclosure, excessive agency, output handling, vector/embedding weaknesses and related AI risks.

As of September 2026, ASD has also been consulting on an evolution of the Essential Eight into a broader “Essentials” series. Revalidate current guidance during each production security review rather than freezing the 2023 maturity model forever.

## 2. Essential Eight mapping (product-facing interpretation)

### Application control

- Allowlisted appliance packages/containers.
- Kiosk cannot launch arbitrary applications.
- Tool workers cannot execute arbitrary binaries.

### Patch applications

- Monthly normal patch window.
- Faster response for critical/exploited vulnerabilities according to current ASD guidance and risk.
- Dependency/image scanner in CI.

### Configure Microsoft Office macros

Mostly a firm endpoint control rather than appliance control. For document ingestion, Resurrect X never executes Office macros.

### User application hardening

- Kiosk browser hardened.
- External content/navigation limited.
- Browser extensions disabled.
- Devtools disabled in kiosk profile.

### Restrict administrative privileges

- Separate kiosk/user and admin accounts.
- No routine root use.
- sudo tightly scoped and logged.
- service accounts least privilege.

### Patch operating systems

- Supported LTS/vendor OS.
- monitored patch status.
- staged reboot/rollback process.

### Multi-factor authentication

- Admin and remote access should use phishing-resistant MFA where practical.
- Integrate with firm identity provider at pilot/production stage.

### Regular backups

- encrypted backup;
- immutable/offline component where possible;
- periodic restore tests;
- documented RPO/RTO per deployment.

## 3. Host hardening

- UEFI Secure Boot if supported.
- TPM where appropriate.
- disk encryption.
- disable unused services.
- firewall default deny inbound except required HTTPS/management.
- outbound deny by default for local profile.
- no password SSH; ideally SSH off by default.
- auditd/journald retention policy.
- AppArmor/SELinux confinement.
- USB storage disabled or restricted for kiosk account where appropriate.

## 4. Container/service hardening

- non-root UID;
- read-only root filesystem;
- drop capabilities;
- `no-new-privileges`;
- seccomp;
- limited mounts;
- no Docker socket mounted into app;
- separate network namespaces for model/parser/tool services;
- secrets mounted as files/credentials, not environment variables visible to broad process inspection where stronger secret mechanisms are available.

## 5. Network segmentation

Suggested zones:

- user access VLAN;
- appliance service network/host-local;
- management VLAN;
- NAS zone;
- optional controlled egress proxy.

Firewall rules should reflect explicit flows, not “same LAN = trusted”.

## 6. Remote support

Default: none.

If customer requests support:

- time-bound support window;
- customer initiates session;
- MFA;
- session recording/logging where appropriate;
- no standing vendor tunnel;
- support identity separate from customer users;
- scope limited to diagnostics; client content access requires explicit approval.

## 7. Malware/file safety

- File type allowlist.
- Scan externally sourced complex documents where appropriate.
- Parsing sandbox.
- No macros.
- No external resource loading.
- Archive bomb limits if archives are ever supported.
- PDF/image parser kept patched.

## 8. Incident response

Minimum playbook:

1. detect/triage;
2. isolate appliance/network route;
3. preserve audit/log evidence;
4. rotate credentials/secrets if exposed;
5. assess affected data/users;
6. determine whether Privacy Act/NDB or other obligations apply with legal/privacy advisers;
7. notify as required;
8. restore from known-good state;
9. root-cause analysis;
10. remediation and regression test.

## 9. Vulnerability management

- SAST/secret scan on commits/CI.
- dependency/SBOM scan.
- container scan.
- DAST against staging.
- periodic authenticated penetration testing.
- AI red-team suite.
- critical findings block release.

## 10. Security ownership

Every deployment should have named owners for:

- OS patching;
- app updates;
- identity;
- backups;
- matter permissions;
- incident response;
- physical appliance;
- external connection approval.
