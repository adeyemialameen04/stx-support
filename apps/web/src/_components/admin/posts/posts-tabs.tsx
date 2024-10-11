import { TabsContent } from "@repo/ui/components/ui/tabs";
import { PostsList } from "@/app/[username]/posts-list";

export const PostsTabs = () => {
  const posts_tabs = ["Published", "Drafted", "Scheduled"];

  return (
    <>
      {posts_tabs.map((tab, index) => (
        <TabsContent
          value={tab.toLowerCase()}
          key={index}
          className="flex flex-col gap-4 pt-8"
        >
          <PostsList />
        </TabsContent>
      ))}
    </>
  );
};
