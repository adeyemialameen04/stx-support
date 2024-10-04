import { Button } from "@repo/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import Link from "next/link";

const routes = [
  {
    title: "View my page",
    href: "/username",
  },
  {
    title: "Dashboard",
    href: "/admin/dashboard",
  },
  {
    title: "Edit Page",
    href: "/admin/profile",
  },
  {
    title: "My account",
    href: "/admin/account",
  },
  {
    title: "Refer",
    href: "/refer",
  },
];

export default function Navbar() {
  return (
    <nav className="py-3 px-4 flex justify-between items-center">
      <span></span>
      <div className="flex gap-4 items-center">
        <Button variant={"link"} asChild>
          <Link href={"/username"}>Home</Link>
        </Button>
        <Button variant={"link"} asChild>
          <Link href={"/username/posts"}>Posts</Link>
        </Button>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={"icon"} variant={"outline"}>
            <Menu />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" sideOffset={14}>
          {routes.map((item, index) => (
            <DropdownMenuItem asChild key={index}>
              <Button
                className="p-0 w-full justify-start"
                variant={"ghost"}
                asChild
              >
                <Link href={item.href}>{item.title}</Link>
              </Button>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
