"use client";
import { useEffect, useState } from "react";
import { Connect } from "@stacks/connect-react";
import ConnectWallet, { userSession } from "./_components/connect-wallet";

export default function Home() {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) return null;

	return (
		<Connect
			authOptions={{
				appDetails: {
					name: "Stx Support",
					icon: window.location.origin + "/logo.png",
				},
				redirectTo: "/",
				onFinish: () => {
					window.location.reload();
				},
				userSession,
			}}
		>
			<div>
				<ConnectWallet />
			</div>
		</Connect>
	);
}
