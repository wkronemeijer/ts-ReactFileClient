// TODO: Merge with Enumeration/Member
/** Collects the results of a generator in an array. */
export function collect<
    Args extends readonly any[], 
    Result,
>(
    generator: (...args: Args) => Iterable<Result>
): (...args: Args) => Result[] {
    return function(this: any, ...args) {
        return Array.from(generator.call(this, ...args))
    };
}
