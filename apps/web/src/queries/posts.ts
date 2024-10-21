import makeFetch from "@/lib/fetch";
import type { selectPostSchema, SinglePost } from "@repo/schemas/posts";
export type SelectPostSchema = typeof selectPostSchema.static;
export type Post = typeof SinglePost.static;

export const getUserPosts = async (
	accessToken: string,
): Promise<SelectPostSchema[]> => {
	try {
		const res = await makeFetch<SelectPostSchema[]>("/posts", accessToken, {
			next: {
				tags: ["new-post", "delete-post", "posts"],
			},
		})();
		if (Array.isArray(res)) {
			return res;
		}
		console.error("Unexpected response format:", res);
		return [];
	} catch (err) {
		console.error("Error fetching user posts:", err);
		return [];
	}
};

export const getPost = async (id: string): Promise<Post> => {
	try {
		const res = await makeFetch<Post>(`/posts/${id}`, null, {})();
		return res;
	} catch (err) {
		console.error(err);
		throw err;
	}
};
