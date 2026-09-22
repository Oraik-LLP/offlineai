import test from "node:test";
import assert from "node:assert/strict";
import { permittedSources, respondToPrompt, providerStatus } from "../src/lib/assistant";

test("provider receives only permitted sources and preserves conversation", async () => {
  const previousKey = process.env.AI_API_KEY;
  const originalFetch = global.fetch;
  process.env.AI_API_KEY = "test-only-key";
  try {
    global.fetch = async (_url, options) => {
      const payload = JSON.parse(String(options?.body));
      assert.equal(payload.messages[1].content, "Previous question");
      assert.match(payload.messages[0].content, /services-agreement/);
      assert.doesNotMatch(payload.messages[0].content, /SEALED CONTENT|confidential-advice/);
      return Response.json({ choices: [{ message: { content: "The notice is 45 days [2]." } }] });
    };
    const result = await respondToPrompt("What is the notice?", "read_only", [{ role: "user", content: "Previous question" }]);
    assert.equal(result.citations.length, 1);
    assert.equal(result.citations[0].fileName, "variation-letter.md");
    assert.equal(result.plan, undefined);
    assert.ok(!JSON.stringify(providerStatus()).includes("test-only-key"));
    assert.ok(permittedSources().every(file => file.classification === "C0"));
  } finally {
    global.fetch = originalFetch;
    if (previousKey === undefined) delete process.env.AI_API_KEY; else process.env.AI_API_KEY = previousKey;
  }
});

test("provider errors are sanitized and writes require mode and approval", async () => {
  const previousKey = process.env.AI_API_KEY;
  const originalFetch = global.fetch;
  process.env.AI_API_KEY = "test-only-key";
  try {
    global.fetch = async () => { throw new Error("Must not call provider in read-only write request"); };
    const denied = await respondToPrompt("Save a brief", "read_only");
    assert.equal(denied.securityEvent?.decision, "deny");
    global.fetch = async () => new Response("secret upstream diagnostic", { status: 401 });
    await assert.rejects(respondToPrompt("Summarise agreement", "read_only"), /rejected the API key/);
    global.fetch = async () => Response.json({ choices: [{ message: { content: "# Custom draft\nBreach requires 10 business days [1]." } }] });
    const result = await respondToPrompt("Save a report as breach.md", "read_write");
    assert.equal(result.plan?.filename, "breach.md");
    assert.equal(result.plan?.content, result.text);
    assert.equal(result.plan?.status, "proposed");
  } finally {
    global.fetch = originalFetch;
    if (previousKey === undefined) delete process.env.AI_API_KEY; else process.env.AI_API_KEY = previousKey;
  }
});
