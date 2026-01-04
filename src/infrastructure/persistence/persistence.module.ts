import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MemoryPort } from "@/domain/ports/memory.port";
import { LlmModule } from "@/infrastructure/llm/llm.module";
import { PgVectorMemoryTypeormAdapter } from "./typeorm/pgvector/pgvector-memory.typeorm.adapter";
import { TokenUsageTypeOrmEntity } from "@/infrastructure/persistence/typeorm/entities/token-usage.typeorm.entity";
import { TokenUsageTypeOrmRepository } from "@/infrastructure/persistence/typeorm/repositories/token-usage.typeorm.repository";
import { TokenUsageRepositoryPort } from "@/domain/repositories/token-usage.repository.port";

@Module({
    imports: [
        LlmModule,
        TypeOrmModule.forFeature([TokenUsageTypeOrmEntity])
    ],
    providers: [
        {
            provide: MemoryPort,
            useClass: PgVectorMemoryTypeormAdapter,
        },
        {
            provide: TokenUsageRepositoryPort,
            useClass: TokenUsageTypeOrmRepository,
        },
    ],
    exports: [MemoryPort, TokenUsageRepositoryPort]
})

export class PersistenceModule { }