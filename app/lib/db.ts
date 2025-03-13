import { sql } from '@vercel/postgres';
import { createPool } from '@vercel/postgres';

// Create a connection pool with the DATABASE_URL
const pool = createPool({
  connectionString: process.env.DATABASE_URL,
});

// Export both the sql client and the pool
export { sql, pool };
export default sql; 