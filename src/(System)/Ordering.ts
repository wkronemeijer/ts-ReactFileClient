import { Newtype } from "./Types/Newtype";

///////////////////////
// Comparison result //
///////////////////////

export type Ordering = Newtype<number, typeof Ordering>;
export declare const Ordering: unique symbol;

export const Ordering_LT = -1 as Ordering;
export const Ordering_EQ =  0 as Ordering;
export const Ordering_GT = +1 as Ordering;
/**
 * Lexicographically sorts the thing as if the thing is compared piecewise.
 * https://en.wikipedia.org/wiki/Lexicographic_order and the generalization for Cartesian products
 */

export function Ordering_lexicalOrder(...parts: readonly Ordering[]): Ordering {
    for (const part of parts) {
        if (part !== Ordering_EQ) {
            return part;
        }
    }
    return Ordering_EQ;
}
