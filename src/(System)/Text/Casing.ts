import { neverPanic } from "../Errors";
import { identity } from "../Function";

// Documentation:
// https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#uncapitalizestringtype
// Expand "Technical details on the intrinsic string manipulation types"

/** Analogous to the {@link Uppercase} intrinsic type function. */
export function uppercase<S extends string>(str: S): Uppercase<S> {
    return str.charAt(0).toUpperCase() + str.slice(1) as Uppercase<S>;
}

/** Analogous to the {@link Lowercase} intrinsic type function. */
export function lowercase<S extends string>(str: S): Lowercase<S> {
    return str.charAt(0).toUpperCase() + str.slice(1) as Lowercase<S>;
}

/** Analogous to the {@link Capitalize} intrinsic type function. */
export function capitalize<S extends string>(str: S): Capitalize<S> {
    return str.charAt(0).toUpperCase() + str.slice(1) as Capitalize<S>;
}

/** Analogous to the {@link Uncapitalize} intrinsic type function. */
export function uncapitalize<S extends string>(str: S): Uncapitalize<S> {
    return str.charAt(0).toLowerCase() + str.slice(1) as Uncapitalize<S>;
}
