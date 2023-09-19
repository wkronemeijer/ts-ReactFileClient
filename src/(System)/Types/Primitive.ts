
/** Primitives, not compound values. Defined by having _value_ and **not** _reference_ equality. */
export type value_t = 
    | undefined 
    | null 
    | boolean
    | number
    | bigint
    | string
    | symbol
;

export type reference_t = 
    // | function 
    | object
;
