import { NextResponse } from "next/server";
import { currentSession } from "@/lib/session-request";
import { searchMatter } from "@/lib/retrieval";
import { DEMO_MATTER } from "@/lib/demo-data";
import { z } from "zod";
const schema = z.object({ matterId: z.string(), query: z.string().min(1).max(300), limit: z.number().int().min(1).max(20).default(8) });
export async function POST(request: Request) { if (!await currentSession()) return NextResponse.json({ error: { code: "UNAUTHENTICATED" } }, { status: 401 }); const body = schema.safeParse(await request.json().catch(() => null)); if (!body.success || body.data.matterId !== DEMO_MATTER.id) return NextResponse.json({ error: { code: "INVALID_SCOPE" } }, { status: 400 }); return NextResponse.json({ results: searchMatter(body.data.matterId, body.data.query, body.data.limit) }); }
