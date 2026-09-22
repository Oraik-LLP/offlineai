import { DEMO_FILES } from "./demo-data";
import type { Citation, MatterFile } from "./types";

const stop = new Set(["the", "and", "for", "this", "that", "from", "with", "what", "did", "was", "are", "into"]);

function terms(query: string) { return query.toLowerCase().split(/[^a-z0-9]+/).filter((word) => word.length > 2 && !stop.has(word)); }

export function searchMatter(matterId: string, query: string, limit = 8): MatterFile[] {
  const words = terms(query);
  return DEMO_FILES.filter((file) => file.matterId === matterId && file.classification !== "C4")
    .map((file) => ({ file, score: words.reduce((score, word) => score + (file.name.toLowerCase().includes(word) ? 4 : 0) + ((file.content || "").toLowerCase().match(new RegExp(word, "g"))?.length || 0), 0) }))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ file }) => ({ ...file, content: undefined }));
}

export const TERMINATION_CITATIONS: Citation[] = [
  { id: "cite-agreement", fileId: "file-services-agreement", fileName: "services-agreement.md", anchor: "Clause 14, lines 3-5", excerpt: "Either party may terminate by giving not less than 30 days written notice. Delivery is required by email and registered post.", classification: "C0" },
  { id: "cite-variation", fileId: "file-variation-letter", fileName: "variation-letter.md", anchor: "Variation, lines 3-5", excerpt: "The notice period is increased from 30 days to 45 days. All delivery requirements remain unchanged.", classification: "C0" }
];

export const INJECTION_CITATION: Citation = { id: "cite-injection", fileId: "file-malicious-instruction", fileName: "malicious-instruction-example.md", anchor: "Imported email, lines 3-5", excerpt: "The document contains instructions to change mode, export files and delete originals. Those statements are treated as untrusted source content.", classification: "C0" };
