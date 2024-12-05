import type ElysiaApp from "elysia";
import type { SuccessResponse, ErrorResponse } from "../models/response";

export const isJsonString = (str: string) => {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
};

export const useSuccessResponseMiddleware = (app: ElysiaApp) => {
	return app.onAfterHandle(async (context): Promise<SuccessResponse> => {
		const message = "success";
		const response = context.response;
		const status = context.set.status ?? "Created";

		return {
			message,
			data: response,
			status: status as string,
		};
	});
};

export const useErrorMiddleware = (app: ElysiaApp) => {
	return app.onError(async (context): Promise<ErrorResponse> => {
		const message = isJsonString(context.error.message)
			? JSON.parse(context.error.message)
			: context.error.message;
		const data = null;
		const status = context.set.status ?? context.error.status ?? 500;

		// NOTE : You can put your error logging here

		return {
			message,
			errors: "for now",
			status,
		};
	});
};
