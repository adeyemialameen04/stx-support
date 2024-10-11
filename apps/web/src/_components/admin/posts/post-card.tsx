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
import { Edit, Ellipsis, Eye, Globe, Pin, Trash } from "lucide-react";
import Link from "next/link";
import dayjs from "dayjs";
import { deletePost } from "@/actions/posts";
import DeletePost from "./delete-post";

export default function PostCard({ post }: { post: SelectPostSchema }) {
  const formattedDate = dayjs(post.createdAt).format("MMM D, YYYY [at] hh:mmA");

  return (
    <Card>
      <CardHeader className="flex justify-between items-center flex-row">
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
                className="p-0 w-full justify-start"
                variant={"ghost"}
                asChild
              >
                <Link href={`/admin/posts/view/${post.id}`}>
                  <Eye className="mr-2 h-4 w-4" /> View post
                </Link>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Button
                className="p-0 w-full justify-start"
                variant={"ghost"}
                asChild
              >
                <Link href={`/admin/posts/edit/${post.id}`}>
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Link>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Button className="p-0 w-full justify-start" variant={"ghost"}>
                <Pin className="mr-2 h-4 w-4" /> Pin this post
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
          <Globe className="mr-2 h-4 w-4" /> Public
        </p>
        <div className="flex gap-4 sm:gap-8">
          <p className="flex items-center gap-2 font-light text-sm">
            {/* {post.like} Like */}
          </p>
          <p className="flex items-center gap-2 font-light text-sm">
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
      <CardHeader className="flex justify-between items-center flex-row">
        <Skeleton className="h-5 w-32" />
        <Button size={"icon"} variant={"ghost"} disabled>
          <Ellipsis />
        </Button>
      </CardHeader>
      <CardContent className="">
        <Skeleton className="h-8 w-52 mb-3" />
        <Skeleton className="h-6 w-40" />
        <Separator className="mt-4" />
      </CardContent>
      <CardFooter className="flex justify-between text-muted-foreground">
        <p className="flex items-center">
          <Globe className="mr-2 h-4 w-4" />{" "}
          <Skeleton className="size-4 rounded-full" />
        </p>
        <div className="flex gap-4 sm:gap-8">
          <p className="flex items-center gap-2 font-light text-sm">
            <Skeleton className="size-4 rounded-full" /> Like
          </p>
          <p className="flex items-center gap-2 font-light text-sm">
            <Skeleton className="size-4 rounded-full" /> Comment
          </p>
        </div>
      </CardFooter>
    </Skeleton>
  );
};
