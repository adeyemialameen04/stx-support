import { Heart, Lock, NotepadText, Share, ShoppingBag } from "lucide-react";
import { user_info } from "@/data/mock/user";

import { RoundedImage } from "@/_components/image";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import {
	Separator,
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";

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
		<main className="grid gap-4 items-start sm:py-0 md:gap-8">
			<Card className="py-3 sm:px-5">
				<CardHeader className="flex gap-3 justify-between sm:flex-row">
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
										rel="noreferrer"
									>
										stx-support.tech/{user_info.username}
									</a>
								</Button>
							</CardDescription>
						</div>
					</div>
					<Button className="rounded-full">
						<Share className="mr-2 w-4 h-4" /> Share Page
					</Button>
				</CardHeader>
				<CardContent className="flex flex-col gap-4">
					<Separator />
					<div className="flex gap-4 items-center">
						<p className="text-xl font-semibold">Earnings</p>
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
				<CardFooter className="flex flex-col gap-3 items-start">
					<p className="text-4xl font-bold">3 STX</p>
					<div className="flex flex-wrap gap-4 items-center">
						<div className="flex gap-1 items-center">
							<span className="w-3 h-3 bg-yellow-400 rounded-sm" />
							<span className="text-xs">0 stx</span>
							<span className="text-xs">Supporters</span>
						</div>
						<div className="flex gap-1 items-center">
							<span className="w-3 h-3 bg-pink-300 rounded-sm" />
							<span className="text-xs">0 stx</span>
							<span className="text-xs">Membership</span>
						</div>{" "}
						<div className="flex gap-1 items-center">
							<span className="w-3 h-3 bg-blue-400 rounded-sm" />
							<span className="text-xs">0 stx</span>
							<span className="text-xs">Shop</span>
						</div>
					</div>
				</CardFooter>
			</Card>
			<Card className="p-8">
				<CardContent className="flex flex-col justify-center items-center w-full rounded-md border">
					<CardHeader className="p-4 rounded-full bg-accent">
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
				<h3 className="mb-3 text-xl font-semibold">More ways to earn</h3>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					{more_ways.map((item) => (
						<Card key={item.title} className="flex flex-col gap-1">
							<CardHeader>{<item.icon />}</CardHeader>
							<CardContent>
								<CardTitle className="mb-3 capitalize">{item.title}</CardTitle>
								<CardDescription>{item.desc}</CardDescription>
							</CardContent>
							<CardFooter>
								<Button
									variant={"outline"}
									className="py-7 w-full rounded-full"
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
