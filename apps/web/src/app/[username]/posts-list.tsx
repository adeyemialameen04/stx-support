import { getUserPosts, type SelectPostSchema } from "@/queries/posts";
import { cookies } from "next/headers";
import { Suspense } from "react";
import PostCard, { PostSkeleton } from "../admin/posts/_components/post-card";

export async function PostsList() {
	const accessToken = (await cookies()).get("accessToken");
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
