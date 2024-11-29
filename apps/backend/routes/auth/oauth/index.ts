import Elysia from "elysia";
import bearer from "@elysiajs/bearer";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../../src/db";
import { userTable } from "../../../src/db/schema";
import { AuthModel, LoginResponseModel } from "../../../src/models/auth";
import { ERRORS } from "../../../src/models/error-models";
import { jwtPlugin } from "../../../src/plugins/auth";
import { authService } from "../../../src/services/auth";

const generateTokenPair = async (
	stxAddressMainnet: string,
	userId: string,
	accessJwt: any,
	refreshJwt: any,
) => {
	const accessTokenExpiryTimestamp = Math.floor(Date.now() / 1000) + 15 * 60;
	const refreshTokenExpiryTimestamp =
		Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60;

	const user = {
		stxAddressMainnet,
		id: userId,
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
};

const tags = ["Auth"];
export default new Elysia({
	tags,
	name: "api.auth.index",
})
	.use(bearer())
	.model("AuthModel", AuthModel)
	.model("LoginResponseModel", LoginResponseModel)
	.use(jwtPlugin)
	.guard(
		{
			body: AuthModel,
		},
		(app) =>
			app
				// Sign up
				.post(
					"",
					async ({
						body: { password, stxAddressMainnet },
						set,
						accessJwt,
						refreshJwt,
					}) => {
						const existingUser =
							await authService.isUserExist(stxAddressMainnet);

						if (existingUser) {
							const isMatch = await Bun.password.verify(
								password,
								existingUser.passwordHash,
							);

							if (!isMatch) {
								set.status = "Unauthorized";
								return {
									status: 401,
									detail: "Invalid Username or Password",
									error: "Unauthorized",
								};
							}

							const tokenPair = await generateTokenPair(
								existingUser.stxAddressMainnet,
								existingUser.id,
								accessJwt,
								refreshJwt,
							);
							console.log("FROM EXISTING", tokenPair);
							return {
								status: 200,
								...tokenPair,
							};
						}

						const hashedPasswd = await Bun.password.hash(password);
						const [newUser] = await db
							.insert(userTable)
							.values({
								stxAddressMainnet,
								passwordHash: hashedPasswd,
							})
							.returning();

						const tokenPair = await generateTokenPair(
							newUser.stxAddressMainnet,
							newUser.id,
							accessJwt,
							refreshJwt,
						);

						set.status = "Created";
						return {
							status: 201,
							...tokenPair,
						};
					},
					{
						response: {
							200: LoginResponseModel,
							201: LoginResponseModel,
							// 201: t.Omit(selectUserSchema, ["passwordHash", "updatedAt"]),
							409: ERRORS.CONFLICT,
						},
						detail: {
							summary: "Sign Up",
							description: "Creates a new User",
						},
					},
				),
	);

// .post(
// 	"",
// 	async ({
// 		body: { stxAddressMainnet, password },
// 		accessJwt,
// 		refreshJwt,
// 		error,
// 	}) => {
// 		const existingUser =
// 			await authService.isUserExist(stxAddressMainnet);
//
// 		if (!existingUser) {
// 			return error(401, {
// 				status: 401,
// 				detail: "Invalid Username or Password",
// 				error: "Unauthorized",
// 			});
// 		}
//
// 		const isMatch = await Bun.password.verify(
// 			password,
// 			existingUser.passwordHash,
// 		);
//
// 		if (!isMatch) {
// 			return error(401, {
// 				status: 401,
// 				detail: "Invalid Username or Password",
// 				error: "Unauthorized",
// 			});
// 		}
//
// 		const accessTokenExpiryTimestamp =
// 			Math.floor(Date.now() / 1000) + 15 * 60;
// 		const refreshTokenExpiryTimestamp =
// 			Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60;
//
// 		const user = {
// 			stxAddressMainnet,
// 			id: existingUser.id,
// 		};
//
// 		const accessToken = await accessJwt.sign({
// 			user: user,
// 			jti: uuidv4(),
// 			refresh: false,
// 			exp: accessTokenExpiryTimestamp,
// 		});
// 		const refreshToken = await refreshJwt.sign({
// 			user: user,
// 			jti: uuidv4(),
// 			refresh: true,
// 			exp: refreshTokenExpiryTimestamp,
// 		});
//
// 		return {
// 			message: "Login successful",
// 			accessToken,
// 			refreshToken,
// 			accessTokenExpiryTimestamp,
// 			refreshTokenExpiryTimestamp,
// 			user,
// 		};
// 	},
// 	{
// 		response: {
// 			401: ERRORS.UNAUTHORIZED,
// 			200: LoginResponseModel,
// 		},
// 		detail: {
// 			summary: "Login",
// 			description: "Login",
// 		},
// 	},
// ),
//
