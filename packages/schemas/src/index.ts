// backend/src/db/schema
import { insertUserSchema } from "backend/src/db/schema/user";
import { insertPostSchema } from "backend/src/db/schema/post";
import { AuthModel, PayloadModel } from "backend/src/models/auth";
export {
  insertPostSchema,
  AuthModel as authSchema,
  PayloadModel as payloadType,
};
