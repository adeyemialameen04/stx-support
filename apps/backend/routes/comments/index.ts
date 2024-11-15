import Elysia from "elysia";
import { selectCommentSchema } from "../../src/db/schema/comment";
import { AuthorizationError } from "../../src/exceptions/errors";
import { ERRORS } from "../../src/models/error-models";
import { CreateCommentModel } from "../../src/models/posts";
import { accessTokenPlugin } from "../../src/plugins/auth";
import { commentService } from "../../src/services/comments";
import { accessTokenSecurity } from "../../src/utils/helpers";
const tags = ["Comments"];
const commentRoutes = new Elysia({
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
export default commentRoutes;
