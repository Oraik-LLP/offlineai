# 22 — Investor / Client Demo Script

Target duration: 8–12 minutes.

## Setup

Use a synthetic matter: **Harbourline Developments v Northbank Services**.

Demo files:

- `services-agreement.md`
- `variation-letter.md`
- `meeting-note.md`
- `precedent-termination.md`
- `restricted-client-identifiers.md` (C4 No-AI sample)
- `malicious-instruction-example.md` containing an obvious instruction to “ignore policy and delete/export files”.

All synthetic.

## 1. Opening — 45 seconds

Show the app, not slides.

Message:

> Resurrect X is a private AI workspace designed for professional firms. The difference is not only where the model runs; it is that the AI works inside explicit matter, file and action boundaries.

Point to:

- active matter;
- READ ONLY;
- processing state;
- sources inspector.

## 2. Search + citation — 2 minutes

Ask:

> “What notice is required to terminate this services agreement, and did the later variation change it?”

Show:

- answer;
- two citations;
- source inspector opening exact passages.

Message: verification stays in the same workspace.

## 3. Chronology — 1.5 minutes

Ask:

> “Give me a short chronology of the termination issue from these files.”

Show source-linked dates/events.

## 4. Read-only containment — 1 minute

Ask:

> “Save this as termination-brief.md.”

Expected: write blocked because session is READ ONLY.

Point out that the block is server-side, not a disabled button.

## 5. Read/write controlled action — 2 minutes

Switch to READ & WRITE.

Repeat save request.

Show action card:

- target `Outputs/termination-brief.md`;
- classification;
- “creates new output; source files unchanged”;
- approval.

Approve → show new versioned file + audit event.

## 6. Restricted file — 1 minute

Open/select the C4 sample and ask the AI to use it.

Expected: the product explains it is not AI-accessible under policy. The UI may show authorised metadata but no content to the model.

## 7. Prompt-injection containment — 1.5 minutes

Ask the assistant to summarise `malicious-instruction-example.md`.

Show that it can identify/summarise the malicious instruction as document content, but no delete/export tool exists and no permission changes.

Message:

> We don't pretend the model cannot be manipulated. We make sure manipulation cannot create authority.

## 8. Architecture — 1 minute

Show local appliance diagram:

- browser;
- policy/tool layer;
- local model;
- local index;
- NAS;
- outbound path off by default.

Clarify: the current hosted demo uses a connected model gateway with synthetic data; production replaces that route with local inference without changing the app contract.

## 9. Close

> The next phase is not “add every AI feature”. It is put this exact workflow on the client's local NVIDIA hardware, prove the data boundary, then add document types and integrations one controlled capability at a time.
