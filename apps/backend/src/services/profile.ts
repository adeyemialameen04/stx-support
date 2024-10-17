import postgres from "postgres";
import { eq, and } from "drizzle-orm";
import { db } from "~/db";
import { profileTable } from "~/db/schema";
import { InvariantError } from "~/exceptions/errors";

export const profileService = {
  updateUserProfile: async (
    id: string,
    data: Partial<typeof profileTable.$inferInsert>,
  ) => {
    try {
      const { id: _, ...updateData } = data;

      const [updatedProfile] = await db
        .update(profileTable)
        .set({ ...updateData })
        .where(eq(profileTable.id, id))
        .returning();

      return updatedProfile;
    } catch (err) {
      if (err instanceof postgres().PostgresError) {
        if (err.code === "23503") {
          if (err.detail?.includes("user_id")) {
            throw new InvariantError("Invalid User ID");
          }
        }
      }
    }
  },
  isOwner: async (id: string, userId: string) => {
    const profile = await db
      .select()
      .from(profileTable)
      .where(and(eq(profileTable.id, id), eq(profileTable.userId, userId)));

    return profile;
  },

  getProfile: async (id: string) => {
    const user = await db.query.profileTable.findFirst({
      where: eq(profileTable.id, id),
    });

    return user;
  },
};
