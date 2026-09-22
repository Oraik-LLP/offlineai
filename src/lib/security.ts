import crypto from "node:crypto";
import type { SessionMode } from "./types";

const secret = process.env.RX_SESSION_SECRET || "resurrect-x-demo-secret-change-before-deploy";

export type SessionPayload = { userId: string; mode: SessionMode; expiresAt: number };

export function signSession(payload: SessionPayload) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto.createHmac("sha256", secret).update(body).digest("base64url");
  return `${body}.${signature}`;
}

export function verifySession(token?: string): SessionPayload | null {
  if (!token) return null;
  const [body, signature] = token.split(".");
  if (!body || !signature) return null;
  const expected = crypto.createHmac("sha256", secret).update(body).digest("base64url");
  if (signature.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString()) as SessionPayload;
    return payload.expiresAt > Date.now() ? payload : null;
  } catch { return null; }
}

export function csrfToken(sessionToken: string) {
  return crypto.createHmac("sha256", secret).update(`csrf:${sessionToken}`).digest("base64url");
}

export function safeFilename(name: string) {
  const decoded = decodeURIComponent(name);
  if (decoded !== name && /[\\/]/.test(decoded)) throw new Error("PATH_TRAVERSAL");
  if (/[\\/]/.test(name) || name.includes("..") || /^[a-zA-Z]:/.test(name) || name.startsWith(".")) throw new Error("PATH_TRAVERSAL");
  if (!/^[a-zA-Z0-9][a-zA-Z0-9._-]{0,79}\.(md|txt)$/.test(name)) throw new Error("INVALID_FILENAME");
  return name;
}
