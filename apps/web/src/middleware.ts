import { NextRequest, NextResponse } from "next/server";
import { getUserCredentials } from "@/lib/session";
import isValidJWT from "./lib/auth";
import { API_URL } from "./lib/constants";
import { cookies } from "next/headers";

const protectedRoutes = ["/admin/supporters"];

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const creds = getUserCredentials();

  if (
    protectedRoutes.includes(pathname) &&
    (!creds || !(await isValidJWT(creds?.refreshToken as string)))
  ) {
    console.log("TFFFF");
    const res = NextResponse.redirect(new URL("/auth", req.url));
    return res;
  }

  if (!creds?.accessToken) {
    try {
      const res = await fetch(`${API_URL}/refresh`, {
        headers: {
          Authorization: `Bearer ${creds?.refreshToken}`,
        },
      });
      const data: { accessTokenExpiry: number; accessToken: string } =
        await res.json();
      const cookieStore = cookies();
      cookieStore.set("accessToken", data.accessToken as string, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: data.accessTokenExpiry - Math.floor(Date.now() / 1000),
        path: "/",
      });
    } catch (err) {
      console.log(err);
    }
  }

  return NextResponse.next();
}
