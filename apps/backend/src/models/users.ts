import { t } from "elysia";
import { insertUserSchema } from "../db/schema/user";

export const UpdateUserModel = t.Omit(insertUserSchema, [
  "id",
  "passwordHash",
  "stxAddressMainnet",
  "userId",
  "createdAt",
  "updatedAt",
]);
