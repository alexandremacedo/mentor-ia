export abstract class MemoryPort {
    abstract save(type: string, content: string): Promise<void>;
    abstract findSimilar(input: string): Promise<string[]>;
}
