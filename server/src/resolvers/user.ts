import { UserResponse, SignupInput } from "../types/User";
import { Arg, Mutation, Resolver } from "type-graphql";
import { hash } from "bcryptjs";
import { User } from "../entity/User";
import {
  validateEmail,
  validatePasswordStrength,
  validateUsername,
} from "../utils/validation";
import { createAccessToken } from "../utils/token";

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async signup(
    @Arg("user") { password, email, username, confirmPassword }: SignupInput
  ): Promise<UserResponse> {
    const invalidUsername = validateUsername(username);
    if (invalidUsername) {
      return {
        error: {
          field: "username",
          message: invalidUsername,
        },
      };
    }
    if (!validateEmail(email)) {
      return {
        error: {
          field: "email",
          message: "Invalid email.",
        },
      };
    }

    if (!validatePasswordStrength(password)) {
      return {
        error: {
          field: "password",
          message: "Too weak password.",
        },
      };
    }

    if (password !== confirmPassword) {
      return {
        error: {
          field: "confirmPassword",
          message: "Passwords don't match.",
        },
      };
    }

    let user;

    user = await User.findOne({ where: { username } });
    if (user) {
      return {
        error: {
          field: "username",
          message: "Username already exists.",
        },
      };
    }

    user = await User.findOne({ where: { email } });

    if (user) {
      return {
        error: {
          field: "email",
          message: "Email already exists.",
        },
      };
    }
    const hashedPassword = await hash(password, 12);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    }).save();
    return { user: newUser, token: createAccessToken(newUser) };
  }
}
