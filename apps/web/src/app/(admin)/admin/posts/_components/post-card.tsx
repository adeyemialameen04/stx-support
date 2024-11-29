import { SelectPostSchema } from "@/queries/posts";
import parse from "html-react-parser";
import { Button } from "@repo/ui/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import { Skeleton } from "@repo/ui/components/ui/skeleton";
import { Separator } from "@repo/ui/components/ui/separator";
import { Edit, Ellipsis, Eye, Globe, Pin } from "lucide-react";
import Link from "next/link";
import dayjs from "dayjs";
import DeletePost from "./delete-post";

export default function PostCard({ post }: { post: SelectPostSchema }) {
	const formattedDate = dayjs(post.createdAt).format("MMM D, YYYY [at] hh:mmA");

	return (
		<Card>
			<CardHeader className="flex flex-row justify-between items-center">
				<CardDescription>Posted {formattedDate}</CardDescription>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button size={"icon"} variant={"ghost"}>
							<Ellipsis />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-48" side="bottom">
						<DropdownMenuItem asChild>
							<Button
								className="justify-start p-0 w-full"
								variant={"ghost"}
								asChild
							>
								<Link href={`/admin/posts/view/${post.id}`}>
									<Eye className="mr-2 w-4 h-4" /> View post
								</Link>
							</Button>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem asChild>
							<Button
								className="justify-start p-0 w-full"
								variant={"ghost"}
								asChild
							>
								<Link href={`/admin/posts/edit/${post.id}`}>
									<Edit className="mr-2 w-4 h-4" /> Edit
								</Link>
							</Button>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem asChild>
							<Button className="justify-start p-0 w-full" variant={"ghost"}>
								<Pin className="mr-2 w-4 h-4" /> Pin this post
							</Button>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem asChild>
							<DeletePost id={post.id} />
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</CardHeader>
			<CardContent>
				<CardTitle className="mb-3 text-2xl">{post.title}</CardTitle>
				<CardDescription>{parse(post.content as string)}</CardDescription>
				<Separator className="mt-4" />
			</CardContent>
			<CardFooter className="flex justify-between text-muted-foreground">
				<p className="flex items-center">
					<Globe className="mr-2 w-4 h-4" /> Public
				</p>
				<div className="flex gap-4 sm:gap-8">
					<p className="flex gap-2 items-center text-sm font-light">
						{/* {post.like} Like */}
					</p>
					<p className="flex gap-2 items-center text-sm font-light">
						{/* {post.comment} Comment */}
					</p>
				</div>
			</CardFooter>
		</Card>
	);
}

export const PostSkeleton = () => {
	return (
		<Skeleton className="flex flex-col">
			<CardHeader className="flex flex-row justify-between items-center">
				<Skeleton className="w-32 h-5" />
				<Button size={"icon"} variant={"ghost"} disabled>
					<Ellipsis />
				</Button>
			</CardHeader>
			<CardContent className="">
				<Skeleton className="mb-3 w-52 h-8" />
				<Skeleton className="w-40 h-6" />
				<Separator className="mt-4" />
			</CardContent>
			<CardFooter className="flex justify-between text-muted-foreground">
				<p className="flex items-center">
					<Globe className="mr-2 w-4 h-4" />{" "}
					<Skeleton className="rounded-full size-4" />
				</p>
				<div className="flex gap-4 sm:gap-8">
					<p className="flex gap-2 items-center text-sm font-light">
						<Skeleton className="rounded-full size-4" /> Like
					</p>
					<p className="flex gap-2 items-center text-sm font-light">
						<Skeleton className="rounded-full size-4" /> Comment
					</p>
				</div>
			</CardFooter>
		</Skeleton>
	);
};
