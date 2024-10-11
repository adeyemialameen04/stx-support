import Elysia from "elysia";
import { authRoutes } from "./auth/routes";
import { categoryRoutes } from "./posts/categories/routes";
import { postsRoutes } from "./posts/routes";
import { usersRoutes } from "./users/routes";
import { settings } from "../config/settings";
import { commentRoutes } from "./posts/comments/routes";

export const api = new Elysia({ prefix: settings.API_V1_PREFIX });
api
  .use(authRoutes)
  .use(usersRoutes)
  .use(postsRoutes)
  .use(categoryRoutes)
  .use(commentRoutes);
