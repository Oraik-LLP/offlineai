export type SessionMode = "read_only" | "read_write";
export type Classification = "C0" | "C1" | "C2" | "C3" | "C4";
export type FileKind = "source" | "output";

export type User = { id: string; name: string; email: string; role: "user" | "admin" };
export type Matter = { id: string; name: string; reference: string; classification: Classification; summary: string };
export type MatterFile = {
  id: string;
  matterId: string;
  name: string;
  kind: FileKind;
  classification: Classification;
  version: number;
  hash: string;
  updatedAt: string;
  content?: string;
};
export type Citation = { id: string; fileId: string; fileName: string; anchor: string; excerpt: string; classification: Classification };
export type AuditEvent = {
  id: string;
  timestamp: string;
  eventType: string;
  mode: SessionMode;
  decision: "allow" | "deny";
  reasonCode: string;
  matterId?: string;
  resourceId?: string;
  detail: string;
};
export type ToolPlan = {
  id: string;
  tool: "file.create_output" | "file.patch_output";
  matterId: string;
  filename: string;
  content: string;
  classification: Classification;
  reason: string;
  status: "proposed" | "approved" | "executed" | "denied";
  effect: string;
};

export type PolicyInput = {
  mode: SessionMode;
  action: "file.search" | "file.read" | "file.create_output" | "file.patch_output";
  classification: Classification;
  processingBoundary: "demo_connected" | "local";
  targetKind?: FileKind;
};

export type PolicyDecision = { allowed: boolean; approvalRequired: boolean; reasonCode: string; message: string };
