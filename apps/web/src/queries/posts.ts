import makeFetch from "@/lib/fetch";
import { selectPostSchema, SinglePost } from "@repo/schemas/index";
export type SelectPostSchema = typeof selectPostSchema.static;
export type Post = typeof SinglePost.static;

export const getUserPosts = async (
  accessToken: string,
): Promise<SelectPostSchema[]> => {
  try {
    const res = await makeFetch<SelectPostSchema[]>(
      true,
      "/posts",
      accessToken,
      {
        next: {
          tags: ["new-post", "delete-post", "posts"],
        },
      },
    )();
    if (Array.isArray(res)) {
      return res;
    } else {
      console.error("Unexpected response format:", res);
      return [];
    }
  } catch (err) {
    console.error("Error fetching user posts:", err);
    return [];
  }
};

export const getPost = async (id: string) => {
  const res = await makeFetch<Post>(false, `/posts/${id}`, null, {})();

  return res;
};
