export const PROVIDERS = ["openrouter", "groq", "xai", "gemini", "openai", "claude", "local"] as const;
export type Provider = typeof PROVIDERS[number];
export type ModelMessage = { role: "user" | "assistant"; content: string };
export type ModelOptions = { provider: Provider; model: string; apiKey?: string };

const endpoints: Record<Provider, string> = {
  openrouter: "https://openrouter.ai/api/v1", groq: "https://api.groq.com/openai/v1",
  xai: "https://api.x.ai/v1", gemini: "https://generativelanguage.googleapis.com/v1beta/openai",
  openai: "https://api.openai.com/v1", claude: "https://api.anthropic.com/v1", local: "http://127.0.0.1:11434/v1"
};
const keyNames: Record<Provider, string> = { openrouter: "OPENROUTER_API_KEY", groq: "GROQ_API_KEY", xai: "XAI_API_KEY", gemini: "GEMINI_API_KEY", openai: "OPENAI_API_KEY", claude: "ANTHROPIC_API_KEY", local: "LOCAL_API_KEY" };

export class ModelError extends Error {}

export async function modelCompletion(options: ModelOptions, system: string, messages: ModelMessage[], transport: typeof fetch = fetch): Promise<string> {
  const key = options.apiKey?.trim() || process.env[keyNames[options.provider]] || "";
  if (!key && options.provider !== "local") throw new ModelError(`Add a ${options.provider} API key in the connection panel or server environment.`);
  if (!options.model.trim()) throw new ModelError("Enter a model ID available to your provider account.");
  const base = options.provider === "local" ? (process.env.LOCAL_AI_BASE_URL || endpoints.local).replace(/\/$/, "") : endpoints[options.provider];
  const claude = options.provider === "claude";
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (claude) { headers["x-api-key"] = key; headers["anthropic-version"] = "2023-06-01"; }
  else if (key) headers.Authorization = `Bearer ${key}`;
  const body = claude
    ? { model: options.model, system, messages, max_tokens: 2400 }
    : { model: options.model, messages: [{ role: "system", content: system }, ...messages], ...(options.provider === "openai" ? { max_completion_tokens: 2400 } : { max_tokens: 2400 }) };
  let response: Response;
  try {
    response = await transport(`${base}/${claude ? "messages" : "chat/completions"}`, { method: "POST", headers, body: JSON.stringify(body), redirect: "error", signal: AbortSignal.timeout(60000), cache: "no-store" });
  } catch { throw new ModelError("The selected model endpoint could not be reached or timed out. Check its connection and retry."); }
  if (!response.ok) throw new ModelError(response.status === 401 || response.status === 403 ? "The provider rejected this API key." : response.status === 429 ? "Provider rate limit reached. Try again shortly." : response.status === 402 ? "The provider account needs credits." : `Provider request failed (${response.status}). Check the model ID and account access.`);
  const data = await response.json().catch(() => null);
  const text = claude ? data?.content?.filter((part: { type: string }) => part.type === "text").map((part: { text: string }) => part.text).join("\n") : data?.choices?.[0]?.message?.content;
  if (typeof text !== "string" || !text.trim()) throw new ModelError("The model returned no text. Choose a text model and retry.");
  return text;
}
