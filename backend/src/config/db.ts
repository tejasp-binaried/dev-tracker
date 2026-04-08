import { Pool } from 'pg';

export const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'dev_tracker',
  password: 'root',
  port: 5432,
});
