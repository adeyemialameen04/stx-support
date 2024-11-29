import Elysia, { t } from "elysia";
import { selectPostSchema } from "../../src/db/schema/post";
import { AuthorizationError } from "../../src/exceptions/errors";
import { ERRORS } from "../../src/models/error-models";
import { CreatePostModel } from "../../src/models/posts";
import { accessTokenPlugin } from "../../src/plugins/auth";
import { postService } from "../../src/services/posts";
import { accessTokenSecurity } from "../../src/utils/helpers";

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

							return userPosts;
						}

						throw new AuthorizationError("Bearer token required");
					},
					{
						response: {
							200: t.Array(selectPostSchema),
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
						return post;
					},
					{
						response: {
							201: selectPostSchema,
							401: ERRORS.UNAUTHORIZED,
							400: ERRORS.INVARIANT,
						},
						body: "CreatePostModel",
						detail: {
							summary: "Create Post",
							description: "Creates a new post",
						},
					},
				),
	);
