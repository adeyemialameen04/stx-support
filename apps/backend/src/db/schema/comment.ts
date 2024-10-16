import { relations, sql } from "drizzle-orm";
import { pgTable, timestamp, uuid, text } from "drizzle-orm/pg-core";
import { postTable, userTable } from ".";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { t } from "elysia";

export const comment = pgTable("comment", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => userTable.id),
  postId: uuid("post_id")
    .notNull()
    .references(() => postTable.id),
  content: text("content").notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" })
    .notNull()
    .defaultNow()
    .$onUpdate(() => sql`now()`),
});

export const insertCommentSchema = createInsertSchema(comment);
export const selectCommentSchema = createSelectSchema(comment, {
  id: t.String({ format: "uuid" }),
});

export const commentRelations = relations(comment, ({ one }) => ({
  post: one(postTable, {
    fields: [comment.postId],
    references: [postTable.id],
  }),
  author: one(userTable, {
    fields: [comment.userId],
    references: [userTable.id],
  }),
}));
