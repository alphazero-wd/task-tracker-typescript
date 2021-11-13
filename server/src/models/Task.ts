import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  taskId!: number;

  @Column({ type: "varchar", length: 64 })
  taskName!: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: false })
  isCompleted: boolean;

  @Column({ default: false })
  isImportant: boolean;

  @ManyToOne(() => User, user => user.userId, { cascade: true })
  userId!: number;
}
