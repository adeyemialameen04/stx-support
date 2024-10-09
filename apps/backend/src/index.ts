import { Elysia } from "elysia";
import { authRoutes } from "./auth/routes";
import serverTiming from "@elysiajs/server-timing";
import logixlysia from "logixlysia";
import { postsRoutes } from "./posts/routes";
import { docs } from "./plugins/docs";
import { errors } from "./plugins/errors";
import { usersRoutes } from "./users/routes";

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
  .use(authRoutes)
  .use(usersRoutes)
  .use(postsRoutes)

  .listen(3000);
