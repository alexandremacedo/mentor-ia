import OpenAI from "openai";
import { EmbeddingPort } from "@/domain/ports/embedding.port";

export class OpenaiEmbeddingAdapter implements EmbeddingPort {
    constructor(private readonly openai: OpenAI = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })) { }

    async embed(content: string): Promise<number[]> {
        const response = await this.openai.embeddings.create({
            model: "text-embedding-3-small",
            input: content,
        });
        return response.data[0].embedding;
    }
}
