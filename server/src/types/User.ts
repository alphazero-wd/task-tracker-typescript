import { Length } from "class-validator";
import { User } from "../entity/User";
import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
class ErrorResponse {
  @Field({ nullable: true })
  field?: string;

  @Field()
  message: string;
}

@InputType()
export class SignupInput {
  @Field()
  @Length(3, 64)
  username!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;

  @Field()
  confirmPassword!: string;
}

@ObjectType()
export class UserResponse {
  @Field({ nullable: true })
  user?: User;

  @Field({ nullable: true })
  token?: string;

  @Field({ nullable: true })
  error?: ErrorResponse;
}
