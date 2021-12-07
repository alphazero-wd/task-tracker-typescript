import { Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class AddTaskInput {
  @Field()
  @Length(1, 64)
  taskName!: string;

  @Field({ nullable: true })
  isImportant?: boolean;

  @Field({ nullable: true })
  isCompleted?: boolean;
}

@InputType()
export class UpdateTaskInput {
  @Field()
  taskId!: number;

  @Field({ nullable: true })
  @Length(1, 64)
  taskName?: string;

  @Field({ nullable: true })
  isImportant?: boolean;

  @Field({ nullable: true })
  isCompleted?: boolean;
}
