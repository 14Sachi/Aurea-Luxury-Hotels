import { Pool } from "pg";
import "dotenv/config";

// Supabase (and most hosted Postgres providers) require SSL. Local
// PostgreSQL (localhost/127.0.0.1) does not need it, so we only enable it
// when connecting to a remote host.
const isLocal = /localhost|127\.0\.0\.1/.test(process.env.DATABASE_URL || "");

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isLocal ? false : { rejectUnauthorized: false },
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle PostgreSQL client", err);
  process.exit(1);
});
