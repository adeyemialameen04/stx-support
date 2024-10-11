import { t } from "elysia";
import { insertPostSchema } from "../db/schema/post";
import { insertCommentSchema } from "@/db/schema/comment";

export const CreatePostModel = t.Omit(insertPostSchema, [
  "id",
  "userId",
  "createdAt",
  "updatedAt",
]);

export const CreateCommentModel = t.Omit(insertCommentSchema, [
  "id",
  "userId",
  "createdAt",
  "updatedAt",
]);
