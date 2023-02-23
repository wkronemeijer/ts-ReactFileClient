import { requires } from "../Assert";
import { identity } from "../Function";

/** For regular use, TS 4.9 lets you use the `satisfies` operator directly. For creating pseudo-factory functions, this function is still appropriate. */
export const satisfiesWeakly: 
    <T>() => <U extends T>(x: U) => U 
=      () => identity;

/**
 * Type-level equivalent of the value-level `satisfies` operator.
 * 
 * NB: The argument order was swapped to match the operator.
 */
export type Satisfies<U extends T, T> = U;

// TODO: satisfies with a check
/*
What to call this:
it has elements of:
    satisfy
    satisfies
    assert
    requires
    factory
    create

*/

// Is used by Path, so kinda important ^^
export function satisfiesStrictly<T, U extends T>(check: (x: T) => x is U): (x: T) => U {
    return x => {
        requires(check(x));
        return x;
    }
}
