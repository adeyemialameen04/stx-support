import { relations, sql } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { commentTable, postTable } from ".";
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

export const profile = pgTable(
  "profile",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    username: varchar("username", { length: 255 }).unique(),
    name: varchar("name", { length: 100 }),
    profileImg: text("profile_img"),
    coverImg: text("cover_img"),
    about: text("about"),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id),
    createdAt: timestamp("created_at", { mode: "string" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .notNull()
      .defaultNow()
      .$onUpdate(() => sql`now()`),
  },
  (table) => {
    return {
      usernameIdx: uniqueIndex("username_idx").on(table.username),
    };
  },
);

export const userSettings = pgTable(
  "user_setting",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id),
    createdAt: timestamp("created_at", { mode: "string" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .notNull()
      .defaultNow()
      .$onUpdate(() => sql`now()`),
  },
  (table) => {
    return {
      userIdIdx: uniqueIndex("user_id_idx").on(table.userId),
    };
  },
);

export const profileRelations = relations(profile, ({ one }) => ({
  user: one(user, { fields: [profile.userId], references: [user.id] }),
}));

export const userSettingsRelations = relations(userSettings, ({ one }) => ({
  user: one(user, { fields: [userSettings.userId], references: [user.id] }),
}));

export const selectUserSchema = createSelectSchema(user);
export const insertUserSchema = createInsertSchema(user);

export const userRelations = relations(user, ({ many, one }) => ({
  posts: many(postTable),
  settings: one(userSettings, {
    fields: [user.id],
    references: [userSettings.userId],
  }),
  profile: one(profile, {
    fields: [user.id],
    references: [profile.userId],
  }),
  comments: many(commentTable),
}));
