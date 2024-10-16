import { Elysia } from "elysia";
import serverTiming from "@elysiajs/server-timing";
import logixlysia from "logixlysia";
import { docs } from "./plugins/docs";
import { errors } from "./plugins/errors";
import { api } from "./routes";

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

export type App = typeof app;
