import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';

export const handleNotFoundError = (_req: Request, _res: Response, next: NextFunction) => {
  next(new createError.NotFound());
};
