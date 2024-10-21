import { Bell, Settings } from "lucide-react";
import { SheetMenu } from "./sheet-menu";
import UserDropdown from "../user-dropdown";

export function Navbar({ title }: { title: string }) {
	return (
		<header className="sticky top-0 z-10 w-full shadow bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
			<div className="flex items-center mx-4 h-14 sm:mx-8">
				<div className="flex flex-1 items-center space-x-4 lg:space-x-0 bg-green">
					<SheetMenu />
					<p>{title}</p>
					{/* <Input placeholder="Search" className="w-full" /> */}
				</div>
				<div className="flex flex-1 gap-2 justify-end items-center space-x-2">
					{/* <UserNav /> */}
					<Settings color="#667085" />
					<Bell color="#667085" />
					<UserDropdown />
				</div>
			</div>
		</header>
	);
}
