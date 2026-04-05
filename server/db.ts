import { drizzle } from "drizzle-orm/node-postgres";
import { sql } from "drizzle-orm";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production"
    ? { rejectUnauthorized: false }
    : false,
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 30000,
  max: 5,
});

export const db = drizzle(pool, { schema });

// Creates required tables using drizzle's own connection (not pool.connect directly)
export async function ensureTablesExist(): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS services (
      id SERIAL PRIMARY KEY,
      title_ar TEXT NOT NULL,
      title_en TEXT NOT NULL,
      url TEXT NOT NULL,
      icon_type TEXT NOT NULL,
      category TEXT NOT NULL,
      is_open_new_tab BOOLEAN DEFAULT TRUE,
      logo_path TEXT
    )
  `);
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS cached_tweets (
      id SERIAL PRIMARY KEY,
      tweet_id TEXT NOT NULL UNIQUE,
      text TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL,
      author_name TEXT NOT NULL,
      author_username TEXT NOT NULL,
      image_url TEXT,
      image_urls TEXT[],
      video_url TEXT,
      cached_at TIMESTAMP DEFAULT NOW() NOT NULL
    )
  `);
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS api_usage (
      id SERIAL PRIMARY KEY,
      month TEXT NOT NULL UNIQUE,
      call_count INTEGER DEFAULT 0 NOT NULL,
      last_call_at TIMESTAMP,
      last_success_at TIMESTAMP
    )
  `);
  console.log('[DB] Tables ensured via drizzle.execute.');
}