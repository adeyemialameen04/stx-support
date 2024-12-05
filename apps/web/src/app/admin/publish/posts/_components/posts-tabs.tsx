import { TabsContent } from "@/components/ui/tabs";
import { PostsList } from "@/app/[username]/posts-list";

export const PostsTabs = () => {
	const posts_tabs = ["Published", "Drafted", "Scheduled"];

	return (
		<>
			{posts_tabs.map((tab) => (
				<TabsContent
					value={tab.toLowerCase()}
					key={tab}
					className="flex flex-col gap-4 pt-8"
				>
					<PostsList />
				</TabsContent>
			))}
		</>
	);
};
