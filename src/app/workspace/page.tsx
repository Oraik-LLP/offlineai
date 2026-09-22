import { redirect } from "next/navigation";
import { currentSession } from "@/lib/session-request";
import { DEMO_FILES, DEMO_MATTER, DEMO_USER } from "@/lib/demo-data";
import { listFiles } from "@/lib/file-repository";
import { Workspace } from "@/components/workspace";

export const dynamic = "force-dynamic";

export default async function WorkspacePage() {
  const session = await currentSession();
  if (!session) redirect("/login");
  return <Workspace user={DEMO_USER} matter={DEMO_MATTER} initialMode={session.mode} initialFiles={listFiles(DEMO_MATTER.id)} initialSource={DEMO_FILES[0]} />;
}
