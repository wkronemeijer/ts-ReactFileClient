import { Newtype } from "../../Types/Newtype";

///////////////////////
// Comparison result //
///////////////////////

export type     Ordering = Newtype<number, "Ordering">;
export function Ordering(number: number): Ordering {
    // Any value is actually allowed, only the signum matters
    return Math.sign(number) as Ordering;
}

export const Ordering_LT = Ordering(-1);
export const Ordering_EQ = Ordering( 0);
export const Ordering_GT = Ordering(+1);

/**
 * Lexicographically sorts the thing as if the thing is compared piecewise.
 * https://en.wikipedia.org/wiki/Lexicographic_order and the generalization for Cartesian products
 * 
 * @deprecated Use the following instead:
 * @example
 * Ordering(
 *     compare(a, b) ||
 *     compare(c, d) ||
 *     compare(e, f) 
 * )
 * 
 */
export function Ordering_lexicalOrder(...parts: readonly Ordering[]): Ordering {
    for (const part of parts) {
        if (part !== Ordering_EQ) {
            return part;
        }
    }
    return Ordering_EQ;
}
