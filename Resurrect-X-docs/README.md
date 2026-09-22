# Resurrect X — Project Documentation

**Status:** Internal project specification / investor-demo baseline  
**Codename:** Resurrect X  
**Target market:** Australian law firms  
**Research baseline:** 18 September 2026  
**Customer-facing product name:** TBD

## One-line product definition

Resurrect X is a private, local-first AI workspace for law firms that can search, cite, draft, and perform tightly governed file actions against firm-controlled data without making the language model itself a security boundary.

## Core idea

The system feels like a familiar AI assistant in a browser, but the intended production architecture is an on-premise appliance connected to approved firm storage. It combines local LLM inference, retrieval-augmented generation (RAG), citations, limited tool calling, and deterministic policy enforcement.

Two user modes are fundamental:

1. **Read-only** — search, retrieve, summarise, compare, cite, and draft in the conversation without changing source files.
2. **Read/write** — the same capabilities plus approved creation or modification of files inside explicitly permitted locations, with policy checks, versioning, and human confirmation where required.

A user's chosen mode never overrides the classification of the data. A restricted file can force read-only or no-AI behaviour even when the session is in read/write mode.

## Non-negotiable product principles

- **Local-first production:** normal production inference, document retrieval, embeddings, history, and tools stay inside the firm's boundary.
- **Demo cloud boundary is separate:** investor/customer demo builds may use a hosted model through a server-side provider gateway, with synthetic or explicitly demo-safe data only.
- **No API keys in the browser:** all provider credentials are server-side secrets.
- **The model is not an authorisation system:** every file read, retrieval result, tool invocation, and write is authorised by deterministic code.
- **Matter isolation:** one matter must never leak into another matter simply because embeddings are semantically similar.
- **Citations by default:** legal/professional answers should show the source material used.
- **Fail closed:** unknown classification, missing policy, unavailable audit service, or ambiguous write target blocks the action.
- **No arbitrary shell/browser agent in MVP:** the first releases expose only a small, typed tool set.
- **No public claims of “unhackable”, “zero risk”, or “prompt-injection-proof”.** The security target is containment of model failure, not magical immunity.

## Documentation map

| File | Purpose |
|---|---|
| `docs/00-PROJECT-OVERVIEW.md` | Scope, product thesis, boundaries, success criteria |
| `docs/01-IUP.md` | Ideal user persona / target account and end-user profiles |
| `docs/02-PRODUCT-REQUIREMENTS.md` | Functional and non-functional requirements |
| `docs/03-MVP.md` | Exact investor-demo MVP and acceptance criteria |
| `docs/04-PHASES.md` | Phase 0–6 delivery roadmap |
| `docs/05-DESIGN.md` | Website/product visual direction and design system |
| `docs/06-UI-UX.md` | Application information architecture, flows, states, wireframes |
| `docs/07-SOFTWARE-ARCHITECTURE.md` | Full software stack and service decomposition |
| `docs/08-LOCAL-APPLIANCE.md` | Linux appliance, kiosk, NAS, GPU, networking and lifecycle |
| `docs/09-API.md` | API surface and typed tool contracts |
| `docs/10-DATA-AND-FILES.md` | Classification, storage, RAG, redaction, retention and writes |
| `docs/11-SECURITY-ARCHITECTURE.md` | Security design and trust boundaries |
| `docs/12-CYBERSECURITY.md` | System hardening, Essential Eight alignment and operations |
| `docs/13-THREAT-MODEL.md` | Assets, adversaries, abuse cases and mitigations |
| `docs/14-PROMPT-INJECTION.md` | Direct/indirect prompt-injection containment |
| `docs/15-AU-LEGAL-PRIVACY.md` | Australian privacy/legal-practice considerations |
| `docs/16-DEPLOYMENT-OPS.md` | Demo/local deployment, updates, backup, monitoring, incident handling |
| `docs/17-TESTING-ACCEPTANCE.md` | Product, security, RAG, permission and red-team tests |
| `docs/18-OBSERVABILITY-AUDIT.md` | Audit trail and telemetry policy |
| `docs/19-WEBSITE-REFERENCES.md` | Analysis of the supplied design/product references |
| `docs/20-DECISIONS.md` | Architectural decisions and “do not accidentally change” rules |
| `docs/21-MARKETING-POSITIONING.md` | Market message, homepage copy hierarchy and objection handling |
| `docs/22-DEMO-SCRIPT.md` | 8–12 minute investor/client demo runbook |
| `docs/23-FEATURE-BACKLOG.md` | Prioritised implementation backlog |
| `docs/24-REPO-STRUCTURE.md` | Suggested codebase/module layout |
| `prompts/PHASE-1-2-BUILD-PROMPT.md` | Starter prompt for a strong coding agent |
| `assets/*.mmd` / `assets/*.svg` | Architecture diagrams |

## Security requirement translation

The phrase **“no prompt injections”** is translated into a measurable engineering requirement:

> Untrusted text, files, retrieved passages, or model output must never be able to grant new authority, widen data scope, reveal secrets, bypass matter barriers, select a more permissive execution mode, or execute a write without deterministic policy approval.

The model may still be tricked into producing an incorrect sentence. The architecture must make that a content-quality failure rather than a privilege escalation or data breach.

## Research references

The project direction was informed by the public product/website references supplied by the project owner and current Australian guidance:

- https://locallyai.com.au/
- https://localpod.ai/
- https://www.apothyai.com/
- https://inthepond.com.au/
- https://www.ermos.com.au/
- https://www.oaic.gov.au/privacy/australian-privacy-principles/
- https://www.oaic.gov.au/privacy/notifiable-data-breaches/
- https://www.cyber.gov.au/business-government/asds-cyber-security-frameworks/essential-eight/
- https://www.cyber.gov.au/business-government/asds-cyber-security-frameworks/ism/
- https://www.lawsociety.com.au/practising-law-in-nsw/ethics-and-compliance/ethics/FAQs
- https://www.lawsociety.com.au/ (responsible AI guidance, updated January 2026)
- https://genai.owasp.org/llm-top-10/

This pack is a product/security design document, not legal advice. Australian legal and privacy requirements must be revalidated with the firm's counsel and jurisdiction before production deployment.
