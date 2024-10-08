import Elysia, { t } from "elysia";
import { db } from "../db";
import { userTable } from "../db/schema";
import { selectUserSchema } from "../db/schema/user";
import { accessTokenSecurity, refreshTokenSecurity } from "../utils/helpers";
import bearer from "@elysiajs/bearer";
import { v4 as uuidv4 } from "uuid";
import { ERRORS } from "../models/error-models";
import { AuthModel, LoginResponseModel, PayloadModel } from "../models/auth";
import { authService } from "./service";
import {
  accessTokenPlugin,
  jwtPlugin,
  refreshTokenPlugin,
} from "../plugins/auth";
import { AuthorizationError } from "../exceptions/errors";

const tags = ["Auth"];
export const authRoutes = new Elysia({ prefix: "/auth", tags })
  .use(bearer())
  .model("AuthModel", AuthModel)
  .model("LoginResponseModel", LoginResponseModel)
  .use(jwtPlugin)
  .guard(
    {
      body: AuthModel,
    },
    (app) =>
      app
        // Sign up
        .post(
          "/sign-up",
          async ({ body: { stxAddressMainnet, password }, set, error }) => {
            const existingUser =
              await authService.isUserExist(stxAddressMainnet);

            if (existingUser) {
              return error(409, {
                status: 409,
                detail: "Username already exists",
                error: "Conflict",
              });
            }

            const hashedPasswd = await Bun.password.hash(password);
            const [newUser] = await db
              .insert(userTable)
              .values({
                stxAddressMainnet,
                password_hash: hashedPasswd,
              })
              .returning();
            // const { password_hash, ...userWithoutPassword } = newUser;

            set.status = "Created";
            return newUser;
          },
          {
            response: {
              201: t.Omit(selectUserSchema, ["password_hash", "updatedAt"]),
              409: ERRORS.CONFLICT,
            },
            detail: {
              summary: "Sign Up",
              description: "Creates a new User",
            },
          },
        )
        // Login
        .post(
          "/login",
          async ({
            body: { stxAddressMainnet, password },
            accessJwt,
            refreshJwt,
            error,
          }) => {
            const existingUser =
              await authService.isUserExist(stxAddressMainnet);

            if (!existingUser) {
              return error(401, {
                status: 401,
                detail: "Invalid Username or Password",
                error: "Unauthorized",
              });
            }

            const isMatch = await Bun.password.verify(
              password,
              existingUser.password_hash,
            );

            if (!isMatch) {
              return error(401, {
                status: 401,
                detail: "Invalid Username or Password",
                error: "Unauthorized",
              });
            }

            const accessTokenExpiryTimestamp =
              Math.floor(Date.now() / 1000) + 15 * 60;
            const refreshTokenExpiryTimestamp =
              Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60;

            const user = {
              stxAddressMainnet,
              id: existingUser.id,
            };

            const accessToken = await accessJwt.sign({
              user: user,
              jti: uuidv4(),
              refresh: false,
              exp: accessTokenExpiryTimestamp,
            });
            const refreshToken = await refreshJwt.sign({
              user: user,
              jti: uuidv4(),
              refresh: true,
              exp: refreshTokenExpiryTimestamp,
            });

            return {
              message: "Login successful",
              accessToken,
              refreshToken,
              accessTokenExpiryTimestamp,
              refreshTokenExpiryTimestamp,
              user,
            };
          },
          {
            response: {
              401: ERRORS.UNAUTHORIZED,
              200: LoginResponseModel,
            },
            detail: {
              summary: "Login",
              description: "Login",
            },
          },
        ),
  )
  .guard({
    detail: {
      security: accessTokenSecurity,
      description: "Require user to be logged in",
    },
  })
  .guard({}, (app) =>
    app.use(accessTokenPlugin).get(
      "/logout",
      async ({ payload }) => {
        console.log(payload);

        return {
          status: 200,
          detail: "Logged out successfully",
        };
      },
      {
        async beforeHandle({ payload }) {
          if (!payload) {
            throw new AuthorizationError("Invalid Token");
          }
        },
        response: {
          200: t.Object({
            status: t.Number({ default: 200 }),
            detail: t.String({ default: "Logout successful" }),
          }),
          401: ERRORS.UNAUTHORIZED,
        },
        detail: {
          summary: "Logout",
          description: "Logs current user out",
          security: accessTokenSecurity,
        },
      },
    ),
  )
  .guard(
    {
      detail: {
        security: refreshTokenSecurity,
        description: "Require user to be logged in",
      },
    },
    (app) =>
      app.use(refreshTokenPlugin).get(
        "/refresh",
        async ({ accessJwt, payload }) => {
          const accessTokenExpiry = Math.floor(Date.now() / 1000) + 15 * 60;

          if (payload) {
            const accessToken = await accessJwt.sign({
              user: payload && payload.user,
              jti: uuidv4(),
              refresh: false,
              exp: accessTokenExpiry,
            });

            return {
              accessToken,
              accessTokenExpiry,
            };
          }
          throw new AuthorizationError("Unauthorized");
        },
        {
          async beforeHandle({ payload }) {
            if (!payload) {
              throw new AuthorizationError("Invalid Token");
            }
          },
          response: {
            200: t.Object({
              accessToken: t.String(),
              accessTokenExpiry: t.Number({
                default: Date.now(),
              }),
            }),
            401: ERRORS.UNAUTHORIZED,
          },
          detail: {
            summary: "Refresh",
            description: "Refresh access token",
          },
        },
      ),
  );
