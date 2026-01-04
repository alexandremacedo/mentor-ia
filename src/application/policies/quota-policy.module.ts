import { Module } from "@nestjs/common";
import { QuotaPolicyRegistry } from "./quota/quota-policy.registry";
import { QuotaPolicyResolver } from "./quota/quota-policy.resolver";
import { BasicQuotaPolicy } from "./quota/basic-quota.policy";

@Module({
    providers: [
        QuotaPolicyRegistry,
        QuotaPolicyResolver,
        BasicQuotaPolicy,
        {
            provide: 'QUOTA_POLICY_SETUP',
            useFactory: (registry: QuotaPolicyRegistry, basic: BasicQuotaPolicy) => {
                registry.register('BASIC', basic);
            },
            inject: [
                QuotaPolicyRegistry,
                BasicQuotaPolicy,
            ],
        },
    ],
    exports: [QuotaPolicyResolver],
})
export class QuotaPolicyModule { }
