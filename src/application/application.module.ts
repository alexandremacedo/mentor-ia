import { Module } from "@nestjs/common";
import { CounselMentorUseCase } from "./use-cases/counsel-mentor.use-case";
import { PersistenceModule } from "@/infrastructure/persistence/persistence.module";
import { LlmModule } from "@/infrastructure/llm/llm.module";

@Module({
    imports: [PersistenceModule, LlmModule],
    exports: [CounselMentorUseCase],
    providers: [CounselMentorUseCase]
})

export class ApplicationModule {}