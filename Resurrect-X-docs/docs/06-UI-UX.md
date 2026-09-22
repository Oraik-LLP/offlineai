# 06 — UI / UX Specification

## 1. Product shell

Desktop-first, responsive browser application.

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ Resurrect X     Matter: Brighton v Apex     READ ONLY     LOCAL / DEMO      │
├───────────────┬───────────────────────────────────────┬──────────────────────┤
│ Chats         │ Conversation                          │ Sources              │
│ Matters       │                                       │ Actions              │
│ Files         │ User: Find the termination clause...  │ Security             │
│ Search        │                                       │                      │
│               │ Assistant: ... [1] [2]                │ [1] contract.md      │
│               │                                       │ exact passage        │
│               │                                       │                      │
├───────────────┴───────────────────────────────────────┴──────────────────────┤
│ + Attach     Ask about this matter...                           Send         │
└──────────────────────────────────────────────────────────────────────────────┘
```

## 2. Primary navigation

### Chats

- Recent conversations.
- Matter badge.
- Search.
- Retention state.

### Matters

- Matters the current user is permitted to access.
- Optional “personal workspace”.
- Classification summary.

### Files

Tabs:

- Sources
- Outputs
- Restricted/blocked (only metadata if authorised)

### Search

Unified search with exact + semantic results, always scope-filtered before ranking.

### Admin (role-gated)

- Users and roles.
- Matter access.
- Classification policy.
- Network/connected-mode status.
- Model health.
- Audit.
- Backup/update status.

## 3. Modes UX

The mode control is a security-relevant control and must not be subtle.

### Read only

Label: `READ ONLY` with lock icon.  
Tooltip: “Can read permitted material and draft in chat. Cannot change files.”

### Read & write

Label: `READ & WRITE` with edit/shield icon.  
Activation may require re-authentication for sensitive deployments.

The mode is stored server-side in the session. UI state mirrors the server; it does not define permissions.

## 4. File viewer

Header:

- file name;
- matter;
- classification;
- version;
- hash/verified indicator (admin detail optional);
- source/output tag.

Body:

- safe rendered text;
- line numbers or paragraph anchors for citations;
- no active HTML/scripts from Markdown;
- no external image loading for untrusted Markdown.

Right rail:

- related citations;
- versions;
- policy.

## 5. Write flow

1. User asks for an action.
2. Model produces a structured tool proposal.
3. Server validates schema.
4. Policy engine evaluates user, matter, classification, session mode and path.
5. If approval required, UI renders a human-readable plan.
6. User approves.
7. Server mints short-lived capability for the exact action.
8. Tool executes.
9. New version is written.
10. Audit event records the outcome.
11. UI shows result and rollback/version link.

## 6. Blocked-action UX

Do not produce scary generic errors.

Example:

> **Write blocked — Read-only mode**  
> I can prepare the report here, but this session cannot change files. Switch to Read & write if your role and this matter allow it.

For policy-restricted data:

> **Action blocked by matter policy**  
> This source is classified Restricted. The policy permits reading but not AI-generated file changes.

Do not tell users how to bypass the control.

## 7. Prompt injection UX

When suspicious content is detected in a source, do not necessarily alarm the user with every classifier hit. The core safety comes from control boundaries.

Useful user-visible state:

- `Untrusted source content` badge for externally supplied documents where appropriate.
- If source text asks the AI to execute an action, the system treats that as quoted data.
- If the assistant cannot safely complete a request, explain which capability was denied.

## 8. Local / connected state

Persistent status indicator:

- `LOCAL` — inference and data path local.
- `DEMO CONNECTED` — demo model gateway may use an external provider; only demo-safe data enabled.
- `EXTERNAL FEATURE ON` — for a specific optional connector in later phases.

Never hide a boundary-changing connection in a settings page only.

## 9. Kiosk UX

For the appliance-attached screen:

- Launch directly to login/workspace.
- No address bar.
- External navigation disabled.
- No desktop, terminal, settings app, or file manager from the operator account.
- `Exit` means **lock/stop the application session**, not “drop to Linux desktop”.
- Maintenance is a separate admin path requiring local privileged authentication.

## 10. Empty/error states

Examples:

- No files indexed → explain supported file types and scope.
- Model offline → “Local model is unavailable; no request has left the appliance.”
- Search has no permitted results → do not reveal the existence of inaccessible material.
- File parsing failed → show failure reason to authorised user; do not return an empty document as if successful.

## 11. Accessibility

- Full keyboard path through chat, citations, source pane and approval dialog.
- Screen-reader labels for security state.
- 44px minimum primary touch targets on tablet/mobile.
- Classification icon + label; colour is supplementary.
- Modal approval cannot trap focus incorrectly.
