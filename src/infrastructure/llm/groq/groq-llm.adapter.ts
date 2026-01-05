import OpenAI from "openai";
import { LlmPort, LlmResponse } from "@/domain/ports/llm.port";

export class GroqLlmAdapter implements LlmPort {
    constructor(
        private readonly groq: OpenAI = new OpenAI({
            apiKey: process.env.GROQ_API_KEY,
            baseURL: "https://api.groq.com/openai/v1",
        })
    ) {}

    async generate(prompt: string): Promise<LlmResponse> {
        const response = await this.groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "system", content: prompt }],
        });

        const usage = response.usage;
        const tokensUsed = usage ? usage.total_tokens : 0;

        return {
            content: response.choices[0].message.content ?? "",
            tokensUsed,
        };
    }
}
