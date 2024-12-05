import Elysia, { StatusMap, t } from "elysia";
import { selectPostSchema } from "../../src/db/schema/post";
import { AuthorizationError } from "../../src/exceptions/errors";
import { ERRORS } from "../../src/models/error-models";
import { CreatePostModel } from "../../src/models/posts";
import { accessTokenPlugin } from "../../src/plugins/auth";
import { postService } from "../../src/services/posts";
import { accessTokenSecurity } from "../../src/utils/helpers";
import { formatSuccessResponse } from "../../src/utils/format-response";
import { SendCreated } from "../../src/utils/responses";

const tags = ["Posts"];

export default new Elysia({
	tags,
	name: "api.posts.index",
})
	.use(accessTokenPlugin)
	.model("CreatePostModel", CreatePostModel)
	.model("PostModel", selectPostSchema)
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
			app
				.get(
					"",
					async ({ payload }) => {
						if (payload) {
							const userPosts = await postService.getUserPosts(payload.user.id);

							if (userPosts.length === 0) {
								return {
									message: "User does not have any posts",
									status: "Not Found",
									errors: null,
								};
							}
							return {
								message: "Posts retrieved successfully",
								data: userPosts,
								status: "Created",
							};
						}

						throw new AuthorizationError("Bearer token required");
					},
					{
						response: {
							200: formatSuccessResponse(t.Array(selectPostSchema)),
							401: ERRORS.UNAUTHORIZED,
						},
						detail: {
							summary: "Get user Posts",
							description: "Get currently logged in users posts",
						},
					},
				)
				.post(
					"",
					async ({ body, payload, set }) => {
						const post = await postService.createPost(
							body,
							payload && "user" in payload ? payload.user.id : "",
						);

						set.status = "Created";
						return SendCreated(post, "Post");
					},
					{
						response: {
							201: formatSuccessResponse(selectPostSchema),
							401: ERRORS.UNAUTHORIZED,
							400: ERRORS.INVARIANT,
						},
						body: CreatePostModel,
						detail: {
							summary: "Create Post",
							description: "Creates a new post",
						},
					},
				),
	);
