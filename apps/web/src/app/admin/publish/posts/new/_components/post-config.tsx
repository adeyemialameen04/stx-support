import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import type { FormValues } from "./create-post";
import { useCallback, useState } from "react";
import Image from "next/image";
import Tags from "./tags";

interface PostConfigProps {
	form: UseFormReturn<FormValues>;
	isPending: boolean;
	onPublish: () => void;
}

export const PostConfig = ({ form, onPublish, isPending }: PostConfigProps) => {
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	const handleImageChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const file = e.target.files?.[0];
			if (file) {
				const reader = new FileReader();
				reader.onloadend = () => {
					setPreviewUrl(reader.result as string);
				};
				reader.readAsDataURL(file);
				form.setValue("coverImage", file);
			}
		},
		[form],
	);

	const handleRemoveImage = useCallback(() => {
		setPreviewUrl(null);
		form.setValue("coverImage", undefined);
	}, [form]);

	return (
		<Card className="shadow-none  border-transparent justify-between order-1 md:order-2 flex flex-col gap-3 font-dm-sans md:shadow-[-2px_2px_12px_-2px_rgba(16,_24,_40,_0.06),_2px_-2px_16px_-1px_rgba(16,_24,_40,_0.06)] rounded-2xl py-4">
			<CardContent className="flex p-0 md:p-6 flex-col gap-3">
				<FormField
					control={form.control}
					name="coverImage"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<div className="relative h-[180px] border rounded-xl overflow-hidden">
									{previewUrl ? (
										<>
											<Image
												src={previewUrl}
												alt="Cover preview"
												layout="fill"
												objectFit="cover"
											/>
											<Button
												variant={"ghost"}
												size={"icon"}
												className="absolute top-2 right-2 bg-white/50 hover:bg-white/75 transition-colors z-10"
												onClick={handleRemoveImage}
												type="button"
											>
												<X size={15} />
											</Button>
										</>
									) : (
										<div className="flex items-center justify-center h-full text-xl text-neutral-200">
											Add Cover
										</div>
									)}
									<Input
										type="file"
										accept="image/jpeg,image/png,image/webp"
										className="absolute top-0 left-0 bottom-0 right-0 opacity-0 cursor-pointer z-0 h-full w-full"
										onChange={(e) => {
											handleImageChange(e);
											field.onChange(e.target.files?.[0]);
										}}
										onBlur={field.onBlur}
										name={field.name}
										ref={field.ref}
									/>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="category"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Category</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="Sports, Education, Web 3"
									className="rounded-sm"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="tags"
					render={({ field }) => (
						<FormItem className="mb-4">
							<FormLabel>Tags</FormLabel>
							<FormControl>
								<Tags onChange={field.onChange} value={field.value} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* <Separator /> */}
			</CardContent>
			<CardFooter className=" p-0 md:p-6">
				<Button className="w-full" type="submit">
					Post
				</Button>
			</CardFooter>
		</Card>
	);
};
