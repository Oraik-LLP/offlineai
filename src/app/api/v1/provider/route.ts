import { currentSession } from "@/lib/session-request";
import { providerStatus } from "@/lib/assistant";
export async function GET() {
  if (!await currentSession()) return Response.json({ error: "Unauthenticated" }, { status: 401 });
  return Response.json(providerStatus(), { headers: { "cache-control": "no-store" } });
}
