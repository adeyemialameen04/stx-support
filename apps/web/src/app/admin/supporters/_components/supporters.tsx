import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BadgeDollarSign, CircleDollarSign, Heart } from "lucide-react";
import SupportersSettings from "./settings";

interface Earnings {
  supporters: number;
  last_30: number;
  all_time: number;
}

export default function Supporters({ earnings }: { earnings: Earnings }) {
  return (
    <Tabs defaultValue="supporters">
      <TabsList className="flex gap-4 justify-start py-6 w-full bg-transparent rounded-none border-b md:gap-7">
        <TabsTrigger
          value="supporters"
          className={`
              !shadow-none !bg-transparent rounded-none 
              relative after:content-[''] after:absolute after:bg-primary
              after:bottom-[-11px] after:left-0 after:h-[1px] after:w-full 
              after:scale-x-0 after:transition-transform after:duration-300 
              data-[state=active]:after:scale-x-100`}
        >
          Supporters
        </TabsTrigger>
        <TabsTrigger
          value="settings"
          className={`
              !shadow-none !bg-transparent rounded-none 
              relative after:content-[''] after:absolute after:bg-primary
              after:bottom-[-11px] after:left-0 after:h-[1px] after:w-full 
              after:scale-x-0 after:transition-transform after:duration-300 
              data-[state=active]:after:scale-x-100`}
        >
          Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent value="supporters" className="pt-5">
        <Card>
          <CardHeader className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <Card className="shadow-sm bg-[rgb(34,34,34)]/[.05]">
              <CardHeader>
                <CardTitle className="text-2xl">
                  {earnings.supporters}
                </CardTitle>
              </CardHeader>
              <CardFooter>
                <CardDescription className="flex items-center font-light">
                  <Heart className="mr-2 w-4 h-4" />
                  {earnings.supporters > 1 ? "Supporter" : "Supporters"}
                </CardDescription>
              </CardFooter>
            </Card>
            <Card className="shadow-sm bg-[rgb(34,34,34)]/[.05]">
              <CardHeader>
                <CardTitle className="text-2xl">
                  {earnings.last_30} STX
                </CardTitle>
              </CardHeader>
              <CardFooter>
                <CardDescription className="flex items-center font-light">
                  <BadgeDollarSign className="mr-2 w-4 h-4" />
                  Last 30 days
                </CardDescription>
              </CardFooter>
            </Card>{" "}
            <Card className="shadow-sm bg-[rgb(34,34,34)]/[.05]">
              <CardHeader>
                <CardTitle className="text-2xl">
                  {earnings.all_time} STX
                </CardTitle>
              </CardHeader>
              <CardFooter>
                <CardDescription className="flex items-center font-light">
                  <CircleDollarSign className="mr-2 w-4 h-4" />
                  All-time
                </CardDescription>
              </CardFooter>
            </Card>
          </CardHeader>
          <CardContent>
            <Card className="p-8">
              <CardContent className="flex flex-col justify-center items-center w-full rounded-md">
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
          </CardContent>
          <Separator />
        </Card>
      </TabsContent>
      <SupportersSettings />
    </Tabs>
  );
}
