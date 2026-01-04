import { Injectable } from "@nestjs/common";
import { QuotaPolicy } from "./quota.policy";

export type QuotaPolicyKey = 'BASIC'

@Injectable()
export class QuotaPolicyRegistry {
    private readonly policies = new Map<QuotaPolicyKey, QuotaPolicy<any>>();

    register<T>(key: QuotaPolicyKey, policy: QuotaPolicy<T>,) {
        this.policies.set(key, policy);
    }

    get<T>(key: QuotaPolicyKey): QuotaPolicy<T> {
        const policy = this.policies.get(key);
        if (!policy) {
            throw new Error(`QuotaPolicy ${key} not registered`);
        }
        return policy;
    }
}
