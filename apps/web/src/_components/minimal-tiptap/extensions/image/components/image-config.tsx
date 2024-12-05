"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Ellipsis } from "lucide-react";
import { NodeViewProps } from "@tiptap/core";

const ImageConfig = ({ updateAttributes, node }: NodeViewProps) => {
  const [openPopovers, setOpenPopovers] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [localAttributes, setLocalAttributes] = useState({
    alt: (node.attrs.alt as string) || "",
    title: (node.attrs.title as string) || "",
    width: (node.attrs.width as string) || "",
  });

  const config = [
    {
      title: "Edit Caption",
      popoverTitle: "New Caption text...",
      popoverPlaceholder: "Caption here ...",
      key: "title",
    },
    {
      title: "Edit Alt",
      popoverTitle: "New Alt text...",
      popoverPlaceholder: "Alt text here ...",
      key: "alt",
    },
    {
      title: "Wide Width",
      popoverTitle: "New Image Width here ...",
      popoverPlaceholder: "Image Width here ...",
      key: "width",
    },
  ];

  const togglePopover = (title: string) => {
    setOpenPopovers((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const closePopover = (title: string) => {
    setOpenPopovers((prev) => ({
      ...prev,
      [title]: false,
    }));
  };

  const handleInputChange = (key: string, value: string) => {
    setLocalAttributes((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = (key: string) => {
    // updateAttributes({
    //   [key]: localAttributes[key as keyof typeof localAttributes],
    // });
    updateAttributes({ title: "Hello Im new asf" });
    closePopover(key);
  };

  return (
    <Popover>
      <PopoverTrigger
        asChild
        className="absolute z-[999999999999999999999999999999999999999999999] top-3 right-3"
      >
        <Button
          size="icon"
          variant="outline"
          className="h-[200px] w-[200px] bg-green-200"
        >
          <Ellipsis />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="left" className="p-3">
        <div className="flex flex-col">
          {config.map((item) => (
            <Popover
              key={item.title}
              open={openPopovers[item.title]}
              onOpenChange={() => togglePopover(item.title)}
            >
              <PopoverTrigger asChild>
                <Button size="sm" variant="ghost" className="justify-start">
                  {item.title}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                side="left"
                className="mt-32 w-[20rem] px-4 md:px-7"
              >
                <h5 className="font-dm-sans text-lg text-black">
                  {item.popoverTitle}
                </h5>
                <Input
                  placeholder={item.popoverPlaceholder}
                  className="rounded-xl text-neutral-800 bg-neutral-50 mt-3"
                  value={
                    localAttributes[item.key as keyof typeof localAttributes]
                  }
                  onChange={(e) => handleInputChange(item.key, e.target.value)}
                />
                <div className="justify-end flex gap-4 mt-4">
                  <Button
                    className="border-text-color text-neutral-700 font-medium rounded-full"
                    variant="outline"
                    size="sm"
                    onClick={() => closePopover(item.title)}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    className="bg-cta-primary-normal flex items-center gap-3 rounded-full text-neutral-800 hover:text-white transition-colors duration-300"
                    onClick={() => handleSave(item.key)}
                  >
                    Save
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default ImageConfig;
