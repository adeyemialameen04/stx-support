import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import env from "../env";
import * as schema from "./schema";

export const client = postgres(env.DATABASE_URL, {
	ssl: "require",
	max: env.DB_MIGRATING || env.DB_SEEDING ? 1 : 1,
	onnotice: env.DB_SEEDING ? () => {} : undefined,
});

export const db = drizzle(client, {
	logger: true,
	schema,
});

// export async function deleteTableCompletely(
//   db: PostgresJsDatabase,
//   tableName: string,
// ): Promise<void> {
//   try {
//     // Step 1: Disable triggers
//     await db.execute(
//       sql`ALTER TABLE ${sql.identifier(tableName)} DISABLE TRIGGER ALL`,
//     );
//
//     // Step 2: Truncate the table
//     await db.execute(sql`TRUNCATE TABLE ${sql.identifier(tableName)} CASCADE`);
//
//     // Step 3: Get all indexes for the table
//     const indexesResult = await db.execute(sql`
//       SELECT indexname FROM pg_indexes WHERE tablename = ${tableName}
//     `);
//
//     // Step 4: Drop all indexes
//     for (const row of indexesResult) {
//       await db.execute(
//         sql`DROP INDEX IF EXISTS ${sql.identifier(row.indexname)}`,
//       );
//     }
//
//     // Step 5: Drop the table
//     await db.execute(
//       sql`DROP TABLE IF EXISTS ${sql.identifier(tableName)} CASCADE`,
//     );
//
//     logger.info(
//       `Table ${tableName} and all its data have been completely removed.`,
//     );
//   } catch (error) {
//     logger.error(`Error while deleting table ${tableName}: ${error}`);
//     throw error;
//   }
// }
//
// export const main = async () => {
//   try {
//     logger.info("started...");
//     await deleteTableCompletely(db, "user");
//     logger.info("Table deletion process completed successfully.");
//   } catch (error) {
//     logger.error("An error occurred during the table deletion process:", error);
//   }
// };
// await main();
