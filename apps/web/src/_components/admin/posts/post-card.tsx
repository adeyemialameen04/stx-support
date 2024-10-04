import { PostSchema } from "@/types/post";
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
import { Separator } from "@repo/ui/components/ui/separator";
import { Edit, Ellipsis, Eye, Globe, Pin, Trash } from "lucide-react";
import Link from "next/link";

export default function PostCard({ post }: { post: PostSchema }) {
  return (
    <Card>
      <CardHeader className="flex justify-between items-center flex-row">
        <CardDescription>
          Posted at {post.date} at {post.time}
        </CardDescription>
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
                <Link href={"/view"}>
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
                <Link href={"/edit"}>
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
              <Button
                className="p-0 w-full justify-start text-destructive"
                variant={"ghost"}
              >
                <Trash className="mr-2 h-4 w-4" /> Delete
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <CardTitle className="mb-3 text-2xl">{post.title}</CardTitle>
        <CardDescription>{post.desc}</CardDescription>
        <Separator className="mt-4" />
      </CardContent>
      <CardFooter className="flex justify-between text-muted-foreground">
        <p className="flex items-center">
          <Globe className="mr-2 h-4 w-4" /> Public
        </p>
        <div className="flex gap-4 sm:gap-8">
          <p className="flex items-center gap-2 font-light text-sm">
            {post.like} Like
          </p>
          <p className="flex items-center gap-2 font-light text-sm">
            {post.comment} Comment
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
