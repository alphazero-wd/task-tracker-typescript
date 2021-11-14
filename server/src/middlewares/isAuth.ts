import { verify } from "jsonwebtoken";
import { ControllerFn } from "src/utils/types";
import { ErrorResponse } from "../utils/ErrorResponse";

export const isAuth: ControllerFn = (req, _res, next) => {
  try {
    const authHeaders = req.headers.authorization;

    if (!authHeaders)
      return next(new ErrorResponse("You are not authorized.", 401));

    const token = authHeaders.split(" ")[1];
    if (token) {
      const payload = verify(token, process.env.JWT_ACCESS_TOKEN_KEY!);
      req.payload = payload as any;
    } else return next(new ErrorResponse("You are not authorized", 403));
    next();
  } catch (error) {
    return next(new ErrorResponse(error.message));
  }
};
