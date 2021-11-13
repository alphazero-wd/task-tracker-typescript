import { Request, Response, NextFunction } from "express";

export type ControllerFn = (
  req: Request & { payload?: { userId: number } },
  res: Response,
  next: NextFunction
) => Promise<Response | void> | void;
