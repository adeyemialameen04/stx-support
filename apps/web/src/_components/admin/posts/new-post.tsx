"use client";
import { Editor } from "@tiptap/core";
import { MinimalTiptapEditor } from "@/_components/minimal-tiptap";
import { cn } from "@/lib/utils";
import { Button } from "@repo/ui/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { useRef, useCallback } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@repo/ui/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { Globe, Heart } from "lucide-react";
import { Category } from "@/types/post";

export const formSchema = z.object({
  content: z
    .string({
      required_error: "Description is required",
    })
    .min(1, "Description is required"),
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(1, "Title is required")
    .max(256, "Title can't be more than 256 characters"),
  category: z.string({ required_error: "Category is required" }),
  visibility: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

const NewPost = ({ categories }: { categories: Category[] }) => {
  const editorRef = useRef<Editor | null>(null);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      title: "",
      visibility: "",
      category: "",
    },
  });

  const handleCreate = useCallback(
    ({ editor }: { editor: Editor }) => {
      if (form.getValues("content") && editor.isEmpty) {
        editor.commands.setContent(form.getValues("content"));
      }
      editorRef.current = editor;
    },
    [form],
  );

  const onSubmit = (values: FormValues) => {
    console.log("==Getting values from form==");
    console.log(values);
    console.log("Success: Values retrieved from form");

    // setTimeout(() => {
    //   console.log("==Clearing form==");
    //   form.reset();
    //   console.log("Success: Form cleared");
    // }, 1000);

    // setTimeout(() => {
    //   console.log("==Clearing editor==");
    //   editorRef.current?.commands.clearContent();
    //   console.log("Success: Editor cleared");
    // }, 2000);

    // setTimeout(() => {
    //   console.log("==Resetting editor==");
    //   editorRef.current?.commands.setContent("");
    //   console.log("Success: Editor reset");
    // }, 3000);

    // setTimeout(() => {
    //   console.log("==Setting editor content==");
    //   editorRef.current?.commands.setContent(values.description);
    //   console.log("Success: Editor content set");
    // }, 4000);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input className="" placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Description</FormLabel>
              <FormControl>
                <MinimalTiptapEditor
                  {...field}
                  throttleDelay={0}
                  className={cn("w-full", {
                    "border-destructive focus-within:border-destructive":
                      form.formState.errors.content,
                  })}
                  editorContentClassName="some-class"
                  output="html"
                  placeholder="Type your description here..."
                  onCreate={handleCreate}
                  autofocus={true}
                  immediatelyRender={true}
                  editable={true}
                  injectCSS={true}
                  editorClassName="focus:outline-none p-5"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="visibility"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Who can see this post?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Visibility" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="public">
                      <div className="flex items-center">
                        <Globe className="mr-2 h-4 w-4" />
                        Public
                      </div>
                    </SelectItem>
                    <SelectItem value="supporters">
                      <div className="flex items-center">
                        <Heart className="mr-2 h-4 w-4" />
                        Supporters
                      </div>
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          name="category"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Visibility" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id as string}
                        className="capitalize"
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="lg" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};
export default NewPost;
