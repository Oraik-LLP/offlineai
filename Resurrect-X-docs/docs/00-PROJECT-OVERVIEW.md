# 00 — Project Overview

## 1. Project

**Codename:** Resurrect X  
**Category:** Private AI / local AI appliance + browser workspace  
**Initial vertical:** Australian legal practices  
**Primary deployment:** Firm-controlled Linux/NVIDIA appliance on the local network  
**Initial commercial motion:** Investor/client demo → private pilot → production appliance

## 2. Product thesis

Law firms already have valuable intelligence in matter folders, correspondence, file notes, precedents, templates, briefs, contracts, and internal know-how. Generic AI tools are useful, but client confidentiality, privilege, data-location, governance, and auditability constrain how those tools can be used.

Resurrect X brings an AI working surface to the data rather than requiring the firm to move its core data to the AI.

The product should make three things true at the same time:

- AI is as easy to use as a modern chat assistant.
- The user can inspect exactly which firm sources supported an answer.
- The AI receives no authority beyond what the current user and current matter policy allow.

## 3. Primary jobs to be done

Initial high-value law-firm jobs:

- Find a file, clause, precedent, email export, or note from a matter.
- Ask questions across approved matter material and receive cited answers.
- Build matter chronologies from source documents.
- Compare a contract to a precedent/checklist.
- Draft first-pass correspondence using matter context and firm style.
- Summarise a document or set of documents.
- Produce an internal note or review-ready report.
- Create a new Markdown/text output in an approved workspace.
- Edit a generated output while preserving the source documents.
- Later: create controlled automations and integrations after the security model is proven.

## 4. Explicit non-goals for MVP

The first investor/customer demo is **not**:

- an autonomous general-purpose computer-use agent;
- a replacement for a solicitor's professional judgment;
- a system that can run arbitrary shell commands;
- a browser automation robot;
- an unrestricted email sender;
- a production document-management-system replacement;
- a production-grade privileged-document ingestion system;
- a public internet service holding real client files.

## 5. Two operating modes

### 5.1 Read-only

Permitted:

- Search approved sources.
- Retrieve and quote small passages.
- Summarise and compare.
- Generate chat output.
- Generate a draft in memory for review.
- Export only when export policy allows.

Denied by server policy:

- Create, rename, move, delete, or modify source files.
- Mutate NAS paths.
- Execute arbitrary commands.
- Change classification.
- Change permission scope.

### 5.2 Read/write

Adds a limited set of typed actions:

- Create new output files in approved `Outputs/` or `Drafts/` directories.
- Patch a generated draft.
- Save a report or chronology.
- Rename/move a generated output within the same allowed scope.

Still denied:

- Editing original evidence/source material unless a later policy explicitly enables it.
- Writing outside the user's matter scope.
- Writing to restricted/no-AI resources.
- Following a write instruction embedded inside a source document.

Read/write is therefore **not “full computer access”**. It is a capability-limited file-work mode.

## 6. Data classification drives capability

Suggested initial classification model:

| Class | Label | AI access | Cloud-demo route | Write behaviour |
|---|---|---|---|---|
| C0 | Public/demo | Read | Allowed in demo | Allowed in approved outputs |
| C1 | Internal | Read | Block by default | Allowed by policy |
| C2 | Confidential | Read | Block | New outputs only; approval |
| C3 | Privileged/Restricted | Read if specifically authorised | Always block | Read-only by default |
| C4 | No-AI/Sealed | No indexing or inference | Always block | No AI action |

The mode switch can only make permissions narrower or request a permitted capability. It cannot make a C3/C4 resource less restrictive.

## 7. Demo vs production boundary

### Investor/customer demo

- Synthetic/redacted demo data only.
- Publicly reachable staging is acceptable only if no client data is present.
- Cloud model gateway is permitted behind the server.
- Provider identity is not shown in normal product UI.
- API keys exist only on the server.
- Tools limited to text/Markdown read/search/create/update.
- Strong “DEMO / NOT FOR CLIENT DATA” environment banner.

### Production target

- Local inference endpoint on customer hardware.
- Local embeddings and indexing.
- Data stored on appliance/NAS under firm policy.
- Default-deny outbound firewall.
- Optional external connections are explicit, documented exceptions.
- Internal DNS + HTTPS; no direct internet port-forwarding.
- Firm authentication and matter-based access controls.

## 8. Product quality targets

Resurrect X should feel:

- quiet rather than flashy;
- professional rather than “AI gimmick”;
- evidence-aware;
- obvious about whether it is reading or acting;
- explicit when a connection would leave the local boundary;
- reversible for every write;
- fast enough for routine office use.

## 9. Success metrics by stage

### Demo

- A first-time user can understand the product in under 60 seconds.
- A user can upload/create demo Markdown files and get cited answers.
- No provider secret appears in browser code/network payloads sent to the client.
- Read-only mode reliably blocks all mutations.
- A write always shows target path and planned change before execution when approval is required.

### Pilot

- Matter-level retrieval leakage rate: zero in the test suite.
- All writes are attributable to user, session, matter, tool, target and timestamp.
- Backup + restore acceptance test passes.
- Local system continues core chat/search work without internet.
- Security acceptance tests pass on delivery hardware.

## 10. Public positioning concept

**Private AI for the work your firm cannot paste into a public chatbot.**

Supporting idea: the system runs where the firm's confidential work already lives, and acts only within the permissions the firm grants.
