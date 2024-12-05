import Link from "next/link";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import type { Category } from "@/types/post";
import NewPost from "./schema";
import makeFetch from "@/lib/fetch";
import CreatePost from "./_components/create-post";

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
		<main className="">
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
			<CreatePost />
			{/* <NewPost categories={categories} /> */}
		</main>
	);
}
