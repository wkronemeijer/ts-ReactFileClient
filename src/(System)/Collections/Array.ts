

// aaaaaand the award for the must useless function goes to:
// Exists for symmetry with 
/** Returns the first valid index of an array. */
export function firstIndex(array: ArrayLike<any>): number | undefined {
    return (array.length > 0) ? 0 : undefined;
}

/** Returns the last valid index of an array. */
export function lastIndex(array: ArrayLike<any>): number | undefined {
    return (array.length > 0) ? (array.length - 1) : undefined;
}

/** Picks a random element from an array and returns it. Returns undefined if the array is empty. */
export function randomArrayElement<T>(array: ReadonlyArray<T>): T | undefined {
    const index = Math.trunc(Math.random() * array.length);
    return array[index];
}
