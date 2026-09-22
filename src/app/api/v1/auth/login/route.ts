import { NextResponse } from "next/server";
import { z } from "zod";
import { DEMO_USER } from "@/lib/demo-data";
import { csrfToken, signSession } from "@/lib/security";
import { writeAudit } from "@/lib/audit";

const input = z.object({ email: z.string().email(), password: z.string().min(8).max(128) });

export async function POST(request: Request) {
  const parsed = input.safeParse(await request.json().catch(() => null));
  if (!parsed.success || parsed.data.email !== DEMO_USER.email || parsed.data.password !== "demo-access") {
    return NextResponse.json({ error: { code: "AUTH_FAILED", message: "Invalid credentials." } }, { status: 401 });
  }
  const token = signSession({ userId: DEMO_USER.id, mode: "read_only", expiresAt: Date.now() + 8 * 60 * 60 * 1000 });
  const response = NextResponse.json({ user: DEMO_USER, csrf: csrfToken(token) });
  response.cookies.set("rx_session", token, { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 28800 });
  response.cookies.set("rx_csrf", csrfToken(token), { httpOnly: false, sameSite: "strict", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 28800 });
  writeAudit({ eventType: "LOGIN", mode: "read_only", decision: "allow", reasonCode: "AUTH_OK", detail: "Synthetic demo account signed in" });
  return response;
}
