import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { User } from "./user";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => User, (user) => user.id, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" })
    user: User;

    @Column({ type: "enum", enum: ["deposit", "withdrawal"] })
    type: "deposit" | "withdrawal";

    @Column({ type: "decimal", precision: 10, scale: 2 })
    amount: number;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    balance: number;

    @CreateDateColumn()
    date: Date;
}
