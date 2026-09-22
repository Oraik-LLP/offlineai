import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { DEMO_USER } from "@/lib/demo-data";
import { csrfToken, signSession, verifySession } from "@/lib/security";
import { writeAudit } from "@/lib/audit";
import { z } from "zod";

export async function GET() {
  const jar = await cookies();
  const session = verifySession(jar.get("rx_session")?.value);
  if (!session) return NextResponse.json({ error: { code: "UNAUTHENTICATED" } }, { status: 401 });
  return NextResponse.json({ user: DEMO_USER, mode: session.mode, processingBoundary: "demo_connected" });
}

export async function PATCH(request: Request) {
  const jar = await cookies();
  const oldToken = jar.get("rx_session")?.value;
  const session = verifySession(oldToken);
  const body = z.object({ mode: z.enum(["read_only", "read_write"]) }).safeParse(await request.json().catch(() => null));
  if (!session || !oldToken) return NextResponse.json({ error: { code: "UNAUTHENTICATED" } }, { status: 401 });
  if (request.headers.get("x-rx-csrf") !== csrfToken(oldToken)) return NextResponse.json({ error: { code: "CSRF_INVALID" } }, { status: 403 });
  if (!body.success) return NextResponse.json({ error: { code: "INVALID_MODE" } }, { status: 400 });
  const token = signSession({ ...session, mode: body.data.mode });
  const response = NextResponse.json({ mode: body.data.mode, csrf: csrfToken(token) });
  response.cookies.set("rx_session", token, { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 28800 });
  response.cookies.set("rx_csrf", csrfToken(token), { sameSite: "strict", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 28800 });
  writeAudit({ eventType: "MODE_CHANGE", mode: body.data.mode, decision: "allow", reasonCode: "MODE_AUTHORISED", detail: body.data.mode === "read_write" ? "Session entered Read & write" : "Session returned to Read only" });
  return response;
}
