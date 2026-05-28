export type ProviderName =
  | "groq"
  | "gemini"
  | "openrouter";

export interface GatewayRequest {
  prompt: string;

  systemPrompt: string;

  maxTokens?: number;

  temperature?: number;
}

export interface GatewayResponse {
  content: string;

  provider: ProviderName;

  model: string;

  inputTokens: number;

  outputTokens: number;

  latencyMs: number;

  estimatedCostUsd: number;
}