# 16 — Deployment and Operations

## 1. Environments

### `dev`

- local developer machine;
- synthetic data;
- local stub/model possible;
- verbose logs.

### `demo`

- investor/customer demo;
- synthetic data only;
- hosted model allowed through gateway;
- rate/cost limits;
- visible demo banner;
- resettable.

### `pilot-local`

- customer/local hardware;
- local inference;
- approved pilot data;
- outbound default-deny;
- enhanced audit.

### `production`

- signed build;
- customer-specific policy;
- SSO/roles;
- backup/update/support runbooks;
- hardened host.

## 2. Configuration

Config tiers:

- immutable build config;
- deployment config;
- secrets;
- firm policy;
- matter policy.

Never store secrets in `.env` committed to source. For dev `.env` may be used locally with `.gitignore`; production uses OS/container secret mechanism.

## 3. Local DNS/TLS

- internal DNS record;
- HTTPS only;
- certificate from internal CA or DNS-01 automation;
- no public inbound route.

## 4. Startup

systemd targets:

1. storage mounts;
2. database;
3. inference;
4. application;
5. reverse proxy;
6. kiosk (if display attached).

Health dependencies prevent the UI from pretending the model/index is healthy when not.

## 5. Monitoring

Local metrics:

- CPU/RAM/GPU utilisation;
- VRAM/unified memory;
- disk free;
- inference latency;
- queue depth;
- index status;
- parser failures;
- backup age;
- update status;
- authentication/policy denial anomalies.

Default production telemetry should not send client content off-site.

## 6. Backups

Suggested:

- database/config/audit backup nightly;
- generated outputs per firm backup policy;
- indexes optional/rebuildable;
- encrypted backup destination;
- periodic offline/immutable copy;
- restore test with documented duration.

## 7. Updates

Release flow:

- build → SBOM → scan → sign → staging test → pilot ring → production ring.

At customer:

- notify/approve maintenance;
- backup;
- temporarily enable update route if offline profile;
- verify signature;
- apply;
- migrate;
- run health/security smoke tests;
- close route;
- record version.

## 8. Demo reset

One command/admin action resets:

- demo conversations;
- generated files;
- synthetic database;
- provider usage counters (where locally tracked);

Never reuse production data in demo.

## 9. Incident isolation

Operator/admin must be able to:

- disable external egress immediately;
- disable a user/session;
- disable read/write mode globally;
- stop tool workers;
- take appliance into read-only containment state;
- export logs for incident review.

## 10. Capacity

Model sizing is based on:

- expected concurrent users;
- model precision/size;
- context length;
- document volume;
- embedding/index workload;
- transcription/vision if later enabled.

Do not sell hardware based on parameter count alone; benchmark the actual workflows.
