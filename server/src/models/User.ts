import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Entity,
  BaseEntity,
} from "typeorm";
import { Task } from "./Task";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  userId!: number;

  @Column({ type: "varchar", length: 64, unique: true })
  username!: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email!: string;

  @Column({ type: "varchar", length: 255 })
  password!: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Task, task => task.userId)
  tasks: Task[];

  @Column({default: false})
  isAdmin: boolean;
}
