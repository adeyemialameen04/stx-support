import { AuthenticationError } from "@repo/errors/index";
import { cookies } from "next/headers";

type UserCredentials = {
  accessToken: string | undefined;
  refreshToken: string;
  accessTokenExpiry: number;
  refreshTokenExpiry: number;
  uuid: string;
};

export type Tokens = {
  accessToken: string | undefined;
  refreshToken: string;
  accessTokenExpiry: number;
  refreshTokenExpiry: number;
};

export const getCurrentUser = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");

  if (!accessToken?.value) {
    throw new AuthenticationError("No token");
  }

  return accessToken;
};

export function getUserCredentials(): UserCredentials | null {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const accessTokenExpiry = parseInt(
    cookieStore.get("accessTokenExpiry")?.value || "0",
  );
  const refreshTokenExpiry = parseInt(
    cookieStore.get("refreshTokenExpiry")?.value || "0",
  );
  const uuid = cookieStore.get("uuid")?.value;

  if (!refreshToken || !uuid) return null;

  return {
    accessToken,
    refreshToken,
    accessTokenExpiry,
    refreshTokenExpiry,
    uuid,
  };
}

export const assertUserAuthenticated = async () => {
  const creds = getUserCredentials();
  if (!creds?.refreshToken) {
    throw new AuthenticationError("Invalid");
  }

  return creds;
};

export function saveUserTokens(tokens: Tokens) {
  const cookieStore = cookies();
  cookieStore.set("accessToken", tokens.accessToken as string, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: tokens.accessTokenExpiry - Math.floor(Date.now() / 1000),
    path: "/",
  });
  cookieStore.set("refreshToken", tokens.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: tokens.refreshTokenExpiry - Math.floor(Date.now() / 1000),
    path: "/",
  });
}
