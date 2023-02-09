// For working with homogenous and heterogenous fixed size arrays.

// Why stop at length 7? 7 is a lucky number. 
// And otherwise sequence does not fit on a single line on my monitor.

/** All supported tuple sizes. */
export type TupleIndices = 
    | 0
    | 1
    | 2
    | 3
    | 4 
    | 5
    | 6
;

/** Creates an array of fixed size. */
export type FixedSizeArray<T, N> = 
    N extends 0 ? [] :
    N extends 1 ? [T] :
    N extends 2 ? [T, T] :
    N extends 3 ? [T, T, T] :
    N extends 4 ? [T, T, T, T] :
    N extends 5 ? [T, T, T, T, T] :
    N extends 6 ? [T, T, T, T, T, T] :
    N extends 7 ? [T, T, T, T, T, T, T] :
    T[]
;

/** If used a rest parameter, this allows you to omit undefined values from a function call. */
export type OptionalParameter<T> = T extends undefined ? [] : [T];
