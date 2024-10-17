import { db } from "~/db";
import { postTable, userTable } from "~/db/schema";
import { comment } from "~/db/schema/comment";
import { InvariantError } from "~/exceptions/errors";
import { CreatePostModel } from "~/models/posts";
import { and, eq, desc, sql } from "drizzle-orm";
import postgres from "postgres";

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

  getPost: async (id: string) => {
    const post = await db.query.postTable.findFirst({
      where: eq(postTable.id, id),
      columns: { userId: false, categoryId: false },
      with: {
        author: {
          with: {
            profile: {
              columns: {
                createdAt: false,
                updatedAt: false,
                id: false,
                userId: false,
              },
            },
          },
          columns: {
            stxAddressTestnet: false,
            stxAddressMainnet: false,
            btcAddressTestnet: false,
            btcAddressMainnet: false,
            passwordHash: false,
            updatedAt: false,
            createdAt: false,
          },
        },
        comments: {
          with: {
            author: {
              with: {
                profile: {
                  columns: {
                    createdAt: false,
                    updatedAt: false,
                    id: false,
                    userId: false,
                  },
                },
              },
              columns: {
                stxAddressTestnet: false,
                stxAddressMainnet: false,
                btcAddressTestnet: false,
                btcAddressMainnet: false,
                passwordHash: false,
                updatedAt: false,
                createdAt: false,
              },
            },
          },
          columns: {
            userId: false,
            postId: false,
          },
        },
        category: {
          columns: {
            createdAt: false,
            updatedAt: false,
          },
        },
      },
    });

    return post;
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
