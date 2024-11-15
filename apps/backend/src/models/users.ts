import { t } from "elysia";
import { insertProfileSchema } from "../db/schema/profile";
import { insertUserSchema } from "../db/schema/user";

export const UpdateUserModel = t.Omit(insertUserSchema, [
	"id",
	"passwordHash",
	"stxAddressMainnet",
	"userId",
	"createdAt",
	"updatedAt",
]);

export const UpdateProfile = insertProfileSchema;
