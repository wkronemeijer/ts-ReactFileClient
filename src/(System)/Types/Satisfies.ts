import { requires } from "../Assert";
import { identity } from "../Function";

/** For regular use, TS 4.9 lets you use the `satisfies` operator directly. For creating pseudo-factory functions, this function is still appropriate. */
export const satisfies: 
    <T>() => <U extends T>(x: U) => U 
=      () => identity;

export type Satisfies<T, U extends T> = U;

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

export function satisfiesStrictly<T, U extends T>(check: (x: T) => x is U): (x: T) => U {
    return x => {
        requires(check(x));
        return x;
    }
}
