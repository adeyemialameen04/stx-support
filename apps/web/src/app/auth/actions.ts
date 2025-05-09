"use server";
import { HTTP_STATUS } from "@/lib/constants";
import makeFetch from "@/lib/fetch";
import { actionClient } from "@/lib/safe-action";
import { saveUserTokens } from "@/lib/session";
import type { ApiResponse } from "@/types";
import { AuthModel, type LoginResponseModel } from "@repo/schemas/auth";

export const completeAuth = actionClient
	.schema(AuthModel)
	.action(async ({ parsedInput: { stxAddressMainnet, password } }) => {
		try {
			type LoginResponseType = typeof LoginResponseModel.static;
			const res = await makeFetch<ApiResponse<LoginResponseType>>(
				"/auth/oauth",
				null,
				{
					method: "POST",
					body: {
						stxAddressMainnet,
						password: password,
					},
				},
			)();

			if (res.status === HTTP_STATUS.OK || res.status === HTTP_STATUS.CREATED) {
				const tokens = {
					accessToken: res.data.accessToken,
					refreshToken: res.data.refreshToken,
					refreshTokenExpiry: res.data.refreshTokenExpiryTimestamp,
					accessTokenExpiry: res.data.accessTokenExpiryTimestamp,
					uuid: res.data.user?.id,
				};

				console.log("Here", res);
				await saveUserTokens(tokens);
				return { status: 200, detail: "Login successful" };
			}

			return { status: 500, detail: "An error occured" };
		} catch (err) {
			console.log(err);
		}
	});
