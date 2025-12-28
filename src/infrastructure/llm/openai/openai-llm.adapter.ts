
import OpenAI from "openai";
import { LlmPort } from "@/domain/services/ports/llm.port";

export class OpenaiLlmAdapter implements LlmPort {
    constructor(private readonly openai: OpenAI = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })) { }

    async generate(prompt: string): Promise<string> {
        const response = await this.openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "system", content: prompt }],
        });
        return response.choices[0].message.content ?? "";
    }
}
