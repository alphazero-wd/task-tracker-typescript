import { verify } from "jsonwebtoken";
import { MyContext } from "../types/MyContext";
import { MiddlewareFn } from "type-graphql";

export const isAuth: MiddlewareFn<MyContext> = async (
  { context: { req } },
  next
) => {
  const authHeaders = req.headers.authorization;
  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    throw new Error("You are not authorized.");
  }
  const token = authHeaders.split(" ")[1];
  if (token) {
    const payload = verify(token, process.env.JWT_ACCESS_TOKEN_KEY!);
    req.payload = payload as any;
  }
  return next();
};
