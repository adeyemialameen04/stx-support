import { Button } from "@repo/ui/components/ui/button";
import { Button as EnhancedButton } from "@repo/ui/components/ui/enhanced-button";
import {
  Credenza,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@repo/ui/components/ui/credenza";
import { Input } from "@repo/ui/components/ui/input";
import { Separator } from "@repo/ui/components/ui/separator";
import { Copy, Facebook, Mail, QrCode, Twitter, Upload } from "lucide-react";

const socials = [
  {
    icon: Twitter,
    title: "Twitter",
    href: "",
  },
  {
    icon: Facebook,
    title: "Facebook",
    href: "",
  },
  {
    icon: Mail,
    title: "Email",
    href: "",
  },
  {
    icon: QrCode,
    title: "QR code",
    href: "",
  },
];

export default function SharePage({
  username,
  name,
}: {
  username: string;
  name: string;
}) {
  return (
    <Credenza>
      <CredenzaTrigger asChild className="absolute bottom-[-40px] right-4 z-40">
        <Button variant={"ghost"} size={"icon"}>
          <Upload className="text-muted-foreground h-5 w-5" />
        </Button>
      </CredenzaTrigger>

      <CredenzaContent className="">
        <CredenzaHeader className="my-3">
          <CredenzaTitle className="text-center">
            Share {name}&apos;s page
          </CredenzaTitle>
        </CredenzaHeader>
        <div className="grid grid-cols-2 gap-4">
          {socials.map((item, index) => (
            <Button variant={"outline"} key={index} className="py-6">
              {<item.icon className="mr-3 h-5 w-5" />} {item.title}
            </Button>
          ))}
        </div>
        <Separator className="mt-3" />
        <div className="flex-col flex gap-4">
          <p className="text-lg font-semibold text-center">Share page link</p>
          <div className="flex gap-1 items-center">
            <Input
              readOnly
              defaultValue={`stx-support.vercel.app/${username}`}
              disabled
            />
            <EnhancedButton
              variant={"expandIcon"}
              Icon={Copy}
              iconPlacement="left"
              iconClassname="mr-3 h-4 w-4"
              className="md:min-w-[130px]"
            >
              Copy
            </EnhancedButton>
          </div>
          <div className="py-3 px-6 bg-[rgba(95,127,255)]/[.05] border border-[#5F7FFF] rounded-md">
            <p>
              <span className="font-semibold">Tip:</span> Add this link to your
              social bios.
            </p>
            <div className="flex gap-4 justify-between max-w-[200px] mx-auto mt-3">
              {socials.map((item, index) => (
                <Button variant={"ghost"} size={"icon"} key={index}>
                  {<item.icon />}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CredenzaContent>
    </Credenza>
  );
}
