import { Module } from "@nestjs/common";
import { LlmPort } from "@/domain/services/ports/llm.port";
import { OpenaiLlmAdapter } from "@/infrastructure/llm/openai/openai-llm.adapter";
import { EmbeddingPort } from "@/domain/services/ports/embedding.port";
import { OpenaiEmbeddingAdapter } from "@/infrastructure/llm/openai/openai-embedding.adapter";

@Module({
    providers: [
        {
            provide: LlmPort,
            useClass: OpenaiLlmAdapter
        },
        {
            provide: EmbeddingPort,
            useClass: OpenaiEmbeddingAdapter
        }
    ],
    exports: [LlmPort, EmbeddingPort]
})

export class LlmModule {}