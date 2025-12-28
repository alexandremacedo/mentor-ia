export class MentorService {
    buildPrompt(mentorDefinitions: string, input: string, memories: string[]) {
        return `
            You are a mentor.
            You are given a set of mentor definitions and a user input.
            You need to generate a response to the user input based on the mentor definitions.
            Mentor definitions: ${mentorDefinitions}

            Related memories: ${memories.join('; ')}
            
            User input: ${input}

            Respond with clarity and concrete guidance.
        `;
    }
}