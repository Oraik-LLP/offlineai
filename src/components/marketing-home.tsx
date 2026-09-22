import Link from "next/link";
import { ArrowRight, Check, FileText, Quotes, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { MarketingNav } from "./marketing-nav";
import { FeatureStoryTabs } from "./feature-story-tabs";

export function MarketingHome() {
  return (
    <main className="marketing-page">
      <MarketingNav />
      <section className="marketing-hero">
        <div className="hero-copy">
          <p className="marketing-kicker">PRIVATE AI FOR AUSTRALIAN LEGAL PRACTICE</p>
          <h1>Private work.<br /><em>Still private.</em></h1>
          <p className="hero-deck">Search matters, check every source, and create approved work without giving the model authority over your files.</p>
          <div className="hero-actions">
            <Link className="marketing-primary" href="/login">See the workspace <ArrowRight size={18} /></Link>
            <Link className="marketing-secondary" href="/security">How control works</Link>
          </div>
        </div>
        <div className="live-preview" aria-label="Resurrect X product preview">
          <div className="preview-chrome"><span>HARBOURLINE v NORTHBANK</span><b>READ ONLY</b><small>DEMO CONNECTED</small></div>
          <div className="preview-body">
            <div className="preview-nav"><span className="preview-logo">R</span><i /><i /><i /><i /></div>
            <div className="preview-answer">
              <small>TERMINATION REVIEW</small>
              <h2>45 days, with both delivery methods intact.</h2>
              <p>The variation changed the notice period. It did not remove email and registered post delivery.</p>
              <div className="preview-cites"><span><Quotes size={13} /> 1 Agreement</span><span><Quotes size={13} /> 2 Variation</span></div>
            </div>
            <div className="preview-source"><small>SOURCE 02</small><strong>variation-letter.md</strong><p>“The required notice period is increased from 30 days to 45 days.”</p><span><ShieldCheck size={14} /> VERIFIED SCOPE</span></div>
          </div>
        </div>
      </section>

      <section className="proof-strip" aria-label="Core product capabilities">
        <span>MATTER-SCOPED</span><span>SOURCE-CITED</span><span>VERSIONED WRITES</span><span>LOCAL-FIRST</span>
      </section>

      <section className="benefit-section">
        <div className="section-intro"><p>THE CORE DIFFERENCE</p><h2>Answers are useful.<br />Boundaries make them usable.</h2></div>
        <FeatureStoryTabs />
      </section>

      <section className="modes-section">
        <div className="modes-copy"><p>ONE SWITCH. TWO ENVELOPES.</p><h2>Read. Or act.</h2><p>Answering and changing a file are different capabilities. Resurrect X makes that difference impossible to miss.</p><Link href="/security">Read the security model <ArrowRight size={17} /></Link></div>
        <div className="mode-stack">
          <article><span><ShieldCheck size={22} /> READ ONLY</span><h3>Research without mutation.</h3><ul><li><Check size={15} /> Search permitted matter files</li><li><Check size={15} /> Draft inside the conversation</li><li><Check size={15} /> Open exact cited passages</li></ul></article>
          <article><span><FileText size={22} /> READ & WRITE</span><h3>Controlled work product.</h3><ul><li><Check size={15} /> Review the exact target</li><li><Check size={15} /> Approve one action once</li><li><Check size={15} /> Record a new version and audit event</li></ul></article>
        </div>
      </section>

      <section className="marketing-close">
        <div className="close-copy"><p>BRING A REDACTED WORKFLOW</p><h2>See the boundary.<br />Then test it.</h2><span>Use the synthetic Harbourline matter to search citations, switch permissions, and approve a versioned output.</span><Link href="/login">Open the controlled demo <ArrowRight size={18} /></Link></div>
        <div className="close-console" aria-label="Controlled demo sequence">
          <div className="close-console-head"><span>HARBOURLINE / TERMINATION REVIEW</span><b>LOCAL DEMO</b></div>
          <div className="close-console-query">Can we terminate by email, and what notice applies?</div>
          <div className="close-console-answer"><small>VERIFIED ANSWER</small><strong>45 days. Email remains permitted.</strong><p>Agreement clause 14.2 and Variation clause 3.1</p></div>
          <div className="close-console-action"><span>READ &amp; WRITE</span><strong>Save termination brief</strong><b>AWAITING APPROVAL</b></div>
        </div>
      </section>
      <footer className="marketing-footer"><div className="marketing-mark"><span>R</span><strong>RESURRECT X</strong></div><p>Private AI infrastructure for professional work.</p><div><Link href="/security">Security</Link><Link href="/architecture">Architecture</Link></div></footer>
    </main>
  );
}
