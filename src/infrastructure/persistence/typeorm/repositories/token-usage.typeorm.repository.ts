import { InjectRepository } from "@nestjs/typeorm";
import { TokenUsageTypeOrmEntity } from "../entities/token-usage.typeorm.entity";
import { Repository } from "typeorm";
import { TokenUsageRepositoryPort } from "@/domain/repositories/token-usage.repository.port";
import { TokenUsage } from "@/domain/entities/token-usage.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TokenUsageTypeOrmRepository implements TokenUsageRepositoryPort {
    constructor(
        @InjectRepository(TokenUsageTypeOrmEntity)
        private readonly repository: Repository<TokenUsageTypeOrmEntity>
    ) { }

    async findByUserId(userId: string): Promise<TokenUsage | null> {
        const tokenUsage = await this.repository.findOne({ where: { user_id: userId } });

        if (!tokenUsage) {
            return null;
        }

        return TokenUsageTypeOrmEntity.toDomain(tokenUsage);
    }

    async increment(userId: string, amount: number): Promise<void> {
        await this.repository.increment({ user_id: userId }, 'used_tokens', amount);
    }

    async create(tokenUsage: TokenUsage): Promise<TokenUsage> {
        const entity = TokenUsageTypeOrmEntity.fromDomain(tokenUsage)
        await this.repository.save(entity);
        return tokenUsage;
    }
}