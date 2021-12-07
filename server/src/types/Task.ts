<<<<<<< HEAD
import { Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';
=======
import { MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";
>>>>>>> a413b3a86137c435d0c6b7906df859890a4e565b

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
