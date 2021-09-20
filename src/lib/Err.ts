import { Refinement } from "fp-ts/lib/Refinement";

export interface BadRequest {
	readonly name: "BadRequest";
	readonly code: 400;
	readonly message: string;
}

export interface NotFound {
	readonly name: "NotFound";
	readonly code: 404;
	readonly message: string;
}

export interface MethodNotAllowed {
	readonly name: "MethodNotAllowed";
	readonly code: 405;
	readonly message: string;
}

export interface InternalServerError {
	readonly name: "InternalServerError";
	readonly code: 500;
	readonly message: string;
}

export const internalServerError: (message: string) => InternalServerError = (message) => ({
	name: "InternalServerError",
	code: 500,
	message,
});

export const code: <T extends { code: StatusCode }>(obj: T) => T["code"] = (obj) => obj.code;
export const codeMessage: <T extends { code: StatusCode }>(obj: T) => string = (obj) =>
	statusCodeMessage(code(obj));

export const statusCodeMessage: (code: StatusCode) => string = (code) => statusCodeMap[code];

export const statusCodeList = [400, 404, 405, 500] as const;
export type StatusCode = typeof statusCodeList[number];
export const statusCodeMap: Record<StatusCode, string> = {
	400: "Bad Request",
	404: "This page could not be found",
	405: "Method Not Allowed",
	500: "Internal Server Error",
};

export const errNameList = [
	"BadRequest",
	"NotFound",
	"MethodNotAllowed",
	"InternalServerError",
] as const;
export type ErrName = typeof errNameList[number];

export type Err = BadRequest | InternalServerError | NotFound | MethodNotAllowed;

export const isErr: Refinement<unknown, Err> = (err): err is Err => {
	if (
		typeof err !== "object" ||
		err === null ||
		typeof err === "function" ||
		Array.isArray(err)
	) {
		return false;
	}
	if (errNameList.includes((err as Err)["name"])) {
		return false;
	}
	return false;
};
