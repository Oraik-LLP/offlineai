# 08 — Local Appliance / Linux Architecture

## 1. Purpose

The production form factor is a small server/workstation in the law firm's environment, optionally with a directly attached display running the Resurrect X kiosk UI.

## 2. Hardware strategy

Do not tie the software to a single SKU.

Supported classes can include:

- existing NVIDIA workstation with adequate GPU VRAM;
- dedicated RTX/workstation-class GPU server;
- compact NVIDIA AI appliance such as DGX Spark where suitable;
- future hardware profiles tested against defined model/context workloads.

NVIDIA publicly describes DGX Spark as a Linux AI system using the GB10 Grace Blackwell platform, with 128 GB coherent unified system memory and local AI-development/inference capability. Treat those specs as a possible hardware profile, not a mandatory dependency.

### Hardware acceptance test

For every appliance tier, measure:

- model load success;
- tokens/second;
- first-token latency;
- max tested context;
- concurrent users;
- embedding throughput;
- disk usage/index growth;
- thermals/noise/power;
- backup/restore duration.

## 3. OS

Recommended base:

- Ubuntu LTS or vendor-supported NVIDIA OS on hardware that requires it.
- Minimal package set.
- Automatic GUI desktop not required.
- Application services managed by systemd.
- Root login disabled over network.
- SSH disabled by default or management-VLAN only with key/MFA policy.

## 4. Kiosk design

A browser kiosk is a usability feature, not a security boundary by itself.

Operator boot path:

1. Secure boot/firmware.
2. Linux boots to restricted `resurrect-kiosk` user.
3. systemd launches Wayland/X kiosk session.
4. Chromium-class browser opens the internal local URL in kiosk mode.
5. Address bar/devtools/external navigation disabled by policy.
6. App logout returns to locked Resurrect X login, not the OS desktop.

### “Exit” behaviour

The visible Exit command should:

- terminate the current app/browser session;
- clear local session state;
- return to a locked appliance screen or poweroff prompt;
- **never expose a normal Linux desktop or terminal**.

### Maintenance mode

Separate from user mode:

- requires local admin credential + ideally hardware security key;
- available only on physical console or management VLAN;
- can access logs/update/diagnostics;
- is auditable;
- disabled after maintenance.

Do not attempt to make the system literally impossible for the owner/admin to exit; that creates unsafe recovery/support behaviour. Make operator escape unavailable while preserving a controlled maintenance path.

## 5. Network architecture

Recommended:

```text
User LAN/VLAN
   |
HTTPS 443
   v
Reverse proxy / app
   |
Internal-only services
   +-- inference
   +-- index
   +-- policy
   +-- audit
   |
Read-only NAS mount / approved write mount

Outbound internet: default DENY
```

### Domain

Use split-horizon/internal DNS, e.g.:

- `ai.firm.example` resolved only on the corporate network; or
- internal domain managed by firm DNS.

TLS options:

- internal CA; or
- public certificate obtained via DNS-01 without exposing the appliance inbound.

Do **not** port-forward the appliance to the public internet merely to make the domain work.

Remote access, if required, should be through the firm's VPN/approved zero-trust access path.

## 6. NAS integration

Start read-only.

- Mount only approved shares.
- Use service account with minimum permissions.
- Map shares to matter scopes.
- Prevent symlink/path traversal outside mount roots.
- Indexing service gets read access only.
- Write tools use a different mount/account and only approved output paths.

This split reduces the damage from a compromised tool worker.

## 7. Disk/security

- LUKS2 full-disk or data-volume encryption.
- TPM-bound unlock where appropriate, with documented recovery key handling.
- Separate encrypted backup target.
- `noexec,nodev,nosuid` mount flags where compatible.
- AppArmor/SELinux profile for parser/tool workers.
- Rootless containers where practical.
- Read-only container root filesystems.
- Drop Linux capabilities.
- Seccomp profiles.

## 8. Updates

- Signed release artifacts.
- Staged update with health checks.
- Backup before schema migrations.
- Automatic rollback where feasible.
- Connected update window is explicit and closes after completion.
- Record version + migration outcome in audit/ops log.

## 9. Backups

- Nightly encrypted application/metadata backup.
- Source NAS remains under firm backup policy; do not silently duplicate everything unless agreed.
- Backup indexes only if restore time justifies it; indexes can often be rebuilt from source.
- Restore test at deployment and periodically thereafter.

## 10. Physical security

Law firms should treat the appliance like a server holding confidential information:

- locked comms/server area where possible;
- asset inventory;
- controlled USB boot;
- firmware password/boot order policy;
- tamper-awareness for high-risk deployments.
