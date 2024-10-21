import { PublicError } from "@repo/errors/index";
import { API_URL } from "./constants";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
interface NextJsOptions {
	revalidate?: number | false;
	tags?: string[];
}

interface FetchOptions extends Omit<RequestInit, "method" | "body"> {
	method?: HttpMethod;
	body?: Record<string, unknown>;
	next?: NextJsOptions;
}

export default function makeFetch<T>(
	path: string,
	accessToken: string | null,
	options: FetchOptions = {},
): () => Promise<T> {
	return async () => {
		const { method = "GET", body, next, ...restOptions } = options;

		// Determine if we should add Content-Type
		const shouldAddContentType =
			["POST", "PUT", "PATCH"].includes(method) && body;

		const headers = new Headers(restOptions.headers);

		if (accessToken) {
			headers.set("Authorization", `Bearer ${accessToken}`);
		}

		if (shouldAddContentType) {
			headers.set("Content-Type", "application/json");
		}

		const fetchOptions: RequestInit & { next?: NextJsOptions } = {
			...restOptions,
			method,
			headers,
			body: body ? JSON.stringify(body) : undefined,
		};

		// Add Next.js specific options if provided
		if (next) {
			fetchOptions.next = next;
		}

		const res = await fetch(`${API_URL}${path}`, fetchOptions);

		if (!res.ok) {
			// const errorBody = await res.text();
			throw new PublicError("Req failed");
			// throw new APIError(res.status, `Request failed: ${errorBody}`);
		}

		const contentType = res.headers.get("content-type");
		if (contentType?.includes("application/json")) {
			return (await res.json()) as T;
		}
		return (await res.text()) as unknown as T;
	};
}
