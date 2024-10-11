import makeFetch from "@/lib/fetch";
import { selectPostSchema } from "@repo/schemas/index";
export type SelectPostSchema = typeof selectPostSchema.static;

export const getUserPosts = async (
  accessToken: string,
): Promise<SelectPostSchema[]> => {
  try {
    const res = await makeFetch<SelectPostSchema[]>(
      true,
      "/posts",
      accessToken,
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
