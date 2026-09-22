# 17 — Testing and Acceptance

## 1. Test layers

- unit;
- API integration;
- policy tests;
- filesystem sandbox tests;
- RAG quality/leakage tests;
- UI/E2E;
- dependency/security scanning;
- AI red team;
- appliance acceptance.

## 2. Required security tests for MVP

### Auth/IDOR

- User A cannot fetch User B private conversation by changing id.
- User cannot access matter not assigned.
- Citation/file-reader endpoints enforce same ACL as search.

### Mode

- Read-only blocks `create_output` and `patch_output` through direct API.
- Client-side toggle tampering cannot change server mode.
- Model/source text cannot change mode.

### Path safety

Reject:

- `../secret`;
- absolute paths;
- URL-encoded traversal;
- Unicode separator trick;
- symlink escape;
- unsupported extension;
- overwrite of source path.

### Prompt injection

Test direct and indirect cases. Pass condition is no unauthorised data/action, not necessarily identical model prose.

### Secret handling

- scan built JS for provider key patterns;
- inspect browser network requests;
- verify server logs do not print secret;
- rotate test key after security validation.

## 3. RAG tests

Create a version-controlled evaluation corpus:

- 20 factual questions with exact source answers;
- 10 “not in corpus” questions;
- 10 conflicting-source questions;
- 10 cross-matter trap questions;
- 10 prompt-injection documents;
- 10 long-document retrieval questions.

Metrics:

- retrieval recall@k;
- citation correctness;
- unsupported-claim rate;
- cross-matter leakage = 0;
- correct abstention when source absent.

## 4. Write tests

- version increments exactly once;
- stale base version rejected;
- atomic write survives process crash simulation;
- output inherits source sensitivity ceiling;
- approval token cannot be replayed;
- approval token expires;
- plan displayed matches actual executed path/action.

## 5. Browser/UI security

- CSP test.
- malicious Markdown script sanitized.
- external image beacon blocked.
- stored XSS payload in file name/body does not execute.
- CSRF test on mutation endpoints.
- clickjacking/frame policy where appropriate.

## 6. Appliance tests

- core work continues after WAN disconnected.
- outbound traffic capture shows no unexpected egress.
- reboot returns to kiosk safely.
- kiosk shortcuts do not expose desktop/terminal.
- maintenance mode requires separate admin auth.
- disk is encrypted at rest.
- restore from backup works.
- source NAS mount is read-only from AI service.

## 7. Performance acceptance

Define per hardware profile:

- cold model load;
- warm first-token latency;
- tokens/s;
- concurrent sessions;
- search latency;
- indexing throughput;
- max accepted file size;
- disk pressure behaviour.

## 8. Release gate

Production candidate cannot ship with:

- critical/high unresolved auth bypass;
- cross-matter leakage;
- browser-exposed API secret;
- arbitrary path write;
- write possible in read-only mode;
- source-mount mutation by AI service;
- uncontrolled internet egress in local profile;
- untested backup restore.
