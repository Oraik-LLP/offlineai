import test from "node:test";
import assert from "node:assert/strict";
import { evaluatePolicy } from "../src/lib/policy";

test("read-only mode denies output creation", () => {
  const decision = evaluatePolicy({ mode: "read_only", action: "file.create_output", classification: "C0", processingBoundary: "demo_connected", targetKind: "output" });
  assert.equal(decision.allowed, false);
  assert.equal(decision.reasonCode, "MODE_READ_ONLY");
});

test("read-write allows C0 output after approval", () => {
  const decision = evaluatePolicy({ mode: "read_write", action: "file.create_output", classification: "C0", processingBoundary: "demo_connected", targetKind: "output" });
  assert.equal(decision.allowed, true);
  assert.equal(decision.approvalRequired, true);
});

test("C4 is denied before retrieval", () => {
  const decision = evaluatePolicy({ mode: "read_write", action: "file.read", classification: "C4", processingBoundary: "local" });
  assert.equal(decision.allowed, false);
  assert.equal(decision.reasonCode, "CLASS_NO_AI");
});

test("connected demo rejects non-C0", () => {
  const decision = evaluatePolicy({ mode: "read_write", action: "file.read", classification: "C2", processingBoundary: "demo_connected" });
  assert.equal(decision.allowed, false);
  assert.equal(decision.reasonCode, "DEMO_CLASS_BLOCKED");
});

test("source files remain immutable in read-write mode", () => {
  const decision = evaluatePolicy({ mode: "read_write", action: "file.patch_output", classification: "C0", processingBoundary: "local", targetKind: "source" });
  assert.equal(decision.allowed, false);
  assert.equal(decision.reasonCode, "SOURCE_IMMUTABLE");
});
