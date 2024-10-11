import { NextRequest, NextResponse } from "next/server";
import isValidJWT, { jwtDecode } from "./auth";
import { API_URL } from "./constants";

const DEFAULT_OFFSET_SECONDS = 15; // refresh the token 15 seconds before it expires

interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export function getMiddleware({
  shouldRefresh,
  fetchTokenPair,
  onSuccess,
  onError,
}: {
  shouldRefresh: (req: NextRequest) => Promise<boolean>;
  fetchTokenPair: (req: NextRequest) => Promise<TokenPair>;
  onSuccess: (res: NextResponse, tokenPair: TokenPair) => void;
  onError?: (req: NextRequest, res: NextResponse, error: unknown) => void;
}) {
  return function withRefreshToken(
    middleware: (req: NextRequest) => Promise<NextResponse>,
  ) {
    return async function (req: NextRequest): Promise<NextResponse> {
      try {
        if (await shouldRefresh(req)) {
          console.log("Refreshing token");
          const tokenPair = await fetchTokenPair(req);
          const res = NextResponse.next();
          onSuccess(res, tokenPair);
          return res;
        }
      } catch (error) {
        console.error("Error in token refresh:", error);
        if (onError) {
          console.error("Gotcha lol");
          const res = NextResponse.next();
          onError(req, res, error);
          return res;
        }
      }

      return middleware(req);
    };
  };
}

export const withRefreshToken = getMiddleware({
  shouldRefresh: async (req) => {
    console.log("Checking if token should be refreshed");
    const JWT_SECRET = process.env["ACCESS_SECRET_KEY"] ?? "";
    const accessToken = req.cookies.get("accessToken")?.value;
    if (!accessToken) return true;
    try {
      const payload = await jwtDecode(accessToken, JWT_SECRET);
      if (!payload?.exp) {
        console.log("No expiry in token");
        return false;
      }
      return payload.exp - DEFAULT_OFFSET_SECONDS <= Date.now() / 1000;
    } catch {
      return true;
    }
  },
  fetchTokenPair: async (req) => {
    console.log("Fetching new token pair");
    const refreshToken = req.cookies.get("refreshToken")?.value;

    if (!refreshToken) {
      throw new Error("Refresh token not valid");
      // console.error("Refresh token not found", req.url);
      // return NextResponse.redirect(new URL("/auth", req.url));
    }

    if (!isValidJWT(refreshToken as string)) {
      throw new Error("Refresh token not valid");
    }

    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to refresh token: ${response.statusText}`);
    }
    return await response.json();
  },
  onSuccess: (res, tokenPair) => {
    console.log("Setting new access token");
    res.cookies.set({
      name: "accessToken",
      value: tokenPair.accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 14 * 60,
      path: "/",
    });
  },
  onError: (req, res, error) => {
    console.error("Error in refresh token process:", error);
    // res.cookies.set({
    //   name: "accessToken",
    //   value: "",
    //   maxAge: 0,
    //   path: "/",
    // });
    // res.cookies.set({
    //   name: "refreshToken",
    //   value: "",
    //   maxAge: 0,
    //   path: "/",
    // });
    if (error) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }
  },
});
