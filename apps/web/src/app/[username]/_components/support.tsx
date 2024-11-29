"use client";
import { Button } from "@repo/ui/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/ui/card";
import { Checkbox } from "@repo/ui/components/ui/checkbox";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { UserSchema } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { sendSTXTransaction } from "@/lib/stx";

export default function Support({ user }: { user: UserSchema }) {
	const [selected, setSelected] = useState(1);
	const options = [1, 3, 5, 7];

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-xl">Buy {user.name} a coffee </CardTitle>
			</CardHeader>
			<CardContent>
				<div className="py-3 px-6 bg-[rgba(95,127,255)]/[.05] border border-[rgba(95,127,255)]/[.25] rounded-md flex gap-3 justify-center">
					{options.map((option) => (
						<Button
							key={option}
							variant={selected === option ? "default" : "outline"}
							onClick={() => setSelected(option)}
							className="rounded-full"
						>
							{option}
						</Button>
					))}
				</div>
			</CardContent>
			<CardFooter className="">
				{/* /> */}
				<SupportForm selected={selected} />
			</CardFooter>
		</Card>
	);
}
const formSchema = z.object({
	social: z.string().min(2).max(50).optional(),
	message: z
		.string()
		.min(2, "Message can't be less than 2 characters")
		.max(1000, "Message can't be more than 1000 characters")
		.optional(),
	private: z.boolean().default(false).optional(),
});

const SupportForm = ({ selected }: { selected: number }) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			social: "",
			message: "",
			private: false,
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-4 w-full"
			>
				<FormField
					control={form.control}
					name="social"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder="Name or @yoursocial (optional)"
									className="rounded-md"
									onChange={field.onChange}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="message"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Textarea
									placeholder="Say something nice..."
									className="resize-none"
									onChange={field.onChange}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="private"
					render={({ field }) => (
						<FormItem className="flex gap-2 items-center">
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<FormLabel className="pb-1">Make this message private</FormLabel>
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					className="py-5 rounded-full"
					onClick={async () => {
						// alert("Clicked");
						await sendSTXTransaction(
							"10",
							"Testnet",
							"SP2K5WRNKGY77ETSMGFTX9S5KAVXFVF80QJS3ZJ9K",
						);
					}}
				>
					Support {selected}STX
				</Button>
			</form>
		</Form>
	);
};
