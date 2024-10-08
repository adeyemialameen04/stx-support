import { t } from "elysia";
import { insertPostSchema } from "../db/schema/post";

export const CreatePostModel = t.Omit(insertPostSchema, [
  "id",
  "userId",
  "createdAt",
  "updatedAt",
]);
