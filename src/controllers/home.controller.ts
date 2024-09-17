import { NextFunction, Request, Response } from 'express';

export const homeController = (_req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({
      message: 'Hello, World!'
    });
  } catch (error) {
    next(error);
  }
};
