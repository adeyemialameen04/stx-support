import Link from "next/link";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@repo/ui/components/ui/breadcrumb";
import { ContentLayout } from "@/_components/common/admin-panel/content-layout";
import Posts from "./_components/posts";

export default function PostPage() {
	return (
		<ContentLayout title="Publish - Posts">
			<main className="mx-auto max-w-[950px]">
				<Breadcrumb className="mb-6">
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link href="/">Home</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>Posts</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				<h3 className="mb-3 text-2xl font-medium">Create a new post</h3>
				<Posts />
			</main>
		</ContentLayout>
	);
}
