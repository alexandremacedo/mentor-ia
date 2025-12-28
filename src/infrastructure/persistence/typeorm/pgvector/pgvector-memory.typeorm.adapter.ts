import { Injectable } from "@nestjs/common";
import { EmbeddingPort } from "@/domain/services/ports/embedding.port";
import { MemoryPort } from "@/domain/services/ports/memory.port";
import { DataSource } from "typeorm";

@Injectable()
export class PgVectorMemoryTypeormAdapter implements MemoryPort {
    constructor(private readonly dataSource: DataSource, private readonly embedding: EmbeddingPort) { }

    async findSimilar(input: string): Promise<string[]> {
        const vector = await this.embedding.embed(input);

        const rows = await this.dataSource.query(
            `
                SELECT content
                FROM memories
                ORDER BY embedding <=> $1
                LIMIT 5
            `,
            [`[${vector.join(",")}]`],
        );

        return rows.map((r: any) => r.content);
    }

    async save(type: string, content: string): Promise<void> {
        const vector = await this.embedding.embed(content);

        await this.dataSource.query(
            `
                INSERT INTO memories (type, content, embedding)
                VALUES ($1, $2, $3)
            `,
            [type, content, `[${vector.join(",")}]`],
        );
    }
}