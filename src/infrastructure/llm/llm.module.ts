import { Module } from "@nestjs/common";
import { LlmPort } from "@/domain/ports/llm.port";
import { EmbeddingPort } from "@/domain/ports/embedding.port";
import { BackoffPolicy } from "@/infrastructure/common/policies/backoff.policy";
import { ResilientLlmAdapter } from "./resilient-llm.adapter";
import { FakeLlmAdapter } from "./fakes/fake-llm.adapter";
import { FakeEmbeddingAdapter } from "./fakes/fake-embedding.adapter";

@Module({
    providers: [
        BackoffPolicy,
        {
            provide: "PRIMARY_LLM",
            useClass: FakeLlmAdapter,
        },
        {
            provide: "FALLBACK_LLM",
            useClass: FakeLlmAdapter,
        },
        {
            provide: LlmPort,
            useClass: ResilientLlmAdapter
        },
        {
            provide: EmbeddingPort,
            useClass: FakeEmbeddingAdapter
        },
    ],
    exports: [LlmPort, EmbeddingPort]
})

export class LlmModule { }