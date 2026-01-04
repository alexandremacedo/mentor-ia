export interface LlmResponse {
  content: string;
  tokensUsed: number;
}

export abstract class LlmPort {
  abstract generate(prompt: string): Promise<LlmResponse>;
}