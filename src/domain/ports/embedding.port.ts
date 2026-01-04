export abstract class EmbeddingPort {
    abstract embed(content: string): Promise<number[]>;
}