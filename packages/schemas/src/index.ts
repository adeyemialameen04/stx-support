// backend/src/db/schema
import { insertPostSchema, selectPostSchema } from "backend/src/db/schema/post";
import { selectCategorySchema } from "backend/src/db/schema/category";
import { AuthModel, PayloadModel } from "backend/src/models/auth";
import { CreatePostModel } from "backend/src/models/posts";
import type { App } from "backend/src/app";

export {
  App,
  insertPostSchema,
  selectPostSchema,
  selectCategorySchema,
  AuthModel as authSchema,
  PayloadModel as payloadType,
  CreatePostModel,
};
