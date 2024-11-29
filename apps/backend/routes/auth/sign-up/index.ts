import Elysia, { t } from "elysia";
import bearer from "@elysiajs/bearer";
import { db } from "../../../src/db";
import { userTable } from "../../../src/db/schema";
import { selectUserSchema } from "../../../src/db/schema/user";
import { AuthModel, LoginResponseModel } from "../../../src/models/auth";
import { ERRORS } from "../../../src/models/error-models";
import { jwtPlugin } from "../../../src/plugins/auth";
import { authService } from "../../../src/services/auth";

const tags = ["Auth"];
export default new Elysia({
	tags,
	name: "api.auth.sign-up",
})
	.use(bearer())
	.model("AuthModel", AuthModel)
	.use(jwtPlugin)
	.guard(
		{
			body: AuthModel,
		},
		(app) =>
			app
				// Sign up
				.post(
					"",
					async ({ body: { password, stxAddressMainnet }, set, error }) => {
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
								passwordHash: hashedPasswd,
							})
							.returning();
						// const { password_hash, ...userWithoutPassword } = newUser;

						set.status = "Created";
						return newUser;
					},
					{
						response: {
							201: t.Omit(selectUserSchema, ["passwordHash", "updatedAt"]),
							409: ERRORS.CONFLICT,
						},
						detail: {
							summary: "Sign Up",
							description: "Creates a new User",
						},
					},
				),
	);
