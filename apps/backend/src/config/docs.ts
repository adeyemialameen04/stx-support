import swagger from "@elysiajs/swagger";
import Elysia from "elysia";

export const docs = new Elysia();
docs
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
        ],
      },
    }),
  );
