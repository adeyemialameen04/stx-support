import {
  boolean,
  json,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { user } from "./user";
import { InferSelectModel, relations } from "drizzle-orm";
import { categoryTable, userTable } from ".";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { t } from "elysia";
// import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const statusEnum = pgEnum("status", ["published", "draft", "archived"]);

export const post = pgTable("post", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id),
  title: varchar("title", { length: 255 }).notNull(),
  status: statusEnum("status").default("published").notNull(),
  isPublic: boolean("is_public").default(true).notNull(),
  content: json("content").notNull(),
  categoryId: uuid("category_id")
    .references(() => categoryTable.id)
    .notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
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

export const insertPostSchema = createInsertSchema(post);
export const selectPostSchema = createSelectSchema(post, {
  content: t.Object({}),
});

// export const insertPostSchema = createInsertSchema(post).omit({
//   createdAt: true,
//   updatedAt: true,
//   id: true,
// });
// export const selectPostSchema = createSelectSchema(post);

// const baseSchema = createInsertSchema(post, {
//   title: (schema) => schema.title.min(1),
//   userId: (schema) => schema.userId.min(1),
//   categoryId: (schema) => schema.categoryId.min(1),
// }).pick({
//   title: true,
//   userId: true,
//   categoryId: true,
//   content: true,
// });

// Schema for creating a post
// export const createPostSchema = z.object({
//   title: baseSchema.shape.title,
//   userId: baseSchema.shape.userId,
//   categoryId: baseSchema.shape.categoryId,
//   content: baseSchema.shape.content,
// });
//
// // Schema for editing a post
// export const editPostSchema = z.object({
//   id: z.number().min(1),
//   title: baseSchema.shape.title,
//   userId: baseSchema.shape.userId,
//   categoryId: baseSchema.shape.categoryId,
//   content: baseSchema.shape.content,
//   tagIds: z.array(z.number()),
// });

// postSchema.openapi(openApiSchema);

// const basePostSchema = z.object({
//   id: z.string().uuid(),
//   userId: z.string().uuid(),
//   title: z.string().max(255),
//   status: z.enum(["published", "draft", "archived"]),
//   isPublic: z.boolean(),
//   content: z.any(), // You might want to be more specific here
//   categoryId: z.string().uuid(),
//   createdAt: z.string().datetime(),
//   updatedAt: z.string().datetime(),
// });
//
// export const insertPostSchema = basePostSchema
//   .omit({ id: true, createdAt: true, updatedAt: true })
//   .openapi({
//     title: "InsertPost",
//     description: "Schema for inserting a new post",
//   });
//
// export const selectPostSchema = basePostSchema.openapi({
//   title: "SelectPost",
//   description: "Schema for selecting a post",
// });
