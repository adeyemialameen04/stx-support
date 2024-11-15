import { env } from "bun";

export default (app: ElysiaApp) =>
	app
		.get("/health", () => {}, {
			detail: {
				summary: "Check Health",
				description: "Checks the health",
				tags: ["Health"],
			},
		})
		.get(
			"/health/env",
			() => {
				return env.NODE_ENV === "development" && env;
			},
			{
				detail: {
					summary: "Check Env",
					description: "Checks if env have been set correctly",
					tags: ["Health"],
				},
			},
		);
