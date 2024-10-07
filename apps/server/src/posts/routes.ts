import { insertPostSchema, selectPostSchema } from "@/db/schema/post";
import { createRoute, z } from "@hono/zod-openapi";
import { zodToOpenAPI } from "./test";

const tags = ["posts"];
export const createPost = createRoute({
  path: "",
  method: "post",
  tags,
  request: {
    body: {
      content: {
        "application/json": {
          schema: insertPostSchema, // schema: createPostSchema.openapi("PostCreate", {
          //   type: "object",
          //   properties: {
          //     title: { type: "string", minLength: 1 },
          //     userId: { type: "string", format: "uuid" },
          //     categoryId: { type: "string", format: "uuid" },
          //     content: { type: "object" },
          //   },
          // }),
        },
      },
    },
  },
  responses: {
    201: {
      content: {
        "application/json": {
          schema: zodToOpenAPI(selectPostSchema),
        },
      },
      description: "Post created",
    },
  },
});
