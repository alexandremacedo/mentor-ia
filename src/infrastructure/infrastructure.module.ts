import { Module } from "@nestjs/common";
import { PersistenceModule } from "@/infrastructure/persistence/persistence.module";
import { DatabaseModule } from "@/infrastructure/database/database.module";
import { WebModule } from "@/infrastructure/web/web.module";
import { LlmModule } from "@/infrastructure/llm/llm.module";

@Module({
    imports: [PersistenceModule, LlmModule, DatabaseModule, WebModule]
})

export class InfrastructureModule { }