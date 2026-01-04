import { Injectable } from "@nestjs/common";
import { QuotaPolicyRegistry } from "./quota-policy.registry";

export type UserQuotaContext = {
    plan: 'basic';
};

@Injectable()
export class QuotaPolicyResolver {
    constructor(private readonly registry: QuotaPolicyRegistry) { }

    resolve(context: UserQuotaContext) {
        switch (context.plan) {
            default:
                return this.registry.get('BASIC');
        }
    }
}
