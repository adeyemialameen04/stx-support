"use server";

import { actionClient, authenticatedAction } from "@/lib/safe-action";
import { assertUserAuthenticated } from "@/lib/session";
import { CreatePostModel } from "../../../../packages/schemas/src";
import { AuthorizationError } from "@repo/errors/index";
import { API_URL } from "@/lib/constants";
import makeFetch from "@/lib/fetch";
import { category } from "backend/src/db/schema/category";

export const createPost = actionClient
  .schema(CreatePostModel)
  .action(async ({ parsedInput: { title, categoryId, content, status } }) => {
    const user = await assertUserAuthenticated();
    console.log(title, categoryId, content, status);

    if (!user) {
      throw new AuthorizationError("You are not authorized to view this page");
    }

    // const res = await fetch(`${API_URL}/posts`, {
    //   method: "POST",
    // });
    makeFetch(true, "/posts", user.accessToken as string, {
      method: "POST",
      body: JSON.stringify({
        title,
        content,
        categoryId,
        status,
      }),
    })()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    return { success: "Posted" };
  });
