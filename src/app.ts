import compression from 'compression';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import { LevelWithSilent } from 'pino';
import pinoHttp from 'pino-http';

import { MAX_REQUEST_BODY_SIZE } from './constants';
import { healthcheckController } from './controllers/healthcheck.controller';
import { homeController } from './controllers/home.controller';
import { logger } from './logger';
import { handleNotFoundError } from './middlewares/handle-not-found-error.middleware';
import { handleServerError } from './middlewares/handle-server-error.middleware';
import { DatabaseClient } from './services/database-client.service';

export const createApp = (db: DatabaseClient): Application => {
  const app: Application = express();

  // set app locals
  app.locals.ctx = { db };

  // Disable the X-Powered-By header
  app.disable('x-powered-by');

  // Middlewares
  app.use(helmet());
  app.use(cors());
  app.use(express.urlencoded({ limit: MAX_REQUEST_BODY_SIZE, extended: false }));
  app.use(express.json({ limit: MAX_REQUEST_BODY_SIZE }));
  app.use(compression());
  app.use(
    pinoHttp({
      logger,
      autoLogging: {
        ignore: (req: Request) => ['/favicon.ico', '/robots.txt', '/healthz'].includes(req.url)
      },
      customLogLevel: (_req: Request, res: Response, err?: Error): LevelWithSilent => {
        if (res.statusCode >= 400 && res.statusCode < 500) {
          return 'warn';
        }
        if (res.statusCode >= 500 || err) {
          return 'error';
        }
        return 'info';
      }
    })
  );

  // Routes
  app.get('/', homeController);
  app.get('/healthz', healthcheckController);

  // Error handling middleware
  app.use(handleNotFoundError);
  app.use(handleServerError);

  return app;
};
