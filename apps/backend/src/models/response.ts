import { type Static, t } from "elysia";

const BaseResponseSchema = t.Object({
	message: t.String(),
	status: t.String(),
});

export const SuccessResponseSchema = t.Composite([
	BaseResponseSchema,
	t.Object({
		data: t.Any(),
	}),
]);

export type SuccessResponse = Static<typeof SuccessResponseSchema>;

export const ErrorResponseSchema = t.Composite([
	BaseResponseSchema,
	t.Object({
		errors: t.Any(),
	}),
]);

export type ErrorResponse = Static<typeof ErrorResponseSchema>;
