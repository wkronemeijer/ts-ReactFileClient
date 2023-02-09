
export function compare<T extends number | string>(
    lhs: T, rhs: T,
): number {
    if      (lhs > rhs) return +1;
    else if (lhs < rhs) return -1;
    else                return  0;
}
