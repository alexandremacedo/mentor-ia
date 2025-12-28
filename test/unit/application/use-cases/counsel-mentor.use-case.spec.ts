import { Test, TestingModule } from "@nestjs/testing";
import { CounselMentorUseCase } from "@/application/use-cases/counsel-mentor.use-case";
import { LlmPort } from "@/domain/services/ports/llm.port";
import { FakeLlmAdapter } from "../../fakes/fake-llm.adapter";
import { MemoryPort } from "@/domain/services/ports/memory.port";
import { EmbeddingPort } from "@/domain/services/ports/embedding.port";
import { FakeEmbeddingAdapter } from "../../fakes/fake-embedding.adapter";

describe("CounselMentorUseCase", () => {
    let useCase: CounselMentorUseCase;

    const memoryMock = {
        findSimilar: jest.fn().mockResolvedValue([
            "Past reflection about discipline"
        ]),
        save: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CounselMentorUseCase,
                {
                    provide: LlmPort,
                    useClass: FakeLlmAdapter,
                },
                {
                    provide: EmbeddingPort,
                    useClass: FakeEmbeddingAdapter,
                },
                {
                    provide: MemoryPort,
                    useValue: memoryMock
                },
            ],
        }).compile();

        useCase = module.get(CounselMentorUseCase);
    });

    it("should generate counsel and save reflection", async () => {
        const result = await useCase.execute({
            content: "How much longer I am going to wait to demand the best of myself?",
            mentorDefinitions: "You are a Stoic mentor",
        });

        expect(result).toContain("FAKE_LLM_RESPONSE");

        expect(memoryMock.findSimilar).toHaveBeenCalledTimes(1);
        expect(memoryMock.save).toHaveBeenCalledWith(
            "reflection",
            `FAKE_LLM_RESPONSE`,
        );
    });
});