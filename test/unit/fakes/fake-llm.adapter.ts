import { Injectable } from "@nestjs/common";
import { LlmPort } from "@/domain/services/ports/llm.port";

@Injectable()
export class FakeLlmAdapter implements LlmPort {
    async generate(prompt: string): Promise<string> {
        return `FAKE_LLM_RESPONSE`;
    }
}
