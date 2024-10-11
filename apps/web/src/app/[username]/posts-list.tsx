import PostCard, { PostSkeleton } from "@/_components/admin/posts/post-card";
import { getUserPosts, SelectPostSchema } from "@/queries/posts";
import { cookies } from "next/headers";
import { Suspense } from "react";

export async function PostsList() {
  const accessToken = cookies().get("accessToken");
  const posts =
    accessToken?.value && (await getUserPosts(accessToken?.value as string));

  return (
    <>
      {posts && posts.length > 0 ? (
        posts.map((post: SelectPostSchema) => (
          <Suspense key={post.id} fallback={<PostSkeleton />}>
            <PostCard post={post} />
          </Suspense>
        ))
      ) : (
        <div>You have not created any posts yet</div>
      )}
    </>
  );
}
