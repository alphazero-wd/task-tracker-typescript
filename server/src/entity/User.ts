import { Field, ID, ObjectType } from "type-graphql";
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

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID!)
  @PrimaryGeneratedColumn()
  userId!: number;

  @Field()
  @Column({ type: "varchar", length: 64, unique: true })
  username!: string;

  @Field()
  @Column({ type: "varchar", length: 255, unique: true })
  email!: string;

  @Column({ type: "varchar", length: 255 })
  password!: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Task, task => task.userId)
  tasks: Task[];
}
