"use client";

import * as React from "react";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@repo/ui/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@repo/ui/components/ui/dropdown-menu";
import {
	ToggleGroup,
	ToggleGroupItem,
} from "@repo/ui/components/ui/toggle-group";

export function ModeToggleDropdown() {
	const { setTheme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon">
					<Sun className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<Moon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => setTheme("light")}>
					Light
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("dark")}>
					Dark
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("system")}>
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export function ModeToggleGroup() {
	const { setTheme, theme } = useTheme();
	const [currentTheme, setCurrentTheme] = React.useState<string>("");

	React.useEffect(() => {
		if (theme === "system") setCurrentTheme("system");
		else if (theme === "dark") setCurrentTheme("dark");
		else if (theme === "light") setCurrentTheme("light");
	}, [theme]);

	return (
		<ToggleGroup
			type="single"
			variant="outline"
			className="scale-90 rounded-full border p-1 w-fit flex gap-3 absolute bottom-8 right-8"
			value={currentTheme}
		>
			<ToggleGroupItem
				value="light"
				onClick={() => setTheme("light")}
				disabled={theme === "light"}
				className="disabled:bg-accent rounded-full disabled:opacity-100"
			>
				<Sun className="size-5" />
			</ToggleGroupItem>
			<ToggleGroupItem
				value="system"
				onClick={() => setTheme("system")}
				disabled={theme === "system"}
				className="disabled:bg-accent rounded-full disabled:opacity-100"
			>
				<Laptop className="size-5" />
			</ToggleGroupItem>
			<ToggleGroupItem
				value="dark"
				onClick={() => setTheme("dark")}
				disabled={theme === "dark"}
				className="disabled:bg-accent rounded-full disabled:opacity-100"
			>
				<Moon className="size-5" />
			</ToggleGroupItem>
		</ToggleGroup>
	);
}
