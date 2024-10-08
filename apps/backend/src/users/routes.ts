import Elysia from "elysia";
import { accessTokenPlugin } from "../plugins/auth";
import { AuthorizationError } from "../exceptions/errors";
import { accessTokenSecurity } from "../utils/helpers";
import { usersService } from "./service";
import { insertPostSchema } from "../db/schema/post";
import { insertUserSchema, selectUserSchema } from "../db/schema/user";
import { ERRORS } from "../models/error-models";
import { UpdateUserModel } from "../models/users";

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
      app.patch(
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
      ),
  );
