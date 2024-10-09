"use server";

import { actionClient, authenticatedAction } from "@/lib/safe-action";
import { assertUserAuthenticated } from "@/lib/session";
import { insertPostSchema } from "@repo/schemas/index";

export const createPost = actionClient
  // .schema(insertPostSchema)
  .action(async ({ parsedInput: { title, categoryId, content } }) => {
    const user = await assertUserAuthenticated();
    console.log(user);

    return { success: "Posted" };
  });
