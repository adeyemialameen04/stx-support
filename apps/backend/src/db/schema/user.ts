import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { postTable } from ".";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";

export const user = pgTable(
  "user",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    username: varchar("username", { length: 255 }).unique(),
    name: varchar("name", { length: 100 }),
    profileImg: text("profile_img"),
    coverImg: text("cover_img"),
    about: text("about"),
    stxAddressTestnet: text("stx_address_testnet"),
    stxAddressMainnet: text("stx_address_mainnet").notNull(),
    btcAddressTestnet: text("btc_address_testnet"),
    btcAddressMainnet: text("btc_address_mainnet"),
    passwordHash: text("password_hash").notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .notNull()
      .defaultNow(),
  },
  (table) => {
    return {
      usernameIdx: uniqueIndex("username_idx").on(table.username),
    };
  },
);

export const selectUserSchema = createSelectSchema(user);
export const insertUserSchema = createInsertSchema(user);

export const userRelations = relations(user, ({ many }) => ({
  posts: many(postTable),
  // comments: many(commentTable),
}));
