"use client";

import { Button } from "@repo/ui/components/ui/button";
import {
	Card,
	CardContent,
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
	FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import { Textarea } from "@repo/ui/components/ui/textarea";
import type { UserSchema } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { sendSTXTransaction } from "@/lib/stx";

export default function Support({ user }: { user: UserSchema }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-xl">Buy {user.name} a coffee </CardTitle>
			</CardHeader>
			<CardContent>
				<SupportForm />
			</CardContent>
		</Card>
	);
}

const formSchema = z.object({
	amount: z.number().min(1, "U need to choose an amount").max(7),
	social: z.string().optional(),
	message: z
		.string()
		.min(2, "Message can't be less than 5 characters")
		.max(1000, "Message can't be more than 1000 characters"),
	private: z.boolean().default(false).optional(),
});

const SupportForm = () => {
	const options = [1, 3, 5, 7];

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			amount: 1,
			social: "",
			message: "",
			private: false,
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
		await sendSTXTransaction(
			values.amount.toString(),
			"Testnet",
			"STQ9B3SYFV0AFYY96QN5ZJBNGCRRZCCMFG51G1WJ",
		);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-4 w-full"
			>
				<FormField
					control={form.control}
					name="amount"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<div className="py-3 px-6 bg-[rgba(95,127,255)]/[.05] border border-[rgba(95,127,255)]/[.25] rounded-md flex gap-3 justify-center">
									{options.map((option) => (
										<Button
											key={option}
											variant={field.value === option ? "default" : "outline"}
											onClick={() => field.onChange(option)}
											type="button"
											className="rounded-full"
										>
											{option}
										</Button>
									))}
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="social"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder="Name or @yoursocial (optional)"
									className="rounded-md"
									{...field}
								/>
							</FormControl>
							<FormMessage />
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
									{...field}
								/>
							</FormControl>
							<FormMessage />
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
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="py-5 rounded-full">
					Support {form.watch("amount")}STX
				</Button>
			</form>
		</Form>
	);
};
