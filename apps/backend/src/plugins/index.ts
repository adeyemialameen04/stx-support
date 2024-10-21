import serverTiming from "@elysiajs/server-timing";
import type Elysia from "elysia";
import { compression } from "elysia-compression";
import logixlysia from "logixlysia";
import { docs } from "./docs";
import { errors } from "./errors";
import { api } from "~/routes";

export const plugins = (app: Elysia) =>
	app
		.use(compression())
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
