import Elysia, { InternalServerError, NotFoundError, t } from "elysia";
import { AuthorizationError } from "../../src/exceptions/errors";
import { IdModel } from "../../src/models/common";
import { ERRORS } from "../../src/models/error-models";
import { SinglePost } from "../../src/models/posts";
import { accessTokenPlugin } from "../../src/plugins/auth";
import { postService } from "../../src/services/posts";
import { accessTokenSecurity } from "../../src/utils/helpers";
import { selectPostSchema, insertPostSchema } from "../../src/db/schema/post";

const tags = ["Posts"];

const postsDynamicRoutes = new Elysia({
	prefix: "/posts",
	tags,
	name: "api.posts.dynamic",
})
	.use(accessTokenPlugin)
	.model("PostModel", selectPostSchema)
	.model("SinglePost", SinglePost)
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
						.patch(
							"/:id",
							async ({ params: { id }, body, set, payload }) => {
								const post = await postService.isPostOwner(
									id,
									payload && "user" in payload ? payload.user.id : "",
								);
								if (post.length === 0) {
									throw new NotFoundError(
										"Post not found or you don't have permission to edit it",
									);
								}

								const updatedPost = await postService.updatePost(id, body);
								if (!updatedPost) {
									throw new InternalServerError("Failed to update post");
								}

								return updatedPost;
							},
							{
								body: t.Partial(
									t.Omit(insertPostSchema, [
										"userId",
										"id",
										"createdAt",
										"updatedAt",
										"userId",
									]),
								),
								response: {
									500: ERRORS.INTERNAL_SERVER_ERROR,
									200: selectPostSchema,
									401: ERRORS.UNAUTHORIZED,
									404: ERRORS.NOT_FOUND,
									400: ERRORS.INVARIANT,
								},
								detail: {
									summary: "Edit Post",
									description: "Edits a Post",
								},
							},
						)
						.delete(
							"/:id",
							async ({ params: { id }, payload }) => {
								const post = await postService.isPostOwner(
									id,
									payload && "user" in payload ? payload.user.id : "",
								);
								if (post.length === 0) {
									throw new NotFoundError(
										"Post not found or you don't have permission to edit it",
									);
								}
								const [deletedPost] = await postService.deletePost(id);
								return deletedPost;
							},
							{
								detail: {
									summary: "Delete Post",
									description: "Deleted a Post",
								},
								response: {
									// 204: selectPostSchema,
									401: ERRORS.UNAUTHORIZED,
									404: ERRORS.NOT_FOUND,
									// 400: ERRORS.INVARIANT,
								},
							},
						),
			),
	)
	.get(
		"/:id",
		async ({ params: { id }, set }) => {
			const post = await postService.getPost(id);
			if (!post) {
				throw new NotFoundError("Post not found");
			}

			set.status = "OK";
			return post;
		},
		{
			response: {
				200: "SinglePost",
				404: ERRORS.NOT_FOUND,
				500: ERRORS.INTERNAL_SERVER_ERROR,
			},
			params: IdModel,
			detail: {
				summary: "Get Post",
				description: "Get Post by ID",
			},
		},
	);
export default postsDynamicRoutes;
