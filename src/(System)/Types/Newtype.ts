/////////////
// Newtype //
/////////////
// based on https://stackoverflow.com/questions/49451681/typescript-what-is-the-unique-keyword-for
/** Symbol under which the brand is located. */

import { value_t } from "./Primitive";


// export declare const __NewtypeSymbol: unique symbol;
// /** Stores the brand, so that different newtypes are incompatible with one another. Do not instantiate! */

// export declare class __NewtypeBrand<S extends symbol> {
//     // Why was private here again? 
//     // for some reason private removes the S from the output;
//     // public means consumers get a IntelliSense entry for a non-existent __NewtypeSymbol;
//     // protected has the best of both these (trial by error btw)
//     protected [__NewtypeSymbol]: S;
// }
// /**
//  * Declares a type with a new identity, but the same representation as an existing type. Intended usage:
//  *
//  *    export type Hertz = Newtype<number, typeof Hertz>;
//  *    export declare const Hertz: unique symbol;
//  *
//  * It is important you also export the symbol declaration, otherwise consumers will be met with a generic `unique symbol`.
//  */
// export type Newtype1<T extends boolean | number | string, S extends symbol> = T & __NewtypeBrand<S>;


interface Nominal<S extends string | symbol> {
    readonly __NominalPhantomType: S;
}
/**
 * Declares a type with a new identity, but the same representation as an existing type. 
 * 
 * @example 
 * export type Hertz = Newtype<number, "Hertz">;
 * const refreshRate = 60 as Hertz;
 */
export type Newtype<
    T extends value_t, 
    S extends string | symbol,
> = T & Nominal<S>;
