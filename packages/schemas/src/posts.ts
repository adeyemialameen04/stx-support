import { CreatePostModel, SinglePost } from "backend/src/models/posts";
import { selectCategorySchema } from "backend/src/db/schema/category";
import { insertPostSchema, selectPostSchema } from "backend/src/db/schema/post";

export {
	insertPostSchema,
	selectPostSchema,
	selectCategorySchema,
	CreatePostModel,
	SinglePost,
};
