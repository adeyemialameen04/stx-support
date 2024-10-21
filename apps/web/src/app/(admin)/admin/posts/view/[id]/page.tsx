import Link from "next/link";
import { getPost } from "@/queries/posts";
import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbSeparator,
	BreadcrumbPage,
} from "@repo/ui/components/ui/breadcrumb";
import { ContentLayout } from "@/_components/common/admin-panel/content-layout";

export default async function PostPage({ params }: { params: { id: string } }) {
	const post = await getPost(params.id);
	console.log(post);
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
							<BreadcrumbPage>Post Id</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				<h3 className="mb-3 text-2xl font-medium">Create a new post</h3>
			</main>
		</ContentLayout>
	);
}
