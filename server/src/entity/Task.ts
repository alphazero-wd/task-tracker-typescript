import { Field, ID, ObjectType } from "type-graphql";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Task extends BaseEntity {
  @Field(() => ID!)
  @PrimaryGeneratedColumn()
  taskId!: number;

  @Field()
  @Column({ type: "varchar", length: 64 })
  taskName!: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @Column({ default: false })
  isCompleted: boolean;

  @Field()
  @Column({ default: false })
  isImportant: boolean;

  @ManyToOne(() => User, user => user.userId, { onDelete: "CASCADE" })
  @JoinColumn()
  userId: number;
}
