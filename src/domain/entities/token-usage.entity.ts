export class TokenUsage {
    constructor(
        public id: string,
        public userId: string,
        public usedTokens: number,
        public limitTokens: number,
        public createdAt: Date,
        public updatedAt: Date,
    ) { }

    static create(
        id: string,
        userId: string,
        usedTokens: number,
        limitTokens: number,
        createdAt: Date = new Date(),
        updatedAt: Date = new Date(),
    ): TokenUsage {
        return new TokenUsage(id, userId, usedTokens, limitTokens, createdAt, updatedAt);
    }
}
