import { payloadType } from "@repo/schemas/index";
import { jwtVerify, JWTPayload } from "jose";

type PayloadType = typeof payloadType.static;
export default async function isValidJWT(token: string) {
  const JWT_SECRET = process.env["REFRESH_SECRET_KEY"] ?? "";

  const encoder = new TextEncoder();
  const secretKey = encoder.encode(JWT_SECRET);

  try {
    const { payload } = await jwtVerify(token, secretKey, {
      algorithms: ["HS256"],
    });

    const typedPayload = payload as JWTPayload & PayloadType;
    // console.log(typedPayload);

    if (typedPayload.user.id) {
      // console.log(typedPayload);
      return true;
    }
  } catch (err) {
    console.error(err, "catch");
    return false;
  }
}
type test = {
  exp: number;
};

export async function jwtDecode(token: string, JWT_SECRET: string) {
  // const JWT_SECRET = process.env["REFRESH_SECRET_KEY"] ?? "";

  const encoder = new TextEncoder();
  const secretKey = encoder.encode(JWT_SECRET);

  try {
    const { payload } = await jwtVerify(token, secretKey, {
      algorithms: ["HS256"],
    });

    // const typedPayload = payload as JWTPayload & PayloadType;

    if (payload) {
      return payload;
    }
  } catch (err) {
    console.error(err, "catch");
    return false;
  }
}
