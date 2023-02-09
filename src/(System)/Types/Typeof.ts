


// TODO: Come up with better names for keyof_t and typeof_t

/** A union of all possible `keyof` types. */
export type keyof_t = keyof any;
/** A union of all possible `typeof` types. */
export type typeof_t = typeof __typeofValue;
/** Dummy variable for typeof_t */
const __typeofValue = typeof NaN;


/*
Template for new typeof-related functions.
    T extends "string"    ? never :
    T extends "number"    ? never :
    T extends "bigint"    ? never :
    T extends "boolean"   ? never :
    T extends "symbol"    ? never :
    T extends "undefined" ? never :
    T extends "function"  ? never :
    T extends "object"    ? never :
    never
*/

/** Transforms  */
export type TypeofSource<T extends typeof_t> = 
    T extends "string"    ? string    :
    T extends "number"    ? number    :
    T extends "bigint"    ? bigint    :
    T extends "boolean"   ? boolean   :
    T extends "symbol"    ? symbol    :
    T extends "undefined" ? undefined :
    T extends "function"  ? Function  :
    T extends "object"    ? object    :
    unknown
;
