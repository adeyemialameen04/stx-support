"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { StacksTestnet, StacksMainnet } from "@stacks/network";
import { canRegisterName } from "@stacks/bns";

const formSchema = z.object({
	bnsName: z.string().min(2).max(10),
});

export default function GETBns() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});
	const network = new StacksTestnet();

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const result = await canRegisterName({
			fullyQualifiedName: values.bnsName,
			network,
		});
		console.log(result);
		toast.success(result ? "Its available" : "Someone else has used it");
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8 max-w-3xl mx-auto py-10"
			>
				<FormField
					control={form.control}
					name="bnsName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Bns Name</FormLabel>
							<FormControl>
								<Input placeholder="" type="text" {...field} />
							</FormControl>
							<FormDescription>
								This is going to be your unique name with the .btc domain.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}
