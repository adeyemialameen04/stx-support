import {
  boolean,
  json,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { user } from "./user";
import { relations, sql } from "drizzle-orm";
import { categoryTable, userTable } from ".";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { t } from "elysia";

export const statusEnum = pgEnum("status", ["published", "draft", "archived"]);

export const post = pgTable("post", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id),
  title: varchar("title", { length: 255 }).notNull(),
  status: statusEnum("status").notNull(),
  isPublic: boolean("is_public").default(true).notNull(),
  content: text("content").notNull(),
  categoryId: uuid("category_id")
    .references(() => categoryTable.id)
    .notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" })
    .notNull()
    .defaultNow()
    .$onUpdate(() => sql`now()`),
});

export const postRelations = relations(post, ({ one, many }) => ({
  user: one(userTable, {
    fields: [post.userId],
    references: [userTable.id],
  }),
  // comments: many(commentTable),
  category: one(categoryTable, {
    fields: [post.categoryId],
    references: [categoryTable.id],
  }),
}));

export const insertPostSchema = createInsertSchema(post, {
  status: t.Enum({
    published: "published",
    draft: "draft",
    archived: "archived",
  }),
});

export const selectPostSchema = createSelectSchema(post, {
  content: t.Unknown(),
});
