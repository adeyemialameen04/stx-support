import bearer from "@elysiajs/bearer";
import Elysia, { t } from "elysia";
import { insertPostSchema, selectPostSchema } from "../db/schema/post";
import jwt from "@elysiajs/jwt";
import { PayloadModel } from "../models/auth";
import env from "../env";
import { postService } from "./service";
import { accessTokenSecurity } from "../utils/helpers";
import { AuthorizationError } from "../exceptions/errors";
import { ERRORS } from "../models/error-models";

const tags = ["Posts"];

export const authService = new Elysia({ name: "auth/service" })
  .use(bearer())
  .use(
    jwt({
      name: "accessJwt",
      secret: env.SECRET_KEY,
      exp: "15m",
      schema: PayloadModel,
    }),
  )
  .guard({
    as: "scoped",
  })
  .derive({ as: "scoped" }, async ({ bearer, accessJwt }) => {
    if (!bearer) {
      return { payload: null };
    }

    const token = await accessJwt.verify(bearer);

    return {
      payload: token,
    };
  });

export const postsRoutes = new Elysia({ prefix: "/posts", tags })
  .use(authService)
  .guard(
    {
      async beforeHandle({ payload, set }) {
        if (!payload) {
          throw new AuthorizationError("Error: Hello");
        }
      },
    },
    (app) =>
      app
        .get(
          "",
          async ({ error, payload }) => {
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
              security: accessTokenSecurity,
              summary: "Get user Posts",
              description: "Get currently logged in users posts",
            },
          },
        )
        .post("", async ({ body, payload }) => {}, {
          body: insertPostSchema,
        }),
  );
