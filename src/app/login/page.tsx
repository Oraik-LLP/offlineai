import { LoginForm } from "@/components/login-form";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Quotes, HardDrives } from "@phosphor-icons/react/dist/ssr";

export default function LoginPage() {
  return (
    <main className="login-page">
      <section className="login-brand" aria-labelledby="login-heading">
        <Link href="/" className="wordmark"><span>R</span> RESURRECT X</Link>
        <div className="login-copy">
          <p className="eyebrow">PRIVATE LEGAL AI WORKSPACE</p>
          <h1 id="login-heading">Good work starts with the source.</h1>
          <p>One place to read, ask, and draft. Every answer starts with your matter.</p>
          <div className="login-art"><Image src="/images/immutable-source.png" alt="Protected original document beside a new draft" fill unoptimized sizes="(max-width: 860px) 100vw, 55vw" /></div>
        </div>
        <div className="trust-points" aria-label="Product principles">
          <div><HardDrives size={20} weight="duotone" /><span><strong>Your provider</strong> OpenRouter compatible</span></div>
          <div><Quotes size={20} weight="duotone" /><span><strong>Source-cited</strong> professional answers</span></div>
          <div><ShieldCheck size={20} weight="duotone" /><span><strong>Server-enforced</strong> action policy</span></div>
        </div>
      </section>
      <section className="login-panel" aria-label="Sign in">
        <div className="demo-warning">DEMO ENVIRONMENT <span>DO NOT USE CLIENT DATA</span></div>
        <LoginForm />
        <p className="legal-note">Synthetic data only. AI output requires professional review.</p>
      </section>
    </main>
  );
}
