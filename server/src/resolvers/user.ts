import { UserResponse, SignupInput, LoginInput } from "../types/User";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { compare, hash } from "bcryptjs";
import { User } from "../entity/User";
import {
  validateEmail,
  validatePasswordStrength,
  validateUsername,
} from "../utils/validation";
import { createAccessToken } from "../utils/token";
import { MyContext } from "../types/MyContext";
import { isAuth } from "../middlewares/isAuth";

@Resolver()
export class UserResolver {
  @UseMiddleware(isAuth)
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext): Promise<User | null> {
    const user = await User.findOne(req.payload?.userId);
    if (!user) return null;

    return user;
  }

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

  @Mutation(() => UserResponse)
  async login(
    @Arg("user") { usernameOrEmail, password }: LoginInput
  ): Promise<UserResponse> {
    const user = await User.findOne({
      where: usernameOrEmail.includes("@")
        ? { email: usernameOrEmail }
        : { username: usernameOrEmail },
    });
    if (!user) {
      return {
        error: {
          field: "usernameOrEmail",
          message: "User does not exist.",
        },
      };
    }

    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
      return {
        error: {
          field: "password",
          message: "Invalid password.",
        },
      };
    }

    return { user, token: createAccessToken(user) };
  }
}
