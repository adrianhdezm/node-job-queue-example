import dotenv from 'dotenv';
import type { Knex } from 'knex';

// Load environment variables from .env file
dotenv.config();
const dbUser = process.env.DB_USER || 'postgres';
const dbPassword = process.env.DB_PASSWORD || 's3cr3t';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || '5432';
const dbName = process.env.DB_NAME || 'app';
const dbUrl = `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;

export const config: Knex.Config = {
  client: 'pg',
  connection: dbUrl,
  migrations: {
    tableName: 'migrations',
    extension: 'ts',
    directory: './db/migrations'
  }
};

module.exports = config;
