import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Separator } from "@repo/ui/components/ui/separator";
import { Heart, Lock, NotepadText, Share, ShoppingBag } from "lucide-react";
import { RoundedImage } from "../image";
import { user_info } from "@/data/mock/user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";

const more_ways = [
  {
    icon: Lock,
    title: "membership",
    desc: "Monthly membership for your biggesst fans and supporters",
    href: "",
  },
  {
    icon: ShoppingBag,
    title: "Shop",
    desc: "A creative way to auction/sell",
    href: "",
  },
  {
    icon: NotepadText,
    title: "Exclusive posts",
    desc: "Publish your best content for your supporters and members",
    href: "",
  },
];

export default function Dashboard() {
  return (
    <main className="grid items-start gap-4 sm:py-0 md:gap-8">
      <Card className="sm:px-5 py-3">
        <CardHeader className="flex justify-between gap-3 sm:flex-row">
          <div className="flex gap-4">
            <RoundedImage
              src={user_info.profile_pic}
              alt="User profile pic"
              size={80}
            />
            <div>
              <CardTitle className="text-xl sm:text-2xl">
                {user_info.name}
              </CardTitle>
              <CardDescription className="text-base truncate max-w-[110px]">
                <Button variant={"link"} asChild className="p-0">
                  <a
                    href={`https://stx-support.tech/${user_info.username}`}
                    target="_blank"
                  >
                    stx-support.tech/{user_info.username}
                  </a>
                </Button>
              </CardDescription>
            </div>
          </div>
          <Button className="rounded-full">
            <Share className="mr-2 h-4 w-4" /> Share Page
          </Button>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Separator />
          <div className="flex items-center gap-4">
            <p className="font-semibold text-xl">Earnings</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"outline"} className="rounded-full">
                  Last 30 days
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem>Last 30 days</DropdownMenuItem>
                <DropdownMenuItem>Last 90 days</DropdownMenuItem>
                <DropdownMenuItem>All time</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-3">
          <p className="font-bold text-4xl">3 STX</p>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex gap-1 items-center">
              <span className="h-3 w-3 rounded-sm bg-yellow-400"></span>
              <span className="text-xs">0 stx</span>
              <span className="text-xs">Supporters</span>
            </div>
            <div className="flex gap-1 items-center">
              <span className="h-3 w-3 rounded-sm bg-pink-300"></span>
              <span className="text-xs">0 stx</span>
              <span className="text-xs">Membership</span>
            </div>{" "}
            <div className="flex gap-1 items-center">
              <span className="h-3 w-3 rounded-sm bg-blue-400"></span>
              <span className="text-xs">0 stx</span>
              <span className="text-xs">Shop</span>
            </div>
          </div>
        </CardFooter>
      </Card>
      <Card className="p-8">
        <CardContent className="rounded-md border flex flex-col justify-center items-center w-full">
          <CardHeader className="rounded-full p-4 bg-accent">
            <Heart />
          </CardHeader>
          <CardDescription className="text-lg">
            You don&apos;t have any supporters yet
          </CardDescription>
          <CardFooter>
            Share your page with your audience to get started.
          </CardFooter>
        </CardContent>
      </Card>
      <div>
        <h3 className="text-xl font-semibold mb-3">More ways to earn</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {more_ways.map((item, index) => (
            <Card key={index} className="flex flex-col gap-1">
              <CardHeader>{<item.icon />}</CardHeader>
              <CardContent>
                <CardTitle className="capitalize mb-3">{item.title}</CardTitle>
                <CardDescription>{item.desc}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button
                  variant={"outline"}
                  className="w-full rounded-full py-7"
                >
                  Enable
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
