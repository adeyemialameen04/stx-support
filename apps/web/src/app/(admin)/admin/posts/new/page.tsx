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
import { API_URL } from "@/lib/constants";
import type { Category } from "@/types/post";
import NewPost from "./_components/new-post";
import makeFetch from "@/lib/fetch";

const getCategories = async () => {
	try {
		return await makeFetch("/category/all", null, {
			next: {
				revalidate: 0,
			},
		})();
	} catch (err) {
		console.log(err);
	}
};

export default async function PostPage() {
	const categories: Category[] = await getCategories();
	console.log(categories);

	return (
		<ContentLayout title="Publish - Posts - New">
			<main className="max-w-[700px]">
				<Breadcrumb className="mb-6">
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link href="/">Home</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink href="/admin/posts">Posts</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>New</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				<h3 className="mb-3 text-2xl font-medium">Create a new post</h3>
				<NewPost categories={categories} />
			</main>
		</ContentLayout>
	);
}
