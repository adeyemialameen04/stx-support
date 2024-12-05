import { relations, sql } from "drizzle-orm";
import { pgTable, timestamp, uuid, text } from "drizzle-orm/pg-core";
import { postTable, userTable } from ".";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { t } from "elysia";
import { UUID, TIMESTAMP, USER_ID_REFERENCE } from "../utils";

export const comment = pgTable("comment", {
	...UUID,
	...TIMESTAMP,
	...USER_ID_REFERENCE,
	postId: uuid()
		.notNull()
		.references(() => postTable.id),
	content: text().notNull(),
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
