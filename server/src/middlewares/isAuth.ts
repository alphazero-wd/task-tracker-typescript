import { verify } from "jsonwebtoken";
import { ControllerFn } from "src/utils/types";
import { ErrorResponse } from "../utils/ErrorResponse";

export const isAuth: ControllerFn = (req, _res, next) => {
  try {
    const authHeaders = req.headers.authorization;

    if (!authHeaders)
      return next(new ErrorResponse("You are not authorized.", 401));

    const token = authHeaders.split(" ")[1];

    const payload = verify(token, process.env.JWT_ACCESS_TOKEN_KEY!);
    req.payload = payload as any;
    next();
  } catch (error) {
    return next(new ErrorResponse(error.message));
  }
};
