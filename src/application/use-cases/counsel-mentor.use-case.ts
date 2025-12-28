import { Injectable } from "@nestjs/common";
import { CounselMentorDTO } from "@/application/dtos/counsel-mentor.dto";
import { MentorService } from "@/domain/services/mentor.service";
import { LlmPort } from "@/domain/services/ports/llm.port";
import { MemoryPort } from "@/domain/services/ports/memory.port";

@Injectable()
export class CounselMentorUseCase {
    constructor(private readonly llm: LlmPort, private readonly memory: MemoryPort) { }

    async execute({ mentorDefinitions, content }: CounselMentorDTO) {
        const memories = await this.memory.findSimilar(content);
        const prompt = new MentorService().buildPrompt(mentorDefinitions, content, memories);
        const response = await this.llm.generate(prompt);

        await this.memory.save("reflection", response);

        return response;
    }
}