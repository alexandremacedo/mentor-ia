import { Injectable } from "@nestjs/common";
import { QuotaPolicy } from "./quota.policy";

interface BasicQuotaParams {
    estimatedTokens: number
    usedTokens: number
    limitTokens: number
}

@Injectable()
export class BasicQuotaPolicy implements QuotaPolicy<BasicQuotaParams> {
    constructor() { }

    public canConsume({ estimatedTokens, usedTokens, limitTokens }: BasicQuotaParams) {
        return usedTokens + estimatedTokens <= limitTokens;
    }
}