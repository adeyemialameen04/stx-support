import Elysia, { t } from "elysia";
import { selectCommentSchema } from "../../db/schema/comment";
import {
	AuthorizationError,
	InternalServerError,
	NotFoundError,
} from "../../exceptions/errors";
import { IdModel } from "../../models/common";
import { ERRORS } from "../../models/error-models";
import { CreateCommentModel } from "../../models/posts";
import { accessTokenPlugin } from "../../plugins/auth";
import { commentService } from "../../services/comments";
import { accessTokenSecurity } from "../../utils/helpers";

const tags = ["Comments"];
export const commentRoutesDynamic = new Elysia({
	prefix: "/comment",
	name: "api.comments.dynamic",
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
			app.guard(
				{
					params: IdModel,
				},
				(app) =>
					app
						.delete(
							"/:id",
							async ({ params: { id }, set, payload }) => {
								const comment = await commentService.isCommentOwner(
									id,
									payload && "user" in payload ? payload.user.id : "",
								);

								if (comment.length === 0) {
									throw new AuthorizationError(
										"Comment not found or you don't have permission to edit it",
									);
								}

								const [deletedComment] = await commentService.deleteComment(id);

								if (!deletedComment) {
									throw new NotFoundError(
										"Comment not found or you don't have permission to edit it",
									);
								}

								return deletedComment;
							},
							{
								detail: {
									summary: "Delete Comment",
									description: "Deletes a comment",
								},
								response: {
									200: selectCommentSchema,
									401: ERRORS.UNAUTHORIZED,
									404: ERRORS.NOT_FOUND,
								},
							},
						)
						.patch(
							"/:id",
							async ({ params: { id }, set, payload, body }) => {
								const comment = await commentService.isCommentOwner(
									id,
									payload && "user" in payload ? payload.user.id : "",
								);

								if (comment.length === 0) {
									throw new AuthorizationError(
										"Comment not found or you don't have permission to edit it",
									);
								}

								const updatedComment = await commentService.updateComment(
									id,
									body,
								);
								if (!updatedComment)
									throw new InternalServerError("Failed to update post");

								return updatedComment;
							},
							{
								body: t.Partial(CreateCommentModel),
								detail: {
									summary: "Update Comment",
									description: "Updates a comment",
								},
								response: {
									500: ERRORS.INTERNAL_SERVER_ERROR,
									200: selectCommentSchema,
									401: ERRORS.UNAUTHORIZED,
									404: ERRORS.NOT_FOUND,
								},
							},
						),
			),
	);
