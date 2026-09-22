"use client";
import Link from "next/link";
import { useState } from "react";
import type { ModelMessage, Provider } from "@/lib/model-provider";
import type { SessionMode, ToolPlan } from "@/lib/types";
import styles from "./legal-bot.module.css";

const choices: [Provider, string][] = [["openrouter", "OpenRouter"], ["groq", "Groq"], ["xai", "xAI / Grok"], ["gemini", "Google Gemini"], ["openai", "OpenAI"], ["claude", "Anthropic Claude"], ["local", "Local GPU"]];
function csrf() { return document.cookie.split("; ").find(v => v.startsWith("rx_csrf="))?.slice(8) || ""; }
export function LegalBot({ initialMode }: { initialMode: SessionMode }) {
  const [provider, setProvider] = useState<Provider>("openrouter");
  const [model, setModel] = useState("openrouter/auto");
  const [key, setKey] = useState("");
  const [mode, setMode] = useState(initialMode);
  const [messages, setMessages] = useState<ModelMessage[]>([]);
  const [prompt, setPrompt] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [plan, setPlan] = useState<ToolPlan | null>(null);
  const [sources, setSources] = useState<{fileName: string; excerpt: string}[]>([]);
  async function request(url: string, body: unknown, method = "POST") {
    const response = await fetch(url, { method, headers: { "content-type": "application/json", "x-rx-csrf": csrf() }, body: JSON.stringify(body) });
    const data = await response.json();
    if (!response.ok) throw new Error(typeof data.error === "string" ? data.error : data.error?.message || "Request failed. Please retry.");
    return data;
  }
  async function send(event: React.FormEvent) {
    event.preventDefault(); if (busy || !prompt.trim() || !model.trim()) return;
    setBusy(true); setError(""); setPlan(null); setSources([]);
    const question = prompt.trim();
    try {
      const result = await request("/api/v1/legal-bot", { prompt: question, provider, model, apiKey: key || undefined, history: messages.slice(-8).map(m => ({ ...m, content: m.content.slice(0,24000) })) });
      setMessages([...messages, { role: "user", content: question }, { role: "assistant", content: result.text }]);
      setSources(result.citations || []); setPlan(result.plan || null); setPrompt("");
    } catch (e) { setError(e instanceof Error ? e.message : "Connection failed."); } finally { setBusy(false); }
  }
  async function switchMode() {
    setBusy(true); setError("");
    try { const data = await request("/api/v1/session", { mode: mode === "read_only" ? "read_write" : "read_only" }, "PATCH"); setMode(data.mode); setPlan(null); }
    catch (e) { setError(e instanceof Error ? e.message : "Mode change failed."); } finally { setBusy(false); }
  }
  async function approve() {
    if (!plan || busy) return; setBusy(true); setError("");
    try { const data = await request("/api/v1/tool-plans/execute", plan); setMessages([...messages, {role:"assistant",content:`Saved ${data.file.name}, version ${data.file.version}.`}]); setPlan(null); }
    catch (e) { setError(e instanceof Error ? e.message : "Save failed."); } finally { setBusy(false); }
  }
  return <main className={styles.page}>
    <header className={styles.header}><Link href="/">RESURRECT X</Link><Link href="/workspace">Matter workspace</Link></header>
    <div className={styles.layout}>
      <aside className={styles.connection}><p className={styles.kicker}>HYBRID LEGAL ASSISTANT</p><h1>Your law.<br/>Your model.</h1><p>Research and draft within the Harbourline sample matter.</p>
        <label>Provider<select disabled={busy} value={provider} onChange={e => { setProvider(e.target.value as Provider); setKey(""); setModel(e.target.value === "openrouter" ? "openrouter/auto" : ""); setMessages([]); setSources([]); setPlan(null); setError(""); }}>{choices.map(([value,label]) => <option key={value} value={value}>{label}</option>)}</select></label>
        <label>Model ID<input disabled={busy} value={model} onChange={e => setModel(e.target.value)} placeholder="Model ID from your provider" /></label>
        <label>API key<input disabled={busy} type="password" autoComplete="off" value={key} onChange={e => setKey(e.target.value)} placeholder="Enter a key or use the server key" /></label>
        <p className={styles.note}>{provider === "local" ? "Uses the server-configured local endpoint. No cloud fallback." : "Your question and permitted sources are sent to this provider. Entered keys stay in page memory until you leave."}</p>
        <button disabled={busy} onClick={switchMode}>{mode === "read_only" ? "Read only · Enable draft saving" : "Read & write · Disable saving"}</button>
        <p className={styles.note}>Synthetic matter only. Legal answers need professional review.</p>
      </aside>
      <section className={styles.chat} aria-label="Legal conversation">
        <div className={styles.messages} aria-live="polite">{messages.length === 0 && <div className={styles.empty}><span>HARBOURLINE / NORTHBANK</span><h2>Start with the evidence.</h2><p>Ask about notice requirements, prepare a chronology, or draft a legal brief. The agent can search and read permitted source files.</p></div>}{messages.map((m,i) => <article className={m.role === "user" ? styles.user : styles.answer} key={i}><small>{m.role === "user" ? "YOU" : "RESURRECT X"}</small><p>{m.content}</p></article>)}
        {busy && <p role="status">Working with the selected provider…</p>}
        {sources.length > 0 && <details className={styles.sources}><summary>Sources used ({sources.length})</summary>{sources.map(source => <div key={source.fileName}><strong>{source.fileName}</strong><pre>{source.excerpt}</pre></div>)}</details>}
        {plan && <div className={styles.sources}><strong>Review draft: {plan.filename}</strong><p>{plan.effect}</p><pre>{plan.content}</pre><button disabled={busy} onClick={approve}>Approve and save</button><button disabled={busy} onClick={() => setPlan(null)}>Cancel</button></div>}
        </div>
        <form onSubmit={send} className={styles.composer}>{error && <p role="alert">{error}</p>}<label htmlFor="legal-question">Ask a legal question</label><textarea id="legal-question" maxLength={4000} value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="What notice applies under the varied agreement?" rows={3}/><button disabled={busy || !prompt.trim() || !model.trim()} type="submit">{busy ? "Working…" : "Ask the legal agent"}</button></form>
      </section>
    </div>
  </main>;
}
