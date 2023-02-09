
/** Extracts the type of elements from (most) collections. */
export type ElementType<T extends Iterable<any>> = 
    T extends Iterable<infer R> ? R : never
;
