import { Pool } from 'pg';

import { logger } from '../logger';

export class DatabaseClient {
  #pool: Pool;

  // Constructor that initializes the Pool instance
  constructor(databaseUrl: string) {
    this.#pool = new Pool({ connectionString: databaseUrl });

    // Optional: Add error event listener for the pool
    this.#pool.on('error', (err: Error) => {
      logger.error(err, 'Unexpected error on idle database client');
    });
  }

  // Method to get the Pool instance
  public get pool(): Pool {
    return this.#pool;
  }

  // Method to check the connection to the database
  public async checkConnection(): Promise<boolean> {
    try {
      // Execute a simple query to check the database connection
      await this.#pool.query('SELECT NOW()');
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Database connection check failed';
      logger.error(message, 'Database error');
      return false;
    }
  }

  public async end(): Promise<void> {
    await this.#pool.end();
  }
}
