import Elysia, { t } from "elysia";
import { insertSupportTransaction } from "../../src/db/schema/support-transaction";
import { supportTransactionService } from "../../src/services/support-transaction";
import {
	SendCreated,
	SendInternalServerError,
	SendNotFound,
} from "../../src/utils/responses";
import { usersService } from "../../src/services/users";

const tags = ["Support"];
export default new Elysia({ name: "api.support.index", tags }).post(
	"",
	async ({ body, set }) => {
		const userExists = await usersService.getUser(body.donatedTo);
		if (!userExists) {
			set.status = "Not Found";
			return SendNotFound("User");
		}

		const transaction = await supportTransactionService.createTransaction(body);

		if (!transaction) {
			set.status = "Internal Server Error";
			return SendInternalServerError("An unexpected error occured");
		}

		set.status = "Created";
		return SendCreated(transaction, "Transaction");
	},
	{
		body: t.Omit(insertSupportTransaction, ["createdAt", "updatedAt", "id"]),
		detail: {
			summary: "Support a creator",
		},
	},
);
