import Elysia, { NotFoundError, t } from "elysia";
import { eq } from "drizzle-orm";
import { db } from "../../src/db";
import { categoryTable } from "../../src/db/schema";
import { selectCategorySchema } from "../../src/db/schema/category";
import { ERRORS } from "../../src/models/error-models";

const tags = ["Categories"];
const categoryRoutesDynamic = new Elysia({
	name: "api.category.dynamic",
	prefix: "/category",
	tags,
}).delete(
	"/:id",
	async ({ params: { id }, set }) => {
		const [category] = await db
			.delete(categoryTable)
			.where(eq(categoryTable.id, id))
			.returning();

		if (category) {
			return {
				message: "Category Deleted Successfully",
				data: category,
			};
		}
		set.status = "Not Found";
		throw new NotFoundError("Category does not exist");
	},
	{
		response: {
			200: t.Object({
				message: t.String(),
				data: selectCategorySchema,
			}),
			404: ERRORS.NOT_FOUND,
		},
		params: t.Object({
			id: t.String({ format: "uuid" }),
		}),
		detail: {
			summary: "Delete category",
			description: "Deletes a category",
		},
	},
);
export default categoryRoutesDynamic;
