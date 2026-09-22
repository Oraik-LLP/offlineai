import { redirect } from "next/navigation";
import { currentSession } from "@/lib/session-request";
import { LegalBot } from "@/components/legal-bot";
export const dynamic = "force-dynamic";
export default async function BotPage() {
  const session = await currentSession();
  if (!session) redirect("/login");
  return <LegalBot initialMode={session.mode} />;
}
