import { pgTable, text, serial, integer, boolean, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  instructor: text("instructor").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  originalPrice: decimal("original_price", { precision: 10, scale: 2 }),
  duration: text("duration").notNull(),
  level: text("level").notNull(), // Beginner, Intermediate, Advanced
  thumbnail: text("thumbnail").notNull(),
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0"),
  reviewCount: integer("review_count").default(0),
  isPremium: boolean("is_premium").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const playlists = pgTable("playlists", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  icon: text("icon").notNull(),
  gradient: text("gradient").notNull(),
  trackCount: integer("track_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const videos = pgTable("videos", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  youtubeId: text("youtube_id").notNull(),
  duration: text("duration").notNull(),
  thumbnail: text("thumbnail").notNull(),
  playlistId: integer("playlist_id").references(() => playlists.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const newsletters = pgTable("newsletters", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  subscribedAt: timestamp("subscribed_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
});

export const insertCourseSchema = createInsertSchema(courses).omit({
  id: true,
  createdAt: true,
});

export const insertPlaylistSchema = createInsertSchema(playlists).omit({
  id: true,
  createdAt: true,
});

export const insertVideoSchema = createInsertSchema(videos).omit({
  id: true,
  createdAt: true,
});

export const insertNewsletterSchema = createInsertSchema(newsletters).pick({
  email: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Course = typeof courses.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type Playlist = typeof playlists.$inferSelect;
export type InsertPlaylist = z.infer<typeof insertPlaylistSchema>;
export type Video = typeof videos.$inferSelect;
export type InsertVideo = z.infer<typeof insertVideoSchema>;
export type Newsletter = typeof newsletters.$inferSelect;
export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;
