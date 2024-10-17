import Elysia, { t } from "elysia";
import { AuthorizationError } from "~/exceptions/errors";
import { ERRORS } from "~/models/error-models";
import { CreatePostModel } from "~/models/posts";
import { accessTokenPlugin } from "~/plugins/auth";
import { accessTokenSecurity } from "~/utils/helpers";
import { selectPostSchema } from "~/db/schema/post";
import { postService } from "~/services/posts";

const tags = ["Posts"];

export const postsRoutes = new Elysia({
  prefix: "/posts",
  tags,
  name: "api.posts.index",
})
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
        ),
  );
