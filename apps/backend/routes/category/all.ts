import Elysia, { t } from "elysia";
import { db } from "../../src/db";
import { categoryTable } from "../../src/db/schema";
import { selectCategorySchema } from "../../src/db/schema/category";

export default new Elysia().get(
	"",
	async () => {
		const categories = await db.select().from(categoryTable);

		return categories;
	},
	{
		response: {
			200: t.Array(selectCategorySchema),
		},
		detail: {
			summary: "Get all Categories",
			description: "Gets all Categories",
		},
	},
);
