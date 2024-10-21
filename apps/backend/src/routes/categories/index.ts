import Elysia, { t } from "elysia";
import { db } from "../../db";
import { categoryTable } from "../../db/schema";
import {
	selectCategorySchema,
	insertCategorySchema,
} from "../../db/schema/category";

const tags = ["Categories", "Posts"];
export const categoryRoutes = new Elysia({
	name: "api.category.index",
	prefix: "/category",
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
	)
	.get(
		"/all",
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
