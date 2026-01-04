import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TokenUsageTypeOrmEntity } from '../persistence/typeorm/entities/token-usage.typeorm.entity';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                url: configService.get('database.url'),
                synchronize: false,
                autoLoadEntities: false,
                entities: [TokenUsageTypeOrmEntity],
                logging: false,
                extra: {
                    max: configService.get("database.poolMax"),
                    idleTimeoutMillis: 30000,
                    connectionTimeoutMillis: 2000,
                },
            }),
        }),
    ],
})
export class DatabaseModule { }