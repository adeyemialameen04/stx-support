import { relations, sql } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { commentTable, postTable, profileTable, settingsTable } from ".";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";

export const user = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  stxAddressTestnet: text("stx_address_testnet"),
  stxAddressMainnet: text("stx_address_mainnet").notNull(),
  btcAddressTestnet: text("btc_address_testnet"),
  btcAddressMainnet: text("btc_address_mainnet"),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" })
    .notNull()
    .defaultNow()
    .$onUpdate(() => sql`now()`),
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
