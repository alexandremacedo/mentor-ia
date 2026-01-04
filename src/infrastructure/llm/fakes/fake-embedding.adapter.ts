import { Injectable } from "@nestjs/common";
import { EmbeddingPort } from "@/domain/ports/embedding.port";

@Injectable()
export class FakeEmbeddingAdapter implements EmbeddingPort {
    async embed(text: string): Promise<number[]> {
        return Array(1536).fill(text.length);
    }
}
