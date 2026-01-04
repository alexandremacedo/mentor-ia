import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("memories")
export class MemoryEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    type: string;

    @Column({ type: "text" })
    content: string;

    @Column("vector", { length: 1536 })
    embedding: number[];
}