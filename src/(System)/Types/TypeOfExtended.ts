import { typeof_t } from "./TypeOf";

/** `typeof`, but it returns "null" for null, instead of "object". */
export type     typeofWithNull = typeof_t | "null";
export function typeofWithNull(x: unknown): typeofWithNull {
    return x === null ? "null" : typeof x;
}
