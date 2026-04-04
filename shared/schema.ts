import { pgTable, text, serial, boolean, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const cachedTweets = pgTable("cached_tweets", {
  id: serial("id").primaryKey(),
  tweetId: text("tweet_id").notNull().unique(),
  text: text("text").notNull(),
  createdAt: timestamp("created_at").notNull(),
  authorName: text("author_name").notNull(),
  authorUsername: text("author_username").notNull(),
  imageUrl: text("image_url"),
  imageUrls: text("image_urls").array(),
  videoUrl: text("video_url"),
  cachedAt: timestamp("cached_at").defaultNow().notNull(),
});

export const apiUsage = pgTable("api_usage", {
  id: serial("id").primaryKey(),
  month: text("month").notNull().unique(),
  callCount: integer("call_count").default(0).notNull(),
  lastCallAt: timestamp("last_call_at"),
  lastSuccessAt: timestamp("last_success_at"),
});

export const insertCachedTweetSchema = createInsertSchema(cachedTweets).omit({ id: true, cachedAt: true });
export const insertApiUsageSchema = createInsertSchema(apiUsage).omit({ id: true });

export type CachedTweet = typeof cachedTweets.$inferSelect;
export type InsertCachedTweet = z.infer<typeof insertCachedTweetSchema>;
export type ApiUsage = typeof apiUsage.$inferSelect;
export type InsertApiUsage = z.infer<typeof insertApiUsageSchema>;

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  titleAr: text("title_ar").notNull(),
  titleEn: text("title_en").notNull(),
  url: text("url").notNull(),
  iconType: text("icon_type").notNull(), // logical name for icon mapping in frontend
  category: text("category").notNull(), // "info" or "system"
  isOpenNewTab: boolean("is_open_new_tab").default(true),
  logoPath: text("logo_path"), // optional path to platform logo image
});

export const insertServiceSchema = createInsertSchema(services).omit({ id: true });

export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;
