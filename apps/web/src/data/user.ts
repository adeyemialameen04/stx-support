import { Book, Bookmark, User } from "lucide-react";

export const links = [
  {
    icon: User,
    text: "Profile",
    href: "/me/profile",
  },
  {
    icon: Bookmark,
    text: "Library",
    href: "/me/bookmarks",
  },
  {
    icon: Book,
    text: "Stories",
    href: "",
  },
];

export const manage = [
  {
    text: "Settings",
    href: "/me/settings",
  },
  {
    text: "refine recommndations",
    href: "",
  },
  {
    text: "Manage publications",
    href: "",
  },
  {
    text: "Help",
    href: "/support",
  },
];
