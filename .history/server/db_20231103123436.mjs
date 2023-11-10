import { Pool } from 'pg';
import 'dotenv/config';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

export const query = (text, params) => pool.query(text, params);
