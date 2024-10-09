"use client";
import { MinimalTiptapEditor } from "@/_components/minimal-tiptap";
import { useState } from "react";

export default function NewPost() {
  const [value, setValue] = useState<Content>("");
  return (
    <div className="flex flex-col gap-4">
      <MinimalTiptapEditor
        value={value}
        onChange={setValue}
        className="w-full"
        editorContentClassName="p-5"
        output="html"
        placeholder="Type your description here..."
        autofocus={true}
        editable={true}
        editorClassName="focus:outline-none"
      />
    </div>
  );
}
