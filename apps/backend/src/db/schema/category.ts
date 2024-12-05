import { relations } from "drizzle-orm";
import { pgTable, varchar } from "drizzle-orm/pg-core";
import { postTable } from ".";
import { createInsertSchema } from "drizzle-typebox";
import { t } from "elysia";
import { UUID, TIMESTAMP } from "../utils";

export const category = pgTable("category", {
	...UUID,
	...TIMESTAMP,
	name: varchar({ length: 100 }).notNull().unique(),
});

export const categoryRelations = relations(category, ({ many }) => ({
	posts: many(postTable),
}));

export const insertCategorySchema = createInsertSchema(category, {
	name: t.String({ minLength: 1 }),
});
export const selectCategorySchema = createInsertSchema(category);
