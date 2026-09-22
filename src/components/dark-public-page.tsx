import Link from "next/link";
import { ArrowRight, Check, CirclesFour, HardDrives, LockKey, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { MarketingNav } from "./marketing-nav";

const pageData = {
  security: {
    eyebrow: "DETERMINISTIC CONTROL",
    title: "The model is never the security boundary.",
    intro: "Resurrect X assumes prompts, retrieved text, and model output can be manipulated. Authority stays in code.",
    metrics: [["04", "fixed MVP tools"], ["00", "delete tools"], ["01", "matter per scope"]],
    cards: [
      ["Scope before search", "The authorised matter and classification set is resolved before lexical or semantic ranking."],
      ["Typed actions only", "Every action uses a fixed schema. Free-form model text is never executed."],
      ["Review before saving", "Generated drafts require approval. The server checks session mode, matter, classification, and filename before writing."],
      ["Sources stay read-only", "The assistant can create versioned outputs but cannot modify the source corpus."]
    ]
  },
  architecture: {
    eyebrow: "A FOCUSED MVP",
    title: "Your provider. One workspace.",
    intro: "Connect an OpenRouter or compatible API key. Search the sample matter, ask questions, and review drafts before saving.",
    metrics: [["API", "your model provider"], ["C0", "synthetic source data"], ["01", "sample matter"]],
    cards: [
      ["Browser workspace", "A familiar surface for matter-scoped conversation, files, citations, and actions."],
      ["Policy and tool broker", "The control plane validates identity, classification, mode, target, and approval."],
      ["Permitted sources", "Only C0 files from the active synthetic matter are included in requests to the provider."],
      ["Server-held key", "Configure the provider key, base URL, and model on the server. The browser never receives the key."]
    ]
  }
} as const;

export function DarkPublicPage({ kind }: { kind: keyof typeof pageData }) {
  const data = pageData[kind];
  return <main className="dark-public-page"><MarketingNav dark /><section className="dark-hero"><div><p>{data.eyebrow}</p><h1>{data.title}</h1><p className="dark-intro">{data.intro}</p><Link href="/login">Explore the product <ArrowRight size={18} /></Link></div><div className="dark-orb"><span><LockKey size={27} /></span><i /><i /><i /></div></section><section className="dark-metrics">{data.metrics.map(([value,label]) => <div key={value}><strong>{value}</strong><span>{label}</span></div>)}</section><section className="dark-cards">{data.cards.map(([title,text], index) => <article key={title}><span>{index % 2 ? <HardDrives size={22} /> : <ShieldCheck size={22} />}</span><h2>{title}</h2><p>{text}</p><div><Check size={14} /> ENFORCED OUTSIDE THE MODEL</div></article>)}</section><section className="dark-flow"><div><p>THE CONTROL PATH</p><h2>Useful AI, finite authority.</h2></div><ol><li><span>USER</span> asks inside a permitted matter</li><li><span>POLICY</span> resolves scope and classification</li><li><span>MODEL</span> answers or proposes a typed action</li><li><span>BROKER</span> denies or executes within exact limits</li></ol></section><footer className="dark-footer"><CirclesFour size={24} /><p>Capability follows containment.</p><Link href="/">Return home</Link></footer></main>;
}
