"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight, CaretDown, ChatsCircle, Check, ClipboardText, Files, FolderOpen, HardDrives,
  LockKey, MagnifyingGlass, NotePencil, Quotes, ShieldCheck, SignOut,
  Warning, X
} from "@phosphor-icons/react";
import type { AuditEvent, Citation, Matter, MatterFile, SessionMode, ToolPlan, User } from "@/lib/types";

type ChatMessage = { id: string; role: "user" | "assistant"; text: string; citations?: Citation[]; blocked?: boolean };
type InspectorTab = "sources" | "action" | "security";
type NavTab = "chats" | "files" | "matters" | "search";

const starters = [
  "What notice is required to terminate this agreement?",
  "Build a chronology of the termination issue",
  "Summarise the malicious instruction example"
];

function cookieValue(name: string) {
  return document.cookie.split("; ").find((part) => part.startsWith(`${name}=`))?.split("=").slice(1).join("=") || "";
}

export function Workspace({ user, matter, initialMode, initialFiles, initialSource }: { user: User; matter: Matter; initialMode: SessionMode; initialFiles: MatterFile[]; initialSource: MatterFile }) {
  const [provider, setProvider] = useState<{ configured: boolean; name: string; model: string } | null>(null);
  const [showSetup, setShowSetup] = useState(false);
  const [mode, setMode] = useState(initialMode);
  const [nav, setNav] = useState<NavTab>("chats");
  const [inspector, setInspector] = useState<InspectorTab>("sources");
  const [files, setFiles] = useState(initialFiles);
  const [openFile, setOpenFile] = useState<MatterFile | null>(initialSource);
  const [citations, setCitations] = useState<Citation[]>([]);
  const [plan, setPlan] = useState<ToolPlan | null>(null);
  const [events, setEvents] = useState<AuditEvent[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "welcome", role: "assistant", text: "I am scoped to Harbourline Developments v Northbank Services. Ask about the agreement, variation, meeting note, or precedent." }
  ]);
  const [prompt, setPrompt] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [search, setSearch] = useState("");
  const [mobilePanel, setMobilePanel] = useState<"nav" | "inspector" | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  async function loadAudit() { const response = await fetch("/api/v1/audit"); if (response.ok) setEvents((await response.json()).events); }
  async function refreshFiles() { const response = await fetch(`/api/v1/matters/${matter.id}/files`); if (response.ok) setFiles((await response.json()).files); }
  useEffect(() => { loadAudit(); fetch("/api/v1/provider").then(r => r.ok ? r.json() : null).then(setProvider).catch(() => setProvider(null)); }, []);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, streaming]);

  async function changeMode(next: SessionMode) {
    if (next === mode) return;
    const response = await fetch("/api/v1/session", { method: "PATCH", headers: { "content-type": "application/json", "x-rx-csrf": cookieValue("rx_csrf") }, body: JSON.stringify({ mode: next }) });
    if (response.ok) { setMode(next); setPlan(null); await loadAudit(); }
  }

  async function sendPrompt(value?: string) {
    const submitted = (value ?? prompt).trim();
    if (!submitted || streaming) return;
    setPrompt("");
    const userMessage: ChatMessage = { id: crypto.randomUUID(), role: "user", text: submitted };
    const assistantId = crypto.randomUUID();
    setMessages((current) => [...current, userMessage, { id: assistantId, role: "assistant", text: "" }]);
    setStreaming(true);
    setPlan(null);
    try {
    const response = await fetch("/api/v1/chat", { method: "POST", headers: { "content-type": "application/json", "x-rx-csrf": cookieValue("rx_csrf") }, body: JSON.stringify({ prompt: submitted, history: messages.filter(m => m.id !== "welcome" && m.text).slice(-12).map(m => ({ role: m.role, content: m.text.slice(0, 16000) })) }) });
    if (!response.ok || !response.body) {
      const failure = await response.json().catch(() => null);
      setMessages((current) => current.map((message) => message.id === assistantId ? { ...message, text: failure?.error?.message || "The request could not be completed. Please try again." } : message));
      setStreaming(false); return;
    }
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    while (true) {
      const { value: chunk, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(chunk, { stream: true });
      const frames = buffer.split("\n\n"); buffer = frames.pop() || "";
      for (const frame of frames) {
        if (!frame.startsWith("data: ")) continue;
        const data = JSON.parse(frame.slice(6));
        if (data.type === "delta") setMessages((current) => current.map((message) => message.id === assistantId ? { ...message, text: message.text + data.text } : message));
        if (data.type === "complete") {
          setCitations(data.citations || []);
          setMessages((current) => current.map((message) => message.id === assistantId ? { ...message, citations: data.citations, blocked: data.securityEvent?.decision === "deny" } : message));
          if (data.plan) { setPlan(data.plan); setInspector("action"); setMobilePanel("inspector"); }
          else if (data.securityEvent) { setInspector("security"); await loadAudit(); }
          else if (data.citations?.length) setInspector("sources");
        }
      }
    }
    } catch {
      setMessages(current => current.map(message => message.id === assistantId ? { ...message, text: "Connection interrupted. Please try again." } : message));
    } finally { setStreaming(false); }
  }

  async function openCitation(citation: Citation) { await openFileById(citation.fileId); setInspector("sources"); }
  async function openFileById(fileId: string) { const response = await fetch(`/api/v1/files/${fileId}`); const data = await response.json(); setOpenFile(data.file || files.find((file) => file.id === fileId) || null); setCitations([]); setInspector("sources"); setMobilePanel("inspector"); }

  async function executePlan() {
    if (!plan) return;
    const response = await fetch("/api/v1/tool-plans/execute", { method: "POST", headers: { "content-type": "application/json", "x-rx-csrf": cookieValue("rx_csrf") }, body: JSON.stringify(plan) });
    const data = await response.json();
    if (!response.ok) { setMessages((current) => [...current, { id: crypto.randomUUID(), role: "assistant", text: data.error?.message || "The output action was denied.", blocked: true }]); return; }
    setPlan({ ...plan, status: "executed" });
    setMessages((current) => [...current, { id: crypto.randomUUID(), role: "assistant", text: `${data.file.name} was created as version ${data.file.version}. The source files were not changed.` }]);
    await refreshFiles(); await loadAudit();
  }

  async function logout() { await fetch("/api/v1/auth/logout", { method: "POST" }); window.location.assign("/login"); }

  const visibleFiles = useMemo(() => files.filter((file) => !search || file.name.toLowerCase().includes(search.toLowerCase())), [files, search]);

  return (
    <main className={`workspace ${mode}`}>
      <div className="demo-banner"><Warning size={14} weight="fill" /> DEMO ENVIRONMENT <span>DO NOT USE CLIENT DATA</span><span className="banner-separator" />SYNTHETIC MATTER ONLY</div>
      <header className="topbar">
        <button className="mobile-toggle" onClick={() => setMobilePanel("nav")} aria-label="Open navigation"><FolderOpen size={20} /></button>
        <div className="workspace-mark"><span>R</span><strong>RESURRECT X</strong></div>
        <button className="matter-switch" onClick={() => { setNav("matters"); setMobilePanel("nav"); }}><span><small>ACTIVE MATTER</small>{matter.name}</span><CaretDown size={14} /></button>
        <div className="mode-control" aria-label="Session mode">
          <button className={mode === "read_only" ? "selected" : ""} onClick={() => changeMode("read_only")}><LockKey size={15} />READ ONLY</button>
          <button className={mode === "read_write" ? "selected" : ""} onClick={() => changeMode("read_write")}><NotePencil size={15} />READ & WRITE</button>
        </div>
        <button className="boundary-badge provider-button" onClick={() => setShowSetup(true)}><HardDrives size={16} /><span><small>AI CONNECTION</small>{provider?.configured ? provider.name : "CONNECT PROVIDER"}</span></button>
        <button className="mobile-toggle" onClick={() => setMobilePanel("inspector")} aria-label="Open inspector"><ShieldCheck size={20} /></button>
      </header>

      <div className="shell">
        <aside className={`sidebar ${mobilePanel === "nav" ? "mobile-open" : ""}`}>
          <button className="panel-close" onClick={() => setMobilePanel(null)} aria-label="Close navigation"><X size={18} /></button>
          <nav>
            <NavButton icon={<ChatsCircle />} label="Chats" active={nav === "chats"} onClick={() => setNav("chats")} />
            <NavButton icon={<FolderOpen />} label="Matters" active={nav === "matters"} onClick={() => setNav("matters")} />
            <NavButton icon={<Files />} label="Files" count={files.length} active={nav === "files"} onClick={() => setNav("files")} />
            <NavButton icon={<MagnifyingGlass />} label="Search" active={nav === "search"} onClick={() => setNav("search")} />
          </nav>
          <SidebarContent nav={nav} matter={matter} files={visibleFiles} search={search} setSearch={setSearch} openFile={openFileById} onStarter={sendPrompt} />
          <div className="user-row"><div className="avatar">AW</div><span><strong>{user.name}</strong><small>Managing Partner</small></span><button onClick={logout} aria-label="Sign out"><SignOut size={17} /></button></div>
        </aside>

        <section className="conversation" aria-label="Matter conversation">
          <div className="thread-head"><div><small>{matter.reference}</small><h1>Termination review</h1></div><div className="scope"><ShieldCheck size={16} /><span>Scoped to 1 matter</span></div></div>
          <div className="message-list">
            <button className="provider-notice" onClick={() => setShowSetup(true)}><strong>{provider?.configured ? provider.name + " connected" : "Connect your AI provider"}</strong><span>{provider?.configured ? provider.model : "Add a server API key to start asking questions."}</span><ArrowRight size={16} /></button>
            {messages.map((message) => <Message key={message.id} message={message} openCitation={openCitation} />)}
            {streaming && <div className="stream-state"><span /><span /><span /> Generating from permitted sources</div>}
            <div ref={endRef} />
          </div>
          <div className="composer-wrap">
            <div className="composer">
              <textarea aria-label="Ask about this matter" value={prompt} onChange={(event) => setPrompt(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); sendPrompt(); } }} placeholder="Ask about this matter..." rows={2} />
              <div className="composer-actions"><span>{mode === "read_only" ? "DRAFT IN CHAT ONLY" : "OUTPUT ACTIONS REQUIRE APPROVAL"}</span><button aria-label="Send message" className="send-button" onClick={() => sendPrompt()} disabled={!prompt.trim() || streaming}><ArrowRight size={18} /></button></div>
            </div>
          </div>
        </section>

        <aside className={`inspector ${mobilePanel === "inspector" ? "mobile-open" : ""}`}>
          <button className="panel-close" onClick={() => setMobilePanel(null)} aria-label="Close inspector"><X size={18} /></button>
          <div className="inspector-tabs">
            <button className={inspector === "sources" ? "active" : ""} onClick={() => setInspector("sources")}>SOURCES {citations.length > 0 && <b>{citations.length}</b>}</button>
            <button className={inspector === "action" ? "active" : ""} onClick={() => setInspector("action")}>ACTION {plan && <b>1</b>}</button>
            <button className={inspector === "security" ? "active" : ""} onClick={() => { setInspector("security"); loadAudit(); }}>SECURITY</button>
          </div>
          {inspector === "sources" && <SourcePanel citations={citations} file={openFile} onOpen={openCitation} />}
          {inspector === "action" && <ActionPanel plan={plan} mode={mode} approve={executePlan} cancel={() => setPlan(null)} />}
          {inspector === "security" && <SecurityPanel events={events} mode={mode} />}
        </aside>
      </div>
      {showSetup && <div className="setup-backdrop" onClick={() => setShowSetup(false)}><section role="dialog" aria-modal="true" aria-labelledby="provider-title" className="provider-dialog" onKeyDown={event => {
        if (event.key === "Escape") setShowSetup(false);
        if (event.key === "Tab") {
          const elements = Array.from(event.currentTarget.querySelectorAll<HTMLElement>("button, summary"));
          const first = elements[0], last = elements[elements.length - 1];
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
        }
      }} onClick={event => event.stopPropagation()}><button autoFocus className="setup-close" aria-label="Close provider setup" onClick={() => setShowSetup(false)}>Close <X size={16} /></button><p className="eyebrow">AI CONNECTION</p><h2 id="provider-title">Your model.<br />Your workspace.</h2><p>Use OpenRouter or any provider with a compatible chat completions API. Keys stay on the server.</p><ol><li>Create <code>.env.local</code> in the project folder.</li><li>Add the settings below with your provider key.</li><li>Restart the app, then refresh this page.</li></ol><pre>OPENROUTER_API_KEY=your-key{"\n"}AI_MODEL=openrouter/auto</pre><details><summary>Use another provider</summary><pre>AI_API_KEY=your-key{"\n"}AI_BASE_URL=https://your-provider/v1{"\n"}AI_MODEL=your-model-id</pre></details><p className="provider-disclosure">Your questions and permitted synthetic matter sources are sent to the configured provider.</p></section></div>}
    </main>
  );
}

function NavButton({ icon, label, count, active, onClick }: { icon: React.ReactNode; label: string; count?: number; active: boolean; onClick: () => void }) { return <button className={active ? "active" : ""} onClick={onClick}>{icon}<span>{label}</span>{count !== undefined && <b>{count}</b>}</button>; }

function SidebarContent({ nav, matter, files, search, setSearch, openFile, onStarter }: { nav: NavTab; matter: Matter; files: MatterFile[]; search: string; setSearch: (v: string) => void; openFile: (id: string) => void; onStarter: (value: string) => void }) {
  if (nav === "chats") return <div className="sidebar-section"><h2>Recent work</h2><div className="recent-thread active"><span>Termination review</span><small>Just now</small></div><h3>Try a demo flow</h3>{starters.map((starter) => <button className="starter" key={starter} onClick={() => onStarter(starter)}>{starter}<ArrowRight size={13} /></button>)}</div>;
  if (nav === "matters") return <div className="sidebar-section"><h2>Permitted matters</h2><div className="matter-card"><FolderOpen size={18} /><span><strong>{matter.name}</strong><small>{matter.reference} | {matter.classification}</small></span><Check size={15} /></div><p className="sidebar-note">Only matters assigned to this session can appear here.</p></div>;
  return <div className="sidebar-section"><h2>{nav === "search" ? "Search matter" : "Matter files"}</h2><label className="search-field"><MagnifyingGlass size={15} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find a file" /></label><div className="file-list">{files.length ? files.map((file) => <button key={file.id} onClick={() => openFile(file.id)}><span className={`file-icon ${file.kind}`}><ClipboardText size={16} /></span><span><strong>{file.name}</strong><small>{file.kind.toUpperCase()} | {file.classification} | v{file.version}</small></span></button>) : <div className="empty-state"><MagnifyingGlass size={22} /><strong>No permitted results</strong><span>Try a different term. Inaccessible matter content is never revealed.</span></div>}</div></div>;
}

function Message({ message, openCitation }: { message: ChatMessage; openCitation: (citation: Citation) => void }) { return <article className={`message ${message.role} ${message.blocked ? "blocked" : ""}`}><div className="message-author">{message.role === "user" ? <span className="avatar small">AW</span> : <span className="assistant-mark">R</span>}<strong>{message.role === "user" ? "You" : "Resurrect X"}</strong>{message.blocked && <span className="blocked-label"><LockKey size={13} />POLICY BLOCK</span>}</div><div className="message-body">{message.text.split("\n").map((line, index) => line ? <p key={index}>{line}</p> : <br key={index} />)}{message.citations && message.citations.length > 0 && <div className="citation-row">{message.citations.map((citation, index) => <button key={citation.id} onClick={() => openCitation(citation)}><Quotes size={14} />{index + 1} <span>{citation.fileName}</span></button>)}</div>}</div></article>; }

function SourcePanel({ citations, file, onOpen }: { citations: Citation[]; file: MatterFile | null; onOpen: (citation: Citation) => void }) { if (citations.length) return <div className="panel-body"><div className="panel-title"><div><small>EVIDENCE SET</small><h2>{citations.length} supporting passages</h2></div><span className="verified"><ShieldCheck size={15} />VERIFIED SCOPE</span></div>{citations.map((citation) => <button className="citation-card" onClick={() => onOpen(citation)} key={citation.id}><div><strong>{citation.fileName}</strong><span>{citation.classification}</span></div><small>{citation.anchor}</small><p>{citation.excerpt}</p><span className="open-source">OPEN PASSAGE <ArrowRight size={13} /></span></button>)}</div>; if (!file) return <EmptyPanel icon={<Quotes size={25} />} title="No source selected" text="Open a file or citation to inspect the exact permitted passage." />; return <div className="panel-body"><div className="file-head"><div><small>{file.kind.toUpperCase()} | {file.classification}</small><h2>{file.name}</h2></div><span>v{file.version}</span></div><div className="file-meta"><span>SHA-256</span><code>{file.hash}</code></div>{file.classification === "C4" ? <div className="sealed-file"><LockKey size={26} /><strong>NO-AI / SEALED</strong><p>Metadata is visible. Content is excluded from indexing and model context.</p></div> : <pre className="document-view">{file.content || "Open this output to load its current version."}</pre>}</div>; }

function ActionPanel({ plan, mode, approve, cancel }: { plan: ToolPlan | null; mode: SessionMode; approve: () => void; cancel: () => void }) { if (!plan) return <EmptyPanel icon={<NotePencil size={25} />} title="No planned action" text={mode === "read_only" ? "Read-only mode can draft in chat but cannot change files." : "Ask the assistant to save a report to review its exact action plan."} />; return <div className="panel-body"><div className={`action-status ${plan.status}`}><span>{plan.status === "executed" ? <Check size={18} /> : <NotePencil size={18} />}</span><div><small>{plan.status === "executed" ? "ACTION COMPLETE" : "APPROVAL REQUIRED"}</small><h2>{plan.status === "executed" ? "Output created" : "Create output file"}</h2></div></div><dl className="action-details"><div><dt>Target</dt><dd><code>Outputs/{plan.filename}</code></dd></div><div><dt>Classification</dt><dd>{plan.classification} Demo-safe</dd></div><div><dt>Reason</dt><dd>{plan.reason}</dd></div><div><dt>Effect</dt><dd>{plan.effect}</dd></div></dl>{plan.status === "proposed" && <div className="approval-actions"><button className="ghost-button" onClick={cancel}>CANCEL</button><button className="primary-button" onClick={approve}><ShieldCheck size={16} />APPROVE ONCE</button></div>}{plan.status === "executed" && <div className="success-note"><Check size={17} />Version and audit event recorded.</div>}</div>; }

function SecurityPanel({ events, mode }: { events: AuditEvent[]; mode: SessionMode }) { return <div className="panel-body"><div className="security-summary"><ShieldCheck size={24} weight="duotone" /><div><small>CURRENT ENVELOPE</small><h2>{mode === "read_only" ? "Read only" : "Read & write"}</h2><p>{mode === "read_only" ? "All file mutations are denied by server policy." : "Approved output writes only. Sources remain immutable."}</p></div></div><div className="boundary-list"><div><span>PROCESSING</span><strong>DEMO CONNECTED</strong></div><div><span>MODEL DATA</span><strong>C0 ONLY</strong></div><div><span>MATTER SCOPE</span><strong>1 PERMITTED</strong></div><div><span>EGRESS TOOLS</span><strong>NONE</strong></div></div><h3 className="audit-heading">Recent audit events</h3><div className="audit-list">{events.map((event) => <div key={event.id}><span className={event.decision}>{event.decision === "allow" ? <Check size={13} /> : <X size={13} />}</span><p><strong>{event.eventType.replaceAll("_", " ")}</strong><small>{event.detail}</small></p><time>{new Date(event.timestamp).toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit" })}</time></div>)}</div></div>; }

function EmptyPanel({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) { return <div className="empty-panel"><span>{icon}</span><h2>{title}</h2><p>{text}</p></div>; }
