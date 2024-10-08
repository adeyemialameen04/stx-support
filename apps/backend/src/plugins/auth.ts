import bearer from "@elysiajs/bearer";
import jwt from "@elysiajs/jwt";
import Elysia from "elysia";
import env from "../env";
import { AuthorizationError } from "../exceptions/errors";
import { PayloadModel } from "../models/auth";

export const jwtPlugin = new Elysia({ name: "jwt/plugin" })
  .use(bearer())
  .use(
    jwt({
      name: "accessJwt",
      secret: env.SECRET_KEY,
      exp: "15m",
      schema: PayloadModel,
    }),
  )
  .use(
    jwt({
      name: "refreshJwt",
      secret: env.SECRET_KEY,
      exp: "15m",
      schema: PayloadModel,
    }),
  )
  .guard({
    as: "scoped",
  });

export const accessTokenPlugin = new Elysia({ name: "access/plugin" })
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
    if (token && token.refresh) {
      throw new AuthorizationError(
        "Invalid token type. Access token required.",
      );
    }

    return {
      payload: token,
    };
  });

export const refreshTokenPlugin = new Elysia({ name: "refresh/plugin" })
  .use(bearer())
  .use(
    jwt({
      name: "refreshJwt",
      secret: env.SECRET_KEY,
      exp: "15m",
      schema: PayloadModel,
    }),
  )
  .guard({
    as: "scoped",
  })
  .derive({ as: "scoped" }, async ({ bearer, refreshJwt }) => {
    if (!bearer) {
      return { payload: null };
    }

    const token = await refreshJwt.verify(bearer);
    if (token && !token.refresh) {
      throw new AuthorizationError(
        "Invalid token type. Refresh token required.",
      );
    }

    return {
      payload: token,
    };
  });
