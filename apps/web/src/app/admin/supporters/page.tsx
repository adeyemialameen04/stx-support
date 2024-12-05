import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbSeparator,
	BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import Supporters from "./_components/supporters";

export default function SupportersPage() {
	const earnings = {
		supporters: 0,
		last_30: 10,
		all_time: 200,
	};
	return (
		<main className="mx-auto max-w-[950px] w-full">
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
	);
}
