import { and, eq } from "drizzle-orm";
import postgres from "postgres";
import { db } from "../db";
import { commentTable } from "../db/schema";
import { InvariantError } from "../exceptions/errors";
import type { CreateCommentModel } from "../models/posts";

type Comment = typeof CreateCommentModel.static;

export const commentService = {
	// getUserComments: async (id: string) => {
	//   const posts = await db
	//     .select()
	//     .from(postTable)
	//     .where(eq(postTable.userId, id))
	//     .orderBy(
	//       desc(sql`GREATEST(${postTable.createdAt}, ${postTable.updatedAt})`),
	//     );
	//
	//   return posts;
	// },

	createComment: async (data: Comment, userId: string) => {
		try {
			const [comment] = await db
				.insert(commentTable)
				.values({ ...data, userId })
				.returning();

			return comment;
		} catch (err) {
			if (err instanceof postgres.PostgresError) {
				if (err.code === "23503") {
					if (err.detail?.includes("category_id")) {
						throw new InvariantError("Invalid category ID");
					}
					if (err.detail?.includes("user_id")) {
						throw new InvariantError("Invalid User ID");
					}
				}
			}
		}
	},

	// checkPostExist: async (id: string) => {
	//   const [post] = await db
	//     .select()
	//     .from(postTable)
	//     .where(eq(postTable.id, id));
	//
	//   return post;
	// },

	updateComment: async (
		id: string,
		data: Partial<typeof commentTable.$inferInsert>,
	) => {
		try {
			const { userId: _, ...updateData } = data;

			const [updatedComment] = await db
				.update(commentTable)
				.set({ ...updateData })
				.where(eq(commentTable.id, id))
				.returning();

			return updatedComment;
		} catch (err) {
			if (err instanceof postgres.PostgresError) {
				console.error(err);
				if (err.code === "23503") {
					if (err.detail?.includes("user_id")) {
						throw new InvariantError("Invalid User ID");
					}
				}
			}
		}
	},

	isCommentOwner: async (id: string, userId: string) => {
		const comment = await db
			.select()
			.from(commentTable)
			.where(and(eq(commentTable.id, id), eq(commentTable.userId, userId)));

		return comment;
	},

	deleteComment: async (id: string) => {
		return await db
			.delete(commentTable)
			.where(eq(commentTable.id, id))
			.returning();
	},
};
