import { API_URL } from "./constants";

export default function makeFetch<T>(
  auth: boolean,
  path: string,
  accessToken: string | null,
  init: RequestInit = {},
): () => Promise<T | { message: string; statusCode: number }> {
  return async function () {
    try {
      // Check if the method is POST or PATCH to add Content-Type
      const shouldAddContentType = ["POST", "PATCH"].includes(
        init.method || "",
      );

      const headers = {
        ...(auth ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...(shouldAddContentType ? { "Content-Type": "application/json" } : {}),
        ...init.headers, // Allow overriding headers
      };

      const res = await fetch(`${API_URL}${path}`, {
        ...init,
        headers,
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      return await res.json();
    } catch (error) {
      console.error("Error making fetch request:", error);
      return { message: "Failed to make request", statusCode: 500 };
    }
  };
}
