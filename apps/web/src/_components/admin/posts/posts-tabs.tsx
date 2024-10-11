import { TabsContent } from "@repo/ui/components/ui/tabs";
import { Suspense } from "react";
import PostCard, { PostSkeleton } from "./post-card";
import { getUserPosts, SelectPostSchema } from "@/queries/posts";
import { cookies } from "next/headers";

export const PostsTabs = async () => {
  const accessToken = cookies().get("accessToken");
  const posts =
    accessToken?.value && (await getUserPosts(accessToken?.value as string));
  const posts_tabs = ["Published", "Drafted", "Scheduled"];

  return (
    <>
      {posts_tabs.map((tab, index) => (
        <TabsContent
          value={tab.toLowerCase()}
          key={index}
          className="flex flex-col gap-4 pt-8"
        >
          {posts &&
            posts.map((post: SelectPostSchema) => (
              <Suspense key={post.id} fallback={<PostSkeleton />}>
                <PostCard post={post} />
              </Suspense>
            ))}
        </TabsContent>
      ))}
    </>
  );
};
