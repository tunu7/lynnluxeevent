import "server-only";
import { Pool } from "pg";
import { attachDatabasePool } from "@vercel/functions";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

/**
 * Lazily created so `next build` doesn't need DATABASE_URL just to import
 * this module. The pool is attached to Fluid Compute so idle connections
 * are released before an instance is suspended.
 */
function createDb() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  attachDatabasePool(pool);
  return drizzle(pool, { schema });
}

let db: ReturnType<typeof createDb> | null = null;

export function getDb() {
  db ??= createDb();
  return db;
}
