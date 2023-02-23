import { primitive_t } from "../../Types/Primitive";

///////////////
// Equatable //
///////////////

export interface EquatableObject {
    /**
     * Check if two objects are equal to eachother.
     *
     * Note that {@link equals} will never compare objects
     * if they do not share the same {@link EquatableObject.equals} method.
     */
    equals(other: this): boolean;
}

export type Equatable = 
    | primitive_t 
    | EquatableObject
;
