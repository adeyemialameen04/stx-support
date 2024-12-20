"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { AppConfig, showConnect, UserSession } from "@stacks/connect";
import { Wallet2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { completeAuth } from "../actions";

const appConfig = new AppConfig(["store_write", "publish_data"]);
export const userSession = new UserSession({ appConfig });

function authenticate() {
	showConnect({
		appDetails: {
			name: "Stacks Next.js Starter",
			icon: `${window.location.origin}/logo512.png`,
		},
		redirectTo: "/",
		onFinish: () => {
			window.location.reload();
		},
		userSession,
	});
}

function disconnect() {
	userSession.signUserOut("/");
}

const ConnectWallet = () => {
	const mountedRef = useRef(false);
	const [userData, setUserData] = React.useState<any>(null);

	const handleUserSession = useCallback(async () => {
		if (userSession.isUserSignedIn()) {
			const data = userSession.loadUserData();
			console.log(data);
			setUserData(data);
			const res = await completeAuth({
				stxAddressMainnet: data.profile.stxAddress.mainnet,
				password: data.decentralizedID as string,
			});
			console.log(res?.serverError);
		}
	}, []);

	useEffect(() => {
		if (!mountedRef.current) {
			mountedRef.current = true;
			handleUserSession();
		}
	}, [handleUserSession]);

	if (mountedRef.current && userSession.isUserSignedIn() && userData) {
		return (
			<Wrapper>
				<Button className="Connect" onClick={disconnect}>
					Disconnect Wallet
				</Button>
				<p>mainnet: {userData.profile.stxAddress.mainnet}</p>
				<p>testnet: {userData.profile.stxAddress.testnet}</p>
			</Wrapper>
		);
	}

	return (
		<Wrapper>
			<Button onClick={authenticate} className="gap-4 w-full max-w-[300px]">
				<Wallet2 size={17} />
				Continue With Wallet
			</Button>
		</Wrapper>
	);
};

export default ConnectWallet;

const Wrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex flex-col gap-16 justify-center items-center w-full h-dvh">
			<div className="flex items-center justify-center flex-col gap-4 !w-full">
				{children}
			</div>
		</div>
	);
};
