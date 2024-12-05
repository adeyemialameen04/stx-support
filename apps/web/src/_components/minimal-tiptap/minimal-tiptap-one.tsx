import * as React from "react";
import "./styles/index.css";
import { EditorContent } from "@tiptap/react";
import { Content, Editor } from "@tiptap/react";
import { cn } from "@/lib/utils";
import { ImageBubbleMenu } from "./components/bubble-menu/image-bubble-menu";
import { LinkBubbleMenu } from "./components/bubble-menu/link-bubble-menu";
import SectionTwo from "./components/section/two";
import useMinimalTiptapEditor, {
  UseMinimalTiptapEditorProps,
} from "./hooks/use-minimal-tiptap";
import SectionFive from "./components/section/five";
import SectionOne from "./components/section/one";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import SectionFour from "./components/section/four";
import SectionThree from "./components/section/three";

export interface MinimalTiptapProps
  extends Omit<UseMinimalTiptapEditorProps, "onUpdate"> {
  value?: Content;
  onChange?: (value: Content) => void;
  className?: string;
  editorContentClassName?: string;
}

const Toolbar = ({ editor }: { editor: Editor }) => (
  <div className="w-full border-border p-2">
    <ScrollArea className="w-full">
      <div className="w-max shadow-[-2px_2px_12px_-2px_rgba(16,_24,_40,_0.06),_2px_-2px_16px_-1px_rgba(16,_24,_40,_0.06)] border rounded-xl py-3 px-4 flex flex-nowrap gap-4 items-center bg-modals-and-dropdown border-gainsboro">
        <SectionOne editor={editor} activeLevels={[1, 2, 3]} />
        <SectionThree editor={editor} variant="outline" />
        <SectionTwo
          editor={editor}
          activeActions={[
            "italic",
            "bold",
            "code",
            "strikethrough",
            "clearFormatting",
          ]}
          mainActionCount={5}
        />
        <SectionFour
          editor={editor}
          activeActions={["bulletList", "orderedList"]}
          mainActionCount={2}
        />

        <SectionFive
          editor={editor}
          activeActions={["blockquote", "codeBlock", "horizontalRule"]}
          mainActionCount={3}
        />
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  </div>
);

export const MinimalTiptapOne = React.forwardRef<
  HTMLDivElement,
  MinimalTiptapProps
>(({ value, onChange, className, editorContentClassName, ...props }, ref) => {
  const editor = useMinimalTiptapEditor({
    value,
    onUpdate: onChange,
    ...props,
  });

  if (!editor) {
    return null;
  }

  return (
    <>
      <div
        ref={ref}
        className={cn(
          // focus-within:border-primary
          "flex h-auto min-h-72 w-full flex-col rounded-md border border-input",
          className,
        )}
      >
        <EditorContent
          editor={editor}
          className={cn("minimal-tiptap-editor h-full", editorContentClassName)}
        />
      </div>
      {props.editable && (
        <>
          <LinkBubbleMenu editor={editor} />
          <ImageBubbleMenu editor={editor} />
          <Toolbar editor={editor} />
        </>
      )}
    </>
  );
});

MinimalTiptapOne.displayName = "MinimalTiptapOne";

export default MinimalTiptapOne;
