import swagger from "@elysiajs/swagger";
import Elysia from "elysia";

const tags: { name: string; description: string }[] = [
  { name: "Auth", description: "Authentication endpoints" },
  { name: "Posts", description: "Posts endpoints" },
  { name: "Users", description: "Users endpoints" },
  { name: "Categories", description: "Categories endpoints" },
];

export const docs = (app: Elysia) =>
  app
    .use(
      swagger({
        exclude: ["/doc", "/doc/json"],
        path: "/docs",
        scalarConfig: {
          darkMode: true,
          theme: "saturn",
          // layout: "classic",
          forceDarkModeState: "dark",
          metaData: {
            ogTitle: "Stx-Support Documentation",
            ogImage: "https://example.com/image.png",
            twitterCard: "summary_large_image",
          },
          defaultHttpClient: {
            targetKey: "javascript",
            clientKey: "fetch",
          },
          // authentication: {
          //   preferredSecurityScheme: "AccessTokenBearer",
          //   bearer: {
          //     token: "super-secret-token",
          //   },
          // },
          defaultOpenAllTags: true,
          tagsSorter: "alpha",
        },
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
    );
