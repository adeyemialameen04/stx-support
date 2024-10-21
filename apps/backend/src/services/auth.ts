import { eq } from "drizzle-orm";
import { db } from "../db";
import { userTable } from "../db/schema";

export const authService = {
	isUserExist: async (stxAddressMainnet: string) => {
		const [existingUser] = await db
			.select()
			.from(userTable)
			.where(eq(userTable.stxAddressMainnet, stxAddressMainnet));

		return existingUser;
	},
};
