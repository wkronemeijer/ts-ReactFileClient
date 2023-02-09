import { notImplemented } from "../Errors";

//////////////////////
// EqualityComparer //
//////////////////////

export type EqualityComparer<T> =  
    (a: T, b: T) => boolean
;

///////////////
// Equatable //
///////////////

/** 
 * Use {@link equals} to compare objects. 
 * 
 * Note that although this property may be inherited, 
 * objects which do not have the same constructor will never have this method called, 
 * even if neither has overriden this method. 
*/
export const EquatableObject_compareTo = Symbol("EquatableObject_compareTo");

export interface EquatableObject {
    /** 
     * Compare this object to another. Use {@link equals} to compare normally. 
     * 
     * Note that although this property may be inherited, 
     * objects which do not have the same constructor will never have this method called, 
     * even if neither has overriden this method. 
     */
    [EquatableObject_compareTo](other: this): boolean;
}

// TODO: `equals` hits the same problem as Set.has: it actually accepts anything, but practically it is more useful to get a type error if you put in other types. 
export function equalsAny(a: unknown, b: unknown): boolean {
    if (a === b) {
        return true;
    }
    
    if (typeof a !== typeof b) {
        return false;
    }
    
    // typeof a == typeof b but a != b
    // aka we are dealing with either NaN or objects
    
    if (
        (typeof a === "number" && isNaN(a)) || 
        (typeof b === "number" && isNaN(b))
    ) {
        return false;
    }
    
    notImplemented();
}

export const equals: <T>(a: T, b: T) => boolean = equalsAny;
