import { Request, Response } from "express";

export type MyContext = {
  req: Request & {
    payload?: {
      userId: number;
    };
  };
  res: Response;
};
