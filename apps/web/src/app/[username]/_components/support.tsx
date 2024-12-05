"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { UserSchema } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { sendSTXTransaction } from "@/lib/stx";
import makeFetch from "@/lib/fetch";
import type { ApiResponse } from "@/types";
import { selectSupportTransaction } from "@repo/schemas/support";
import { toast } from "sonner";
import { user_info } from "@/data/mock/user";
import { useState } from "react";
import SubmitButton from "@/_components/submit-btn";
type SupportTransaction = typeof selectSupportTransaction.static;
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
	const [isLoading, setIsLoading] = useState(false);
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
		setIsLoading(true);
		try {
			const txId = await sendSTXTransaction(
				values.amount.toString(),
				"Testnet",
				"STQ9B3SYFV0AFYY96QN5ZJBNGCRRZCCMFG51G1WJ",
			);
			const res = await makeFetch<ApiResponse<SupportTransaction>>(
				"/support",
				null,
				{
					method: "POST",
					body: {
						name: values.social,
						message: values.message,
						amount: values.amount,
						stxAddress: "lollll",
						isPrivate: values.private,
						txId,
						donatedTo: "d9ec3706-caa9-42ba-a870-8960d2d73d49",
					},
				},
			)();
			if (res.status === "Created") {
				toast.success(`You Supported ${user_info.name}`);
			}
			console.log(res);
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading(false);
		}
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
				<SubmitButton
					isLoading={isLoading}
					className="					py-5 rounded-full
"
				>
					Support {form.watch("amount")}STX
				</SubmitButton>
			</form>
		</Form>
	);
};
