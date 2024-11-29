import { openSTXTransfer, type STXTransferOptions } from "@stacks/connect";
import { StacksTestnet, StacksMainnet } from "@stacks/network";

export const sendSTXTransaction = async (
	amount: string,
	memo: string,
	recipientAddress: string,
) => {
	let transactionId: string | undefined;

	const transactionDetails: STXTransferOptions = {
		network: new StacksMainnet(),
		recipient: recipientAddress,
		amount: `${amount}000000`,
		memo: memo,
		appDetails: {
			name: "Stx Support",
			icon: "",
		},
		onFinish: async (response: { txId: string }) => {
			transactionId = response.txId;
		},
		onCancel: () => {
			console.log("User canceled");
		},
	};

	await openSTXTransfer(transactionDetails);
	return transactionId;
};
