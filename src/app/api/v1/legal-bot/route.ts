import { cookies } from "next/headers";
import { z } from "zod";
import { currentSession } from "@/lib/session-request";
import { csrfToken } from "@/lib/security";
import { ModelError, PROVIDERS } from "@/lib/model-provider";
import { runLegalAgent } from "@/lib/legal-agent";

const schema = z.object({ prompt: z.string().min(1).max(4000), provider: z.enum(PROVIDERS), model: z.string().trim().min(1).max(160), apiKey: z.string().max(1024).optional(), history: z.array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().max(24000) })).max(8).default([]) });
export async function POST(request: Request) {
  const session = await currentSession();
  if (!session) return Response.json({ error: "Sign into the workspace first." }, { status: 401 });
  const token = (await cookies()).get("rx_session")?.value;
  if (!token || request.headers.get("x-rx-csrf") !== csrfToken(token)) return Response.json({ error: "Refresh the page and retry." }, { status: 403 });
  const body = schema.safeParse(await request.json().catch(() => null));
  if (!body.success) return Response.json({ error: "Enter a question and a valid model ID." }, { status: 400 });
  try { return Response.json(await runLegalAgent(body.data.prompt, session.mode, body.data, body.data.history), { headers: { "cache-control": "no-store" } }); }
  catch (error) { return Response.json({ error: error instanceof ModelError ? error.message : "The legal agent could not complete this request." }, { status: 502 }); }
}
