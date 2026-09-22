import type { PolicyDecision, PolicyInput } from "./types";

export function evaluatePolicy(input: PolicyInput): PolicyDecision {
  if (input.classification === "C4") {
    return { allowed: false, approvalRequired: false, reasonCode: "CLASS_NO_AI", message: "This resource is classified No-AI and is excluded from model access." };
  }
  if (input.processingBoundary === "demo_connected" && input.classification !== "C0") {
    return { allowed: false, approvalRequired: false, reasonCode: "DEMO_CLASS_BLOCKED", message: "Demo Connected can process C0 synthetic content only." };
  }
  const mutating = input.action === "file.create_output" || input.action === "file.patch_output";
  if (mutating && input.mode !== "read_write") {
    return { allowed: false, approvalRequired: false, reasonCode: "MODE_READ_ONLY", message: "This session is read-only. The draft can stay in chat, but files cannot be changed." };
  }
  if (mutating && input.targetKind === "source") {
    return { allowed: false, approvalRequired: false, reasonCode: "SOURCE_IMMUTABLE", message: "Source files are immutable to the assistant." };
  }
  if (mutating && input.classification === "C3") {
    return { allowed: false, approvalRequired: false, reasonCode: "RESTRICTED_WRITE", message: "Restricted material is read-only by default." };
  }
  return {
    allowed: true,
    approvalRequired: mutating,
    reasonCode: mutating ? "RW_OUTPUT_ALLOWED" : "READ_ALLOWED",
    message: mutating ? "The output action is permitted after approval." : "The requested read is permitted."
  };
}
