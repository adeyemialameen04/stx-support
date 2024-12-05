import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { commentTable, postTable, profileTable, settingsTable } from ".";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { TIMESTAMP, UUID } from "../utils";

export const user = pgTable("user", {
	...UUID,
	...TIMESTAMP,
	stxAddressTestnet: text(),
	stxAddressMainnet: text().notNull(),
	btcAddressTestnet: text(),
	btcAddressMainnet: text(),
	passwordHash: text().notNull(),
});

export const selectUserSchema = createSelectSchema(user);
export const insertUserSchema = createInsertSchema(user);

export const userRelations = relations(user, ({ many, one }) => ({
	posts: many(postTable),
	settings: one(settingsTable, {
		fields: [user.id],
		references: [settingsTable.userId],
	}),
	profile: one(profileTable, {
		fields: [user.id],
		references: [profileTable.userId],
	}),
	comments: many(commentTable),
}));
