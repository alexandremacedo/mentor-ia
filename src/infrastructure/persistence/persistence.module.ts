import { Module } from "@nestjs/common";
import { MemoryPort } from "@/domain/services/ports/memory.port";
import { LlmModule } from "@/infrastructure/llm/llm.module";
import { PgVectorMemoryTypeormAdapter } from "./typeorm/pgvector/pgvector-memory.typeorm.adapter";

@Module({
    imports: [LlmModule],
    providers: [
        {
            provide: MemoryPort,
            useClass: PgVectorMemoryTypeormAdapter,
        },
    ],
    exports: [MemoryPort]
})

export class PersistenceModule { }