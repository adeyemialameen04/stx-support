import ImageChange from "@/_components/profile/image-change";
import Support from "@/_components/profile/support";
import { Button } from "@repo/ui/components/ui/button";
import { Card, CardContent, CardHeader } from "@repo/ui/components/ui/card";
import { Input } from "@repo/ui/components/ui/input";
import { user_info } from "@/data/mock/user";
import { PostsList } from "./posts-list";

export default async function UserPage() {
  return (
    <main>
      <ImageChange />
      <div className="px-4 font-circular-medium max-w-[950px] mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Support user={user_info} />
        <div className="flex flex-col gap-3">
          <PostsList />
        </div>
        <Card>
          <CardHeader className="flex">
            Follow <span className="text-blue-400">Al-Ameen Adeyemi</span>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Input
              placeholder="Name or @yoursocial (optional)"
              className="rounded-md"
            />
            <Input placeholder="Enter your email" className="rounded-md" />
            <Button className="rounded-full py-5">Follow</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
