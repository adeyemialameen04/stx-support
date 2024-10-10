import Elysia, { t } from "elysia";
import {
  insertCategorySchema,
  selectCategorySchema,
} from "../../db/schema/category";
import { db } from "../../db";
import { categoryTable } from "../../db/schema";
import { eq } from "drizzle-orm";
import postgres from "postgres";
import { ERRORS } from "../../models/error-models";
import {
  InternalServerError,
  InvariantError,
  NotFoundError,
} from "../../exceptions/errors";

const omit = (more?: string[]) => {
  if (more) {
    return [...more, "id", "createdAt", "updatedAt"];
  }
  return ["id", "createdAt", "updatedAt"];
};
const lol = ["id", "createdAt", "updatedAt"];

const tags = ["Categories"];
export const categoryRoutes = new Elysia({
  name: "api.category",
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
  )
  .delete(
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
      } else {
        set.status = "Not Found";
        throw new NotFoundError("Category does not exist");
      }
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
