
/** The missing logical operator `a -> b`, equivalent to `!a || b`. */
export function implies(a: boolean, b: boolean): boolean {
    return (!a || b);
}
