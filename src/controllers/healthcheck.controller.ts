import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';

export const healthcheckController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ctx } = req.app.locals;
    const isDbConnected = await ctx.db.checkConnection(); // Check the connection to the database

    if (!isDbConnected) {
      throw new createError.InternalServerError('Database connection failed');
    }

    res.status(200).json({ status: 'UP' });
  } catch (error) {
    next(error);
  }
};
