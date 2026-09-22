# 20 — Architecture / Product Decisions

This file captures decisions that should not be casually changed during implementation.

## ADR-001 — Resurrect X is the internal codename

Customer-facing name can change without changing internal repo architecture.

## ADR-002 — Production is local-first

Hosted model APIs are a demo/optional connected path, not the production default.

## ADR-003 — No provider branding in normal UI

Model gateway abstracts vendor identity. Admin diagnostics may record runtime/provider internally for support and audit, but the customer-facing assistant is Resurrect X.

## ADR-004 — API secrets never enter browser code

A “pure browser demo” using a secret provider key is rejected. Use a minimal BFF/gateway.

## ADR-005 — Two modes are server-enforced

Read-only/read-write state is stored and checked server-side.

## ADR-006 — Source documents are immutable to AI in early phases

AI writes only to `Outputs/`/`Drafts/` by default.

## ADR-007 — Model is not the security boundary

Prompt text cannot grant access. Deterministic policy + OS permissions do.

## ADR-008 — No arbitrary shell in MVP

Do not add it as a shortcut for tool implementation.

## ADR-009 — Classification can only narrow capability

User mode or model choice cannot override a higher restriction.

## ADR-010 — Cloud demo data is synthetic/demo-safe

Real client data is not used in the public demo environment.

## ADR-011 — Retrieval filters before ranking

Matter/user ACL filtering happens before vector/semantic ranking.

## ADR-012 — Kiosk “exit” does not expose Linux desktop

Exit ends/locks the app session. Maintenance is a separate privileged path.

## ADR-013 — Network is default-deny outbound in local production profile

Every external route is a named exception.

## ADR-014 — Security claims require tests

No marketing claim is accepted without an install/configuration state and acceptance test behind it.

## ADR-015 — Start modular monolith

Split into services only when isolation, scaling or operational needs justify it.
