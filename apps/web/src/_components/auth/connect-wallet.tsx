"use client";
import React, { useEffect, useState } from "react";
import { AppConfig, showConnect, UserSession } from "@stacks/connect";
import { LucideWallet, Wallet2 } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import { signUp } from "@/actions/auth";
import { toast } from "sonner";

const appConfig = new AppConfig(["store_write", "publish_data"]);
export const userSession = new UserSession({ appConfig });

function authenticate() {
  showConnect({
    appDetails: {
      name: "Stacks Next.js Starter",
      icon: window.location.origin + "/logo512.png",
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
  const [mounted, setMounted] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    setMounted(true);

    const handleUserSession = async () => {
      if (userSession.isUserSignedIn()) {
        const data = userSession.loadUserData();
        console.log(data);
        setUserData(data);
        const res = await signUp({
          stxAddressMainnet: data.profile.stxAddress.mainnet,
          password: data.decentralizedID as string,
        });
        console.log(res?.serverError);
      }
    };

    handleUserSession();
  }, []);

  if (mounted && userSession.isUserSignedIn() && userData) {
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
    <div className="h-dvh w-full flex flex-col items-center justify-center gap-16">
      <div className="flex items-center justify-center flex-col gap-4 !w-full">
        {children}
      </div>
    </div>
  );
};
