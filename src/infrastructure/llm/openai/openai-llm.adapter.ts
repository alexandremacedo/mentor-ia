import OpenAI from "openai";
import { LlmPort, LlmResponse } from "@/domain/ports/llm.port";

export class OpenaiLlmAdapter implements LlmPort {
    constructor(private readonly openai: OpenAI = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })) { }

    async generate(prompt: string): Promise<LlmResponse> {
        const response = await this.openai.chat.completions.create({
            model: "gpt-4o-mini",
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
