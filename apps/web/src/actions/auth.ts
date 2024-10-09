"use server";
import { API_URL } from "@/lib/constants";
import { actionClient } from "@/lib/safe-action";
import { saveUserTokens } from "@/lib/session";
import { authSchema } from "@repo/schemas/index";
import { LoginResponseModel } from "backend/src/models/auth";

export const signUp = actionClient
  .schema(authSchema)
  .action(async ({ parsedInput: { stxAddressMainnet, password } }) => {
    try {
      type LoginResponseType = typeof LoginResponseModel.static;
      const res = await fetch(`${API_URL}/auth/sign-up`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stxAddressMainnet,
          password: password,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        return { status: 200, detail: "SignUp successful" };
      }

      if (data.status === 409) {
        const res = await fetch(`${API_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            stxAddressMainnet,
            password: password,
          }),
        });
        const data: LoginResponseType = await res.json();
        const tokens = {
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          refreshTokenExpiry: data.refreshTokenExpiryTimestamp,
          accessTokenExpiry: data.accessTokenExpiryTimestamp,
          uuid: data.user?.id,
        };
        saveUserTokens(tokens);

        if (res.ok) {
          console.log("Here");
          return { status: 200, detail: "Login successful" };
        }
      }

      return { status: 500, detail: "An error occured" };
    } catch (err) {
      console.log(err);
    }
  });
