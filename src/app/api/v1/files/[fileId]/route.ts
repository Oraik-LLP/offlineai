import { NextResponse } from "next/server";
import { currentSession } from "@/lib/session-request";
import { readFileById } from "@/lib/file-repository";
import { DEMO_MATTER } from "@/lib/demo-data";
import { evaluatePolicy } from "@/lib/policy";
export async function GET(_: Request, context: { params: Promise<{ fileId: string }> }) { const session = await currentSession(); if (!session) return NextResponse.json({ error: { code: "UNAUTHENTICATED" } }, { status: 401 }); const { fileId } = await context.params; const file = readFileById(fileId, DEMO_MATTER.id); if (!file) return NextResponse.json({ error: { code: "NOT_FOUND" } }, { status: 404 }); const decision = evaluatePolicy({ mode: session.mode, action: "file.read", classification: file.classification, processingBoundary: "demo_connected" }); if (!decision.allowed) return NextResponse.json({ file: { ...file, content: undefined }, error: { code: decision.reasonCode, message: decision.message } }, { status: 403 }); return NextResponse.json({ file }); }
