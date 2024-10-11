import { and, eq, desc, sql } from "drizzle-orm";
import { db } from "../db";
import { postTable, userTable } from "../db/schema";
import { CreatePostModel } from "../models/posts";
import postgres from "postgres";
import { InvariantError } from "../exceptions/errors";

type Post = typeof CreatePostModel.static;

export const postService = {
  getUserPosts: async (id: string) => {
    const posts = await db
      .select()
      .from(postTable)
      .where(eq(postTable.userId, id))
      .orderBy(
        desc(sql`GREATEST(${postTable.createdAt}, ${postTable.updatedAt})`),
      );

    return posts;
  },

  createPost: async (data: Post, userId: string) => {
    try {
      const [post] = await db
        .insert(postTable)
        .values({ ...data, userId })
        .returning();

      return post;
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

  checkPostExist: async (id: string) => {
    const [post] = await db
      .select()
      .from(postTable)
      .where(eq(postTable.id, id));

    return post;
  },

  updatePost: async (
    id: string,
    data: Partial<typeof postTable.$inferInsert>,
  ) => {
    try {
      const { userId: _, ...updateData } = data;

      const [updatedPost] = await db
        .update(postTable)
        .set({ ...updateData })
        .where(eq(postTable.id, id))
        .returning();

      return updatedPost;
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

  isPostOwner: async (id: string, userId: string) => {
    const post = await db
      .select()
      .from(postTable)
      .where(and(eq(postTable.id, id), eq(postTable.userId, userId)));

    return post;
  },

  deletePost: async (id: string) => {
    return await db.delete(postTable).where(eq(postTable.id, id)).returning();
  },
};
