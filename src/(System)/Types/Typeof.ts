////////////
// typeof //
////////////

/** A union of all possible `typeof` types. */
export type typeof_t = typeof __typeofValue;
/** Dummy variable for typeof_t */
const __typeofValue = typeof NaN; // <- One day they will fix this 

///////////////////////////////////////////////////////////
// Converting `typeof` strings to types (and back again) //
///////////////////////////////////////////////////////////

/** Transforms from the `typeof` string back to the type. */
export type TypeStringToType<T extends typeof_t> = 
    T extends "undefined" ? undefined :
    T extends   "boolean" ?   boolean :
    T extends    "string" ?    string :
    T extends    "number" ?    number :
    T extends    "bigint" ?    bigint :
    T extends    "symbol" ?    symbol :
    T extends  "function" ?  Function :
    T extends    "object" ?    object :
    never
;

/** Transforms from the type to the `typeof` string. */
export type TypeToTypeString<T> =
    T extends undefined ? "undefined" :
    T extends   boolean ?   "boolean" :
    T extends    string ?    "string" :
    T extends    number ?    "number" :
    T extends    bigint ?    "bigint" :
    T extends    symbol ?    "symbol" :
    T extends  Function ?  "function" : // Function extends object, so we must check it first.
    "object"
;
