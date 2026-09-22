import { NextResponse } from "next/server";
import { currentSession } from "@/lib/session-request";
import { readAudit, seedAudit } from "@/lib/audit";
export async function GET() { const session = await currentSession(); if (!session) return NextResponse.json({ error: { code: "UNAUTHENTICATED" } }, { status: 401 }); return NextResponse.json({ events: [...readAudit(), ...seedAudit(session.mode)].slice(0, 20) }); }
