import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import type { AuditEvent, SessionMode } from "./types";

const runtimeRoot = path.join(process.cwd(), "data", "runtime");
const auditPath = path.join(runtimeRoot, "audit.jsonl");

function ensureRuntime() { fs.mkdirSync(runtimeRoot, { recursive: true }); }

export function writeAudit(input: Omit<AuditEvent, "id" | "timestamp">) {
  ensureRuntime();
  const event: AuditEvent = { ...input, id: crypto.randomUUID(), timestamp: new Date().toISOString() };
  fs.appendFileSync(auditPath, `${JSON.stringify(event)}\n`, { encoding: "utf8", flag: "a" });
  return event;
}

export function readAudit(limit = 20): AuditEvent[] {
  ensureRuntime();
  if (!fs.existsSync(auditPath)) return [];
  return fs.readFileSync(auditPath, "utf8").trim().split("\n").filter(Boolean).slice(-limit).reverse().map((line) => JSON.parse(line));
}

export function seedAudit(mode: SessionMode): AuditEvent[] {
  const now = Date.now();
  return [
    { id: "seed-3", timestamp: new Date(now - 420000).toISOString(), eventType: "MATTER_OPEN", mode, decision: "allow", reasonCode: "MATTER_ACCESS", matterId: "matter-harbourline", detail: "Harbourline matter opened" },
    { id: "seed-2", timestamp: new Date(now - 760000).toISOString(), eventType: "SESSION_CREATED", mode, decision: "allow", reasonCode: "AUTH_OK", detail: "Demo session verified" },
    { id: "seed-1", timestamp: new Date(now - 980000).toISOString(), eventType: "POLICY_PROFILE", mode, decision: "allow", reasonCode: "DEMO_C0_ONLY", detail: "Connected route limited to C0 synthetic data" }
  ];
}
