import Elysia from "elysia";
import bearer from "@elysiajs/bearer";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../../src/db";
import { userTable } from "../../../src/db/schema";
import { AuthModel, LoginResponseModel } from "../../../src/models/auth";
import { ERRORS } from "../../../src/models/error-models";
import { jwtPlugin } from "../../../src/plugins/auth";
import { authService } from "../../../src/services/auth";
import { profileService } from "../../../src/services/profile";
import {
	SendCreated,
	SendInternalServerError,
	SendSuccess,
} from "../../../src/utils/responses";
import { formatSuccessResponse } from "../../../src/utils/format-response";

const generateTokenPair = async (
	stxAddressMainnet: string,
	userId: string,
	profileId: string,
	accessJwt: any,
	refreshJwt: any,
) => {
	const accessTokenExpiryTimestamp = Math.floor(Date.now() / 1000) + 15 * 60;
	const refreshTokenExpiryTimestamp =
		Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60;

	const user = {
		stxAddressMainnet,
		id: userId,
		profileId,
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

						if (existingUser.id) {
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
								existingUser.profile.id,
								accessJwt,
								refreshJwt,
							);
							console.log("FROM EXISTING", tokenPair);
							return SendSuccess(tokenPair, null, "Login successfully");
						}

						const hashedPasswd = await Bun.password.hash(password);
						const [newUser] = await db
							.insert(userTable)
							.values({
								stxAddressMainnet,
								passwordHash: hashedPasswd,
							})
							.returning();

						const profile = await profileService.createProfile({
							username: newUser.stxAddressMainnet,
							userId: newUser.id,
						});
						if (!profile) {
							return SendInternalServerError("Error creating user profile");
						}

						const tokenPair = await generateTokenPair(
							newUser.stxAddressMainnet,
							newUser.id,
							profile?.id,
							accessJwt,
							refreshJwt,
						);

						return SendCreated(tokenPair, "user");
					},
					{
						response: {
							200: formatSuccessResponse(LoginResponseModel),
							201: formatSuccessResponse(LoginResponseModel),
							409: ERRORS.CONFLICT,
						},
						detail: {
							summary: "Stacks Oauth Flow",
							description: "THE OAUTH FLOW",
						},
					},
				),
	);
