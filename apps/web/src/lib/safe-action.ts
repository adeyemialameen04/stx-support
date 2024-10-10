import { PublicError } from "@repo/errors/index";
import { createServerActionProcedure } from "zsa";
import { assertUserAuthenticated } from "./session";
import { createSafeActionClient } from "next-safe-action";
import { typeboxAdapter } from "next-safe-action/adapters/typebox";
import { zodAdapter } from "next-safe-action/adapters/zod";

export const actionClient = createSafeActionClient({
  validationAdapter: typeboxAdapter(),
});

function shapeErrors({ err }: any) {
  const isAllowedError = err instanceof PublicError;
  const isDev = process.env.NODE_ENV === "development";
  if (isAllowedError || isDev) {
    console.error(err);
    return {
      code: err.code ?? "ERROR",
      message: `${!isAllowedError && isDev ? "DEV ONLY ENABLED - " : ""}${
        err.message
      }`,
    };
  } else {
    return {
      code: "ERROR",
      message: "Something went wrong",
    };
  }
}

export const authenticatedAction = createServerActionProcedure()
  .experimental_shapeError(shapeErrors)
  .handler(async () => {
    const user = await assertUserAuthenticated();
    return { user };
  });
