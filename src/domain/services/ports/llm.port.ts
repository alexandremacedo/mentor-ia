export abstract class LlmPort {
  abstract generate(prompt: string): Promise<string>;
}