import bearer from "@elysiajs/bearer";
import Elysia, { t } from "elysia";
import { selectPostSchema } from "../db/schema/post";
import jwt from "@elysiajs/jwt";
import { PayloadModel } from "../models/auth";
import env from "../env";
import { ERRORS } from "../models/error-models";
import { postService } from "./service";
import { accessTokenSecurity } from "../utils/helpers";

const tags = ["Posts"];
export const postsRoutes = new Elysia({ prefix: "/posts", tags })
  .use(bearer())
  .use(
    jwt({
      name: "accessJwt",
      secret: env.SECRET_KEY,
      exp: "15m",
      schema: PayloadModel,
    }),
  )
  .get(
    "",
    async ({ bearer, accessJwt, error }) => {
      const payload = await accessJwt.verify(bearer);
      if (payload) {
        const userPosts = await postService.getUserPosts(payload.user.id);

        return userPosts;
      }

      return error("Unauthorized", {
        status: 401,
        detail: "Bearer Token Required",
        error: "Unauthorized",
      });
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
      async beforeHandle({ bearer, error, accessJwt }) {
        if (!bearer) {
          return error("Unauthorized", {
            status: 401,
            detail: "Bearer Token Required",
            error: "Unauthorized",
          });
        }

        const payload = await accessJwt.verify(bearer);
        if (!payload) {
          return error(401, {
            status: 401,
            detail: "Invalid token",
            error: "Unauthorized",
          });
        }

        if (payload.refresh) {
          return error(401, {
            status: 401,
            detail: "Invalid token type. Access token required.",
            error: "Unauthorized",
          });
        }
      },
    },
  );
