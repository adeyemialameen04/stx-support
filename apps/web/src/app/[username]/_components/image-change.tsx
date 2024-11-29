"use client";
import { Button } from "@repo/ui/components/ui/button";
import Image from "next/image";
import { useRef, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import { Separator } from "@repo/ui/components/ui/separator";
import { cn } from "@/lib/utils";
import SharePage from "./share";
import { FillImage } from "@/_components/image";

const formSchema = z.object({
	image: z.instanceof(File).optional(),
	cover_image: z.instanceof(File).optional(),
});

export default function ImageChange() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {},
	});
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result as string);
			};
			reader.readAsDataURL(file);
			form.setValue("image", file);
		} else {
			setImagePreview(null);
			form.setValue("image", undefined);
		}
	};

	async function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-4 w-full"
			>
				<div className="relative h-48 rounded-b-lg md:h-72">
					<SharePage username="ME" name="Al-Ameen Adeyemi" />
					<FormField
						control={form.control}
						name="image"
						render={({ field }) => (
							<FormItem className={cn(imagePreview && "hidden")}>
								<FormControl>
									<div className="flex gap-2 items-center">
										<Input
											type="file"
											accept="image/*"
											onChange={(e) => {
												handleImageChange(e);
												field.onChange(e.target.files?.[0]);
											}}
											ref={fileInputRef}
											className="hidden"
										/>
										<Button
											type="button"
											variant={"secondary"}
											className="absolute top-6 right-6 z-20 text-muted-foreground"
											onClick={() => fileInputRef.current?.click()}
										>
											Change Cover
										</Button>
										{field.value && (
											<span className="text-sm">
												{(field.value as File).name}
											</span>
										)}
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{imagePreview && (
						<div className="flex absolute top-6 right-6 z-20 text-muted-foreground">
							<Button variant={"secondary"} type="submit">
								Save Changes
							</Button>
							<Separator orientation="vertical" />
							<Button
								variant={"secondary"}
								type="button"
								onClick={() => {
									setImagePreview(null);
									form.reset();
								}}
							>
								Cancel
							</Button>
						</div>
					)}
					{/* <Button */}
					{/*   variant={"secondary"} */}
					{/*   className="absolute top-6 right-6 z-20 text-muted-foreground" */}
					{/* > */}
					{/*   Change cover */}
					{/* </Button> */}
					<Image
						src={imagePreview ?? "/profile-pic.png"}
						layout="fill"
						className="object-cover w-full"
						alt="cover"
					/>
					<div className="absolute flex items-center flex-col bottom-[-30px] left-[50%] right-[50%]">
						<FillImage
							src="/profile-pic.png"
							size={95}
							alt="Profile pic"
							className="outline-white outline-2"
						/>
					</div>
				</div>
			</form>
		</Form>
	);
}
