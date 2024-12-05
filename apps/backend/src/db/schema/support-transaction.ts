import { boolean, integer, pgTable, text } from "drizzle-orm/pg-core";
import { TIMESTAMP, USER_ID_REFERENCE } from "../utils";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";

export const supportTransaction = pgTable("support-transaction", {
	// ...UUID,
	...TIMESTAMP,
	name: text(),
	message: text().notNull(),
	amount: integer().notNull(),
	stxAddress: text().notNull(),
	isPrivate: boolean().notNull(),
	txId: text().notNull(),
	donatedTo: USER_ID_REFERENCE.userId,
});

export const insertSupportTransaction = createInsertSchema(supportTransaction);
export const selectSupportTransaction = createSelectSchema(supportTransaction);
