import { StatusMap } from "elysia";
const StatusMapKeys = Object.fromEntries(
	Object.entries(StatusMap).map(([key, value]) => [value, key]),
);
export const sc = "successfully";
export const SendCreated = (data: any, resource: string) => {
	return {
		message: `${resource} created ${sc}`,
		data,
		status: StatusMapKeys[StatusMap.Created],
	};
};

export const SendSuccess = (data: any, resource: string) => {
	return {
		message: `${resource} retrieved ${sc}`,
		data,
		status: StatusMapKeys[StatusMap.OK],
	};
};

export const SendConflict = (message: string, errors?: any) => {
	return {
		message,
		errors,
		status: StatusMapKeys[StatusMap.Conflict],
	};
};

export const SendInternalServerError = (message: string, errors?: any) => {
	return {
		message,
		...(errors && { errors }),
		status: StatusMapKeys[StatusMap["Internal Server Error"]],
	};
};

export const SendNotFound = (resource: string, errors?: any) => {
	return {
		message: `${resource} not found`,
		...(errors && { errors }),
		status: StatusMapKeys[StatusMap["Not Found"]],
	};
};
