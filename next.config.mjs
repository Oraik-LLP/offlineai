import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptPolicy = process.env.NODE_ENV === "development" ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'" : "script-src 'self' 'unsafe-inline'";
const securityHeaders = [
  { key: "Content-Security-Policy", value: `default-src 'self'; ${scriptPolicy}; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'` },
  { key: "Referrer-Policy", value: "no-referrer" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  poweredByHeader: false,
  outputFileTracingRoot: path.dirname(fileURLToPath(import.meta.url)),
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  }
};

export default nextConfig;
