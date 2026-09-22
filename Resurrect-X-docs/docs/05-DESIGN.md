# 05 — Design System and Website Direction

## 1. Design intent

Resurrect X should look like **serious infrastructure presented with editorial restraint**, not a neon “AI startup” template.

Desired adjectives:

- sovereign
- calm
- precise
- premium
- technical
- Australian
- trustworthy
- modern
- understated

Avoid:

- purple AI gradients everywhere;
- robot/brain stock illustrations;
- “matrix” cybersecurity clichés;
- excessive glassmorphism;
- fake terminal copy;
- giant claims like “unhackable”;
- dense enterprise dashboards on the marketing homepage.

## 2. Reference synthesis

### LocallyAI — use for product clarity

Borrow the *structure*, not copy:

- clear “runs on your hardware” explanation;
- concrete use cases;
- explicit processing boundary;
- hardware + software sold as a working system;
- straightforward explanation of exceptions that need connectivity.

### Apothy — use for premium regulated-market tone

Borrow:

- editorial pacing;
- strong typography;
- product screenshots embedded in a minimal narrative;
- “inside your boundary” mental model;
- regulated-firm seriousness.

Avoid copying its exact language or layout.

### InThePond — use for visual sharpness

Borrow:

- minimal section count;
- strong type hierarchy;
- concise technical case-study framing;
- high information density without visual clutter.

### Ermos — use for legal-market specificity

Borrow:

- law-firm use-case clarity;
- on-premise visualisation;
- practical FAQ/objection handling;
- language around control rather than generic AI novelty.

### LocalPod — product lesson only

Useful concept: a local “digital worker” connected to business systems.  
**Do not use as the visual target** per project direction.

## 3. Visual system

### Palette

Suggested neutral-first palette:

- `Ink`: `#0B0D10`
- `Paper`: `#F4F2ED`
- `Surface`: `#FFFFFF`
- `Steel`: `#69727D`
- `Border`: `#D8D8D2`
- `Signal`: `#3B66F5` (sparingly)
- `Warning`: system semantic token, not brand colour
- `Critical`: system semantic token, not brand colour

Dark product shell can invert to near-black + soft neutral panels. Keep accent use restrained.

### Typography

- UI: modern grotesk/sans such as Geist/Inter class.
- Marketing display: one editorial serif or tightly tracked grotesk for contrast.
- Monospace only for ids, paths, hashes and code — not as the main “tech” aesthetic.

### Radius / borders

- Small-to-medium radii, 8–12 px.
- Thin borders.
- Soft shadows only on floating controls/dialogs.
- Avoid giant pill buttons for every control.

### Motion

- 120–220 ms UI transitions.
- No continuous decorative animation.
- Source citation highlight can use a quick focused pulse.
- Write execution uses a clear plan → approval → done progression.

## 4. Marketing website information architecture

### Hero

Headline direction:

**Private AI for the work your firm cannot send away.**

Subhead:

Search matters, check sources, draft from your precedents, and run approved actions on a firm-controlled AI appliance.

CTAs:

- See the private workspace
- Book a controlled demo

Hero visual: actual product window showing a legal document answer with source inspector and `READ ONLY` state.

### Trust strip

Use factual capability labels, e.g.:

- Local-first production
- Source-cited answers
- Matter-level permissions
- Read-only / Read & write
- Audit trail

Avoid certification logos unless genuinely held.

### “How it works”

Three-step architecture:

1. Connect approved firm knowledge.
2. Ask/search in the browser workspace.
3. Model proposes; policy engine decides what is allowed.

### Use cases

- Matter search
- Contract review
- Chronologies
- Precedent-grounded drafting
- Client update drafts
- Internal research notes

### Control section

Feature the two modes and file-classification behaviour visually.

### Appliance section

Show compact local hardware concept. Do not tie marketing to one GPU SKU until productised.

### Security section

Say what is enforceable:

- outbound traffic default-deny in local configuration;
- encrypted local storage;
- server-side access checks;
- matter-scoped retrieval;
- restricted typed tools;
- auditable writes.

### Demo CTA

Ask prospects to bring a redacted/synthetic workflow, not real client secrets into a public demo.

## 5. Product UI design grammar

### Persistent security indicators

Always visible:

- active matter;
- current mode;
- local/demo-connected processing state;
- user identity;
- classification when viewing a file.

### Action card pattern

Before a write:

```text
Proposed action
Create file: /Matters/Acme/Outputs/contract-review.md
Reason: Save the review generated in this thread
Classification: Confidential
Effect: Creates a new file; no source files changed
[Cancel] [Approve]
```

### Citation pattern

Inline citation chip opens right-side source viewer at the exact passage. Never force a user to leave the conversation to verify a source.

### Redaction display

Masking is a UI privacy control, not a security boundary.

- list previews may show masked values;
- authorised user can reveal if policy permits;
- reveal action can be logged for highly sensitive fields;
- screenshots/telemetry should avoid raw restricted text.

## 6. Design tokens example

```css
--rx-bg: #F4F2ED;
--rx-surface: #FFFFFF;
--rx-ink: #0B0D10;
--rx-muted: #69727D;
--rx-border: #D8D8D2;
--rx-accent: #3B66F5;
--rx-radius-sm: 8px;
--rx-radius-md: 12px;
--rx-space-1: 4px;
--rx-space-2: 8px;
--rx-space-3: 12px;
--rx-space-4: 16px;
--rx-space-6: 24px;
--rx-space-8: 32px;
```

## 7. Copy style

Good:

- “Runs on firm-controlled infrastructure.”
- “This connection is disabled in local-only mode.”
- “Read-only mode blocked the requested write.”
- “The answer uses 4 sources from this matter.”

Avoid:

- “100% impossible to hack.”
- “AI lawyer.”
- “Guaranteed privilege.”
- “Zero prompt injection.”
- “Military-grade AI.”
