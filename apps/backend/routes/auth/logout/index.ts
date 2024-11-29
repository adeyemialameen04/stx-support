import Elysia, { t } from "elysia";
import bearer from "@elysiajs/bearer";
import { AuthorizationError } from "../../../src/exceptions/errors";
import { ERRORS } from "../../../src/models/error-models";
import { jwtPlugin, accessTokenPlugin } from "../../../src/plugins/auth";
import { accessTokenSecurity } from "../../../src/utils/helpers";

const tags = ["Auth"];
export default new Elysia({
	prefix: "/auth",
	tags,
	name: "api.auth.logout",
})
	.use(bearer())
	.use(jwtPlugin)
	.guard({}, (app) =>
		app.use(accessTokenPlugin).get(
			"",
			async ({ payload }) => {
				console.log(payload);

				return {
					status: 200,
					detail: "Logged out successfully",
				};
			},
			{
				async beforeHandle({ payload }) {
					if (!payload) {
						throw new AuthorizationError("Invalid Token");
					}
				},
				response: {
					200: t.Object({
						status: t.Number({ default: 200 }),
						detail: t.String({ default: "Logout successful" }),
					}),
					401: ERRORS.UNAUTHORIZED,
				},
				detail: {
					summary: "Logout",
					description: "Logs current user out",
					security: accessTokenSecurity,
				},
			},
		),
	);
