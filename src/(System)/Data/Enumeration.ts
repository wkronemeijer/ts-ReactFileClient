//////////////////////
// StringEnumObject //
//////////////////////

export type ArrayMember<E extends readonly string[]> = E[number];

export type Member<E extends Iterable<unknown>> = 
    E extends Iterable<infer R> ? R : never
;
