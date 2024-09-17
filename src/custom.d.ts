import { DatabaseClient } from './services/database-client.service';

declare global {
  namespace Express {
    interface Locals {
      ctx: {
        db: DatabaseClient;
      };
    }
  }
}
