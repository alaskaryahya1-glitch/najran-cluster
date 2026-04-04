import { drizzle } from "drizzle-orm/node-postgres";
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
});

export const db = drizzle(pool, { schema });

// Ensures all required tables exist using raw SQL (bypasses drizzle-kit SSL issues)
export async function ensureTablesExist(): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS services (
        id SERIAL PRIMARY KEY,
        title_ar TEXT NOT NULL,
        title_en TEXT NOT NULL,
        url TEXT NOT NULL,
        icon_type TEXT NOT NULL,
        category TEXT NOT NULL,
        is_open_new_tab BOOLEAN DEFAULT TRUE,
        logo_path TEXT
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS tweets (
        id SERIAL PRIMARY KEY,
        tweet_id TEXT NOT NULL UNIQUE,
        text TEXT NOT NULL,
        created_at TEXT NOT NULL,
        author_id TEXT,
        author_name TEXT,
        author_username TEXT,
        author_profile_image TEXT,
        like_count INTEGER DEFAULT 0,
        retweet_count INTEGER DEFAULT 0,
        reply_count INTEGER DEFAULT 0,
        media_urls TEXT[] DEFAULT '{}',
        media_types TEXT[] DEFAULT '{}',
        fetched_at TEXT NOT NULL
      );
    `);

    console.log('[DB] Tables ensured (services, tweets).');
  } catch (err) {
    console.error('[DB] ensureTablesExist error:', err);
    throw err;
  } finally {
    client.release();
  }
}
