import { Equatable, EquatableObject } from "./Equatable";

///////////////////
// Object equals //
///////////////////

const    isEquatableObject_key = "equals" satisfies keyof EquatableObject;
function isEquatableObject(object: object): object is EquatableObject {
    return (
        isEquatableObject_key in object && 
        object.equals === "function"
        // Could check the length, but any competing functions would also have length 1.
    );
}

function equalsObject(lhs: object, rhs: object): boolean {
    if (
        isEquatableObject(lhs) && 
        isEquatableObject(rhs) &&
        lhs.equals === rhs.equals
    ) {
        return Boolean(lhs.equals(rhs));
    } else {
        return lhs === rhs; 
        // Technically superfluous, but requires post-condition from another function
        // AKA too fragile.
    }
}

////////////////////
// Generic equals //
////////////////////

// Confusing, but better for performance
const isNaN = Number.isNaN;

function isObject(object: unknown): object is object {
    return (
        typeof object === "object" && 
        object !== null
    );
}

/** 
 * Checks any two values for equality. 
 * Invokes {@link EquatableObject} when appropriate. 
 */
export function equalsAny(a: unknown, b: unknown): boolean {
    return (
        (
            a === b
        ) || (
            isNaN(a) && 
            isNaN(b)
        ) || (
            isObject(a) &&
            isObject(b) &&
            equalsObject(a, b)
        )
    );
}

/** 
 * Checks two values for equality. 
 * Invokes {@link EquatableObject} when appropriate. 
 * 
 * To compare two values of any type, use {@link equalsAny}. 
 */
export const equals: 
    <T extends Equatable>(a: T, b: T) => boolean 
= equalsAny;
