# Hybrid legal agent MVP

Sign in at `/login`, then open `/bot`. The existing workspace remains available separately.

Choose OpenRouter, Groq, xAI/Grok, Gemini, OpenAI, Anthropic Claude, or Local GPU. Enter a text model ID available to your account and a key. Entered keys remain in page memory and travel to the app server for that request; they are not written to disk or browser storage. Deploy over HTTPS. Switching providers starts a new conversation.

Alternatively set keys in `.env.local`: `OPENROUTER_API_KEY`, `GROQ_API_KEY`, `XAI_API_KEY`, `GEMINI_API_KEY`, `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`. Restart the server after configuration changes. No automatic fallback between providers occurs.

Local inference uses an OpenAI-compatible endpoint, such as Ollama, LM Studio or vLLM. Set `LOCAL_AI_BASE_URL` (default `http://127.0.0.1:11434/v1`) and optionally `LOCAL_API_KEY`. Enter the installed model ID in the bot. This app connects to inference; it does not provision GPU hardware or install models.

The agent has six decisions per request: search the active matter, read permitted documents, answer with source IDs, or propose a Markdown draft. Saving uses the existing Read & write mode and explicit approval. It has no shell, deletion, arbitrary URL fetch, or cross-matter tools. Cloud calls include only permitted C0 synthetic source data; local calls apply local classification policy and exclude C4. User prompts are not automatically classified: use synthetic data in this MVP.

Legal scope is a model instruction, not a perfect topic classifier. File access and tool limits are enforced in code. No live legal database or web research is available. Answers require review, and current-law verification is not claimed. Instruction-following text models are required; smaller local models may fail the JSON action protocol. Errors appear instead of silently reverting to a canned answer.

Provider adapters use OpenAI-compatible chat completions except Claude, which uses native Messages. Tests mock HTTP responses; real accounts and model access need separate live verification.

References: [Gemini compatibility](https://ai.google.dev/gemini-api/docs/openai), [Claude Messages](https://platform.claude.com/docs/en/api/messages/create), [Groq](https://console.groq.com/docs/overview), [xAI](https://docs.x.ai/developers/rest-api-reference/inference), [OpenRouter](https://openrouter.ai/docs/quickstart), [OpenAI Chat](https://developers.openai.com/api/reference/resources/chat).
