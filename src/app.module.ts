import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import configuration from "./config/configuration";
import { ApplicationModule } from "@/application/application.module";
import { InfrastructureModule } from "@/infrastructure/infrastructure.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: '.env',
    }),
    ApplicationModule,
    InfrastructureModule,
  ],
})
export class AppModule { }