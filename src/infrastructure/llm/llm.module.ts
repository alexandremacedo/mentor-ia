import { Module } from "@nestjs/common";
import { LlmPort } from "@/domain/services/ports/llm.port";
import { OpenaiLlmAdapter } from "@/infrastructure/llm/openai/openai-llm.adapter";
import { EmbeddingPort } from "@/domain/services/ports/embedding.port";
import { OpenaiEmbeddingAdapter } from "@/infrastructure/llm/openai/openai-embedding.adapter";
import { BackoffPolicy } from "@/infrastructure/common/backoff.policy";
import { ResilientLlmAdapter } from "./resilient-llm.adapter";

@Module({
    providers: [
        BackoffPolicy,
        {
            provide: "PRIMARY_LLM",
            useClass: OpenaiLlmAdapter,
        },
        {
            provide: "FALLBACK_LLM",
            useClass: OpenaiLlmAdapter,
        },
        {
            provide: LlmPort,
            useClass: ResilientLlmAdapter
        },
        {
            provide: EmbeddingPort,
            useClass: OpenaiEmbeddingAdapter
        },
    ],
    exports: [LlmPort, EmbeddingPort]
})

export class LlmModule { }