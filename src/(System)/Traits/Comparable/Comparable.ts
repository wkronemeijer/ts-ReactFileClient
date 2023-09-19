import { Ordering } from "./Ordering";
import { value_t } from "../../Types/Primitive";

/** Makes an object {@link Comparable}. */
export interface ComparableObject {
    /** 
     * Compares this and the given object.  
     * 
     * The global `compare` function compares two objects using this function,
     * but only if they share the exact same function.
     */
    compare(other: this): Ordering;
}

/** All values that are explicitly comparable. Objects can implement {@link ComparableObject}. */
export type Comparable = 
    | value_t
    | ComparableObject
    // | Function 
    // Skipped to prevent accidently not applying functions
    // You can always use compareAny directly
;
