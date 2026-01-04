import { TokenUsage } from "@/domain/entities/token-usage.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("token_usage")
@Unique(["user_id"])
export class TokenUsageTypeOrmEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  user_id: string;

  @Column({ default: 0 })
  used_tokens: number;

  @Column()
  limit_tokens: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  static toDomain(entity: TokenUsageTypeOrmEntity): TokenUsage {
    return TokenUsage.create(
      entity.id,
      entity.user_id,
      entity.used_tokens,
      entity.limit_tokens,
      entity.created_at,
      entity.updated_at,
    );
  }

  static fromDomain(tokenUsage: TokenUsage): TokenUsageTypeOrmEntity {
    const entity = new TokenUsageTypeOrmEntity();
    entity.id = tokenUsage.id;
    entity.user_id = tokenUsage.userId;
    entity.used_tokens = tokenUsage.usedTokens;
    entity.limit_tokens = tokenUsage.limitTokens;
    entity.created_at = tokenUsage.createdAt;
    entity.updated_at = tokenUsage.updatedAt;
    return entity;
  }
}
