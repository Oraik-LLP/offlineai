import { cookies } from "next/headers";
import { currentSession } from "@/lib/session-request";
import { respondToPrompt, ProviderError } from "@/lib/assistant";
import { csrfToken } from "@/lib/security";
import { z } from "zod";

const schema = z.object({ prompt: z.string().min(1).max(4000), history: z.array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().max(16000) })).max(12).default([]) });
export async function POST(request: Request) {
  const session = await currentSession();
  if (!session) return Response.json({ error: { message: "Sign in again to continue." } }, { status: 401 });
  const token = (await cookies()).get("rx_session")?.value;
  if (!token || request.headers.get("x-rx-csrf") !== csrfToken(token)) return Response.json({ error: { message: "Refresh the page and try again." } }, { status: 403 });
  const body = schema.safeParse(await request.json().catch(() => null));
  if (!body.success) return Response.json({ error: { message: "Please shorten your question and try again." } }, { status: 400 });
  try {
    const result = await respondToPrompt(body.data.prompt, session.mode, body.data.history);
    const payload = "data: " + JSON.stringify({ type: "delta", text: result.text }) + "\n\n" + "data: " + JSON.stringify({ type: "complete", citations: result.citations, plan: result.plan, securityEvent: result.securityEvent }) + "\n\n";
    return new Response(payload, { headers: { "content-type": "text/event-stream", "cache-control": "no-store" } });
  } catch (error) {
    return Response.json({ error: { message: error instanceof ProviderError ? error.message : "The request could not be completed. Please try again." } }, { status: error instanceof ProviderError ? error.status : 500 });
  }
}
