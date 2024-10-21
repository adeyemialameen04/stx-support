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
import NewPost from "@/_components/admin/posts/new-post";
import { API_URL } from "@/lib/constants";
import { selectCategorySchema } from "@repo/schemas/index";
import { Category } from "@/types/post";

const getCategories = async () => {
  try {
    const url = `${API_URL}/category/all`;
    const res = await fetch(url, {
      next: {
        revalidate: 0,
      },
    });

    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

export default async function PostPage() {
  const categories: Category[] = await getCategories();

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
