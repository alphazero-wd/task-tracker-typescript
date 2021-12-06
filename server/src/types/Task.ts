import { MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class AddTaskInput {
  @Field()
  @MinLength(1)
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
  @MinLength(1)
  taskName?: string;

  @Field({ nullable: true })
  isImportant?: boolean;

  @Field({ nullable: true })
  isCompleted?: boolean;
}
