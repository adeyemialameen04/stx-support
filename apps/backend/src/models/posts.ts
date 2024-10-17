import { t } from "elysia";
import { selectCategorySchema } from "~/db/schema/category";
import { insertCommentSchema, selectCommentSchema } from "~/db/schema/comment";
import { insertPostSchema, selectPostSchema } from "~/db/schema/post";
import { selectProfileSchema } from "~/db/schema/profile";

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

export const SinglePost = t.Object({
  ...t.Omit(selectPostSchema, ["userId", "categoryId"]).properties,
  author: t.Object({
    id: t.String({ format: "uuid" }),
    profile: t.Omit(selectProfileSchema, [
      "id",
      "userId",
      "createdAt",
      "updatedAt",
    ]),
  }),
  comments: t.Array(
    t.Object({
      ...t.Omit(selectCommentSchema, ["userId", "postId"]).properties,
      author: t.Object({
        id: t.String({ format: "uuid" }),
        profile: t.Omit(selectProfileSchema, [
          "id",
          "userId",
          "createdAt",
          "updatedAt",
        ]),
      }),
    }),
  ),
  category: t.Omit(selectCategorySchema, ["createdAt", "updatedAt"]),
});
