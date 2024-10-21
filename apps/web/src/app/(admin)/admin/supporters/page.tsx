import Supporters from "@/_components/admin/supporters/supporters";
import { ContentLayout } from "@/_components/common/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@repo/ui/components/ui/breadcrumb";
import Link from "next/link";

export default function SupportersPage() {
  const earnings = {
    supporters: 0,
    last_30: 10,
    all_time: 200,
  };
  return (
    <ContentLayout title="Supporters">
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
              <BreadcrumbPage>Supporters</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Supporters earnings={earnings} />
      </main>
    </ContentLayout>
  );
}
