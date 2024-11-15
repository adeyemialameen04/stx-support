import serverTiming from "@elysiajs/server-timing";
import Elysia from "elysia";
import logixlysia from "logixlysia";
import { errors } from "./errors";
// import { compression } from "elysia-compression";
import { docs } from "./docs";

export const plugins = new Elysia({ name: "plugins" })
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
	.use(errors)
	.as("global")
	// .use(compression())
	// .as("global")
	.use(docs);
