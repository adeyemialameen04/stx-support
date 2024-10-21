import Elysia from "elysia";
import { selectUserSchema } from "../../db/schema/user";
import { AuthorizationError, NotFoundError } from "../../exceptions/errors";
import { ERRORS } from "../../models/error-models";
import { UpdateUserModel } from "../../models/users";
import { accessTokenPlugin } from "../../plugins/auth";
import { usersService } from "../../services/users";
import { accessTokenSecurity } from "../../utils/helpers";

const tags = ["Users"];
export const usersRoutes = new Elysia({
	prefix: "/users",
	name: "api.users.index",
	tags,
})
	.use(accessTokenPlugin)
	.model("UpdateUserModel", UpdateUserModel)
	.guard(
		{
			detail: {
				security: accessTokenSecurity,
			},
			async beforeHandle({ payload }) {
				if (!payload) {
					throw new AuthorizationError("Invalid Token");
				}
			},
		},
		(app) =>
			app
				.patch(
					"/me",
					async ({ payload, body }) => {
						const updatedUser = await usersService.updateUser(
							payload && "user" in payload ? payload.user.id : "",
							body,
						);

						if (updatedUser) {
							return updatedUser;
						}
						throw new NotFoundError("User not found");
					},
					{
						body: "UpdateUserModel",
						response: {
							200: selectUserSchema,
							401: ERRORS.UNAUTHORIZED,
							404: ERRORS.NOT_FOUND,
						},
						detail: {
							summary: "Update User",
							description: "Updates user profile",
						},
					},
				)
				.get(
					"/me",
					async ({ payload }) => {
						const user = await usersService.getUser(
							payload && "user" in payload ? payload.user.id : "",
						);
						if (!user) {
							throw new NotFoundError("user not found");
						}

						return user;
					},
					{
						response: {
							200: selectUserSchema,
							401: ERRORS.UNAUTHORIZED,
							404: ERRORS.NOT_FOUND,
						},
						detail: {
							summary: "Get user",
							description: "Get currently logged in user data",
						},
					},
				),
	);
