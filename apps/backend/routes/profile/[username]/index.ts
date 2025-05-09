import Elysia, { NotFoundError, t } from "elysia";
import { profileService } from "../../../src/services/profile";

const tags = ["Profile"];
export default new Elysia({
	name: "api.profile.index",
	tags,
}).get(
	"",
	async ({ params: { username } }) => {
		const user = await profileService.getProfile(username);
		if (!user) {
			throw new NotFoundError("user not found");
		}

		return user;
	},
	{
		params: t.Object({ username: t.String() }),
		// response: {
		// 	200: selectUserSchema,
		// 	401: ERRORS.UNAUTHORIZED,
		// 	404: ERRORS.NOT_FOUND,
		// },
		detail: {
			summary: "Get User Profile by username",
			description: "Gets the profile of a user by their username",
		},
	},
);
