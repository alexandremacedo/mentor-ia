import { Module } from "@nestjs/common";
import { ApplicationModule } from "@/application/application.module";
import { CounselController } from "@/infrastructure/web/controllers/counsel.controller";
import { PersistenceModule } from "@/infrastructure/persistence/persistence.module";
import { HealthController } from "@/infrastructure/web/controllers/health.controller";

@Module({
    imports: [ApplicationModule, PersistenceModule],
    controllers: [CounselController, HealthController]
})

export class WebModule { }