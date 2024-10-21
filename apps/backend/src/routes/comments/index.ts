import Elysia from "elysia";
import { AuthorizationError } from "../../exceptions/errors";
import { commentService } from "../../services/comments";
import { accessTokenSecurity } from "../../utils/helpers";
import { selectCommentSchema } from "../../db/schema/comment";
import { ERRORS } from "../../models/error-models";
import { CreateCommentModel } from "../../models/posts";
import { accessTokenPlugin } from "../../plugins/auth";

const tags = ["Comments"];
export const commentRoutes = new Elysia({
	prefix: "/comment",
	name: "api.comments.index",
	tags,
})
	.use(accessTokenPlugin)
	.model("CreateCommentModel", CreateCommentModel)
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
			app.post(
				"",
				async ({ body, payload, set }) => {
					const comment = await commentService.createComment(
						body,
						payload && "user" in payload ? payload.user.id : "",
					);
					set.status = "Created";
					return comment;
				},
				{
					body: "CreateCommentModel",
					response: {
						201: selectCommentSchema,
						401: ERRORS.UNAUTHORIZED,
					},
					detail: {
						summary: "Create Comment",
						detail: "Create a comment",
					},
				},
			),
	);
