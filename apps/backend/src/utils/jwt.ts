// import { Elysia, t } from "elysia";
// import jwt from "@elysiajs/jwt";
// import { v4 as uuidv4 } from "uuid";
// import logger from "./logger";
// import { settings } from "../config/settings";
//
// export const jwtPlugin = new Elysia().use(
//   jwt({
//     name: "jwt",
//     secret: settings.SECRET_KEY,
//   }),
// );
//
// export const generatePasswdHash = async (password: string): Promise<string> => {
//   const hash = await Bun.password.hash(password);
//   logger.info(password, hash);
//   return hash;
// };
//
// export const verifyPasswdHash = async (
//   password: string,
//   hashedPassword: string,
// ): Promise<boolean> => {
//   return await Bun.password.verify(password, hashedPassword);
// };
//
// interface TokenResult {
//   token: string;
//   expiryTimestamp: number;
// }
//
// export const createAccessToken = async (
//   data: any,
//   expiry: number | null = null,
//   isRefreshToken: boolean = false,
// ): Promise<TokenResult> => {
//   const now = Math.floor(Date.now() / 1000);
//   const expiryTime =
//     now + (expiry !== null ? expiry : settings.ACCESS_TOKEN_EXPIRE_SECONDS);
//   const payload = {
//     user: data,
//     exp: expiryTime,
//     jti: uuidv4(),
//     refresh_token: isRefreshToken,
//   };
//   jwtPlugin.
//
//   const token = await app.jwt.sign(payload);
//   return {
//     token,
//     expiryTimestamp: expiryTime,
//   };
// };
//
// export const decodeToken = async (token: string): Promise<any | null> => {
//   try {
//     return await app.jwt.verify(token);
//   } catch (error) {
//     console.error("Error decoding token:", error);
//     return null;
//   }
// };
