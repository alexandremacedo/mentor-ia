import { LlmPort, LlmResponse } from "@/domain/ports/llm.port";
import { Inject, Injectable } from "@nestjs/common";
import { BackoffPolicy } from "@/infrastructure/common/policies/backoff.policy";

@Injectable()
export class ResilientLlmAdapter implements LlmPort {
    constructor(
        @Inject('PRIMARY_LLM')
        private readonly primary: LlmPort,
        @Inject('FALLBACK_LLM')
        private readonly fallback: LlmPort,
        private readonly backoffPolicy: BackoffPolicy,
    ) { }

    async generate(prompt: string): Promise<LlmResponse> {
        try {
            return await this.backoffPolicy.execute(() => this.primary.generate(prompt));
        } catch {
            return this.fallback.generate(prompt);
        }
    }
}
