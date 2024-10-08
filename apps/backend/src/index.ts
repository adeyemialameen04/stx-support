import swagger from "@elysiajs/swagger";
import { Elysia, error, t } from "elysia";
import { authRoutes } from "./auth/routes";
import serverTiming from "@elysiajs/server-timing";
import logixlysia from "logixlysia";
import { postsRoutes } from "./posts/routes";
import { settings } from "./config/settings";
import {
  AuthenticationError,
  AuthorizationError,
  InvariantError,
  NotFoundError,
} from "./exceptions/errors";
import logger from "./utils/logger";
import { ERRORS } from "./models/error-models";

const tags = [
  { name: "Auth", description: "Authentication endpoints" },
  { name: "Posts", description: "Posts endpoints" },
];

const app = new Elysia();
app
  .use(
    logixlysia({
      config: {
        showStartupMessage: true,
        startupMessageFormat: "simple",
        customLogFormat: "{level} {duration} {method} {pathname} {status}",
      },
    }),
  )
  .use(serverTiming())
  .use(
    swagger({
      exclude: ["/doc", "/doc/json"],
      path: "/docs",
      provider: "scalar",
      documentation: {
        components: {
          securitySchemes: {
            AccessTokenBearer: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
            RefreshTokenBearer: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
        },
        info: {
          title: "Stx-Support Documentation",
          version: "1.0.0",
          license: {
            name: "MIT",
            url: "https://opensource.org/license/mit/",
          },
          contact: {
            name: "Al-Ameen Adeyemi",
            url: "https://github.com/adeyemialameen04",
          },
        },
        tags,
      },
    }),
  )
  .use(
    swagger({
      path: "/doc",
      provider: "swagger-ui",
      exclude: ["/docs", "/docs/json"],
      documentation: {
        components: {
          securitySchemes: {
            AccessTokenBearer: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
            RefreshTokenBearer: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
        },
        info: {
          title: "Stx-Support Documentation",
          version: "1.0.0",
          license: {
            name: "MIT",
            url: "https://opensource.org/license/mit/",
          },
          contact: {
            name: "Al-Ameen Adeyemi",
            url: "https://github.com/adeyemialameen04",
          },
        },
        tags,
      },
    }),
  )
  .model(
    "ErrorModels",
    t.Object({
      UNAUTHORIZED: ERRORS.UNAUTHORIZED,
      NOT_FOUND: ERRORS.NOT_FOUND,
      CONFLICT: ERRORS.CONFLICT,
    }),
  )
  .error("AUTHENTICATION_ERROR", AuthenticationError)
  .error("AUTHORIZATION_ERROR", AuthorizationError)
  .error("INVARIANT_ERROR", InvariantError)
  .error("NOT_FOUND", NotFoundError)
  .onError(({ code, error, set }) => {
    switch (code) {
      case "AUTHORIZATION_ERROR":
        set.status = 401;
        return {
          status: 401,
          error: error.name,
          detail: error.message,
        };
      case "INVARIANT_ERROR":
        set.status = 400;
        return {
          status: 401,
          error: error.name,
          detail: error.message,
        };
      case "NOT_FOUND":
        set.status = 404;
        return {
          status: 401,
          error: error.name,
          detail: error.message,
        };

      case "INTERNAL_SERVER_ERROR":
        set.status = 500;
        return {
          status: "error",
          detail: "Something went wrong!",
          error: error.name,
        };
    }
  })
  .use(authRoutes)
  .use(postsRoutes)

  .listen(3000);
