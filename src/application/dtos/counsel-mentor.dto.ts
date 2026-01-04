import { IsNotEmpty, IsString } from "class-validator";

export class CounselMentorDTO {
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    mentorDefinitions: string;

    @IsString()
    @IsNotEmpty()
    content: string;
}