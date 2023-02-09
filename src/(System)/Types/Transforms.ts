
///////////////////////////
// Mutability transforms //
///////////////////////////

import { __NewtypeBrand } from "./Newtype";

// Really ought to be in the standard typescript type library
// Doc comments modeled after Readonly

/** Makes all properties in T readwrite. */
export type ReadWrite<T> = {
    -readonly [P in keyof T]: T[P];
}

//////////////////////////////////
// Null(ish)-related transforms //
//////////////////////////////////

// Requires an exception for newtypes, to treat them as atoms.
/** Makes all properties in T optional, recursively. */
export type RecursivePartial<T> = T extends __NewtypeBrand<symbol> ? T : {
    [P in keyof T]+?: RecursivePartial<T[P]>;
};

/** Removes null-like types from T. */
export type NonNullish<T> = T extends undefined | null ? never : T;

export type StripNull<T> = T extends null ? never : T;
export type StripUndefined<T> = T extends undefined ? never : T;
