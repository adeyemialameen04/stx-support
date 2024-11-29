import Elysia from "elysia";
import bearer from "@elysiajs/bearer";
import { v4 as uuidv4 } from "uuid";

import { AuthModel, LoginResponseModel } from "../../../src/models/auth";
import { ERRORS } from "../../../src/models/error-models";
import { jwtPlugin } from "../../../src/plugins/auth";
import { authService } from "../../../src/services/auth";

const tags = ["Auth"];
export default new Elysia({
	tags,
	name: "api.auth.sign-in",
})
	.use(bearer())
	.model("LoginResponseModel", LoginResponseModel)
	.use(jwtPlugin)
	.guard(
		{
			body: AuthModel,
		},
		(app) =>
			app
				// Login
				.post(
					"",
					async ({
						body: { stxAddressMainnet, password },
						accessJwt,
						refreshJwt,
						error,
					}) => {
						const existingUser =
							await authService.isUserExist(stxAddressMainnet);

						if (!existingUser) {
							return error(401, {
								status: 401,
								detail: "Invalid Username or Password",
								error: "Unauthorized",
							});
						}

						const isMatch = await Bun.password.verify(
							password,
							existingUser.passwordHash,
						);

						if (!isMatch) {
							return error(401, {
								status: 401,
								detail: "Invalid Username or Password",
								error: "Unauthorized",
							});
						}

						const accessTokenExpiryTimestamp =
							Math.floor(Date.now() / 1000) + 15 * 60;
						const refreshTokenExpiryTimestamp =
							Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60;

						const user = {
							stxAddressMainnet,
							id: existingUser.id,
						};

						const accessToken = await accessJwt.sign({
							user: user,
							jti: uuidv4(),
							refresh: false,
							exp: accessTokenExpiryTimestamp,
						});
						const refreshToken = await refreshJwt.sign({
							user: user,
							jti: uuidv4(),
							refresh: true,
							exp: refreshTokenExpiryTimestamp,
						});

						return {
							message: "Login successful",
							accessToken,
							refreshToken,
							accessTokenExpiryTimestamp,
							refreshTokenExpiryTimestamp,
							user,
						};
					},
					{
						response: {
							401: ERRORS.UNAUTHORIZED,
							200: LoginResponseModel,
						},
						detail: {
							summary: "Login",
							description: "Login",
						},
					},
				),
	);
