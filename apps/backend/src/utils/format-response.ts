import { Static, type TSchema, t } from "elysia";

export const formatSuccessResponse = <SCHEMA extends TSchema>(
	responseSchema: SCHEMA,
	options: {
		messageKey?: string;
		statusKey?: string;
	} = {},
) => {
	const { messageKey = "message", statusKey = "status" } = options;

	return t.Object({
		[messageKey]: t.Optional(t.String()),
		data: responseSchema,
		[statusKey]: t.String(),
	});
};

export const formatErrorResponse = <SCHEMA extends TSchema>(
	responseSchema: SCHEMA,
) => {
	return [
		t.Object({
			message: t.Optional(t.String()),
			errors: responseSchema,
			status: t.Union([t.Number(), t.String()]),
		}),
	];
};
