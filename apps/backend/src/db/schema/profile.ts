import { relations } from "drizzle-orm";
import { varchar, text, uniqueIndex } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { user } from "./user";
import { userTable } from ".";
import { createSelectSchema } from "drizzle-typebox";
import { TIMESTAMP, USER_ID_REFERENCE, UUID } from "../utils";

export const profile = pgTable(
	"profile",
	{
		...UUID,
		...USER_ID_REFERENCE,
		...TIMESTAMP,
		username: varchar({ length: 255 }).unique(),
		name: varchar({ length: 100 }),
		profileImg: text(),
		coverImg: text(),
		about: text(),
	},
	(table) => {
		return {
			usernameIdx: uniqueIndex("username_idx").on(table.username),
		};
	},
);

export const settings = pgTable(
	"settings",
	{
		...UUID,
		...USER_ID_REFERENCE,
		...TIMESTAMP,
	},
	(table) => {
		return {
			userIdIdx: uniqueIndex("user_id_idx").on(table.userId),
		};
	},
);

export const profileRelations = relations(profile, ({ one }) => ({
	user: one(user, { fields: [profile.userId], references: [userTable.id] }),
}));

export const settingsRelations = relations(settings, ({ one }) => ({
	user: one(user, { fields: [settings.userId], references: [user.id] }),
}));

export const selectProfileSchema = createSelectSchema(profile);
export const insertProfileSchema = createSelectSchema(profile);
