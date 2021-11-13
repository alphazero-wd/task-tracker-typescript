import { NextFunction, Request, Response } from 'express';
import { ErrorResponse } from '../utils/ErrorResponse';

export const errorHandler = (
  err: ErrorResponse,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.statusCode || 500).json({
    success: false,
    error: {
      message: err.message,
      field: err.field || null,
    },
  });
  next();
};
