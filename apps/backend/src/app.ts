import { Elysia } from "elysia";
import { authRoutes } from "./auth/routes";
import serverTiming from "@elysiajs/server-timing";
import logixlysia from "logixlysia";
import { postsRoutes } from "./posts/routes";
import { docs } from "./plugins/docs";
import { errors } from "./plugins/errors";
import { usersRoutes } from "./users/routes";
import { categoryRoutes } from "./posts/categories/routes";
import { settings } from "./config/settings";
import { api } from "./api";

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
  .use(docs)
  .use(errors)
  .use(api)

  .listen(3000);
