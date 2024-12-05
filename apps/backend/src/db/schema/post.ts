import {
	boolean,
	pgEnum,
	pgTable,
	text,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { categoryTable, commentTable, userTable } from ".";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { t } from "elysia";
import { TIMESTAMP, USER_ID_REFERENCE, UUID } from "../utils";

export const statusEnum = pgEnum("status", ["published", "draft", "archived"]);

export const post = pgTable("post", {
	...UUID,
	...TIMESTAMP,
	...USER_ID_REFERENCE,
	title: varchar({ length: 255 }).notNull(),
	status: statusEnum().notNull(),
	isPublic: boolean().default(true).notNull(),
	content: text().notNull(),
	categoryId: uuid()
		.references(() => categoryTable.id)
		.notNull(),
});

export const postRelations = relations(post, ({ one, many }) => ({
	author: one(userTable, {
		fields: [post.userId],
		references: [userTable.id],
	}),
	comments: many(commentTable),
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

export const selectPostSchema = createSelectSchema(post);
