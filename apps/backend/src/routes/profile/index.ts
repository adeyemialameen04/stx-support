import Elysia, { NotFoundError } from "elysia";
import { selectUserSchema } from "~/db/schema/user";
import { AuthorizationError } from "~/exceptions/errors";
import { ERRORS } from "~/models/error-models";
import { UpdateProfile } from "~/models/users";
import { accessTokenPlugin } from "~/plugins/auth";
import { profileService } from "~/services/profile";
import { usersService } from "~/services/users";
import { accessTokenSecurity } from "~/utils/helpers";

const tags = ["Users"];
export const profileRoutes = new Elysia({
  prefix: "/me",
  name: "api.profile.index",
  tags,
})
  .use(accessTokenPlugin)
  .model("UpdateUserProfile", UpdateProfile)
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
          "",
          async ({ payload, body }) => {
            const updatedUser = await profileService.updateUserProfile(
              payload && "user" in payload ? payload.user.id : "",
              body,
            );

            if (updatedUser) {
              return updatedUser;
            } else {
              throw new NotFoundError("User not found");
            }
          },
          {
            body: UpdateProfile,
            response: {
              200: selectUserSchema,
              401: ERRORS.UNAUTHORIZED,
              // 404: ERRORS.NOT_FOUND,
            },
            detail: {
              summary: "Update User",
              description: "Updates user profile",
            },
          },
        )
        .get(
          "",
          async ({ payload }) => {
            const user = await usersService.getUser(
              payload && "user" in payload ? payload.user.id : "",
            );
            if (!user) {
              throw new NotFoundError("user not found");
            }

            return user;
          },
          {
            response: {
              200: selectUserSchema,
              401: ERRORS.UNAUTHORIZED,
              404: ERRORS.NOT_FOUND,
            },
            detail: {
              summary: "Get user",
              description: "Get currently logged in user data",
            },
          },
        ),
  );
