import Elysia, { t } from "elysia";
import { db } from "../../src/db";
import { categoryTable } from "../../src/db/schema";
import {
	selectCategorySchema,
	insertCategorySchema,
} from "../../src/db/schema/category";

const tags = ["Categories", "Posts"];
export default new Elysia({
	// name: "api.category.index",
	tags,
})
	.model("CategoryModel", selectCategorySchema)
	.post(
		"",
		async ({ body: { name } }) => {
			const [category] = await db
				.insert(categoryTable)
				.values({ name })
				.returning();

			return category;
		},
		{
			body: t.Omit(insertCategorySchema, ["id", "createdAt", "updatedAt"]),
			response: {
				200: selectCategorySchema,
			},
			detail: {
				summary: "Create category",
				description: "Creates a category",
			},
		},
	);
