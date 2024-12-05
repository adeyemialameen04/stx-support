import { Elysia } from "elysia";
import { plugins } from "./plugins";
import { autoload } from "elysia-autoload";
import {
	useSuccessResponseMiddleware,
	useErrorMiddleware,
} from "./middleware/response";
import cors from "@elysiajs/cors";

const prefix = "/api/v1/" as const;

const app = new Elysia({ name: "app" })
	.use(cors())
	.use(plugins)
	// .use(useSuccessResponseMiddleware)
	// .use(useErrorMiddleware)
	.use(
		await autoload({
			prefix,
			dir: "../routes",
			types: {
				output: "./lib/routes.ts",
				typeName: "Routes",
			},
		}),
	);

await app.modules;
app.listen(3002, () => app.routes.map((x) => x.path));

export type ElysiaApp = typeof app;
