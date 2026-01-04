import { Injectable } from "@nestjs/common";
import { LlmPort, LlmResponse } from "@/domain/ports/llm.port";

@Injectable()
export class FakeLlmAdapter implements LlmPort {
    async generate(prompt: string): Promise<LlmResponse> {
        return { content: `FAKE_LLM_RESPONSE`, tokensUsed: 100 };
    }
}
