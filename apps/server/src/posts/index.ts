import { OpenAPIHono } from "@hono/zod-openapi";
import { AppBindings } from "@/lib/types";
import { createPost } from "./routes";
import { createPostHandler } from "./handlers";

const route = new OpenAPIHono<AppBindings>();

const router = route.openapi(createPost, createPostHandler);

export default router;
