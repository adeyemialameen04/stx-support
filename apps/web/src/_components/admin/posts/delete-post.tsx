"use client";
import { deletePost } from "@/actions/posts";
import { revalidateTagAction } from "@/actions/revalidate";
import { Button } from "@repo/ui/components/ui/button";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function DeletePost({ id }: { id: string }) {
  const router = useRouter();

  return (
    <form
      action={async () => {
        await deletePost(id);
        router.refresh();
        toast.success("Post deleted successfully", { richColors: true });
        await revalidateTagAction("delete-post");
      }}
    >
      <Button
        className="justify-start px-2 w-full text-destructive"
        variant={"ghost"}
        type="submit"
      >
        <Trash className="mr-2 w-4 h-4" /> Delete
      </Button>
    </form>
  );
}
