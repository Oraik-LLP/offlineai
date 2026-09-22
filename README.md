# Resurrect X MVP

A working Phase 1 demo of a private, source-cited AI workspace for Australian legal practices. The implementation follows the project pack in `Resurrect-X-docs` and uses synthetic data only.

## Run

```powershell
npm install
npm run dev
```

Copy `.env.example` to `.env.local`, set `OPENROUTER_API_KEY`, then restart the app.
Open `http://localhost:3000` and use the prefilled demo account.

The default model is `openrouter/auto`. To choose a model, set `AI_MODEL` to its OpenRouter model ID.
For another OpenAI-compatible chat completions provider, set `AI_API_KEY`, `AI_BASE_URL` (ending in `/v1`), and `AI_MODEL`.
Keys are read only on the server and never returned to the browser. Do not use a `NEXT_PUBLIC_` prefix.
The workspace connection panel shows configuration status and setup instructions.
Without a key, you can inspect files and the UI, but chat shows a setup message instead of fabricated answers.
Questions, recent conversation, and permitted C0 synthetic matter sources are sent to your configured provider.
Reference: https://openrouter.ai/docs/quickstart

## Verify

```powershell
npm test
npm run typecheck
npm run build
```

## Repeatable demo flow

1. Ask what notice is required to terminate the agreement. Open the citations in the source inspector.
2. In Read only, ask: `Save this as termination-brief.md.` The server policy blocks the write.
3. Switch to Read & write and repeat. Review the planned target and approve once.
4. Open `restricted-client-identifiers.md`. Its C4 content is excluded.
5. Ask to summarise `malicious-instruction-example.md`. The embedded instruction is described as data and gains no authority.

## Architecture

- Next.js UI and server-side BFF
- Signed, HttpOnly session with CSRF check on mutations
- Deterministic policy engine outside the assistant
- Matter-filtered retrieval before ranking
- Source/output separation with validated filenames
- Atomic output creation and immutable version records
- JSONL audit trail for the demo runtime
- Server-side OpenRouter / compatible chat completions adapter, bounded conversation history, provider timeout and readable errors

Runtime data is written to `data/runtime/` and excluded from source control.

## Known Phase 1 limits

- A provider key and credits are required for live AI. Responses are returned when generation completes.
- Authentication is a single synthetic account, not SSO.
- Search is lightweight lexical ranking rather than embeddings.
- The audit store is append-only by convention for this demo, not tamper-evident storage.
- The MVP includes one sample account and one synthetic matter. Registration, uploads, PDF/DOCX ingestion, SSO and local inference are not included.
