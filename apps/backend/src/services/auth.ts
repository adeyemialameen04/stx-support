import { eq } from "drizzle-orm";
import { db } from "../db";
import { userTable } from "../db/schema";

export const authService = {
	isUserExist: async (stxAddressMainnet: string) => {
		const existingUser = await db.query.userTable.findFirst({
			where: eq(userTable.stxAddressMainnet, stxAddressMainnet),
			with: {
				profile: {
					columns: {
						id: true,
					},
				},
			},
		});

		return {
			...existingUser,
			profile: {
				id: existingUser?.profile.id,
			},
		};
	},
};
