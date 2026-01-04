import { TokenUsage } from "../entities/token-usage.entity";

export abstract class TokenUsageRepositoryPort {
    abstract findByUserId(userId: string): Promise<TokenUsage | null>;
    abstract increment(userId: string, amount: number): Promise<void>
    abstract create(tokenUsage: TokenUsage): Promise<TokenUsage>;
}