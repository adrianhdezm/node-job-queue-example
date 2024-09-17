import dotenv from 'dotenv';
import http from 'http';

import { createApp } from './app';
import { logger } from './logger';
import { DatabaseClient } from './services/database-client.service';

// Load environment variables from .env file
dotenv.config();

// Database connection string
const dbUser = process.env.DB_USER || 'postgres';
const dbPassword = process.env.DB_PASSWORD || 's3cr3t';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || '5432';
const dbName = process.env.DB_NAME || 'app';
const dbUrl = `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;

(async () => {
  // Create a new instance of the DatabaseClient
  const db = new DatabaseClient(dbUrl);

  // Create the HTTP server using the Express app
  const app = createApp(db);
  const server = http.createServer(app);

  // Start the server
  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    logger.info(`Server is running on http://localhost:${port}`);
  });

  const onCloseSignal = () => {
    logger.info('SIGINT received, shutting down');
    server.close(async () => {
      await db.end();
      logger.info('Database disconnected');
      logger.info('Server closed, exiting process');
      process.exit();
    });

    setTimeout(() => process.exit(1), 2000).unref(); // Force shutdown after 2s
  };

  process.on('SIGINT', onCloseSignal);
  process.on('SIGTERM', onCloseSignal);
})();

process.on('unhandledRejection', (reason) => {
  if (reason) {
    logger.error(reason, 'Unhandled Rejection');
  }
});
process.on('uncaughtException', (err) => {
  logger.error(err, 'Uncaught Exception');
  process.exit(1);
});
