import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { CounselMentorDTO } from "@/application/dtos/counsel-mentor.dto";
import { MentorService } from "@/domain/services/mentor.service";
import { LlmPort } from "@/domain/ports/llm.port";
import { MemoryPort } from "@/domain/ports/memory.port";
import { TokenUsageRepositoryPort } from "@/domain/repositories/token-usage.repository.port";
import { QuotaExceededError } from "../errors/quota-exceeded.error";
import { QuotaPolicyResolver } from "../policies/quota/quota-policy.resolver";

@Injectable()
export class CounselMentorUseCase {
    constructor(
        private readonly llm: LlmPort,
        private readonly memory: MemoryPort,
        private readonly tokenUsageRepository: TokenUsageRepositoryPort,
        private readonly quotaPolicyResolver: QuotaPolicyResolver
    ) { }

    async execute({ userId, mentorDefinitions, content }: CounselMentorDTO) {
        const memories = await this.memory.findSimilar(content);
        const prompt = new MentorService().buildPrompt(mentorDefinitions, content, memories);

        const estimatedTokens = Math.ceil(prompt.length / 4);

        const usage = await this.tokenUsageRepository.findByUserId(userId);
        if (!usage) throw new NotFoundException('Token configuration not found');

        const policy = this.quotaPolicyResolver.resolve({ plan: 'basic' })
        if (!policy.canConsume({ estimatedTokens, usedTokens: usage.usedTokens, limitTokens: usage.limitTokens })) {
            throw new QuotaExceededError();
        }

        const response = await this.llm.generate(prompt);

        // TODO: add a gate with redis to avoid race condition
        await this.tokenUsageRepository.increment(usage.userId, response.tokensUsed);
        await this.memory.save("reflection", response.content);

        return response.content;
    }
}