import Elysia from "elysia";
import { postsRoutes } from "./posts";
import { postsDynamicRoutes } from "./posts/[id]";
import { commentRoutes } from "./comments";
import { commentRoutesDynamic } from "./comments/[id]";
import { categoryRoutes } from "./categories";
import { categoryRoutesDynamic } from "./categories/[id]";
import { usersRoutes } from "./users";
import { authRoutes } from "./auth/routes";
import { settings } from "~/config/settings";

export const api = new Elysia({ prefix: settings.API_V1_PREFIX, name: "api" });
api
  .use(postsRoutes)
  .use(postsDynamicRoutes)
  .use(commentRoutes)
  .use(commentRoutesDynamic)
  .use(categoryRoutes)
  .use(categoryRoutesDynamic)
  .use(usersRoutes)
  .use(authRoutes);
