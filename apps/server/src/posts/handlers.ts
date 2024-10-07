import { AppRouteHandler } from "@/lib/types";
import { createPost } from "./routes";
import { insertPostSchema } from "@/db/schema/post";

export const createPostHandler: AppRouteHandler<typeof createPost> = async (
  c,
) => {
  const newPost = insertPostSchema.parse(await c.req.json());
  console.log(newPost);
  return c.json({}, 200);
};
