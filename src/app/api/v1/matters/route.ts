import { NextResponse } from "next/server";
import { currentSession } from "@/lib/session-request";
import { DEMO_MATTER } from "@/lib/demo-data";
export async function GET() { if (!await currentSession()) return NextResponse.json({ error: { code: "UNAUTHENTICATED" } }, { status: 401 }); return NextResponse.json({ matters: [DEMO_MATTER] }); }
