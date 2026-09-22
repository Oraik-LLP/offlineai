import { NextResponse } from "next/server";
import { currentSession } from "@/lib/session-request";
import { listFiles } from "@/lib/file-repository";
import { DEMO_MATTER } from "@/lib/demo-data";
export async function GET(_: Request, context: { params: Promise<{ matterId: string }> }) { if (!await currentSession()) return NextResponse.json({ error: { code: "UNAUTHENTICATED" } }, { status: 401 }); const { matterId } = await context.params; if (matterId !== DEMO_MATTER.id) return NextResponse.json({ error: { code: "NOT_FOUND" } }, { status: 404 }); return NextResponse.json({ files: listFiles(matterId) }); }
