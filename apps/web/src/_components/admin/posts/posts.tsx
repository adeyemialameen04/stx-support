import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui/tabs";
import { posts } from "@/data/mock/posts";
import { ChartColumn, Headphones, Image, NotepadText } from "lucide-react";
import Link from "next/link";
import PostCard from "./post-card";
import { Suspense } from "react";
import { PostsTabs } from "./posts-tabs";

const routes = [
  {
    icon: NotepadText,
    title: "Post",
    href: "/posts/new",
  },
  {
    icon: Image,
    title: "Album",
    href: "/posts/gallery",
  },
  {
    icon: Headphones,
    title: "Audio",
    href: "/posts/audio/new",
  },
  {
    icon: ChartColumn,
    title: "Poll",
    href: "/posts/poll",
  },
];

const posts_tabs = ["Published", "Drafted", "Scheduled"];

export default function Posts() {
  // const active
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        {routes.map((item, index) => (
          <Link
            href={`/admin${item.href}`}
            key={index}
            className="hover:scale-[1.08] transition-transform duration-300"
          >
            <Card className="justify-center items-center flex flex-col">
              <CardHeader>{<item.icon />}</CardHeader>
              <CardFooter>
                <CardTitle>{item.title}</CardTitle>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
      <Tabs defaultValue="published">
        <TabsList className="flex gap-4 md:gap-7 w-full bg-transparent border-b py-6 rounded-none justify-start">
          {posts_tabs.map((tab, index) => (
            <TabsTrigger
              key={index}
              value={tab.toLowerCase()}
              className={`
              !shadow-none !bg-transparent rounded-none 
              relative after:content-[''] after:absolute after:bg-primary
              after:bottom-[-11px] after:left-0 after:h-[1px] after:w-full 
              after:scale-x-0 after:transition-transform after:duration-300 
              data-[state=active]:after:scale-x-100`}
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
        <PostsTabs />
        {/* {posts_tabs.map((tab, index) => ( */}
        {/*   <TabsContent */}
        {/*     value={tab.toLowerCase()} */}
        {/*     key={index} */}
        {/*     className="flex flex-col gap-4 pt-8" */}
        {/*   > */}
        {/*     {posts.map((post, index) => ( */}
        {/*       <Suspense key={index}> */}
        {/*         <PostCard post={post} key={index} /> */}
        {/*       </Suspense> */}
        {/*     ))} */}
        {/*   </TabsContent> */}
        {/* ))} */}
      </Tabs>
    </div>
  );
}
