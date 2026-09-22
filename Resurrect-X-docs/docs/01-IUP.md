# 01 — IUP: Ideal User Persona

## 1. Ideal customer profile (account-level)

**Organisation:** Australian law firm  
**Initial size sweet spot:** ~15–150 staff, with enough recurring document work to justify dedicated AI infrastructure  
**Practice types:** commercial, property, litigation, employment, corporate, insurance, private clients, specialist boutiques  
**Environment:** Windows/macOS user devices, existing NAS/DMS/Microsoft 365/file server, external IT provider or small internal IT team  
**Buying trigger:** staff already experimenting with AI while partners/management worry about confidential client material leaving the firm's control

The strongest early account is not “a firm that wants AI”. It is a firm with **repeatable, document-heavy work and a clear reason to control the processing boundary**.

## 2. Primary fictional persona

### Amelia Wright — Managing Partner / Operations Sponsor

> This is a fictional composite persona for product and marketing decisions, not a real individual.

- **Location:** Australia; initial go-to-market can focus on metropolitan NSW/Victoria/WA while keeping the product nationally applicable.
- **Age band:** 38–55.
- **Role:** Managing Partner, COO, Practice Manager, Innovation Partner, or Head of Legal Operations.
- **Firm size:** 25–80 legal/support staff.
- **Technology comfort:** pragmatic, not necessarily technical; already uses cloud practice software and modern collaboration tools.
- **Accountability:** client confidentiality, firm risk, staff productivity, professional standards, and budget.

### Goals

- Give staff useful AI without creating an uncontrolled channel for client information.
- Recover time spent locating old advice, precedent clauses, notes, and matter context.
- Reduce repetitive first-draft work.
- Retain institutional knowledge when staff leave.
- Avoid per-seat AI costs ballooning as adoption grows.
- Be able to explain the system to clients, insurers, IT providers, and partners.

### Frustrations

- “Do not paste client data into public AI” is difficult to enforce when the public tools are the most convenient tools.
- Vendor claims about “enterprise privacy” are hard to translate into a simple processing-boundary answer.
- AI answers that cannot show their source are not usable for professional work.
- Products designed for developers create adoption friction for lawyers.
- Generic AI does not understand the firm's precedent bank or matter history.
- Security teams dislike agent tools with broad filesystem/shell privileges.

### Purchase objections

- Is a local model actually useful enough?
- Who maintains the appliance?
- How do you stop one matter leaking into another?
- Can the AI modify a source file accidentally?
- What happens if the hardware fails?
- Does it work with the firm's existing file server/DMS?
- Can a malicious file instruct the AI to leak information?
- What exact data leaves the building, if any?

### Proof Amelia needs

- A live demo with synthetic legal-style documents.
- Exact display of cited sources.
- Visible read-only/read-write control.
- A blocked-action demonstration.
- Architecture diagram showing local data paths.
- Audit log for a write.
- Clear explanation of backup/restore.
- Security wording that avoids impossible claims.

## 3. Secondary end-user personas

### Partner / Senior Associate

Needs fast matter recall, comparisons, draft correspondence, and confidence that results are grounded. Will abandon the tool if sourcing is hidden or workflow is too slow.

### Associate / Graduate / Paralegal

Needs search, chronology, summarisation, and structured first drafts. Benefits heavily from citations and scope indicators because these users do a large amount of document review.

### Practice Manager / COO

Needs role management, policy defaults, usage visibility, retention controls, operational health, and predictable maintenance.

### IT Manager / MSP

Needs network segmentation, patch/update method, backup/restore, logs, local admin process, certificate management, hardware compatibility, and evidence that the AI cannot simply bypass filesystem ACLs.

### Risk / Privacy / General Counsel contact

Needs data-flow diagrams, provider/subprocessor information for any connected mode, logging policy, incident workflow, retention/deletion, and proof that privileged/restricted classes cannot use a cloud route.

## 4. Jobs-to-be-done

### Functional

- “Find the exact document or clause I remember from a previous matter.”
- “Summarise these documents and show where each point came from.”
- “Build a chronology I can check against the file.”
- “Draft a client update using this matter only.”
- “Create a review note without touching the source documents.”

### Emotional

- “I want to use AI without wondering where the file went.”
- “I want confidence that an answer can be checked.”
- “I want the system to make safe behaviour easier than unsafe behaviour.”

### Organisational

- “I need a policy I can actually enforce technically.”
- “I need to explain the processing boundary in plain English.”
- “I need staff productivity gains without losing governance.”

## 5. Marketing message hierarchy

1. **Outcome:** Find, understand, and draft from the knowledge already inside your firm.
2. **Trust:** Production work can stay on firm-controlled hardware.
3. **Control:** Read-only/read-write behaviour is enforced by policy, not by asking the model nicely.
4. **Evidence:** Answers stay linked to source material.
5. **Adoption:** Browser-based, familiar, minimal interface.
6. **Ownership:** Data, indexes, logs, and local model runtime remain within the deployment boundary.

## 6. Tone for Australian legal buyers

- Plain English.
- Specific claims, not “military-grade” or “unhackable”.
- Explain exceptions.
- Demonstrate boundaries.
- Avoid overclaiming AI intelligence or replacing lawyers.
- Say when a feature needs internet access.
- Prefer “review-ready draft” over “autonomous legal advice”.

## 7. Anti-persona

Poor initial fit:

- sole user with rare AI usage and only public information;
- firm demanding frontier-cloud capability for every request while also requiring strict local-only processing;
- firm unwilling to define matter permissions/classification;
- firm expecting the AI to replace professional review;
- environment where source data is already uncontrolled or unclassified and no remediation is permitted.
