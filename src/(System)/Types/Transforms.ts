
///////////////////////////
// Mutability transforms //
///////////////////////////

import { keyof_t } from "./KeyOf";

// Really ought to be in the standard typescript type library
// Doc comments modeled after Readonly

/** Makes all properties in T writable. */
export type ReadWrite<T> = {
    -readonly [P in keyof T]: T[P];
}

//////////////////////////////////
// Null(ish)-related transforms //
//////////////////////////////////

/** Removes null-like types from T. */
export type NonNullish<T> = T extends undefined | null ? never : T;

export type StripNull<T> = T extends null ? never : T;
export type StripUndefined<T> = T extends undefined ? never : T;

/** Combines {@link Readonly} and {@link Record}. Keeps the number of >>>> down. */
export type ReadonlyRecord<K extends keyof_t, T> = Readonly<Record<K, T>>;
