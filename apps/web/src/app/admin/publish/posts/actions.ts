"use server";
import makeFetch from "@/lib/fetch";
import { revalidateTag } from "next/cache";
import { CreatePostModel } from "@repo/schemas/posts";
import { actionClient } from "@/lib/safe-action";
import { assertUserAuthenticated } from "@/lib/session";
import { AuthorizationError } from "@repo/errors/index";

export const createPost = actionClient
	.schema(CreatePostModel)
	.action(async ({ parsedInput: { title, categoryId, content, status } }) => {
		const user = await assertUserAuthenticated();
		console.log(title, categoryId, content, status);

		if (!user) {
			throw new AuthorizationError("You are not authorized to view this page");
		}

		makeFetch("/posts", user.accessToken as string, {
			method: "POST",
			body: {
				title,
				content,
				categoryId,
				status,
			},
		})()
			.then((res) => {
				console.log(res);
				return { status: 200, message: "Success" };
			})
			.catch((err) => {
				console.log(err);
				return { status: 500, message: "Error" };
			});
	});

export const deletePost = async (id: string) => {
	const user = await assertUserAuthenticated();

	if (!user) {
		throw new AuthorizationError("You are not authorized to view this page");
	}

	makeFetch(`/posts/${id}`, user.accessToken as string, {
		method: "DELETE",
		next: {
			tags: ["delete-post"],
		},
	})()
		.then(async (res) => {
			revalidateTag("posts");
		})
		.catch((err) => {
			console.error(err);
		});

	console.log("git here");
};
