
/** Extracts the type of elements from (most) collections. */
export type ElementType<T extends Iterable<any>> = 
    T extends Iterable<infer R> ? R : never
;
// TODO: Merge with Enumeration/Member
/** Collects the results of a generator in an array. */
export function collect<
    Args extends readonly any[], 
    Result,
>(
    generator: (...args: Args) => Iterable<Result>
): (...args: Args) => Result[] {
    return (...args) => Array.from(generator(...args));
}
