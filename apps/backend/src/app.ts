import { Elysia } from "elysia";
import { plugins } from "./plugins";
import { autoload } from "elysia-autoload";

const prefix = "/api/v1//" as const;

const app = new Elysia({ name: "app" }).use(plugins).use(
	await autoload({
		prefix,
		dir: "../routes/",
		types: {
			output: "./routes.ts",
			typeName: "Routes",
		},
	}),
);

await app.modules;
app.listen(3002, () => app.routes.map((x) => x.path));

export type ElysiaApp = typeof app;
