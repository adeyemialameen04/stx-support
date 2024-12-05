import { defineConfig } from "drizzle-kit";
import env from "./src/env";

export default defineConfig({
	schema: "./src/db/schema/*",
	out: "./src/db/migrations",
	dialect: "postgresql",
	dbCredentials: {
		url: "postgresql://postgres:password@localhost:5431/postgres",
		ssl: false,
	},
	casing: "snake_case",
});
