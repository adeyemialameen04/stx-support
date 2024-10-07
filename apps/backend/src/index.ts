import swagger from "@elysiajs/swagger";
import { Elysia, t } from "elysia";
import { main } from "./db";
import { authRoutes } from "./auth/routes";
import serverTiming from "@elysiajs/server-timing";
import logixlysia from "logixlysia";
import { postsRoutes } from "./posts/routes";

const app = new Elysia();
app
  .use(serverTiming())
  .use(
    logixlysia({
      config: {
        showStartupMessage: true,
        startupMessageFormat: "simple",
        customLogFormat: "{level} {duration} {method} {pathname} {status}",
      },
    }),
  )
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
        tags: [
          // { name: "users", description: "Users endpoints" },
          { name: "Auth", description: "Authentication endpoints" },
        ],
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
        tags: [
          // { name: "users", description: "Users endpoints" },
          { name: "Auth", description: "Authentication endpoints" },
          { name: "Posts", description: "Posts endpoints" },
        ],
      },
    }),
  )
  .use(authRoutes)
  .use(postsRoutes)
  .onError(({ code }) => {
    if (code === "NOT_FOUND") {
      return "Route not found :()";
    }
  })
  .listen(3000);
// await main();
