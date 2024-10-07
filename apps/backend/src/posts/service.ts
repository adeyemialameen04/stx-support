import { eq } from "drizzle-orm";
import { db } from "../db";
import { postTable } from "../db/schema";

export const postService = {
  getUserPosts: async (id: string) => {
    const posts = db.select().from(postTable).where(eq(postTable.id, id));

    return posts;
  },
};
