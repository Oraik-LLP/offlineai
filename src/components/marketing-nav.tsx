import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export function MarketingNav({ dark = false }: { dark?: boolean }) {
  return (
    <header className={`marketing-nav ${dark ? "dark" : ""}`}>
      <Link href="/" className="marketing-mark"><span>R</span><strong>RESURRECT X</strong></Link>
      <nav aria-label="Public navigation">
        <Link href="/security">Security</Link>
        <Link href="/architecture">Architecture</Link>
        <Link href="/login">Demo</Link>
      </nav>
      <Link href="/login" className="nav-cta">OPEN WORKSPACE <span><ArrowUpRight size={13} /></span></Link>
    </header>
  );
}
