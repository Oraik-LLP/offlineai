import test from "node:test";
import assert from "node:assert/strict";
import { modelCompletion, PROVIDERS } from "../src/lib/model-provider";
import { runLegalAgent, legalSources } from "../src/lib/legal-agent";

for (const provider of PROVIDERS) {
  test(`${provider}: authentication and response adapter`, async () => {
    let captured: { url: string; body: Record<string, unknown>; headers: Record<string, string> } | undefined;
    const transport: typeof fetch = async (url, init) => {
      captured = { url: String(url), body: JSON.parse(String(init?.body)), headers: init?.headers as Record<string,string> };
      return Response.json(provider === "claude" ? { content: [{ type: "text", text: "Legal answer" }] } : { choices: [{ message: { content: "Legal answer" } }] });
    };
    const text = await modelCompletion({ provider, apiKey: "test-secret", model: "test-model" }, "Legal only", [{ role:"user", content:"Contract question" }], transport);
    assert.equal(text, "Legal answer");
    assert.equal(captured?.body.model, "test-model");
    if (provider === "claude") {
      assert.ok(captured?.url.endsWith("/messages")); assert.equal(captured.headers["x-api-key"], "test-secret"); assert.equal(captured.body.system, "Legal only");
    } else { assert.ok(captured?.url.endsWith("/chat/completions")); assert.equal(captured.headers.Authorization, "Bearer test-secret"); }
  });
}
test("source boundary excludes other matters and C4 for cloud and local", () => {
  for (const provider of PROVIDERS) for (const file of legalSources(provider)) {
    assert.equal(file.matterId, "matter-harbourline"); assert.notEqual(file.classification, "C4");
    if (provider !== "local") assert.equal(file.classification, "C0");
  }
});
test("agent reads and proposes actual generated draft without writing", async () => {
  const actions = [ {action:"read",fileId:"file-variation-letter"}, {action:"draft",filename:"review.md",content:"45 days, subject to delivery requirements.",citations:["file-variation-letter"]} ];
  const result = await runLegalAgent("Draft a brief", "read_write", {provider:"openrouter",model:"test"}, [], async () => JSON.stringify(actions.shift()));
  assert.equal(result.plan?.content, "45 days, subject to delivery requirements."); assert.equal(result.plan?.status, "proposed"); assert.equal(result.citations[0].fileId,"file-variation-letter");
});
test("read-only drafts stay in chat", async () => {
  const result = await runLegalAgent("Draft a brief", "read_only", {provider:"local",model:"test"}, [], async () => JSON.stringify({action:"draft",filename:"review.md",content:"Draft text",citations:[]}));
  assert.equal(result.plan, undefined); assert.match(result.text,/remains in chat/);
});
test("invented citations exhaust the bounded loop without a fabricated answer", async () => {
  let calls = 0;
  await assert.rejects(runLegalAgent("Review the agreement", "read_only", {provider:"local",model:"test"}, [], async () => { calls++; return JSON.stringify({action:"answer",text:"Made up",citations:["other-matter"]}); }), /step limit/);
  assert.equal(calls, 6);
});
test("provider errors never return a raw key-bearing response", async () => {
  await assert.rejects(modelCompletion({provider:"groq",model:"test",apiKey:"secret"}, "", [], async () => new Response("secret raw upstream error",{status:401})), error => error instanceof Error && !error.message.includes("secret") && error.message.includes("rejected"));
});
