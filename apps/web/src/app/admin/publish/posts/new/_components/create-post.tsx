"use client";
import type { z } from "zod";
import PostEditor from "./editor";
import { PostConfig } from "./post-config";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
// import { postBlogAction } from "@/actions/blog";
import { useServerAction } from "zsa-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { formSchema } from "../schema";
import { useState } from "react";

export type FormValues = z.infer<typeof formSchema>;
const tags = [
	{
		id: "1",
		text: "Sport",
	},
	{
		id: "2",
		text: "Coding",
	},
	{
		id: "3",
		text: "Travel",
	},
];
const CreatePost = () => {
	const [isPending, setIsPending] = useState(false);
	// const { execute, isPending } = useServerAction(postBlogAction);
	// const router = useRouter();

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "Test Title",
			content: "Just testing the content",
			// tags: "Hello Hi Sup",
			category: "Football",
			tags,
		},
	});
	const onSubmit = async (values: FormValues) => {
		console.log(values);
		// const formData = new FormData();
		// if (values.coverImage) {
		// 	formData.append("file", values.coverImage);
		// }
		// const [data, err] = await execute({
		// 	fileWrapper: formData,
		// 	status: "published",
		// 	category: values.category,
		// 	tags: values.tags,
		// 	content: values.content,
		// 	title: values.title,
		// });
		//
		// console.log(data);
		// if (data?.statusCode === 201) {
		// 	toast.success("Post Created Successfully");
		// 	router.push("/");
		// }
		//
		// if (err) {
		// 	console.error(err);
		// }
		//
		// form.reset();
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr] mt-8 gap-5 w-full">
					<PostEditor form={form} />
					<PostConfig
						isPending={isPending}
						form={form}
						onPublish={form.handleSubmit(onSubmit)}
					/>
				</div>
			</form>
		</Form>
	);
};

export default CreatePost;
