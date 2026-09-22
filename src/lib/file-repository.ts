import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { DEMO_FILES, DEMO_MATTER } from "./demo-data";
import { safeFilename } from "./security";
import type { MatterFile } from "./types";

const runtimeRoot = path.join(process.cwd(), "data", "runtime", "matters");

function outputDir(matterId: string) {
  if (matterId !== DEMO_MATTER.id) throw new Error("MATTER_NOT_FOUND");
  const target = path.join(runtimeRoot, matterId, "outputs");
  fs.mkdirSync(target, { recursive: true });
  return target;
}

function hash(content: string) { return crypto.createHash("sha256").update(content).digest("hex").slice(0, 16); }

export function listFiles(matterId: string): MatterFile[] {
  const sources = DEMO_FILES.filter((file) => file.matterId === matterId).map(({ content: _, ...file }) => file);
  if (matterId !== DEMO_MATTER.id) return sources;
  const directory = outputDir(matterId);
  const outputs = fs.readdirSync(directory).filter((name) => /\.(md|txt)$/.test(name)).map((name) => {
    const content = fs.readFileSync(path.join(directory, name), "utf8");
    const versionsDir = path.join(directory, ".versions", name);
    const version = fs.existsSync(versionsDir) ? fs.readdirSync(versionsDir).filter((entry) => entry.endsWith(".json")).length : 1;
    return { id: `output-${name}`, matterId, name, kind: "output" as const, classification: "C0" as const, version, hash: hash(content), updatedAt: fs.statSync(path.join(directory, name)).mtime.toISOString() };
  });
  return [...sources, ...outputs];
}

export function readFileById(fileId: string, matterId: string): MatterFile | null {
  const source = DEMO_FILES.find((file) => file.id === fileId && file.matterId === matterId);
  if (source) return source.classification === "C4" ? { ...source, content: undefined } : source;
  if (!fileId.startsWith("output-") || matterId !== DEMO_MATTER.id) return null;
  const name = safeFilename(fileId.slice(7));
  const target = path.join(outputDir(matterId), name);
  if (!fs.existsSync(target)) return null;
  const content = fs.readFileSync(target, "utf8");
  const summary = listFiles(matterId).find((file) => file.id === fileId)!;
  return { ...summary, content };
}

export function createOutput(matterId: string, filename: string, content: string): MatterFile {
  const name = safeFilename(filename);
  const directory = outputDir(matterId);
  const target = path.join(directory, name);
  const versionsDir = path.join(directory, ".versions", name);
  fs.mkdirSync(versionsDir, { recursive: true });
  const version = fs.existsSync(target) ? fs.readdirSync(versionsDir).filter((entry) => entry.endsWith(".json")).length + 1 : 1;
  const temp = path.join(directory, `.tmp-${crypto.randomUUID()}`);
  fs.writeFileSync(temp, content, { encoding: "utf8", flag: "wx" });
  fs.renameSync(temp, target);
  const metadata = { version, hash: hash(content), createdAt: new Date().toISOString(), content };
  fs.writeFileSync(path.join(versionsDir, `${version}.json`), JSON.stringify(metadata, null, 2), "utf8");
  return { id: `output-${name}`, matterId, name, kind: "output", classification: "C0", version, hash: metadata.hash, updatedAt: metadata.createdAt, content };
}

export function resetOutputs() {
  const target = path.join(runtimeRoot, DEMO_MATTER.id, "outputs");
  if (fs.existsSync(target)) fs.rmSync(target, { recursive: true, force: true });
}
