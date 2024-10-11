import { selectUserSchema } from "@/db/schema/user";
import { AuthorizationError } from "@/exceptions/errors";
import { ERRORS } from "@/models/error-models";
import { UpdateUserModel } from "@/models/users";
import { accessTokenPlugin } from "@/plugins/auth";
import { accessTokenSecurity } from "@/utils/helpers";
import Elysia from "elysia";
import { usersService } from "./service";

const tags = ["Users"];
export const usersRoutes = new Elysia({
  prefix: "/users",
  name: "api.users",
  tags,
})
  .use(accessTokenPlugin)
  .model("UpdateUserModel", UpdateUserModel)
  .guard(
    {
      detail: {
        security: accessTokenSecurity,
      },
      async beforeHandle({ payload }) {
        if (!payload) {
          throw new AuthorizationError("Invalid Token");
        }
      },
    },
    (app) =>
      app
        .patch(
          "/me",
          async ({ payload, body }) => {
            const updatedUser = await usersService.updateUser(
              payload && "user" in payload ? payload.user.id : "",
              body,
            );

            if (updatedUser) {
              return updatedUser;
            }

            throw new AuthorizationError("");
          },
          {
            body: "UpdateUserModel",
            response: {
              200: selectUserSchema,
              401: ERRORS.UNAUTHORIZED,
            },
            detail: {
              summary: "Update User",
              description: "Updates user profile",
            },
          },
        )
        .get("/me", async ({ payload }) => {}, {}),
  );
