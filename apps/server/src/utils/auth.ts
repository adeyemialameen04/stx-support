import logger from "./logger";
import { v4 as uuidv4 } from "uuid";
import { sign, verify } from "hono/jwt";
import { settings } from "../config/settings";

export const generatePasswdHash = async (password: string): Promise<string> => {
  const hash = await Bun.password.hash(password);
  logger.info(password, hash);
  return hash;
};

export const verifyPasswdHash = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  const isMatch = await Bun.password.verify(password, hashedPassword);
  return isMatch;
};

interface TokenResult {
  token: string;
  expiryTimestamp: number;
}

export async function createAccessToken(
  data: any,
  expiry: number | null = null,
  isRefreshToken: boolean = false,
): Promise<TokenResult> {
  const now = Math.floor(Date.now() / 1000); // Current time in seconds
  const expiryTime =
    now + (expiry !== null ? expiry : settings.ACCESS_TOKEN_EXPIRE_SECONDS);

  const payload = {
    user: data,
    exp: expiryTime,
    jti: uuidv4(),
    refresh_token: isRefreshToken,
  };

  const token = await sign(payload, settings.SECRET_KEY);

  return {
    token,
    expiryTimestamp: expiryTime,
  };
}

export async function decodeToken(token: string): Promise<any | null> {
  try {
    const payload = await verify(token, settings.SECRET_KEY);
    return payload;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}
