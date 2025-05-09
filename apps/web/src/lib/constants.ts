export const DEV = true;
export const API_URL = DEV
	? "http://localhost:3002/api/v1"
	: process.env.NEXT_PUBLIC_API_BASE_URL || "";
export const PROJECT_NAME = "Stx Support";
export const HTTP_STATUS = {
	CONFLICT: "Conflict",
	UNAUTHORIZED: "Unauthorized",
	CREATED: "Created",
	OK: "OK",
	NOT_FOUND: "Not Found",
};
// export const BASE_URL = DEV
//   ? "http://localhost:3000"
//   : process.env.NEXT_PUBLIC_BASE_URL || "";
