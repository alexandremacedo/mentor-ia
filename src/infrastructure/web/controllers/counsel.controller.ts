import { Body, Controller, Post } from "@nestjs/common";
import { CounselMentorDTO } from "@/application/dtos/counsel-mentor.dto";
import { CounselMentorUseCase } from "@/application/use-cases/counsel-mentor.use-case";

@Controller('counsel')
export class CounselController {
    constructor(private readonly counselUseCase: CounselMentorUseCase) {}

    @Post()
    async counsel(@Body() body: CounselMentorDTO) {
        return this.counselUseCase.execute(body);
    }
}