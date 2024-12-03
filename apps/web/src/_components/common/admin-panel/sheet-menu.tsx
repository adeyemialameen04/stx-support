import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Menu } from "./menu";

export function SheetMenu() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="flex flex-col px-3 h-full bg-white border-r-0 sm:w-72"
        side="left"
      >
        <SheetHeader>
          <Button
            className="flex justify-center items-start pt-1"
            variant="link"
            asChild
          >
            <Link href="/dashboard" className="self-start">
              {/* <PanelsTopLeft className="mr-1 w-6 h-6" color="#fff" /> */}
              {/* <h1 className="text-lg font-bold">XKart</h1> */}
              <Image
                width={130}
                height={40}
                alt="Logo"
                src={"/sheet-logo.png"}
              />
            </Link>
          </Button>
        </SheetHeader>
        <Menu isOpen />
      </SheetContent>
    </Sheet>
  );
}
