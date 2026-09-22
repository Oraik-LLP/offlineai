import { cookies } from "next/headers";
import { verifySession } from "./security";

export async function currentSession() {
  const jar = await cookies();
  return verifySession(jar.get("rx_session")?.value);
}
