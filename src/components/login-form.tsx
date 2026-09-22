"use client";

import { useState } from "react";
import { ArrowRight, LockKey } from "@phosphor-icons/react";

export function LoginForm() {
  const [email, setEmail] = useState("amelia@harbourlegal.demo");
  const [password, setPassword] = useState("demo-access");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const response = await fetch("/api/v1/auth/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    if (!response.ok) {
      setError("The demo account could not be verified.");
      setLoading(false);
      return;
    }
    window.location.assign("/workspace");
  }

  return (
    <form className="login-form" onSubmit={submit}>
      <div className="form-heading">
        <LockKey size={22} weight="duotone" />
        <div><h2>Welcome back.</h2><p>Open your matter workspace with the sample account.</p></div>
      </div>
      <label>Email address<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" required /></label>
      <label>Password<input value={password} onChange={(e) => setPassword(e.target.value)} type="password" autoComplete="current-password" required /></label>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="primary-button" disabled={loading} type="submit">
        <span>{loading ? "VERIFYING" : "OPEN WORKSPACE"}</span><ArrowRight size={18} />
      </button>
      <div className="login-meta"><span>Sample account included</span><span>API powered</span></div>
    </form>
  );
}
