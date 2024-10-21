import serverTiming from "@elysiajs/server-timing";
import type Elysia from "elysia";
import logixlysia from "logixlysia";
import { docs } from "./docs";
import { errors } from "./errors";
import compression from "elysia-compress";
import { api } from "../routes";

export const plugins = (app: Elysia) =>
	app
		.use(compression())
		.use(serverTiming())
		.use(compression())
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
