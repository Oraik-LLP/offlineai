import test from "node:test";
import assert from "node:assert/strict";
import { safeFilename, signSession, verifySession } from "../src/lib/security";
import { searchMatter } from "../src/lib/retrieval";

test("safe output filename is accepted", () => assert.equal(safeFilename("termination-brief.md"), "termination-brief.md"));

for (const invalid of ["../secret.md", "/etc/passwd.md", "C:\\secrets.txt", "%2e%2e%2fsecret.md", "report.pdf", ".hidden.md"]) {
  test(`unsafe path is rejected: ${invalid}`, () => assert.throws(() => safeFilename(invalid)));
}

test("signed session detects tampering", () => {
  const token = signSession({ userId: "user-amelia", mode: "read_only", expiresAt: Date.now() + 10000 });
  assert.equal(verifySession(token)?.mode, "read_only");
  assert.equal(verifySession(`${token}x`), null);
});

test("search filters by matter before ranking", () => {
  const results = searchMatter("matter-harbourline", "confidential advice other matter");
  assert.equal(results.some((file) => file.id === "file-other-matter"), false);
});

test("C4 content never appears in search results", () => {
  const results = searchMatter("matter-harbourline", "sealed content identifiers");
  assert.equal(results.some((file) => file.classification === "C4"), false);
});
