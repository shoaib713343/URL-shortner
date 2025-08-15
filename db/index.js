// CORRECTED CODE
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg'; // 1. Import Pool from the pg library

// 2. Create a connection pool using your DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// 3. Pass the pool instance to Drizzle
const db = drizzle(pool);

export default db;