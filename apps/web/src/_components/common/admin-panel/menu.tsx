"use client";
import Link from "next/link";
import { Ellipsis } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { getMenuList } from "@/lib/menu-list";
import { Button } from "@repo/ui/components/ui/button";
import { ScrollArea } from "@repo/ui/components/ui/scroll-area";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@repo/ui/components/ui/tooltip";
import { CollapseMenuButton } from "./collapse-menu-button";

interface MenuProps {
  isOpen: boolean | undefined;
}

export function Menu({ isOpen }: MenuProps) {
  const pathname = usePathname();
  const menuList = getMenuList(pathname);

  return (
    <ScrollArea className="[&>div>div[style]]:!block pr-2">
      <nav className="mt-8 h-full w-full overflow-y-hidden">
        <ul className="flex pb-2 lg:pb-0 flex-col  min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-2">
          {menuList.map(({ groupLabel, menus }, index) => (
            <li className={cn("w-full", groupLabel ? "pt-5" : "")} key={index}>
              {(isOpen && groupLabel) || isOpen === undefined ? (
                <p className="text-sm font-medium px-4 pb-2 max-w-[248px] truncate">
                  {groupLabel}
                </p>
              ) : !isOpen && isOpen !== undefined && groupLabel ? (
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger className="w-full">
                      <div className="w-full flex justify-center items-center">
                        <Ellipsis className="h-5 w-5" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{groupLabel}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <p className="pb-2"></p>
              )}
              {menus.map(
                ({ href, label, icon: Icon, active, submenus }, index) =>
                  submenus.length === 0 ? (
                    <div className="w-full" key={index}>
                      <TooltipProvider disableHoverableContent>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            <Button
                              variant={active ? "secondary" : "ghost"}
                              className={cn(
                                "w-full justify-start h-10 mb-1",
                                // active && "!text-[#EF3133]",
                              )}
                              asChild
                            >
                              <Link href={href}>
                                <span
                                  className={cn(isOpen === false ? "" : "mr-4")}
                                >
                                  <Icon size={18} />
                                </span>
                                <p
                                  className={cn(
                                    "max-w-[200px] truncate",
                                    isOpen === false
                                      ? "-translate-x-96 opacity-0"
                                      : "translate-x-0 opacity-100",
                                  )}
                                >
                                  {label}
                                </p>
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          {isOpen === false && (
                            <TooltipContent side="right">
                              {label}
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ) : (
                    <div className="w-full" key={index}>
                      <CollapseMenuButton
                        icon={Icon}
                        label={label}
                        active={active}
                        //@ts-expect-error An error would occur here
                        submenus={submenus}
                        isOpen={isOpen}
                      />
                    </div>
                  ),
              )}
            </li>
          ))}
          <li className="w-full grow flex items-end">
            <TooltipProvider disableHoverableContent>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  {/* <SignOut */}
                  {/*   action={() => { */}
                  {/*     toast.success("Signed Out successfull", { */}
                  {/*       richColors: true, */}
                  {/*       position: "top-right", */}
                  {/*     }); */}
                  {/*     setTimeout(() => { */}
                  {/*       logout(); */}
                  {/*     }, 700); */}
                  {/*   }} */}
                  {/* > */}
                  {/*   <Button */}
                  {/*     variant="outline" */}
                  {/*     className="w-full justify-center h-10 mt-5 text-[#EF3133]" */}
                  {/*   > */}
                  {/*     <span className={cn(isOpen === false ? "" : "mr-4")}> */}
                  {/*       <LogOut size={18} /> */}
                  {/*     </span> */}
                  {/*     <p */}
                  {/*       className={cn( */}
                  {/*         "whitespace-nowrap", */}
                  {/*         isOpen === false ? "opacity-0 hidden" : "opacity-100", */}
                  {/*       )} */}
                  {/*     > */}
                  {/*       Sign out */}
                  {/*     </p> */}
                  {/*   </Button> */}
                  {/* </SignOut> */}
                </TooltipTrigger>

                {isOpen === false && (
                  <TooltipContent side="right">Sign out</TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </li>
        </ul>
      </nav>
    </ScrollArea>
  );
}