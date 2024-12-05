import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import type { UseFormReturn } from "react-hook-form";
import type { FormValues } from "./create-post";
import {
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import MinimalTiptapOne from "@/_components/minimal-tiptap/minimal-tiptap-one";

interface PostConfigProps {
	form: UseFormReturn<FormValues>;
}

export default function PostEditor({ form }: PostConfigProps) {
	return (
		<div className="order-2 md:order-1 w-full relative overflow-x-hidden shadow-[-2px_2px_12px_-2px_rgba(16,_24,_40,_0.06),_2px_-2px_16px_-1px_rgba(16,_24,_40,_0.06)] rounded-2xl bg-modals-and-dropdown border h-[743px] flex flex-col items-start justify-start p-6 gap-4 text-left text-base text-gray font-dm-sans">
			<FormField
				control={form.control}
				name="title"
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<Input
								placeholder="Title"
								className="text-2xl px-0 !border-none !outline-none bg-transparent font-bold text-neutral-400"
								{...field}
							/>
						</FormControl>
						<FormMessage className="absolute top-12 left-7" />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name="content"
				render={({ field }) => (
					<>
						<FormControl>
							<MinimalTiptapOne
								throttleDelay={1000}
								immediatelyRender={false}
								className={cn(
									"h-full min-h-0 w-full rounded-xl border shadow-none pt-0",
								)}
								editorContentClassName="overflow-auto h-full"
								output="html"
								placeholder="Start writing ..."
								editable={true}
								editorClassName="!focus:outline-none px-5 py-4 h-full"
								onChange={field.onChange}
								value={"Content that is very loong"}
							/>
						</FormControl>
						<FormMessage />
					</>
				)}
			/>
		</div>
	);
}
