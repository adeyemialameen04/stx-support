import Elysia, { t } from "elysia";
import { insertPostSchema, selectPostSchema } from "../db/schema/post";
import { postService } from "./service";
import { accessTokenSecurity } from "../utils/helpers";
import { AuthorizationError, NotFoundError } from "../exceptions/errors";
import { ERRORS } from "../models/error-models";
import { accessTokenPlugin } from "../plugins/auth";
import { omitDb } from "../models/omit";
import { CreatePostModel } from "../models/posts";

const tags = ["Posts"];

export const postsRoutes = new Elysia({ prefix: "/posts", tags })
  .use(accessTokenPlugin)
  .model("CreatePostModel", CreatePostModel)
  .model("PostModel", selectPostSchema)
  .guard(
    {
      detail: {
        security: accessTokenSecurity,
      },
      async beforeHandle({ payload }) {
        if (!payload) {
          throw new AuthorizationError("Invalid Token");
        }
      },
    },
    (app) =>
      app
        .get(
          "",
          async ({ payload }) => {
            console.log(payload, "handler");
            if (payload) {
              const userPosts = await postService.getUserPosts(payload.user.id);

              return userPosts;
            }

            throw new AuthorizationError("Bearer token required");
          },
          {
            response: {
              200: t.Array(selectPostSchema),
              401: ERRORS.UNAUTHORIZED,
            },
            detail: {
              summary: "Get user Posts",
              description: "Get currently logged in users posts",
            },
          },
        )
        .post(
          "",
          async ({ body, payload, set }) => {
            const post = await postService.createPost(
              body,
              payload && "user" in payload ? payload.user.id : "",
            );

            set.status = "Created";
            return post;
          },
          {
            response: {
              201: selectPostSchema,
              401: ERRORS.UNAUTHORIZED,
              400: ERRORS.INVARIANT,
            },
            body: "CreatePostModel",
            detail: {
              summary: "Create Post",
              description: "Creates a new post",
            },
          },
        )
        .guard(
          {
            params: t.Object({
              id: t.String({ format: "uuid" }),
            }),
          },
          (app) =>
            app
              .patch(
                "/:id",
                async ({ params: { id }, body, set, payload }) => {
                  const post = await postService.isPostOwner(
                    id,
                    payload && "user" in payload ? payload.user.id : "",
                  );
                  if (post.length === 0) {
                    throw new NotFoundError(
                      "Post not found or you don't have permission to edit it",
                    );
                  }

                  const updatedPost = await postService.updatePost(id, body);
                  return updatedPost;
                },
                {
                  body: t.Partial(
                    t.Omit(insertPostSchema, [
                      "userId",
                      "id",
                      "createdAt",
                      "updatedAt",
                      "userId",
                    ]),
                  ),
                  response: {
                    201: selectPostSchema,
                    401: ERRORS.UNAUTHORIZED,
                    404: ERRORS.NOT_FOUND,
                    400: ERRORS.INVARIANT,
                  },
                  detail: {
                    summary: "Edit Post",
                    description: "Edits a Post",
                  },
                },
              )
              .delete(
                "/:id",
                async ({ params: { id }, payload }) => {
                  const post = await postService.isPostOwner(
                    id,
                    payload && "user" in payload ? payload.user.id : "",
                  );
                  if (post.length === 0) {
                    throw new NotFoundError(
                      "Post not found or you don't have permission to edit it",
                    );
                  }
                  const deletedPost = await postService.deletePost(id);
                  return deletedPost;
                },
                {
                  detail: {
                    summary: "Delete Post",
                    description: "Deleted a Post",
                  },
                  response: {
                    204: selectPostSchema,
                    401: ERRORS.UNAUTHORIZED,
                    404: ERRORS.NOT_FOUND,
                    400: ERRORS.INVARIANT,
                  },
                },
              ),
        ),
  );
