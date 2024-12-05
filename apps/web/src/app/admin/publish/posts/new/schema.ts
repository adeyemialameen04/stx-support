import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
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
	tags: z
		.array(
			z.object({
				id: z.string(),
				text: z.string(),
			}),
		)
		.min(1, {
			message: "At least one tag is required.",
		}),
	coverImage: z
		.instanceof(File)
		.refine((file) => file.size <= MAX_FILE_SIZE, "Max file size is 5MB.")
		.refine(
			(file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
			"Only .jpg, .png, and .webp formats are supported.",
		)
		.optional(),
});
