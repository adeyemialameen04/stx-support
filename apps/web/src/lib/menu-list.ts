import {
  LayoutGrid,
  LucideIcon,
  ShoppingCart,
  PanelLeft,
  Heart,
  Lock,
  Pen,
  Book,
  Images,
  Mail,
  Terminal,
  CircleDollarSign,
  Zap,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
  icon?: LucideIcon;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/admin/dashboard",
          label: "Home",
          active: pathname === "/admin/dashboard",
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "/username",
          label: "View Page",
          active: pathname === "/analytics",
          icon: PanelLeft,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Monetize",
      menus: [
        {
          href: "/admin/supporters",
          label: "Supporters",
          active: pathname.includes("/admin/supporters"),
          icon: Heart,
          submenus: [],
        },
        {
          href: "/membership",
          label: "Memberships",
          active: pathname.includes("/tickets"),
          icon: Lock,
          submenus: [],
        },
        {
          href: "/shop",
          label: "Shop",
          active: pathname.includes("/shop"),
          icon: ShoppingCart,
          submenus: [],
        },
        {
          href: "",
          label: "Publish",
          active: pathname.includes("/products"),
          icon: Pen,
          submenus: [
            {
              href: "/admin/posts",
              label: "Posts",
              active: pathname === "/admin/posts",
              icon: Book,
            },
            {
              href: "/admin/gallery",
              label: "Gallery",
              active: pathname === "/admin/gallery",
              icon: Images,
            },
            {
              href: "/admin/messages",
              label: "Messages",
              active: pathname === "/admin/messages",
              icon: Mail,
            },
          ],
        },
      ],
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/admin/button-and-graphics",
          label: "Button & Graphics",
          active: pathname.includes("/admin/button-and-graphics"),
          icon: Terminal,
          submenus: [],
        },
        {
          href: "/admin/integrations",
          label: "Integrations",
          active: pathname.includes("/admin/integrations"),
          icon: Zap,
          submenus: [],
        },
        {
          href: "/admin/payouts",
          label: "Payouts",
          active: pathname.includes("/admin/payouts"),
          icon: CircleDollarSign,
          submenus: [],
        },
      ],
    },
  ];
}
