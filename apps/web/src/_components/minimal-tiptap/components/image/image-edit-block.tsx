import * as React from "react";
import type { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ImageEditBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  editor: Editor;
  close: () => void;
}

const ImageEditBlock = ({
  editor,
  className,
  close,
  ...props
}: ImageEditBlockProps) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [link, setLink] = React.useState<string>("");
  const [title, setTitle] = React.useState<string>("");
  const [alt, setAlt] = React.useState<string>("");
  const [caption, setCaption] = React.useState<string>("");

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleLink = () => {
    editor.chain().focus().setImage({ src: link, alt, title }).run();
    close();
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      editor.chain().focus().setImage({ src, alt, title }).run();
    };

    reader.readAsDataURL(files[0]);

    close();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleLink();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={cn("space-y-6", className)} {...props}>
        <div className="space-y-1">
          <Label>Image URL</Label>
          <div className="flex">
            <Input
              type="url"
              required
              placeholder="https://example.com/image.jpg"
              value={link}
              className="grow"
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-1">
          <Label>Title</Label>
          <Input
            type="text"
            placeholder="Image title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <Label>Alt Text</Label>
          <Input
            type="text"
            placeholder="Image alt text"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <Label>Caption</Label>
          <Input
            type="text"
            placeholder="Image caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full">
          Insert Image
        </Button>
        <Button className="w-full" onClick={handleClick}>
          Upload from your computer
        </Button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          multiple
          className="hidden"
          onChange={handleFile}
        />
      </div>
    </form>
  );
};

export { ImageEditBlock };
